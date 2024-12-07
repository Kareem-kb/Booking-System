import {
  UserEntity,
  AccountEntity,
  SessionEntity,
  VerificationTokenEntity,
} from '@/app/lib/entities'; // Ensure the correct path
import { DataSourceOptions, DataSource } from 'typeorm';
import mysql from 'mysql2';

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, // Use an empty string if no password is set
  database: process.env.MYSQL_DATABASE,
  entities: [UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity],
  synchronize: false, // Set to false in production
  driver: mysql,
};

const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export { dataSourceOptions, AppDataSource }; // Export the DataSource for use in other parts of the application
