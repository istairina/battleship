import UserService from '../service/service';
import { RegPlayerReqType } from '../models/player.js';

type RoutesProps = {
  userService: UserService;
};

export const routes = ({ userService }: RoutesProps) => ({
  reg: (data: RegPlayerReqType) => {
    return userService.registration(data);
  },
  //   "/api/users:post": async ({ request, response }: handlerProps) => {
  //     const data = (await once(request, "data")) as string[];
  //     const item = JSON.parse(data.join(""));
  //     try {
  //       const user: User = userService.addUser(item);
  //       response.writeHead(201, DEFAULT_HEADER);
  //       response.write("User has been added\n");
  //       response.write(`ID of new user is ${user.id}`);
  //       response.end();
  //     } catch (err) {
  //       if (err === "400") {
  //         response.writeHead(400, DEFAULT_HEADER);
  //         response.write("The data is wrong (username, age or hobbies)");
  //         response.end();
  //       }
  //     }
  //   },

  //   "/api/users/{uuid}:get": async ({ request, response }: handlerProps) => {
  //     const id = getId("get", request);

  //     try {
  //       const user = userService.getById(id);
  //       response.writeHead(200, DEFAULT_HEADER);
  //       response.write(JSON.stringify({ result: user }));
  //       response.end();
  //     } catch (err) {
  //       if (err === "404") {
  //         response.writeHead(404, DEFAULT_HEADER);
  //         response.write("Not found");
  //         response.end();
  //       }
  //       if (err === "400") {
  //         response.writeHead(400, DEFAULT_HEADER);
  //         response.write("User ID is invalid");
  //         response.end();
  //       }
  //     }
  //   },

  //   "/api/users/{uuid}:delete": async ({ request, response }: handlerProps) => {
  //     const id = getId("delete", request);

  //     try {
  //       const user = userService.deleteUser(id);
  //       response.writeHead(200, DEFAULT_HEADER);
  //       response.write("User has been deleted");
  //       response.end();
  //     } catch (err) {
  //       if (err === "404") {
  //         response.writeHead(404, DEFAULT_HEADER);
  //         response.write("Not found");
  //         response.end();
  //       }
  //       if (err === "400") {
  //         response.writeHead(400, DEFAULT_HEADER);
  //         response.write("User ID is invalid");
  //         response.end();
  //       }
  //     }
  //   },

  //   "/api/users/{uuid}:put": async ({ request, response }: handlerProps) => {
  //     const id = getId("delete", request);
  //     const data = (await once(request, "data")) as string[];
  //     const item = JSON.parse(data.join(""));

  //     try {
  //       const user = userService.updateUser(id, item);
  //       response.writeHead(200, DEFAULT_HEADER);
  //       response.write("User has been updated");
  //       response.end();
  //     } catch (err) {
  //       if (err === "404") {
  //         response.writeHead(404, DEFAULT_HEADER);
  //         response.write("Not found");
  //         response.end();
  //       }
  //       if (err === "400") {
  //         response.writeHead(400, DEFAULT_HEADER);
  //         response.write("User ID is invalid");
  //         response.end();
  //       }
  //     }
  //   },
});
