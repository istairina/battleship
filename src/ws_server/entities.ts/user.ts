export type UserConstructorType = {
  username: string;
  password: string;
  index: number;
};

export default class User {
  index: number;
  username: string;
  password: string;

  constructor({ username, password, index }: UserConstructorType) {
    (this.index = 0), (this.username = username), (this.password = password);
  }
}
