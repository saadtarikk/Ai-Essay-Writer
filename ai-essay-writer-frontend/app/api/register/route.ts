import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      name,
      email,
      password,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Registration failed' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}