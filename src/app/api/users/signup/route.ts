import { NextResponse } from 'next/server';
import { connectDB } from '@/dbconfig/db';
import { User } from '@/models/user';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json(
      { error: 'Email already exists' }, 
      { status: 400 }
    );

    const user = new User({ email, password });
    await user.save();

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' }, 
      { status: 500 }
    );
  }
}