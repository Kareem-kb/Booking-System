import prisma from '@/prisma';

export async function createUser(email: string, name: string, role: string) {
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
