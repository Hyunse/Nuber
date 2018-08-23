import { ConnectionOptions } from 'typeorm';

const connectionOptions : ConnectionOptions = {
  type: 'postgres',
  database: 'nuber',
  synchronize: true,
  logging: true,
  entities: ['entitites/**/*.*'],
  host: process.env.DB_ENDPOINT || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'mypostgres'
};

export default connectionOptions;