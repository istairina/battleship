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
  [key: string]: (data: string, id?: string) => {
    type: string,
    data: string,
  };
};

const wss = new WebSocketServer({ port: 3000 });

const userService: UserService = generateUserInstance();
const roomService: RoomService = generateRoomInstance();
const userRoutes = routes({ userService, roomService });

wss.on('connection', (ws, req) => {
  const id = req.headers['sec-websocket-key'];
  const allRoutes: allRoutesTypes = {
    ...userRoutes,
    default: () => {
      return {
        type: '',
        data: ''
      };
    },
  };

  ws.on('message', (rawData) => {
    const request: ReqResp = JSON.parse(String(rawData));
    const chosen = allRoutes[request.type] || allRoutes.default;
    const response = chosen(request.data);
    console.log(responseToHttp(response.type, response.data))
    ws.send(responseToHttp(response.type, response.data));
  });
});
