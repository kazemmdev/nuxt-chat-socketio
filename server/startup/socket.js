const http = require("http");
const socketio = require("socket.io");
const usersDB = require("../models/users")();
const Message = require("../models/message")();

module.exports = function (app) {
  const server = http.createServer(app);
  const io = socketio(server);

  io.on("connection", (socket) => {
    socket.on("createUser", async (user) => {
      await usersDB.addUser({
        ...user,
        id: socket.id,
      });

      return { id: socket.id };
    });

    socket.on("joinRoom", async ({ name, room }) => {
      socket.join(room);
      io.to(room).emit("updateUsers", await usersDB.getUsersByRoom(room));
      socket.emit("newMessage", new Message("admin", `Hello, ${name}`));
      socket.broadcast
        .to(room)
        .emit(
          "newMessage",
          new Message("admin", `User ${name} connected to chat`)
        );
    });

    socket.on("createMessage", async ({ id, msg }) => {
      const user = await usersDB.getUser(id);
      if (user) {
        io.to(user.room).emit("newMessage", new Message(user.name, msg, id));
      }
    });

    socket.on("setTypingStatus", async ({ room, typingStatus, id }) => {
      await usersDB.setTypingStatus(id, typingStatus);
      io.to(room).emit("updateUsers", await usersDB.getUsersByRoom(room));
    });

    const exitEvents = ["leftChat", "disconnect"];

    exitEvents.forEach((event) => {
      socket.on(event, async () => {
        const id = socket.id;
        const user = await usersDB.getUser(id);
        if (!user) return;
        const { room, name } = user;
        usersDB.removeUser(id);
        socket.leave(room);
        io.to(room).emit("updateUsers", await usersDB.getUsersByRoom(room));
        io.to(room).emit(
          "newMessage",
          new Message("admin", `User ${name} left chat`)
        );
      });
    });
  });

  return server;
};
