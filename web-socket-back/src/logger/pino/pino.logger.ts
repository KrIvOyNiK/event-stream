import { ILogger } from '../logger.interface';
import pino, { TransportSingleOptions } from 'pino';
import { ConfigService } from '../../config/config.service';

export class PinoLogger implements ILogger {
  private readonly pino: pino.Logger;

  private context?: string;

  constructor(pinoLogger?: pino.Logger) {
    if (pinoLogger) {
      this.pino = pinoLogger;
    }
    if (!this.pino) {
      this.pino = pino({
        level: ConfigService.getInstance().get('app.logLevel'),
        timestamp: true,
        transport: this.createTransport(),
      });
    }
  }

  getInstance(context?: string): ILogger {
    const pinoLogger = new PinoLogger(this.pino);
    if (context) {
      pinoLogger.setContext(context);
    }
    return pinoLogger;
  }

  setContext(context: string): void {
    this.context = context;
  }

  info(message: object | string | Error, additionalData?: object) {
    this.pino.info(this.buildLogData(message, additionalData));
  }

  debug(message: object | string | Error, additionalData?: object): void {
    this.pino.debug(this.buildLogData(message, additionalData));
  }

  error(message: object | string | Error, additionalData?: object): any {
    this.pino.error(this.buildLogData(message, additionalData));
  }

  fatal(message: object | string | Error, additionalData?: object): any {
    this.pino.fatal(this.buildLogData(message, additionalData));
  }

  warn(message: object | string | Error, additionalData?: object) {
    this.pino.warn(this.buildLogData(message, additionalData));
  }

  verbose(message: object | string | Error, additionalData?: object) {
    this.pino.trace(this.buildLogData(message, additionalData));
  }

  child(bindings: Record<any, any>) {
    return new PinoLogger(this.pino.child(bindings));
  }

  private buildLogData(message: object | string | Error, additionalData?: object) {
    const objArg: Record<string, any> = {};

    if (this.context) {
      objArg.context = this.context;
    }

    if (typeof message === 'object') {
      if (message instanceof Error) {
        objArg.err = message;
      } else {
        Object.assign(objArg, message);
      }

      return objArg;
    }

    if (typeof message === 'string') {
      Object.assign(objArg, additionalData);
      objArg.msg = message;
    }

    return objArg;
  }

  private createTransport(): TransportSingleOptions | undefined {
    const env = ConfigService.getInstance().get('app.env');
    if (env !== 'development') return;

    return {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    } as TransportSingleOptions;
  }
}
