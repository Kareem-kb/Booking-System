// app/lib/auth-helpers.ts

import { Resend } from 'resend';
import { SignJWT } from 'jose';

const resend = new Resend(process.env.RESEND_API_KEY);

export function generate6DigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendEmail(email: string, code: string) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: email,
      subject: 'Your login code',
      html: `<p>Your login code is: <strong>${code}</strong></p><p>This code will expire in 15 minutes.</p>`,
    });
    return {
      message: 'Email sent successfully',
    };
  } catch (error) {
    return {
      error: 'Failed to send email',
    };
  }
}

export async function getSessionTokenFor(email: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('3d')
    .sign(secret);
  return token;
}
