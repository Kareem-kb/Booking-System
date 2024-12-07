import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { TypeORMAdapter } from '@auth/typeorm-adapter';
import { DataSourceOptions, DataSource } from 'typeorm';
import mysql2 from 'mysql2';
import * as entities from '@/app/lib/entities'; // Ensure the correct path

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, // Use an empty string if no password is set
  database: process.env.MYSQL_DATABASE,
  entities: entities,
  synchronize: false, // Set to false in production
  driver: mysql2,
};

const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: TypeORMAdapter(dataSourceOptions, { entities }),
});

export { dataSourceOptions, AppDataSource }; // Export the DataSource for use in other parts of the application
