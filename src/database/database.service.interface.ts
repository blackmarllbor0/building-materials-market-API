import OracleDB from 'oracledb';

export interface IDatabaseService {
  insert<T>(
    table: string,
    args: string[],
    values: any[],
  ): Promise<OracleDB.Result<T>>;
}
