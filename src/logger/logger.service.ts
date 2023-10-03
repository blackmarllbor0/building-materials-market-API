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
    this.logger.error(
      `{\ncode: ${code},\nmessage: ${message}\n}, time: ${new Date().getDate()}`,
    );
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
