import { userService } from '..';

type shotCellType = {
  length?: number;
  direction?: boolean;
  hasShot: boolean;
};

type Room = {
  roomId: number;
  roomUsers: {
    name: string;
    index: number;
    ships?: ShipType[];
    field?: shotCellType[][];
    shots?: shotType[][];
  }[];
  currentPlayer?: 0 | 1;
};

type shipType = 'small' | 'medium' | 'large' | 'huge';
type shotType = 'shot' | 'killed' | 'miss' | undefined;

export type ShipType = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: shipType;
};

export default class Rooms {
  rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(roomId: number) {
    return this.rooms.find((room) => room.roomId === roomId);
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

  getIndexPlayerByPlayerId(id: number) {
    let ind = -1;
    const name = userService.userRepository.getNamebyId(id);
    this.rooms.forEach((room) => {
      room.roomUsers.forEach((user, idx) => {
        if (user.name === name) ind = idx;
      });
      if (ind === 0 || ind === 1) return ind;
    });
    return ind;
  }

  getUsersByRoombyId(roomId: number) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    return this.rooms[indRoom].roomUsers;
  }

  getEnemyIdByRoomId(roomId: number) {
    // const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    console.log(this.getUsersByRoombyId(roomId));
  }

  getIndexRoomByRoomId(roomId: number) {
    return this.rooms.findIndex((room) => room.roomId === roomId);
  }

  addShipsToRoom(idPlayer: number, roomId: number, ships: ShipType[]) {
    const ind = this.getIndexRoomByRoomId(roomId);
    this.rooms[ind].roomUsers[idPlayer].ships = ships;
    this.rooms[ind].roomUsers[idPlayer].field = this.createField(ships);
    if (ships.length === 10) {
      console.log(`Player #${idPlayer} is ready`);
    }

    if (
      this.rooms[ind].roomUsers.length === 2 &&
      this.rooms[ind].roomUsers.every((user) => user.ships && user.ships?.length === 10)
    ) {
      return true;
    }
    return false;
  }

  createField(ships: ShipType[]) {
    const defaultCell: shotCellType = {
      hasShot: false,
    };
    const field: shotCellType[][] = Array(10)
      .fill([])
      .map((x) => Array(10).fill(defaultCell));
    // for (let i = 0; i < field.length; i++) {
    //   console.log(field[i].join(' '));
    // }

    ships.forEach((ship) => {
      const filledCell: shotCellType = {
        length: ship.length,
        direction: ship.direction,
        hasShot: false,
      };

      field[ship.position.y][ship.position.x] = { ...filledCell };
      for (let i = 1; i < ship.length; i++) {
        if (ship.direction) {
          field[ship.position.y + i][ship.position.x] = filledCell;
        } else {
          field[ship.position.y][ship.position.x + i] = filledCell;
        }
      }
    });
    // for (let i = 0; i < field.length; i++) {
    //   console.log(field[i].join(' '));
    // }
    return field;
  }

  attackCell(gameId: number, currPlayer: number, x: number, y: number) {
    const ind = this.getIndexRoomByRoomId(gameId);
    const currField = this.rooms[ind].roomUsers[currPlayer === 0 ? 1 : 0].field;
    let status = '';
    if (currField) {
      const len = currField[y][x].length || undefined;

      if (len && !currField[y][x].hasShot) {
        currField[y][x].hasShot = true;
        if (len === 1) {
          status = 'killed';
        } else {
          status = 'shot';
        }
      }
      if (!len) status = 'miss';
    }

    return status;
  }

  turn(gameId: number) {
    const ind = this.getIndexRoomByRoomId(gameId);
    this.rooms[ind].currentPlayer = this.rooms[ind].currentPlayer === 0 ? 1 : 0;
  }

  getCurrentPlayer(gameId: number) {
    const ind = this.getIndexRoomByRoomId(gameId);
    return this.rooms[ind].currentPlayer;
  }
}
