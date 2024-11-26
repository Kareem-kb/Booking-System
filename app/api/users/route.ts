import { NextResponse } from 'next/server';
import executeQuery from '@/app/lib/db';
import bcrypt from 'bcrypt';

interface userBody {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'partner' | 'client';
}

interface userUpdate {
  id: number;
  updates: {
    [key: string]: string | number;
  };
}

export async function GET() {
  try {
    const users = await executeQuery({
      query: 'SELECT * FROM users',
      values: [],
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body: userBody = await req.json();
  const { first_name, last_name, email, password_hash, role } = body;
  try {
    const users = await executeQuery({
      query:
        'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      values: [first_name, last_name, email, password_hash, role],
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to post users' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body: userUpdate = await req.json();
  const { id, updates } = body;

  // Validate input
  if (!id || !updates || Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: 'Missing required data' },
      { status: 400 }
    );
  }

  // Validate fields
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
    const setClause = Object.keys(updates)
      .map((field) => `${field} = ?`)
      .join(', ');

    const values = [...Object.values(updates), id];

    const result = await executeQuery({
      query: `UPDATE users SET ${setClause} WHERE id = ?`,
      values: values,
    });

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

export async function DELETE() {
  try {
    const users = await executeQuery({
      query: "DELETE FROM users WHERE id = '1'",
      values: [],
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
