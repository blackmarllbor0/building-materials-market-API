export interface ILoggerService {
  info(message: string): void;
  error(message: string, code: number): void;
  warn(message: string): void;
}
