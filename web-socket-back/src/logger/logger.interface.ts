export interface ILogger {
  setContext(context: string): void;

  info(message: object | string | Error, additionalData?: object): void;

  debug(message: object | string | Error, additionalData?: object): void;

  error(message: object | string | Error, additionalData?: object): void;

  fatal(message: object | string | Error, additionalData?: object): void;

  warn(message: object | string | Error, additionalData?: object): void;

  verbose(message: object | string | Error, additionalData?: object): void;

  child(bindings: Record<any, any>): ILogger;

  getInstance(context?: string): ILogger;
}
