import { TypeOnline } from '..';

export const sendAll = (message: string, online: TypeOnline) => {
  for (let i = 0; i < online.length; i++) {
    if (online[i]) {
      online[i].websocket.send(message);
    }
  }
};
