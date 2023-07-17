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
    console.log(`Now there is ${allRooms.length} room${allRooms.length > 0 ? 's' : ''}`);
    const roomsWithOnePlayer = allRooms.filter((room) => room.roomUsers.length < 2);
    console.log(`Rooms with one player: ${roomsWithOnePlayer.length}`);
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

  startGame(data: { gameId: number; ships: string[]; indexPlayer: number }) {
    if (this.rooms.addStatusToRoom(data.indexPlayer, data.gameId)) {
      const respData = {
        ships: data.ships,
        currentPlayerIndex: data.indexPlayer,
      };

      return JSON.stringify(respData);
    }
    return '';
  }

  attack(data: { gameId: number; x: number; y: number; indexPlayer: number }) {
    const respData = {
      position: { x: data.x, y: data.y },
      currentPlayer: data.indexPlayer,
      status: 'miss',
    };
    return JSON.stringify(respData);
  }

  turn() {
    const respData = {
      currentPlayer: 0,
    };
    return JSON.stringify(respData);
  }
}
