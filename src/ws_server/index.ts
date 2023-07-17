import { WebSocket, WebSocketServer } from 'ws';
import { RegPlayerReqType } from './models/player';
import { ReqResp } from './models/reqResp';
import UserService from './service/userService';
import { generateUserInstance } from './factory/userFactory';
import { routes } from './routes/routes';
import { responseToHttp } from './util/responseToHttp';
import RoomService from './service/roomService';
import { generateRoomInstance } from './factory/roomFactory';
import { sendAll } from './util/sendAll';

type allRoutesTypes = {
  [key: string]: (data: string, id: number) => {
    type: string,
    data: string,
  };
};

const wss = new WebSocketServer({ port: 3000 });

export const userService: UserService = generateUserInstance();
const roomService: RoomService = generateRoomInstance();
const userRoutes = routes({ userService, roomService });

export const online: WebSocket[] = [];

wss.on('connection', (ws, req) => {
  // const id = req.headers['sec-websocket-key'];

  const idx = Math.round(Math.random() * 1000);

  online[idx] = ws;

  console.log(`Connections with id #${idx} is established`);

  const allRoutes: allRoutesTypes = {
    ...userRoutes,
    default: () => {
      return {
        type: '',
        data: '',
        id: idx,
      };
    },
  };

  ws.on('message', (rawData) => {
    const request: ReqResp = JSON.parse(String(rawData));
    if (request.type === "create_room") {
      const createGame = allRoutes[request.type];
      const response = createGame(request.data, idx);

      ws.send(responseToHttp(response.type, response.data));
      const updateRoom = allRoutes["update_room"];
      const responseUpdateRoom = updateRoom(request.data, idx);

      // ws.send(responseToHttp(responseUpdateRoom.type, responseUpdateRoom.data));
      sendAll(responseToHttp(responseUpdateRoom.type, responseUpdateRoom.data), online);
    } else {
      const chosen = allRoutes[request.type] || allRoutes.default;
      const response = chosen(request.data, idx);

      // ws.send(responseToHttp(response.type, response.data));
      online[idx].send(responseToHttp(response.type, response.data));
    }

  });

  ws.on('close', () => {
    delete online[idx];
    console.log(`Connection with the id #${idx} is closed`);
  });

});

console.log('Websocket server starts on port 3000');