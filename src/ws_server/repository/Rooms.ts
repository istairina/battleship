import { userService } from '..';

type Room = {
  roomId: number;
  roomUsers: {
    name: string;
    index: number;
    ships?: ShipType[];
  }[];
  currentPlayer: 0 | 1;
};

type ShipType = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

export default class Rooms {
  rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  getRooms() {
    return this.rooms;
  }

  generateId() {
    return Math.round(Math.random() * 1000);
  }

  addRoom() {
    const roomId = this.generateId();
    this.rooms.push({
      roomId: roomId,
      roomUsers: [],
      currentPlayer: 0,
    });
    return roomId;
  }

  addUserToRoom(roomId: number, username: string) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    const indPlayer = this.rooms[indRoom].roomUsers.length > 0 ? 1 : 0;
    this.rooms[indRoom].roomUsers.push({ name: username, index: indPlayer });

    if (this.rooms[indRoom].roomUsers.length == 2) {
      const oldRoom = this.rooms.findIndex((room) => room.roomUsers[0].name === username);
      if (oldRoom >= 0) {
        this.deleteRoom(this.rooms[oldRoom].roomId);
      }
    }
    return indPlayer;
  }

  deleteRoom(roomId: number) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    this.rooms.splice(indRoom, 1);
    console.log(`Room ${roomId} has been deleted`);
  }

  getIndexPlayerByRoomId(roomId: number, idx: number) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    const name = userService.userRepository.getNamebyId(idx);
    return this.rooms[indRoom].roomUsers[0].name === name ? 0 : 1;
  }

  getUsersByRoombyId(roomId: number) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    return this.rooms[indRoom].roomUsers;
  }

  getIndexRoomByRoomId(roomId: number) {
    return this.rooms.findIndex((room) => room.roomId === roomId);
  }

  addShipsToRoom(idPlayer: number, roomId: number, ships: ShipType[]) {
    const ind = this.getIndexRoomByRoomId(roomId);
    this.rooms[ind].roomUsers[idPlayer].ships = ships;
    console.log(`Player #${idPlayer} is ready`);
    if (this.rooms[ind].roomUsers.every((elem) => elem.ships)) {
      return true;
    }
    return false;
  }

  attackCell(gameId: number, currPlayer: number, x: number, y: number) {
    const ind = this.getIndexRoomByRoomId(gameId);
    const currField = this.rooms[ind].roomUsers[currPlayer === 0 ? 1 : 0].ships;
    let status = '';
    currField?.forEach((cell) => {
      if (cell.position.x === x && cell.position.y === y) {
        if (cell.type === 'small') {
          status = 'killed';
        } else {
          status = 'shot';
        }
      }
    });
    return status ? status : 'miss';
  }
}
