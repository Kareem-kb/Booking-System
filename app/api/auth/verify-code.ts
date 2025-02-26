// /pages/api/auth/verify-code.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma';
import { getSessionTokenFor } from '@/helperFns/authHelpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, code } = req.body;

    const verification = await prisma.verificationCode.findFirst({
      where: {
        code,
        expires: { gt: new Date() },
        userId: (await prisma.user.findUnique({ where: { email } }))?.id ?? '',
      },
    });

    if (!verification) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    // Code is correct, so we can delete it or mark it used
    await prisma.verificationCode.delete({ where: { id: verification.id } });

    // Generate a session token or NextAuth session
    // For a NextAuth approach you might:
    // - programmatically sign the user in, or
    // - return a token. Then store it in a cookie that lasts 3 days.

    const sessionToken = await getSessionTokenFor(email);

    // Let’s just respond with a success and maybe a token
    return res.status(200).json({ success: true, sessionToken });
  } catch (error) {
    console.error('Error verifying code:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
