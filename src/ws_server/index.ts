import { WebSocketServer } from 'ws';
import { RegPlayerReqType } from './models/player';
import { ReqResp } from './models/reqResp';
import UserService from './service/userService';
import { generateUserInstance } from './factory/userFactory';
import { routes } from './routes/routes';
import { responseToHttp } from './util/responseToHttp';
import RoomService from './service/roomService';
import { generateRoomInstance } from './factory/roomFactory';

type allRoutesTypes = {
  [key: string]: (data: RegPlayerReqType) => string;
};

const wss = new WebSocketServer({ port: 3000 });

const userService: UserService = generateUserInstance();
const roomService: RoomService = generateRoomInstance();
const userRoutes = routes({ userService, roomService });

wss.on('connection', function connection(ws) {
  const allRoutes: allRoutesTypes = {
    ...userRoutes,
    default: () => {
      return '';
    },
  };

  ws.on('message', function message(rawData) {
    const request: ReqResp = JSON.parse(String(rawData));
    const chosen = allRoutes[request.type] || allRoutes.default;
    const responseData = chosen(JSON.parse(request.data));
    ws.send(responseToHttp(request.type, responseData));
  });
});
