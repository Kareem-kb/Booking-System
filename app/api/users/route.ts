import { NextResponse } from 'next/server';
import { AppDataSource } from '@/app/lib/db';
import { UserEntity } from '@/app/lib/entities';

interface UserBody {
  name: string;
  email: string;
  password_hash: string;
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
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(UserEntity);
    const users = await userRepository.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body: UserBody = await req.json();
  const { name, email, password_hash, role } = body;
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(UserEntity);
    const newUser = userRepository.create({
      name,
      email,
      password_hash,
      role,
    });
    const result = await userRepository.save(newUser);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body: UserUpdate = await req.json();
  const { id, updates } = body;

  if (!id || !updates || Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: 'Missing required data' },
      { status: 400 }
    );
  }

  const allowedFields = ['first_name', 'last_name', 'email', 'role'];
  const invalidFields = Object.keys(updates).filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return NextResponse.json(
      { error: `Invalid fields: ${invalidFields.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(UserEntity);
    await userRepository.update(id, updates);
    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(UserEntity);
    await userRepository.delete(id);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
