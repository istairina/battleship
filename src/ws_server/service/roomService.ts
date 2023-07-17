import { userService } from '..';
import Rooms from '../repository/Rooms';

export default class RoomService {
  rooms: Rooms;
  constructor(rooms: Rooms) {
    this.rooms = rooms;
  }

  createRoom(id: number) {
    const roomId = this.rooms.addRoom();
    const name = userService.userRepository.getNamebyId(id);
    const idPlayer = this.rooms.addUserToRoom(roomId, name);
    const respData = {
      idGame: roomId,
      idPlayer: idPlayer,
    };
    return JSON.stringify(respData);
  }

  updateRoom() {
    const allRooms = this.rooms.getRooms();
    console.log(`Now is ${allRooms.length} room${allRooms.length > 0 ? 's' : ''}`);
    const roomsWithOnePlayer = allRooms.filter((room) => room.roomUsers.length < 2);
    return JSON.stringify(roomsWithOnePlayer);
  }

  addUserToRoom(roomId: number, idUser: number) {
    const username = userService.userRepository.getNamebyId(idUser);
    const idPlayer = this.rooms.addUserToRoom(roomId, username);
    const respData = {
      idGame: roomId,
      idPlayer: idPlayer,
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
