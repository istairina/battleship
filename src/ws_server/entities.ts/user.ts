export type UserConstructorType = {
  name: string;
  password: string;
  id: number;
};

export default class User {
  username: string;
  password: string;
  winAmount: number;
  id: number;

  constructor({ name, password, id }: UserConstructorType) {
    (this.username = name), (this.password = password), (this.winAmount = 0), (this.id = id);
  }
}
