import OracleDB from 'oracledb';
import { SQLArgs, SQLValues } from './database.service';

export interface IDatabaseService {
  insert<T extends object>(table: string, obj: T): Promise<T>;

  selectAll<T extends object>(
    table: string,
    args: SQLArgs,
  ): Promise<OracleDB.Result<T>>;

  where<T extends object>(
    table: string,
    args: SQLArgs,
    terms: SQLArgs,
    values: SQLValues,
  ): Promise<OracleDB.Result<T>>;
}
