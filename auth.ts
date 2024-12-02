import NextAuth from 'next-auth';
import { TypeORMAdapter } from '@auth/typeorm-adapter';
import Mailgun from 'next-auth/providers/mailgun';
import {
  UserEntity,
  AccountEntity,
  SessionEntity,
  VerificationTokenEntity,
} from '@/app/lib/entities'; // Ensure the correct path

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: TypeORMAdapter({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, // Use an empty string if no password is set
    database: process.env.MYSQL_DATABASE,
    entities: [
      UserEntity,
      AccountEntity,
      SessionEntity,
      VerificationTokenEntity,
    ],
    synchronize: true, // Set to false in production
  }),
  providers: [
    Mailgun({
      apiKey: process.env.AUTH_MAILGUN_KEY,
      from: 'thought.kb@gmail.com',
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const mailgun = require('mailgun-js')({
          apiKey: server,
          domain: 'your-domain.com',
        });
        const data = {
          from,
          to: email,
          subject: 'Sign in to your account',
          text: `Sign in to your account by clicking on the following link: ${url}`,
        };
        return mailgun.messages().send(data);
      },
    }),
  ], // Add providers like Google, GitHub, etc.
});
