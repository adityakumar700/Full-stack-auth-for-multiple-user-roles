import { NextResponse } from 'next/server';
import { connectDB } from '@/dbconfig/db';
import { User } from '@/models/user';
import { generateToken } from '@/helpers/auth';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json(
      { error: 'User not found' }, 
      { status: 404 }
    );

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return NextResponse.json(
      { error: 'Invalid credentials' }, 
      { status: 401 }
    );

    const token = generateToken(user);
    const response = NextResponse.json({ role: user.role });
    response.cookies.set('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' }, 
      { status: 500 }
    );
  }
}