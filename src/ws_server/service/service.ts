// import { UserConstructorType } from '../entitites/user';
import { RegPlayerReqType } from '../models/player';
import UserRepository from '../repository/UserRepository';

export default class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  registration(data: RegPlayerReqType) {
    const respData = {
      name: data.name,
      index: 1,
      error: false,
      errorText: '',
    };
    return JSON.stringify(respData);
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
