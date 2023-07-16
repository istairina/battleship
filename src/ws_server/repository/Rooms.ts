type Room = {
  user1?: string;
  user2?: string;
};

export default class Rooms {
  rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  getRooms() {
    return this.rooms;
  }

  addRoom() {
    this.rooms.push({});
    return this.rooms.length - 1;
  }

  addUserToRoom(indx: number, username: string) {
    this.rooms[indx].user1 = username;
  }
}
