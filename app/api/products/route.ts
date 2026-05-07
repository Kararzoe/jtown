import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'newest';

    const where: any = { status: 'active' };
    if (category && category !== 'all') where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }

    const orderBy: any = sort === 'price_asc' ? { price: 'asc' }
      : sort === 'price_desc' ? { price: 'desc' }
      : sort === 'popular' ? { views: 'desc' }
      : { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { seller: { select: { id: true, name: true, avatar: true } } },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where })
    ]);

    const formatted = products.map(p => ({ ...p, images: JSON.parse(p.images) }));

    return NextResponse.json({ products: formatted, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ products: [], total: 0, page: 1, pages: 0 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    if (!data.title || !data.price || !data.category) {
      return NextResponse.json({ error: 'Title, price, and category are required' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description || '',
        price: data.price,
        category: data.category,
        images: JSON.stringify(data.images || []),
        stock: data.stock || 1,
        sellerId: userId,
      }
    });

    return NextResponse.json({ ...product, images: JSON.parse(product.images) });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
