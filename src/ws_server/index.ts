import { WebSocketServer } from 'ws';
import { RegPlayerReqType, RegPlayerRespType } from './models/player';
import { ReqResp } from './models/reqResp';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(rawData) {
    let respData = {};
    const request: ReqResp = JSON.parse(String(rawData));
    if (request.type === 'reg') {
      const reqData: RegPlayerReqType = JSON.parse(request.data);
      respData = {
        name: reqData.name,
        index: 1,
        error: true,
        errorText: 'test Error',
      } as RegPlayerRespType;
    }
    const response: ReqResp = {
      type: request.type,
      data: JSON.stringify(respData),
      id: 0,
    };
    console.log(response);
    ws.send(JSON.stringify(response));
  });
});
