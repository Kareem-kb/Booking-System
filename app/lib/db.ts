import { DataSourceOptions, DataSource } from 'typeorm';
import * as entities from '@/app/lib/entities'; // Ensure the correct path
import mysql2 from 'mysql2';

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, // Use an empty string if no password is set
  database: process.env.MYSQL_DATABASE,
  entities: entities,
  synchronize: false, // Always false in production
  driver: mysql2,
};

const AppDataSource = new DataSource(dataSourceOptions);

export { AppDataSource, dataSourceOptions };
