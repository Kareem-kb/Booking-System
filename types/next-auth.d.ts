// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string; // Match NextAuth's nullability
      email?: string;
      role?: string; // Custom property
    } & DefaultSession['user']; // Merge with default
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string; // Optional to match reality
    name?: string | null;
    email?: string | null;
    role?: string; // Custom property
  }
}
