import 'dotenv/config';
import { Application } from './application/application';

async function app() {
  new Application().start();
}

app();
