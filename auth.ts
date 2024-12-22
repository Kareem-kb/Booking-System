import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import Google from 'next-auth/providers/google';
import { TypeORMAdapter } from '@auth/typeorm-adapter';
import { AppDataSource, dataSourceOptions } from '@/app/lib/db';
import * as entities from '@/app/lib/entities';

// Initialize the DB connection if not already.
if (!AppDataSource.isInitialized) {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
      process.exit(1);
    });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // IMPORTANT: Make sure this secret matches what you pass to getToken()
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.RESEND_FROM_EMAIL!,
    }),
  ],
  adapter: TypeORMAdapter(dataSourceOptions, { entities }),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
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
    async jwt({ token, user }) {
      if (user) {
        try {
          const userRepository = AppDataSource.getRepository('users');
          const dbUser = await userRepository.findOne({
            where: { id: user.id },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.name = dbUser.name;
            token.role = dbUser.role;
          } else {
            // Fallback if not found in DB for some reason
            token.id = user.id;
            token.name = user.name;
            token.role = user.role;
          }
        } catch (error) {
          console.error('Error fetching user in jwt callback:', error);
          // If something goes wrong, fall back to the partial user data
          token.id = user.id;
          token.name = user.name;
          token.role = user.role;
        }
      }
      // Token now includes user.id, user.email, user.role if available
      console.log('Token during jwt:', token);
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      console.log('Session during session:', session);
      return session;
    },
  },
});

export { dataSourceOptions, AppDataSource };
