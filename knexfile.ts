import type { Knex } from 'knex';
import { configDotenv } from 'dotenv';

configDotenv({ path: './.env' });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'oracledb',
    connection: {
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PWD,
      connectString: process.env.ORACLE_CONN_STRING,
    },
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
};

export default config;
