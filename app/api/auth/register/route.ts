import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const userData = await request.json();
  
  return NextResponse.json({
    success: true,
    token: 'mock-jwt-token',
    user: {
      id: '1',
      email: userData.email,
      name: userData.name,
      active: true
    }
  });
}