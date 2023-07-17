// import { UserConstructorType } from '../entitites/user';
import { RegPlayerReqType } from '../models/player';
import UserRepository from '../repository/UserRepository';

export default class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  registration(data: RegPlayerReqType, id: number) {
    let error = false;
    let errorText = '';
    const userIndx = this.userRepository.getUserIdx(data.name);
    if (userIndx >= 0) {
      if (!this.userRepository.checkPassword(userIndx, data.password)) {
        error = true;
        errorText = 'Invalid password for the user';
      } else {
        this.userRepository.changeUser(userIndx, id);
        console.log(`Welcome back ${data.name}! Your id now is ${id}`);
      }
    } else {
      this.userRepository.addUser({ ...data, id });
      console.log(`A new user ${data.name} with id #${id} added to a db`);
    };
    const respData = {
      name: data.name,
      index: userIndx,
      error: error,
      errorText: errorText,
    };
    return JSON.stringify(respData)


  }

  //   allUsers() {
  //     return this.userRepository.getUsers();
  //   }

  //   getById(id: unknown) {
  //     if (!validateUUID(id)) throw new Error("400");

  //     if (!this.userRepository.getUserById(String(id))) throw new Error("404");

  //     return this.userRepository.getUserById(String(id));
  //   }

  //   addUser(data: { [key: string]: string | number | string[] }) {
  //     if (!validateUser(data)) throw new Error("400");
  //     return this.userRepository.createUser(data as UserConstructorType);
  //   }

  //   updateUser(id: unknown, data: { [key: string]: string | number | string[] }) {
  //     if (!validateUUID(id)) throw new Error("400");
  //     if (!validateUser(data)) throw new Error("400");
  //     if (!this.userRepository.getUserById(String(id))) throw new Error("404");
  //     return this.userRepository.updateUser(
  //       String(id),
  //       data as UserConstructorType
  //     );
  //   }

  //   deleteUser(id: unknown) {
  //     if (!validateUUID(id)) throw new Error("400");
  //     if (!this.userRepository.getUserById(String(id))) throw new Error("404");
  //     return this.userRepository.deleteUser(String(id));
  //   }
}
