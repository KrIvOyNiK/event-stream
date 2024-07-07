import { Config } from './types';
import { LoadConfig } from './load-config';
import { Path, PathIndex } from '../common/types/path.types';

export class ConfigService {
  private readonly config: Config;

  private static instance?: ConfigService;

  private constructor() {
    this.config = LoadConfig();
  }

  public static getInstance() {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  get<P extends Path<Config>>(path: P): PathIndex<Config, P> {
    const parts = path.split('.');
    let current: any = this.config;
    while (parts.length) {
      const part = parts.shift()!;
      current = current[part];
    }
    return current;
  }
}
