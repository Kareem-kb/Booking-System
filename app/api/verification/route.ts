// import { NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';
// import EmailTemplate from '@/app/components/emails/welcome-temp';

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   // body of our request - to be sent from the Client-side in our form above
//   const { name, email } = body;

//   // Check if the required fields are present
//   if (!name || !email) {
//     return NextResponse.json(
//       { error: 'Missing required fields' },
//       { status: 400 }
//     );
//   }

//   // resend declaration with API key as parameter
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   try {
//     // resend function handler for executing email sending
//     // returning data and error state to indicate success and failure respecfully
//     const { data, error } = await resend.emails.send({
//       from: `Acme <onboarding@resend.dev>`, //Title of our Email, here, our email will indicate Imam - Portfolio and the <info@eimaam.dev> will be the sending address. NB: `eimaam.dev` replace with your registered domain
//       to: email, // email receiver, // in case where you are sending onboarding emails, this field will be dynamic, it will be the email of the User
//       subject: 'first verification email',
//       react: EmailTemplate(name), //using our custom react component to render email content/body
//     });

//     if (error) {
//       return NextResponse.json(
//         { message: 'Email sending failed', error },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'Email sent successfully', data },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { message: 'Failed to send email', error },
//       { status: 500 }
//     );
//   }
// }
