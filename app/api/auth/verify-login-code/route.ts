import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, code } = await request.json();
  
  return NextResponse.json({
    success: true,
    token: 'mock-jwt-token',
    user: {
      id: '1',
      email,
      name: 'Test User',
      active: true
    }
  });
}