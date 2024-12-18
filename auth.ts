import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { TypeORMAdapter } from '@auth/typeorm-adapter';
import { AppDataSource, dataSourceOptions } from '@/app/lib/db';
import * as entities from '@/app/lib/entities';

// Initialize the database connection globally
AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
    process.exit(1); // Exit the process if the database connection fails
  });

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.RESEND_FROM_EMAIL, // Use environment variables
    }),
  ],
  adapter: TypeORMAdapter(dataSourceOptions, { entities }),
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.role = user.role; // Include role in the session
      }
      return session;
    },
    async signIn({ user }): Promise<boolean> {
      try {
        const userRepository = AppDataSource.getRepository('users');
        await userRepository.update({ id: user.id }, { is_active: true });
        console.log(`User ${user.email} is now active.`);
        return true;
      } catch (error) {
        console.error('Error activating user:', error);
        return false;
      }
    },
    // Redirect based on role
    async redirect({ baseUrl, url }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
  },
});

export { dataSourceOptions, AppDataSource };
