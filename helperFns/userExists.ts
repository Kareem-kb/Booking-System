import prisma from '@/prisma';

export async function userExists(
  email: string
): Promise<{ id: string } | null> {
  const user = await prisma.user.findFirst({ where: { email } });
  return user ? { id: user.id } : null;
}
