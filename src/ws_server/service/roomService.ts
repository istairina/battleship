import { userService } from '..';
import Rooms, { ShipType } from '../repository/Rooms';

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

  getRoom(id: number) {
    return this.rooms.getRoom(id);
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

  startGame(data: { gameId: number; ships: ShipType[]; indexPlayer: number }) {
    if (this.rooms.addShipsToRoom(data.indexPlayer, data.gameId, data.ships)) {
      const respData = {
        ships: data.ships,
        currentPlayerIndex: data.indexPlayer,
      };

      return JSON.stringify(respData);
    }
    return '';
  }

  attack(data: { gameId: number; x: number; y: number; indexPlayer: number }) {
    const status = this.rooms.attackCell(data.gameId, data.indexPlayer, data.x, data.y);
    if (!status) {
      return JSON.stringify('');
    }

    const respData = {
      position: { x: data.x, y: data.y },
      currentPlayer: data.indexPlayer,
      status,
    };

    return JSON.stringify(respData);
  }

  // turn(id: number) {
  //   const respData = {
  //     currentPlayer: this.rooms.turn(),
  //   };
  //   return JSON.stringify(respData);
  // }

  getIndexPlayerByPlayerId(id: number) {
    return this.rooms.getIndexPlayerByPlayerId(id);
  }

  getCurrentPlayer(id: number) {
    return this.rooms.getCurrentPlayer(id);
  }
}
