import OracleDB from 'oracledb';

export interface IDatabaseService {
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
  insert<T extends object>(
    table: string,
    entity: T,
    returnParam?: string,
  ): Promise<T>;

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
   * @returns {Promise<T>} A promise that resolves to the newly get objects.
   *
   * @example
   * const admins = await selectAll<User>('users', { userRole: 'admin' }, { id: 0 });
   * // [ id: 12, id: 99, id: 34 ];
   */
  selectAll<T extends object>(
    table: string,
    where?: T,
    returnFields?: T,
  ): Promise<T[]>;

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
   * @returns {Promise<T>} - A promise that resolves to the newly get object.
   *
   * @example
   * const customer = await selectOne('users', { id: 1, role: 'customer' });
   * // { id: 1, name: 'Joi', age: 22, role: 'customer' }
   */
  selectOne<T extends object>(
    table: string,
    where: T,
    returnFields?: T,
  ): Promise<T>;

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
  execute<T>(
    sql: string,
    bindParams: OracleDB.BindParameters,
    option: OracleDB.ExecuteOptions,
  ): Promise<OracleDB.Result<T>>;
}
