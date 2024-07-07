import { ValueOf } from '../common/types/value-of.type';

export const LOG_LEVEL = {
  FATAL: 'fatal',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
  SILENT: 'silent',
} as const;
export type LOG_LEVEL = ValueOf<typeof LOG_LEVEL>;
