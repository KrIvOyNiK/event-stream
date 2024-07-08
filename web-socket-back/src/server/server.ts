import * as http from 'node:http';
import { ILogger } from '../logger/logger.interface';
import { ConfigService } from '../config/config.service';
import { ApiHttp } from '../api/http/api.http';

export class Server {
  private httpServer: http.Server | null = null;
  private logger: ILogger;
  private readonly options: {
    host: string;
    port: number;
  };

  private apiHttp: ApiHttp;

  constructor(logger: ILogger, apiHttp: ApiHttp) {
    this.logger = logger.getInstance('Server');
    this.options = {
      host: '0.0.0.0',
      port: ConfigService.getInstance().get('app.port') || 3000,
    };
    this.apiHttp = apiHttp;
  }

  start() {
    this.httpServer = this.httpServer || http.createServer();

    this.httpServer.on('request', (req, res) => {
      this.apiHttp.handler.handle(req, res);
    });

    this.httpServer.on('listening', () => {
      const { port, host } = this.options;
      this.logger.info(`Server start on ${host}:${port}`);
    });

    this.httpServer.listen(this.options.port, this.options.host);
  }
}
