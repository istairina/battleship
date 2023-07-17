import { RegPlayerReqType } from '../models/player';
import UserRepository from '../repository/UserRepository';
import { ONLINE } from '..';
import { checkIsOnline } from '../util/checkIsOnline';

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
        if (checkIsOnline(data.name)) {
          error = true;
          errorText = 'A user with the name is already online';
        } else {
          this.userRepository.changeUser(userIndx, id);
          ONLINE[id].name = data.name;
          console.log(`Welcome back ${data.name}! Your id now is ${id}`);
        }
      }
    } else {
      this.userRepository.addUser({ ...data, id });
      ONLINE[id].name = data.name;
      console.log(`A new user ${data.name} with id #${id} added to a db`);
    }
    const respData = {
      name: data.name,
      index: userIndx,
      error: error,
      errorText: errorText,
    };
    return JSON.stringify(respData);
  }
}
