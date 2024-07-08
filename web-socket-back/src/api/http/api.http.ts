import { HealthHttpHandler } from './handlers/health.http-handler';
import { NotFoundHttpHandler } from './handlers/not-found.http-handler';
import { ILogger } from '../../logger/logger.interface';
import { TestHttpHandler } from './handlers/test.http-handler';
import { IHttpHandler } from './http.handler.interface';

export class ApiHttp {
  private _handlers: (new (nextHandler: IHttpHandler, logger: ILogger) => IHttpHandler)[];
  private _firstHandler?: IHttpHandler;
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger.getInstance('ApiHttp');
    this._handlers = [HealthHttpHandler, TestHttpHandler];
  }

  start() {
    if (!this._handlers.length) {
      this._firstHandler = new NotFoundHttpHandler();
      this.logger.info('NotFoundHttpHandler started');
      return;
    }

    let firstHandler: IHttpHandler = new NotFoundHttpHandler();

    for (let i = 0; i < this._handlers.length; i++) {
      firstHandler = new this._handlers[i](firstHandler, this.logger);
    }

    this._firstHandler = firstHandler;
    this.logger.info('ApiHttp started');
  }

  get handler() {
    if (!this._firstHandler) {
      return new NotFoundHttpHandler();
    }
    return this._firstHandler;
  }
}
