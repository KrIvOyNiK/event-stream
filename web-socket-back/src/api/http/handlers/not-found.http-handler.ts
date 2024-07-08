import { IHttpHandler } from '../http.handler.interface';
import * as http from 'node:http';

export class NotFoundHttpHandler implements IHttpHandler {
  handle(req: http.IncomingMessage, res: http.ServerResponse): void {
    console.log(req);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error_message: 'notFound' }));
  }
}
