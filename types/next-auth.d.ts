// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null; // Match NextAuth's nullability
      email?: string | null;
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
