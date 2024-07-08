import * as http from 'node:http';
import { IHttpHandler } from './http.handler.interface';
import { ILogger } from '../../logger/logger.interface';

export abstract class HttpBaseHandler implements IHttpHandler {
  constructor(
    private nextHandler: IHttpHandler,
    private logger: ILogger,
  ) {
    logger.info(`${this.getHandlerName()} created`);
  }

  public handle(req: http.IncomingMessage, res: http.ServerResponse): void {
    if (req.url === this.getHandleUrl()) {
      return this._handle(req, res);
    }
    return this.nextHandler.handle(req, res);
  }

  protected abstract getHandlerName(): string;

  protected abstract getHandleUrl(): string;

  protected abstract _handle(req: http.IncomingMessage, res: http.ServerResponse): void;
}
