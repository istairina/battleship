import User, { UserConstructorType } from '../entities.ts/user';

export default class UserRepository {
  db: User[];
  index: number;

  constructor() {
    this.db = [];
    this.index = -1;
  }

  getUsers() {
    return this.db;
  }

  addUser(data: UserConstructorType) {
    const newUser = new User({
      username: data.username,
      password: data.password,
      index: (this.index += 1),
    });
    this.db.push(newUser);

    return true;
  }

  checkUser(name: string, password: string) {
    const userIndex = this.db.findIndex((user) => user.username === name);
    if (userIndex === -1) return false;
    if (this.db[userIndex].password !== password) return false;
    return true;
  }
}
