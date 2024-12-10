// app/actions/userActions.ts
'use server';

// import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';
// import { Resend } from 'resend';
// import EmailTemplate from '@/app/components/emails/welcome-temp';
interface createUserForm {
  role: string;
  name: string;
  email: string;
}
export default async function createUser(formData: createUserForm) {
  const result = await signIn('resend', {
    email: formData.email,
    name: formData.name,
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }),
  });
  // const resend = new Resend(process.env.RESEND_API_KEY);

  // try {
  //   // resend function handler for executing email sending
  //   // returning data and error state to indicate success and failure respecfully
  //   const { data, error } = await resend.emails.send({
  //     from: `Acme <onboarding@resend.dev>`, //Title of our Email, here, our email will indicate Imam - Portfolio and the <info@eimaam.dev> will be the sending address. NB: `eimaam.dev` replace with your registered domain
  //     to: formData.email, // email receiver, // in case where you are sending onboarding emails, this field will be dynamic, it will be the email of the User
  //     subject: 'first verification email',
  //     react: EmailTemplate(formData.name), //using our custom react component to render email content/body
  //   });
  //   return NextResponse.json(
  //     { message: 'Email sent successfully', data },
  //     { status: 200 }
  //   );
  // } catch (error) {
  //   console.log('user created', error);
  //   return NextResponse.json(
  //     { message: 'Failed to send email', error },

  //     { status: 500 }
  //   );
  // }
}
