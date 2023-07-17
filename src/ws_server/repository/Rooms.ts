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
    this.rooms[indRoom].roomUsers.push({ name: username, index: indPlayer })
    return indPlayer;
  }
}
