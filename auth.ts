import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
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
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: 'Acme <onboarding@resend.dev>',
    }),
  ],
  adapter: TypeORMAdapter(dataSourceOptions, { entities }),
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/signin',
    verifyRequest: '/en/verification',
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
    async signIn({ user }) {
      // Update the is_active field in the database
      const AppDataSource = new DataSource(dataSourceOptions); // Ensure your data source is imported correctly
      const userRepository = AppDataSource.getRepository('users'); // Replace 'User' with your user entity name
      try {
        await AppDataSource.initialize(); // Ensure data source is initialized
        await userRepository.update({ id: user.id }, { is_active: true });
        console.log(`User ${user.email} is now active.`);
      } catch (error) {
        console.error('Error updating user is_active:', error);
      } finally {
        await AppDataSource.destroy(); // Close the connection after updating
      }
      return true; // Allow the sign-in to continue
    },
  },
});

export { dataSourceOptions, AppDataSource }; // Export the DataSource for use in other parts of the application
