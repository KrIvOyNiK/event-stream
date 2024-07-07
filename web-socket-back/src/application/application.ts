import { ILogger } from '../logger/logger.interface';
import { PinoLogger } from '../logger/pino/pino.logger';
import { Server } from '../server/server';

export class Application {
  private logger: ILogger;

  private server: Server;

  constructor() {
    this.logger = new PinoLogger();
    this.logger.setContext('Application');
    this.server = new Server(this.logger);
  }
  start() {
    this.server.start();
    this.logger.info('Application started');
  }
}
