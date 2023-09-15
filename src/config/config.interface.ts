export interface IConfigService {
  string(key: string): string;

  number(key: string): number;

  bool(key): boolean;
}
