import UserRepository from '../repository/UserRepository';
import UserService from '../service/userService';

export const generateUserInstance = () => {
  const userRepository = new UserRepository();

  const userService = new UserService(userRepository);

  return userService;
};
