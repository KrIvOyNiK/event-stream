import 'dotenv/config';
import { Application } from './application/application';

(async () => {
  new Application().start();
})();
