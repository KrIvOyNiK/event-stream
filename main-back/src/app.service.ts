import { Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const client = new Client({
      contactPoints: ['h1', 'h2'],
      localDataCenter: 'datacenter1',
      keyspace: 'ks1',
    });

    await client.execute('select * from events where created_at > ?', [
      new Date().toISOString(),
    ]);
    return 'Hello World!';
  }
}
