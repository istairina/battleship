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
    });
    this.db.push(newUser);

    return true;
  }

  getUserIdx(name: string) {
    return this.db.findIndex((user) => user.username === name);
  }

  checkPassword(ind: number, password: string) {
    if (this.db[ind].password === password) return true;
    return false;
  }
}
