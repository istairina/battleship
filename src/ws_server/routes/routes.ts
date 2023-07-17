import UserService from '../service/userService';
import { RegPlayerReqType } from '../models/player.js';
import RoomService from '../service/roomService';

type RoutesProps = {
  userService: UserService;
  roomService: RoomService;
};

export const routes = ({ userService, roomService }: RoutesProps) => ({
  reg: (data: string, id: number, type = "reg") => {
    const parsedData = JSON.parse(data);
    return {
      type: type,
      data: userService.registration(parsedData, id)
    };
  },

  create_room: (data: string, id: number, type = "create_game") => {
    return {
      type: type,
      data: roomService.createRoom(id)
    };
  },

  update_room: (data: string, id: number, type = "update_room") => {
    return {
      type: type,
      data: roomService.updateRoom()
    };
  },

  add_user_to_room: (data: string, id: number, type = "create_game") => {
    const parsedData = JSON.parse(data);
    return {
      type: type,
      data: roomService.addUserToRoom(parsedData.indexRoom as number, id)
    }
  }
});
