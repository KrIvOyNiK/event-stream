import { HttpBaseHandler } from '../http-base.handler';
import * as http from 'node:http';

export class HealthHttpHandler extends HttpBaseHandler {
  protected _handle(req: http.IncomingMessage, res: http.ServerResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ health: 'ok' }));
  }

  protected getHandleUrl(): string {
    return '/health';
  }

  protected getHandlerName(): string {
    return 'HealthHttpHandler';
  }
}
