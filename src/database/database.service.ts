import OracleDB, * as oracle from 'oracledb';
import { IConfigService } from '../config/config.interface';
import { IDatabaseService } from './database.service.interface';

export type SQLArgs = string[] | string;
export type SQLValues = any[] | any;

export class DatabaseService implements IDatabaseService {
  private connection: oracle.Connection;
  private readonly PBD: string;

  constructor(private readonly configService: IConfigService) {
    this.PBD = configService.string('ORACLE_PDB').toUpperCase();
  }

  public async connect(): Promise<void> {
    try {
      this.connection = await oracle.getConnection({
        user: this.configService.string('ORACLE_USER'),
        password: this.configService.string('ORACLE_PWD'),
        connectString: this.configService.string('ORACLE_CONN_STRING'),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async disconnect() {
    this.connection.close((error: oracle.DBError) => {
      throw new Error(error.message);
    });
  }

  /**
   * Wraps arguments in quotes for database table insertion.
   *
   * This function is designed as an abstraction for inserting data into various tables
   * and is not dependent on the specific arguments passed. It ensures that each argument
   * is enclosed in double quotes for proper insertion into the database table.
   * @param {SQLArgs} args - The arguments to be enclosed in quotes.
   * @returns {SQLArgs} - An array of strings with arguments enclosed in quotes,
   *                                or a single string with the argument enclosed in quotes,
   *                                depending on the input type.
   * @example
   * const argsArray = ['Josh', 'Mia']; // Josh Mia
   * const arg = 'Nikita'; // Nikita
   * const wrapArray = wrapArgsInQuote(argsArray); // "Josh", "Mia"
   * const wrapString = wrapArgsInQuote(arg); // "Nikita"
   */
  private wrapAgsInQuotes(args: SQLArgs): SQLArgs {
    if (Array.isArray(args)) {
      return args.map((arg) => `"${arg}"`).join(', ');
    }

    if (typeof args === 'string' && args === '*') {
      return args;
    }

    return `"${args}"`;
  }

  /**
   * Prevents SQL injection by binding values to the query.
   *
   * To protect against SQL injections, you should not pass values directly. Instead, bind them to
   * the query, using only the index values of the provided values array.
   * @param {SQLValues} values - An array of values to bind to the query.
   * @returns {SQLValues} - Returns an array of variables associated with :args[index].
   *
   * @example
   * const values = [42, "Josh"];
   * const result = bindValuesToVars(values);
   * // Result will be an array of bound variables.
   */
  private bindValuesToVars(args: SQLValues): SQLArgs {
    if (Array.isArray(args)) {
      return args.map((arg) => `:${arg}`).join(', ');
    }

    return `:${args}`;
  }

  /**
   * Generates SQL WHERE clause conditions by binding arguments to variables to prevent SQL injection.
   *
   * This function takes an array of arguments and an array of values and generates a string
   * for use in SQL WHERE clauses to compare each argument with a corresponding value using
   * named placeholders like :arg1, :arg2, etc., to prevent SQL injection.
   *
   * @param {SQLArgs} args - An array of arguments to be used in the WHERE clause conditions.
   * @param {SQLValues} values - An array of values corresponding to the arguments.
   * @returns {SQLArgs} - A string containing SQL WHERE conditions with bound arguments.
   *
   * @example
   * const args = ['id', 'name'];
   * const values = [1, 'Darin'];
   * const whereClause = bindWhereArgsToVars(args, values);
   * // result: id = :id, name = :name
   */
  private bindWhereArgsToVars(args: SQLArgs, values: SQLValues): SQLArgs {
    if (Array.isArray(args) && Array.isArray(values)) {
      if (args.length === values.length) {
        return args
          .map((arg, index) => `"${arg}" = :arg${index + 1}`)
          .join(', ');
      }
      throw new Error(
        'you cannot pass different numbers of arguments and values',
      );
    }

    return `"${args}" = :arg1`;
  }

  private rewriteSnakeToCamelCase(
    obj: Record<string, any>,
  ): Record<string, any> {
    const res: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeCase = key;
        const camelCase = snakeCase.replace(/_([a-z])/g, (_, letter: string) =>
          letter.toUpperCase(),
        );
        res[camelCase] = obj[key];
      }
    }

    return res;
  }

  private cutNullValues<T extends object>(obj: T): T {
    const res = {};
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        continue;
      }

      res[key as string] = obj[key];
    }

    return this.rewriteSnakeToCamelCase(res) as T;
  }

  private rewriteCamelToSnake<T extends object>(obj: T): T {
    const snakeObj = {} as T;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key as keyof T as string;
        const snakeKey = camelKey.replace(
          /[A-Z]/g,
          (match) => `_${match.toLowerCase()}`,
        );
        snakeObj[snakeKey] = obj[key];
      }
    }

    return snakeObj;
  }

  public async insert<T extends object>(table: string, obj: T): Promise<T> {
    const toSnake = this.rewriteCamelToSnake<T>(obj);
    const args = this.wrapAgsInQuotes(Object.keys(toSnake));
    const bindValues = this.bindValuesToVars(Object.keys(toSnake));

    const values = [];
    for (const key in toSnake) {
      values.push(toSnake[key]);
    }

    const query = `INSERT INTO ${this.PBD}."${table}" (${args}) 
                  VALUES (${bindValues}) RETURN ("id") INTO :id`;
    const insertRes = await this.connection.execute(
      query,
      [...values, { type: oracle.NUMBER, dir: oracle.BIND_OUT }],
      { autoCommit: true },
    );

    const findRows = await this.where<T>(
      table,
      '*',
      'id',
      insertRes.outBinds[0],
    );

    return this.cutNullValues<T>(findRows.rows[0]);
  }

  public async selectAll<T extends object>(
    table: string,
    args: SQLArgs,
  ): Promise<OracleDB.Result<T>> {
    return this.connection.execute(
      `SELECT ${this.wrapAgsInQuotes(args)} FROM ${this.PBD}."${table}"`,
    );
  }

  public async where<T extends object>(
    table: string,
    args: SQLArgs,
    terms: SQLArgs,
    values: SQLValues,
  ): Promise<OracleDB.Result<T>> {
    return this.connection.execute(
      `SELECT ${this.wrapAgsInQuotes(args)} FROM ${
        this.PBD
      }."${table}" WHERE ${this.bindWhereArgsToVars(terms, values)}`,
      [...values],
      { outFormat: oracle.OUT_FORMAT_OBJECT },
    );
  }
}
