import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Giriş yapmalısınız' }, { status: 401 });
    }

    const [
      totalUsers,
      totalMembers,
      pendingApplications,
      upcomingEvents,
      totalEvents,
      totalAnnouncements,
      recentApplications,
      recentAttendances,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.membership.count({ where: { status: 'ACTIVE' } }),
      prisma.application.count({ where: { status: 'PENDING' } }),
      prisma.event.count({
        where: {
          date: { gte: new Date() },
          status: { in: ['PUBLISHED', 'REGISTRATION_OPEN'] },
        },
      }),
      prisma.event.count(),
      prisma.announcement.count(),
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.attendance.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true } },
          event: { select: { title: true } },
        },
      }),
    ]);

    const stats = {
      users: { total: totalUsers, members: totalMembers },
      applications: { pending: pendingApplications },
      events: { upcoming: upcomingEvents, total: totalEvents },
      announcements: { total: totalAnnouncements },
    };

    return NextResponse.json({
      success: true,
      stats,
      recentApplications,
      recentAttendances,
    });
  } catch (error) {
    console.error('[Dashboard GET]', error);
    return NextResponse.json({ success: false, error: 'Veriler yüklenemedi' }, { status: 500 });
  }
}