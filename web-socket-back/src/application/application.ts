import { ILogger } from '../logger/logger.interface';
import { PinoLogger } from '../logger/pino/pino.logger';
import { Server } from '../server/server';
import { ApiHttp } from '../api/http/api.http';

export class Application {
  private logger: ILogger;

  private server: Server;

  private apiHttp: ApiHttp;

  constructor() {
    this.logger = new PinoLogger();
    this.logger.setContext('Application');
    this.apiHttp = new ApiHttp(this.logger);
    this.server = new Server(this.logger, this.apiHttp);
  }
  start() {
    this.logger.info('Application starting');
    this.apiHttp.start();
    this.server.start();
  }
}
