import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        code: { label: 'Code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
            include: {
              verificationCodes: {
                where: {
                  code: credentials.code,
                  expires: { gt: new Date(Date.now()) },
                },
              },
            },
          });

          if (!user || user.verificationCodes.length === 0) {
            return null;
          }

          // Delete the used code
          await prisma.verificationCode.deleteMany({
            where: {
              userId: user.id,
              code: credentials.code,
            },
          });

          return user;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
  callbacks: {
    signIn({ user }) {
      if (!user?.email) {
        return false;
      }

      try {
        console.log(`User ${user.email} is now active.`);
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (!user) {
        return token;
      }

      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            name: true,
            role: true,
            email: true, // So we can store it on token if needed
          },
        });

        if (dbUser) {
          return {
            ...token,
            id: dbUser.id,
            name: dbUser.name,
            role: dbUser.role,
          };
        }
      } catch (error) {
        console.error('Error in jwt callback:', error);
      }

      // Fallback to user data if database query fails
      return {
        ...token,
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      };
    },

    session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user, // Preserve existing properties
          id: token.id as string, // Assert type if necessary
          name: token.name as string, // Handle null/undefined
          role: token.role as string,
          email: token.email as string, // Assert type if necessary
        };
      }
      return session;
    },
  },
});
