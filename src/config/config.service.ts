import { IConfig } from './config.interface';
import * as process from 'process';
import * as dotenv from 'dotenv';

export class ConfigService implements IConfig {
  constructor(path: string) {
    dotenv.config({ path, encoding: 'utf8' });
  }

  string(key: string): string {
    return process.env[key];
  }

  number(key: string): number {
    return Number(process.env[key]);
  }

  bool(key): boolean {
    return Boolean(process.env[key]);
  }
}
