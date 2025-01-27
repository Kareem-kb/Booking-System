import prisma from '@/prisma';

export async function userExists(email: string): Promise<boolean> {
  const user = await prisma.user.findFirst({ where: { email } });

  return user !== null;
}
