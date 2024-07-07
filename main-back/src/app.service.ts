import { Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const client = new Client({
      contactPoints: ['localhost'],
      localDataCenter: 'datacenter1',
    });

    const clients: Client[] = [];

    for (let i = 0; i < 2048; i++) {
      clients.push(client);
    }

    setInterval(() => {
      console.time(`ddd`);
      Promise.all(
        clients.map((client) =>
          client.execute(
            `insert into event_keyspase.events (id, created_at, data, event_type)
           values (uuid(), currentDate(), '{"event":"ready"}', 'UPDATE_DOCS')`,
          ),
        ),
      ).then(() => {
        console.timeEnd(`ddd`);
      });
    }, 1500);

    const client_1 = new Client({
      contactPoints: ['localhost'],
      localDataCenter: 'datacenter1',
    });

    const clients_1: Client[] = [];

    for (let i = 0; i < 2048; i++) {
      clients_1.push(client_1);
    }

    setInterval(() => {
      console.time(`ddd_1`);
      Promise.all(
        clients_1.map((client) =>
          client.execute(
            `insert into event_keyspase.events (id, created_at, data, event_type)
           values (uuid(), currentDate(), '{"event":"ready"}', 'UPDATE_DOCS')`,
          ),
        ),
      ).then(() => {
        console.timeEnd(`ddd_1`);
      });
    }, 1500);
    return 'Hello World!';
  }
}
