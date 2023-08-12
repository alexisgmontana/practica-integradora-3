class UserMemory {
  constructor() {
    this.users = [];
  }

  async getAllUsers() {
    return this.users;
  }

  async getUserById(uid) {
    return this.users.find((user) => user.id === uid);
  }

  async createUser(user) {
    this.users.push(user);
    return user;
  }
}

export default new UserMemory();
