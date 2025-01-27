import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma';


export const { handlers, signIn, signOut, auth } = NextAuth({
  // IMPORTANT: Make sure this secret matches what you pass to getToken()
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      try {
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
          // Fetch the user from the database
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
          });

          if (dbUser) {
            // Add user details to the token
            token.id = dbUser.id;
            token.name = dbUser.name;
            token.role = dbUser.role;
          } else {
            // Fallback if the user is not found in the database
            token.id = user.id;
            token.name = user.name;
            token.role = user.role;
          }
        } catch (error) {
          console.error('Error fetching user in jwt callback:', error);
          // Fallback to the partial user data if something goes wrong
          token.id = user.id;
          token.name = user.name;
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Add user details to the session
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
