// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string; // Add the role property to the User type
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role?: string; // Include role in the session user object
    };
  }
}
