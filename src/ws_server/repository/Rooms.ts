import { userService } from "..";

type Room = {
  roomId: number,
  roomUsers: {
    name: string,
    index: number,
  }[]
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
    const roomId = this.generateId()
    this.rooms.push({
      roomId: roomId,
      roomUsers: [],
    });
    return roomId;
  }

  addUserToRoom(roomId: number, username: string) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    const indPlayer = this.rooms[indRoom].roomUsers.length > 0 ? 1 : 0;
    this.rooms[indRoom].roomUsers.push({ name: username, index: indPlayer });

    if (this.rooms[indRoom].roomUsers.length == 2) {
      const oldRoom = this.rooms.findIndex((room) => room.roomUsers[0].name === username);
      if (oldRoom >= 0) { this.deleteRoom(this.rooms[oldRoom].roomId); }
    }
    return indPlayer;
  }

  deleteRoom(roomId: number) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    this.rooms.splice(indRoom, 1);
  }

  getIndexPlayerByRoomId(roomId: number, idx: number) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    const name = userService.userRepository.getNamebyId(idx);
    console.log(name);
    return this.rooms[indRoom].roomUsers[0].name === name ? 0 : 1;
  }

  getUsersByRoombyId(roomId: number) {
    const indRoom = this.rooms.findIndex((room) => room.roomId === roomId);
    return this.rooms[indRoom].roomUsers;
  }
}
