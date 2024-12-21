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

// import NextAuth from 'next-auth';
// import Google from 'next-auth/providers/google';
// import Resend from 'next-auth/providers/resend';
// import { TypeORMAdapter } from '@auth/typeorm-adapter';
// import { AppDataSource, dataSourceOptions } from '@/app/lib/db';
// import * as entities from '@/app/lib/entities';

// // Initialize the database connection globally
// if (!AppDataSource.isInitialized) {
//   AppDataSource.initialize()
//     .then(() => console.log('Data Source has been initialized!'))
//     .catch((err) => {
//       console.error('Error during Data Source initialization:', err);
//       process.exit(1); // Exit the process if the database connection fails
//     });
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   secret: process.env.AUTH_SECRET!,

//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Resend({
//       apiKey: process.env.RESEND_API_KEY!,
//       from: process.env.RESEND_FROM_EMAIL, // Use environment variables
//     }),
//   ],
//   adapter: TypeORMAdapter(dataSourceOptions, { entities }),
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     /**
//      * signIn callback: Mark user as active in DB.
//      * Return true if successful, false otherwise.
//      */
//     async signIn({ user }) {
//       try {
//         const userRepository = AppDataSource.getRepository('users');
//         await userRepository.update({ id: user.id }, { is_active: true });
//         console.log(`User ${user.email} is now active.`);
//         console.log('User during signIn:', user);
//         return true;
//       } catch (error) {
//         console.error('Error activating user:', error);
//         return false;
//       }
//     },

//     /**
//      * jwt callback: Runs when creating or updating the JWT.
//      * The 'user' is available on first sign-in or if account data changes.
//      * We do a DB lookup to ensure we get the full user record (role, email, etc.).
//      */
//     async jwt({ token, user }) {
//       // If 'user' is provided, it's a sign-in or account update event.
//       // We fetch the DB user to ensure we get the latest fields (role, email, etc.).
//       if (user) {
//         try {
//           const userRepository = AppDataSource.getRepository('users');
//           const dbUser = await userRepository.findOne({
//             where: { id: user.id },
//           });

//           if (dbUser) {
//             token.id = dbUser.id;
//             token.name = dbUser.name;
//             token.role = dbUser.role;
//           } else {
//             // Fallback if not found in DB for some reason
//             token.id = user.id;
//             token.name = user.name;
//             token.role = user.role;
//           }
//         } catch (error) {
//           console.error('Error fetching user in jwt callback:', error);
//           // If something goes wrong, fall back to the partial user data
//           token.id = user.id;
//           token.name = user.name;
//           token.role = user.role;
//         }
//       }

//       // Token now includes user.id, user.email, user.role if available
//       console.log('Token during jwt:', token);
//       return token;
//     },

//     /**
//      * session callback: Add token data to the session object.
//      * This runs whenever a session is checked, so we can put the user's
//      * ID, email, and role into session.user.
//      */
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//       }
//       console.log('Session during session:', session);
//       return session;
//     },

//     /**
//      * redirect callback: Where to redirect the user after login/logout.
//      */
//     // async redirect({ baseUrl, url }) {
//     //   // If the URL is relative (startsWith baseUrl), let it go there
//     //   // Otherwise, send them to a default route (e.g. /dashboard)
//     //   return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
//     // },
//   },
// });

// export { dataSourceOptions, AppDataSource };
