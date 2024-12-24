import { DataSourceOptions, DataSource } from 'typeorm';
import * as entities from '@/app/lib/entities'; // Ensure the correct path

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD, // Use an empty string if no password is set
  database: process.env.POSTGRES_DATABASE,
  entities: entities,
  synchronize: false, // Always false in production
  ssl: {
    rejectUnauthorized: false,
  },
};

const AppDataSource = new DataSource(dataSourceOptions);

export { AppDataSource, dataSourceOptions };
