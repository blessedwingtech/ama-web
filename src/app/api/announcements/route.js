import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { initialAnnouncements } from '@/data/announcements';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    let announcements = [];

    if (process.env.DATABASE_URL) {
      try {
        announcements = await prisma.announcement.findMany({
          where: { isPublished: true },
          orderBy: [{ isUrgent: 'desc' }, { createdAt: 'desc' }],
        });
      } catch (dbErr) {
        console.warn('API Announcements: DB not reached or table empty, using seed fallback:', dbErr.message);
      }
    }

    if (!announcements || announcements.length === 0) {
      announcements = initialAnnouncements;
    }

    return NextResponse.json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.error('Erreur API Announcements GET:', error);
    return NextResponse.json(
      { success: false, announcements: initialAnnouncements, error: error.message },
      { status: 500 }
    );
  }
}
