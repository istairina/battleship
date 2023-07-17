import User, { UserConstructorType } from '../entities.ts/user';

export default class UserRepository {
  db: User[];

  constructor() {
    this.db = [];
  }

  getUsers() {
    return this.db;
  }

  addUser(data: UserConstructorType) {
    const newUser = new User({
      name: data.name,
      password: data.password,
      id: data.id,
    });
    this.db.push(newUser);
    return true;
  }

  changeUser(idx: number, newId: number) {
    this.db[idx].id = newId;
    return true;
  }

  getUserIdx(name: string) {
    return this.db.findIndex((user) => user.username === name);
  }

  getUserLoginId(name: string) {
    return this.db[this.getUserIdx(name)].id;
  }

  checkPassword(ind: number, password: string) {
    if (this.db[ind].password === password) return true;
    return false;
  }

  getNamebyId(id: number) {
    const indOfId = this.db.findIndex((user) => user.id === id);
    return this.db[indOfId].username;
  }
}
