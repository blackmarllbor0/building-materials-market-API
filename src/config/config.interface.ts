export interface IConfig {
  string(key: string): string;

  number(key: string): number;

  bool(key): boolean;
}
