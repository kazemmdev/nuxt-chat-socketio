const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("server/db/database.db"), {
  fileMustExist: true,
});

function index() {
  return db.prepare("SELECT * FROM users").all();
}

function get(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

function getByRoom(room) {
  return db.prepare("SELECT * FROM users WHERE room = ?").all(room) ?? [];
}

function getByName(name) {
  return db.prepare("SELECT * FROM users WHERE name = ?").get(name);
}

function create(id, name, room, typingStatus) {
  let user = getByName(name);
  if (user) {
    return db.prepare("UPDATE users SET id = ? WHERE name = ?").run(id, name);
  }

  let status = typingStatus ? 1 : 0;
  return db
    .prepare(
      "INSERT INTO users (id, name, room, typingStatus) VALUES (?, ?, ?, ?)"
    )
    .run(id, name, room, status);
}

function update(id, status) {
  let typingStatus = status ? 1 : 0;

  return db
    .prepare("UPDATE users SET typingStatus = ? WHERE id = ?")
    .run(typingStatus, id);
}

module.exports = {
  index,
  get,
  getByRoom,
  create,
  update,
};
