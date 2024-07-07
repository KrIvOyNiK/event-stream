import * as http from 'node:http';
import { ILogger } from '../logger/logger.interface';
import { ConfigService } from '../config/config.service';

export class Server {
  private httpServer: http.Server | null = null;
  private logger: ILogger;
  private readonly options: {
    host: string;
    port: number;
  };

  constructor(logger: ILogger) {
    this.logger = logger.getInstance('Server');
    this.options = {
      host: '0.0.0.0',
      port: ConfigService.getInstance().get('app.port') || 3000,
    };
  }

  start() {
    this.httpServer = this.httpServer || http.createServer();

    this.httpServer.on('request', (req, res) => {
      if (req.url === '/health') return void this.health(req, res);
      res.end('Http transport not implemented');
    });

    this.httpServer.on('listening', () => {
      const { port, host } = this.options;
      this.logger.info(`Server start on ${host}:${port}`);
    });

    this.httpServer.listen(this.options.port, this.options.host);
  }

  private health(req: http.IncomingMessage, res: http.ServerResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ health: 'ok' }));
  }
}
