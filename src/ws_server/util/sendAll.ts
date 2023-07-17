import { WebSocket } from "ws";

export const sendAll = (message: string, online: WebSocket[]) => {
    for (let i = 0; i < online.length; i++) {
        if (online[i]) {
            online[i].send(message);
            console.log(`User id #${i} has got a response`);
        }
    }
}