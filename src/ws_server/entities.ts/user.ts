export type UserConstructorType = {
  name: string;
  password: string;
};

export default class User {
  username: string;
  password: string;
  winAmount: number;

  constructor({ name, password }: UserConstructorType) {
    (this.username = name), (this.password = password), (this.winAmount = 0);
  }
}
