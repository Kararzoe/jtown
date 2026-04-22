import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Mock upload - in production, upload to cloud storage
  const mockUrl = `/api/placeholder/400/300?text=${encodeURIComponent(file.name)}`;
  
  return NextResponse.json({ 
    url: mockUrl,
    filename: file.name 
  });
}