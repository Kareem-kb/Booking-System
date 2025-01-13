import prisma from '@/prisma';
import { Role } from '@prisma/client';

export async function createUser(email: string, name: string, role: Role) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
