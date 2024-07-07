import { LOG_LEVEL } from './constants';

export type Config = {
  app: {
    env: 'development' | 'staging' | 'production' | 'test';
    port: number;
    logLevel: LOG_LEVEL;
  };
};
