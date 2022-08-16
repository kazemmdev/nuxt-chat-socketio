const db = require("../db/service");

class UsersDB {
  constructor() {
    this.users = db.index();
  }

  addUser(user) {
    db.create(user.id, user.name, user.room, user.typingStatus);
    this.users = db.index();
  }

  getUser(id) {
    return db.get(id);
  }

  getUsersByRoom(room) {
    return db.getByRoom(room);
  }

  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  setTypingStatus(id, typingStatus) {
    db.update(id, typingStatus);
    this.users = db.index();
  }
}

module.exports = () => {
  return new UsersDB();
};
