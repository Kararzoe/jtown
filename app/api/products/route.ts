import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'active',
        ...(category && category !== 'all' && { category }),
        ...(search && {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } }
          ]
        })
      },
      include: { seller: true },
      orderBy: { createdAt: 'desc' }
    });

    // Parse images JSON string
    const formattedProducts = products.map(product => ({
      ...product,
      images: JSON.parse(product.images)
    }));

    return NextResponse.json(formattedProducts);
  } catch {
    // Fallback to mock data
    const mockProducts = [
      {
        id: '1',
        title: 'iPhone 15 Pro Max',
        description: 'Latest iPhone with titanium design and A17 Pro chip',
        price: 1199,
        category: 'phones',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Apple Store', id: '1' }
      },
      {
        id: '2',
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android phone with S Pen and AI features',
        price: 1299,
        category: 'phones',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Samsung Store', id: '2' }
      },
      {
        id: '3',
        title: 'AirPods Pro 2',
        description: 'Wireless earbuds with active noise cancellation',
        price: 249,
        category: 'gadgets',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Apple Store', id: '1' }
      },
      {
        id: '4',
        title: 'iPad Air M2',
        description: 'Powerful tablet with M2 chip and Apple Pencil support',
        price: 599,
        category: 'gadgets',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Apple Store', id: '1' }
      },
      {
        id: '5',
        title: 'MacBook Air M3',
        description: 'Ultra-thin laptop with M3 chip and all-day battery',
        price: 1099,
        category: 'gadgets',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Apple Store', id: '1' }
      },
      {
        id: '6',
        title: 'Google Pixel 8 Pro',
        description: 'AI-powered Android phone with amazing camera',
        price: 999,
        category: 'phones',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Google Store', id: '3' }
      },
      {
        id: '7',
        title: 'Sony WH-1000XM5',
        description: 'Premium noise-canceling wireless headphones',
        price: 399,
        category: 'gadgets',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Sony Store', id: '4' }
      },
      {
        id: '8',
        title: 'Nintendo Switch OLED',
        description: 'Portable gaming console with vibrant OLED screen',
        price: 349,
        category: 'gadgets',
        images: ['/api/placeholder/400/300'],
        seller: { name: 'Nintendo Store', id: '5' }
      }
    ];
    return NextResponse.json(mockProducts);
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const product = await prisma.product.create({
      data: {
        ...data,
        sellerId: data.sellerId || '1' // Mock seller ID
      }
    });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}