import { WebSocketServer } from 'ws';
import { RegPlayerReqType } from './models/player';
import { ReqResp } from './models/reqResp';
import UserService from './service/service';
import { generateInstance } from './factory/factory';
import { routes } from './routes/routes';
import { responseToHttp } from './util/responseToHttp';

type allRoutesTypes = {
  [key: string]: (data: RegPlayerReqType) => string;
};

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  const userService: UserService = generateInstance();
  const userRoutes = routes({ userService });

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
