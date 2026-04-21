import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Giriş yapmalısınız' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        memberships: {
          include: {
            user: { select: { name: true } },
          },
        },
        applications: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        _count: {
          select: { attendances: true },
        },
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('[Me GET]', error);
    return NextResponse.json({ success: false, error: 'Veri yüklenemedi' }, { status: 500 });
  }
}