export type UserConstructorType = {
  username: string;
  password: string;
};

export default class User {
  username: string;
  password: string;
  winAmount: number;

  constructor({ username, password }: UserConstructorType) {
    (this.username = username), (this.password = password), (this.winAmount = 0);
  }
}
