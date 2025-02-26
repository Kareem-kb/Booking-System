// app/api/auth/send-code/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma';
import { generate6DigitCode, sendEmail } from '@/helperFns/authHelpers';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const code = generate6DigitCode();
    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    await sendEmail(email, code);

    return NextResponse.json({ message: 'Code sent successfully' });
  } catch (error) {
    console.error('Error sending code:', error);
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
  }
}
