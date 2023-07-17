import { ONLINE } from '..';

export const sendInRoom = (reciepients: number[], message: string) => {
  reciepients.forEach((userId) => {
    ONLINE[userId].websocket.send(message);
  });
};
