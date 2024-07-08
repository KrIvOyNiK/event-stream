import { HttpBaseHandler } from '../http-base.handler';
import * as http from 'node:http';

export class TestHttpHandler extends HttpBaseHandler {
  protected _handle(req: http.IncomingMessage, res: http.ServerResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ test: 'ok' }));
  }

  protected getHandleUrl(): string {
    return '/test';
  }

  protected getHandlerName(): string {
    return 'TestHttpHandler';
  }
}
