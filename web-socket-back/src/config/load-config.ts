import * as dotenv from 'dotenv';
import * as process from 'process';
import { Config } from './types';
import { Ajv, JSONSchemaType } from 'ajv';
import { LOG_LEVEL } from './constants';

interface ProcessEnv {
  // App
  NODE_ENV: 'development' | 'staging' | 'production' | 'test';
  PORT: number;
  LOG_LEVEL: LOG_LEVEL;
}

const ProcessEnvSchema: JSONSchemaType<ProcessEnv> = {
  type: 'object',
  properties: {
    // App
    NODE_ENV: {
      type: 'string',
      enum: ['development', 'production', 'test', 'staging'],
      default: 'development',
    },
    LOG_LEVEL: {
      type: 'string',
      enum: Object.values(LOG_LEVEL),
      default: LOG_LEVEL.INFO,
    },
    PORT: { type: 'integer', default: 3000 },
  },
  required: ['NODE_ENV'],
};

export const LoadConfig = (): Config => {
  dotenv.config();

  const validateFn = new Ajv({
    useDefaults: true,
    allErrors: true,
    coerceTypes: true,
  }).compile(ProcessEnvSchema);

  const env = process.env;

  if (!validateFn(env)) {
    console.error(validateFn.errors);
    process.exit(1);
  }

  return {
    app: {
      env: env.NODE_ENV as 'development' | 'staging' | 'production' | 'test',
      port: Number(env.PORT),
      logLevel: env.LOG_LEVEL as LOG_LEVEL,
    },
  };
};
