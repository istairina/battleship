import Rooms from '../repository/Rooms';
import RoomService from '../service/roomService';

export const generateRoomInstance = () => {
  const rooms = new Rooms();

  const roomService = new RoomService(rooms);

  return roomService;
};
