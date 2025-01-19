import { PrismaClient } from '@prisma/client';

// Declare a global variable to store the PrismaClient instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const prisma = global.prisma || new PrismaClient();

// In development, reuse the same instance to avoid connection exhaustion
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;
