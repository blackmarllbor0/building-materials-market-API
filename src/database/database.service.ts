import * as oracle from 'oracledb';
import { IConfigService } from '../config/config.interface';
import { IDatabaseService } from './database.service.interface';

export type SQLArgs = string[] | string;
export type SQLValues = any[] | any;
export interface OffsetLimit {
  offset?: number;
  limit?: number;
}

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
      return args
        .map((arg, ind) => `:${arg}`.substring(0, 5) + ind.toString())
        .join(', ');
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
   * @returns {SQLArgs} - A string containing SQL WHERE conditions with bound arguments.
   *
   * @example
   * const args = ['id', 'name'];
   * const values = [1, 'Darin'];
   * const whereClause = bindWhereArgsToVars(args, values);
   * // result: id = :id, name = :name
   */
  private bindWhereArgsToVars(
    terms: SQLArgs,
    andStatement: boolean = false,
  ): SQLArgs {
    if (Array.isArray(terms)) {
      return !andStatement
        ? terms.map((term, index) => `"${term}" = :arg${index}`).join(', ')
        : terms.map((term, index) => `"${term}" = :arg${index}`).join(' AND ');
    }

    return `"${terms}" = :arg_${1}`;
  }

  private rewriteSnakeToCamelCase<T extends object>(entity: T | T[]): T | T[] {
    if (Array.isArray(entity)) {
      return entity.map((obj) => this.rewriteSnakeToCamelCase(obj)) as T[];
    }

    const res = {};
    for (const key in entity) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        const snakeCase = key;
        const camelCase = snakeCase.replace(/_([a-z])/g, (_, letter: string) =>
          letter.toUpperCase(),
        );
        res[camelCase] = entity[key];
      }
    }

    return res as T;
  }

  private rewriteCamelToSnakeCase<T extends object>(entity: T | T[]): T | T[] {
    if (Array.isArray(entity)) {
      return entity.map((obj) => this.rewriteCamelToSnakeCase(obj)) as T[];
    }

    const snakeObj = {};

    for (const key in entity) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        const camelKey = key as keyof T as string;
        const snakeKey = camelKey.replace(
          /[A-Z]/g,
          (match) => `_${match.toLowerCase()}`,
        );
        snakeObj[snakeKey] = entity[key];
      }
    }

    return snakeObj as T;
  }

  private cutNullValues<T extends object>(entity: T | T[]): T | T[] {
    if (Array.isArray(entity)) {
      return entity.map((obj) => this.cutNullValues(obj)) as T[];
    }

    const res = {};

    for (const key in entity) {
      if (entity[key] === null || entity[key] === undefined) {
        continue;
      }

      res[key as string] = entity[key];
    }

    return res as T;
  }

  private async oracleLobToString(lob: oracle.Lob | object): Promise<string> {
    if ('getData' in lob) {
      return (await lob.getData()) as string;
    }
  }

  /**
   * Inserts a new record into a database table.
   *
   * This function inserts a new record into the specified database table using the provided entity
   * data, which must strictly comply with the table structure. You can also specify a unique key
   * (e.g., PRIMARY KEY) to retrieve the result, with 'id' as the default key.
   *
   * @param {string} table - The name of the database table to insert the record into.
   * @param {T} entity - The data to be written to the table. It should strictly match the table's structure.
   * @param returnParam - (Optional) Specify a unique key (e.g., PRIMARY KEY) to retrieve the result.
   *                             The default key is 'id'.
   * @returns {Promise<T>} A promise that resolves to the newly created object.
   *
   * @example
   * const user: User = {
   *   name: "Josh",
   *   age: 23,
   * };
   *
   * const insertRecord = await insert<User>('users', user, 'name');
   * // insertedRecord will contain the newly created user object.
   */
  public async insert<T extends object>(
    table: string,
    entity: T,
    returnParam = 'id',
  ): Promise<T> {
    const toSnake = this.rewriteCamelToSnakeCase<T>(entity);
    const args = this.wrapAgsInQuotes(Object.keys(toSnake));
    const bindValues = this.bindValuesToVars(Object.keys(toSnake));

    const values = [];
    for (const key in toSnake) {
      values.push(toSnake[key]);
    }

    const query = `INSERT INTO ${this.PBD}."${table}" (${args}) 
                  VALUES (${bindValues}) RETURN ("${returnParam}") INTO :id`;
    const insertRes = await this.connection.execute(
      query,
      [...values, { dir: oracle.BIND_OUT }],
      { autoCommit: true },
    );

    const res = await this.selectOne<T>(table, {
      [returnParam]: insertRes.outBinds[0][0],
    } as T);

    return res;
  }

  /**
   * Retrieves multiple records from a database table.
   *
   * This function retrieves records from the specified database table based on optional filtering
   * criteria provided in the 'where' object and returns only the specified fields as specified in
   * the 'returnFields' object. If no 'where' object is provided, all records from the table are
   * retrieved
   *
   * @param {string} table - The name of the database table to retrieve records from.
   * @param {T} where - (Optional) An object with parameters for data filtering and sorting.
   * @param returnFields - (Optional) An object specifying the fields to return. Set fields to null
   *                         to exclude them from the result.
   *
   * @example
   * const admins = await selectAll<User>('users', { userRole: 'admin' }, { id: 0 });
   * // [ id: 12, id: 99, id: 34 ];
   */
  public async selectAll<T extends object>(
    table: string,
    where?: T,
    returnFields?: T,
    limitOffset?: OffsetLimit,
  ): Promise<T[]> {
    let query: string = `SELECT * FROM ${this.PBD}."${table}"`;
    const values: any[] = [];
    if (returnFields) {
      const toSnake = this.rewriteCamelToSnakeCase<T>(returnFields);
      const args = this.wrapAgsInQuotes(Object.keys(toSnake));
      query = `SELECT ${args} FROM ${this.PBD}."${table}"`;
    }

    if (where) {
      const toSnake = this.rewriteCamelToSnakeCase<T>(where);
      const args = Object.keys(toSnake);
      const bindWhereVars = this.bindWhereArgsToVars(args, true);

      for (const key in toSnake) {
        values.push(toSnake[key]);
      }
      query += ` WHERE ${bindWhereVars}`;
    }

    if (limitOffset && limitOffset.limit && limitOffset.offset) {
      query += ` OFFSET ${limitOffset.offset}
       ROWS FETCH NEXT ${limitOffset.limit} ROWS ONLY`;
    }

    if (limitOffset && !limitOffset.limit && limitOffset.offset) {
      query += ` OFFSET ${limitOffset.offset} ROWS`;
    }

    const selectRes = await this.connection.execute<T>(query, [...values], {
      outFormat: oracle.OUT_FORMAT_OBJECT,
      maxRows:
        limitOffset && limitOffset.limit && !limitOffset.offset
          ? +limitOffset.limit
          : 0,
    });

    const camelCase = this.rewriteSnakeToCamelCase<T>(selectRes.rows) as T[];

    for (const obj of camelCase) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const elem = obj[key];
          let value: string;
          if (typeof elem === 'object' && !(elem instanceof Date) && elem) {
            value = await this.oracleLobToString(elem);

            if (value) {
              obj[key] = value as any;
            }
          }
        }
      }
    }

    return this.cutNullValues<T>(camelCase) as T[];
  }

  /**
   * Retrieves a single record from a database table based on specified criteria.
   *
   * This function retrieves a single record from the specified database table based on the provided
   * criteria in the 'where' object. You can also specify which fields to return in the result using
   * the 'return Fields' object.
   *
   * @param {string} table - The name of the database table to retrieve the record from.
   * @param {T} where - An object with criteria to filter and select the record
   * @param {T} returnFields - (Optional) An object specifying the fields to return. Set fields to null
   *                         to exclude them from the result.
   *
   * @example
   * const customer = await selectOne('users', { id: 1, role: 'customer' });
   * // { id: 1, name: 'Joi', age: 22, role: 'customer' }
   */
  public async selectOne<T extends object>(
    table: string,
    where: T,
    returnFields?: T,
  ): Promise<T> {
    const res = await this.selectAll<T>(table, where, returnFields);
    return res[0];
  }

  /**
   * Updates a record in a database table based on specified criteria.
   *
   * This function updates a record in the specified database table with the provided updatedEntity,
   * using the criteria specified in the 'where' object. You can also specify the 'returnParam' to
   * determine the field to return in the result. It returns the updated record.
   *
   * @param {string} table - The name of the database table to update the record in.
   * @param {T} updatedEntity - The data representing the updated record.
   * @param {T} where - The criteria for identifying the record to be updated.
   * @param {string} returnParam - (Optional) The field to return in the result. Default is 'id'.
   * @returns {Promise<T>} - A promise that resolves to the updated record.
   *
   * @example
   * // Update a user's information based on their unique identifier (id).
   * const updatedUserInfo = {
   *   id: 123,
   *   name: 'Updated Name',
   *   email: 'updated@email.com',
   * };
   * const criteria = { id: 123 };
   * const updatedUser = await update('users', updatedUserInfo, criteria);
   * // updatedUser will contain the updated user record.
   */
  public async update<T extends object>(
    table: string,
    updatedEntity: T,
    where: T,
    returnParam: string = 'id',
  ): Promise<T> {
    const updatedEntityToSnake = this.rewriteCamelToSnakeCase<T>(
      this.cutNullValues(updatedEntity),
    );
    const updatedArgs = Object.keys(updatedEntityToSnake);
    const bindUpdatedValues = this.bindWhereArgsToVars(updatedArgs);

    const updatedValues: any[] = [];
    for (const key in updatedEntityToSnake) {
      updatedValues.push(updatedEntityToSnake[key]);
    }

    const whereToSnake = this.rewriteCamelToSnakeCase<T>(where);
    const whereArgs = Object.keys(whereToSnake);
    const bindWhereValues = this.bindWhereArgsToVars(whereArgs, true);

    const whereValues: any[] = [];
    for (const key in whereToSnake) {
      whereValues.push(whereToSnake[key]);
    }

    const query = `UPDATE ${this.PBD}."${table}" SET ${bindUpdatedValues}
               WHERE ${bindWhereValues} RETURN ("${returnParam}") INTO :return_param`;

    const updatedResult = await this.connection.execute<T>(
      query,
      [...updatedValues, ...whereValues, { dir: oracle.BIND_OUT }],
      {
        outFormat: oracle.OUT_FORMAT_OBJECT,
        autoCommit: true,
      },
    );

    const res = await this.selectOne<T>(table, {
      [returnParam]: updatedResult.outBinds[0][0],
    } as T);

    return res;
  }

  /**
   * Executes an SQL query with bound parameters and specified options.
   *
   * This function executes an SQL query with the provided SQL statement, bound parameters, and
   * execution options. It returns a promise that resolves to the result of the query, including
   * any fetched rows or metadata.
   *
   * @param {string} sql - The SQL statement to execute.
   * @param {OracleDB.BindParameters} bindParams - An object containing the bound parameters for the query.
   * @param {OracleDB.ExecuteManyOptions} option - Options for executing the query.
   * @returns {Promise<OracleDB.Result<T>>} - A promise that resolves to the result of the query.
   *
   * @example
   * const sqlQuery = 'SELECT * FROM users WHERE id = :userId';
   * const parameters = { userId: 123 };
   * const executionOptions = { autoCommit: true };
   *
   * const queryResult = await execute(sqlQuery, parameters, executionOptions);
   * // queryResult will contain the result of the SQL query.
   */
  public async execute<T>(
    sql: string,
    bindParams: oracle.BindParameters,
    option: oracle.ExecuteOptions,
  ): Promise<oracle.Result<T>> {
    return this.connection.execute<T>(sql, bindParams, option);
  }
}
