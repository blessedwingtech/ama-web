import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { photoGallery, audioRecordings } from '@/data/media';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    let photos = [];
    let audios = [];

    if (process.env.DATABASE_URL) {
      try {
        [photos, audios] = await Promise.all([
          prisma.galleryPhoto.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
          }),
          prisma.audioRecording.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
          }),
        ]);
      } catch (dbErr) {
        console.warn('API Media GET: DB not reached or tables initializing:', dbErr.message);
      }
    }

    // Use initial seed if database is empty initially
    if (!photos || photos.length === 0) {
      photos = photoGallery;
    }
    if (!audios || audios.length === 0) {
      audios = audioRecordings;
    }

    return NextResponse.json({
      success: true,
      photos,
      audios,
    });
  } catch (error) {
    console.error('Erreur API Media GET:', error);
    return NextResponse.json({
      success: false,
      photos: photoGallery,
      audios: audioRecordings,
      error: error.message,
    });
  }
}
