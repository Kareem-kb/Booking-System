import { DataSource } from 'typeorm';
import {
  UserEntity,
  AccountEntity,
  SessionEntity,
  VerificationTokenEntity,
} from '@/app/lib/entities'; // Ensure the correct path

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD, // Use an empty string if no password is set
  database: process.env.DATABASE_NAME,
  entities: [UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity],
  synchronize: true, // Set to false to prevent altering existing table structure
  driver: require('mysql2'),
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default dataSource;
