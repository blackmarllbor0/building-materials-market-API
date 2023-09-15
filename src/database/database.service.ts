import * as oracle from 'oracledb';
import OracleDB from 'oracledb';
import { IConfigService } from '../config/config.interface';
import { IDatabaseService } from './database.service.interface';

export class DatabaseService implements IDatabaseService {
  private connection: oracle.Connection;
  private readonly PBD: string;

  constructor(private readonly configService: IConfigService) {
    this.PBD = configService.string('ORACLE_PDB').toUpperCase();
  }

  public async connect(): Promise<oracle.Connection> {
    try {
      this.connection = await oracle.getConnection({
        user: this.configService.string('ORACLE_USER'),
        password: this.configService.string('ORACLE_PWD'),
        connectString: this.configService.string('ORACLE_CONN_STRING'),
      });

      return this.connection;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async disconnect() {
    this.connection.close((error: oracle.DBError) => {
      throw new Error(error.message);
    });
  }

  public async insert<T>(
    table: string,
    args: string[],
    values: any[],
  ): Promise<OracleDB.Result<T>> {
    return this.connection.execute<T>(
      `INSERT INTO ${this.PBD}."${table}" (${
        args.length > 1 ? args.join(', ') : args[0]
      }) VALUES (${values.length > 1 ? values.join(', ') : values[0]})`,
    );
  }
}
