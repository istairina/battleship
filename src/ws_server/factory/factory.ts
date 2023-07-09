import UserRepository from '../repository/UserRepository';
import UserService from '../service/service';

export const generateInstance = () => {
  const userRepository = new UserRepository();

  const userService = new UserService(userRepository);

  return userService;
};
