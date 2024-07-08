import * as http from 'node:http';

export interface IHttpHandler {
  handle(req: http.IncomingMessage, res: http.ServerResponse): void;
}
