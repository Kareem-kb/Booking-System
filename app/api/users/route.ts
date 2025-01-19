import { NextResponse } from 'next/server';
// import { AppDataSource } from '@/auth';
import prisma from '@/prisma';
import { Resend } from 'resend';
import sendWelcomeEmail from '@/app/components/emails/VerificationEmail';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

interface UserBody {
  name: string;
  email: string;
  role: 'admin' | 'partner' | 'client';
}

interface UserUpdate {
  id: number;
  updates: {
    [key: string]: string | number;
  };
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST: Create a new user
export async function POST(req: Request) {
  try {
    const body: UserBody = await req.json();
    const { name, email, role } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }

    // Create a new user
    const user = await prisma.user.create({
      data: { name, email, role },
    });

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'Kareem-kb <no-repl@kareem-kb.tech>',
      to: email,
      subject: 'Welcome',
      react: sendWelcomeEmail({ email, name }),
    });

    if (error) {
      console.error('Email sending error:', error);
      return NextResponse.json(
        { message: 'Failed to send welcome email' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: 'User registered successfully', data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error during user registration:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// export async function PUT(req: Request) {
//   const body: UserUpdate = await req.json();
//   const { id, updates } = body;

//   if (!id || !updates || Object.keys(updates).length === 0) {
//     return NextResponse.json(
//       { error: 'Missing required data' },
//       { status: 400 }
//     );
//   }

//   const allowedFields = ['name', 'email', 'role'];
//   const invalidFields = Object.keys(updates).filter(
//     (field) => !allowedFields.includes(field)
//   );

//   if (invalidFields.length > 0) {
//     return NextResponse.json(
//       { error: `Invalid fields: ${invalidFields.join(', ')}` },
//       { status: 400 }
//     );
//   }

//   try {
//     const userRepository = AppDataSource.getRepository(UserEntity);
//     await userRepository.update(id, updates);
//     return NextResponse.json(
//       { message: 'User updated successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json(
//       { error: 'Failed to update user' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: Request) {
//   const { id } = await req.json();
//   if (!id) {
//     return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//   }
//   try {
//     const userRepository = AppDataSource.getRepository(UserEntity);
//     await userRepository.delete(id);
//     return NextResponse.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete user' },
//       { status: 500 }
//     );
//   }
// }
