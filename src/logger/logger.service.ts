import { ILoggerService } from './logger.service.interface';
import * as signale from 'signale';

export class LoggerService implements ILoggerService {
  private logger: signale.Signale;

  constructor() {
    this.logger = new signale.Signale();
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string, code: number): void {
    const d = new Date();
    this.logger.error(
      `{\ncode: ${code},\nmessage: ${message},\ntime: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}\n}`,
    );
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
