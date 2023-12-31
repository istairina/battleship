import { WebSocket, WebSocketServer } from 'ws';
import { ReqResp } from './models/reqResp';
import UserService from './service/userService';
import { generateUserInstance } from './factory/userFactory';
import { routes } from './routes/routes';
import { responseToHttp } from './util/responseToHttp';
import RoomService from './service/roomService';
import { generateRoomInstance } from './factory/roomFactory';
import { sendAll } from './util/sendAll';
import { sendInRoom } from './util/sendInRoom';
import CurrPlayer from './util/turn';

type allRoutesTypes = {
  [key: string]: (
    data: string,
    id: number
  ) => {
    type: string;
    data: string;
  };
};

const wss = new WebSocketServer({ port: 3000 });

export const userService: UserService = generateUserInstance();
const roomService: RoomService = generateRoomInstance();
const userRoutes = routes({ userService, roomService });

export type TypeOnline = {
  websocket: WebSocket;
  name?: string;
  opponentId?: number;
}[];

export const ONLINE: TypeOnline = [];

const update = (allRoutes: allRoutesTypes, data: string, idx: number) => {
  const updateRoom = allRoutes['update_room'];
  const responseUpdateRoom = updateRoom(data, idx);
  sendAll(responseToHttp(responseUpdateRoom.type, responseUpdateRoom.data), ONLINE);
};

const turn = (currentPlayer: 0 | 1) => {
  return responseToHttp('turn', JSON.stringify({ currentPlayer: currentPlayer }));
};

wss.on('connection', (ws, req) => {
  const idx = Math.round(Math.random() * 1000);

  ONLINE[idx] = { websocket: ws };

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

  const currPlayer = new CurrPlayer();

  ws.on('message', (rawData) => {
    const request: ReqResp = JSON.parse(String(rawData));

    switch (request.type) {
      case 'create_room': {
        const createGame = allRoutes[request.type];
        const responseCreate = createGame(request.data, idx);
        ws.send(responseToHttp(responseCreate.type, responseCreate.data)); //personal response
        update(allRoutes, request.data, idx);
        break;
      }

      case 'add_user_to_room': {
        const addUserToRoom = allRoutes['add_user_to_room'];
        const responseAddtoRoom = addUserToRoom(request.data, idx);
        ws.send(responseToHttp(responseAddtoRoom.type, responseAddtoRoom.data)); //personal response
        const rawData = JSON.parse(request.data);
        const usersInRoom = roomService.rooms.getUsersByRoombyId(rawData.indexRoom);
        const nameOtherUser =
          usersInRoom[0].name === userService.userRepository.getNamebyId(idx)
            ? usersInRoom[1].name
            : usersInRoom[0].name;
        const idxOtherUser = userService.userRepository.getUserLoginId(nameOtherUser);
        ONLINE[idx].opponentId = idxOtherUser;
        ONLINE[idxOtherUser].opponentId = idx;
        ONLINE[idxOtherUser].websocket.send(
          responseToHttp(responseAddtoRoom.type, {
            ...rawData,
            idPlayer: rawData.idPlayer === 0 ? 1 : 0,
          })
        );
        break;
      }

      case 'add_ships': {
        const chosen = allRoutes[request.type] || allRoutes.default;
        const response = chosen(request.data, idx);
        if (response.data) {
          ws.send(responseToHttp(response.type, response.data));
          const opponentId = ONLINE[idx].opponentId;
          if (opponentId) {
            sendInRoom([idx, opponentId], turn(currPlayer.getCurrPlayer()));
          }
        }
        break;
      }

      case 'attack': {
        const chosen = allRoutes[request.type] || allRoutes.default;
        const response = chosen(request.data, idx);
        const opponentId = ONLINE[idx].opponentId;
        if (opponentId) {
          sendInRoom([idx, opponentId], responseToHttp(response.type, response.data));
          sendInRoom([idx, opponentId], turn(currPlayer.changeCurrPlayer()));
        }
        break;
      }

      default: {
        const chosen = allRoutes[request.type] || allRoutes.default;
        const response = chosen(request.data, idx);

        ws.send(responseToHttp(response.type, response.data));

        break;
      }
    }
    update(allRoutes, request.data, idx);
  });

  ws.on('close', () => {
    console.log(`Connection with ${ONLINE[idx].name || ''} id #${idx} is closed`);
    delete ONLINE[idx];
  });
});

console.log('Websocket server starts on port 3000');
