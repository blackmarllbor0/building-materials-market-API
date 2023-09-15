import * as process from 'process';
import * as dotenv from 'dotenv';
import { IConfigService } from './config.interface';

export class ConfigService implements IConfigService {
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
