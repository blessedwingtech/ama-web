import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { periodicReports } from '@/data/reports';
import { initialAnnouncements } from '@/data/announcements';
import { photoGallery, audioRecordings } from '@/data/media';

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'AMA2025*Admin';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { authKey } = body;

    if (!authKey || authKey !== ADMIN_KEY) {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé. Clé d’administration incorrecte.' },
        { status: 401 }
      );
    }

    let contacts = [];
    let prayers = [];
    let memberships = [];
    let donations = [];
    let subscribers = [];
    let reports = [];
    let announcements = [];
    let photos = [];
    let audios = [];
    let siteStats = null;

    if (process.env.DATABASE_URL) {
      try {
        [contacts, prayers, memberships, donations, subscribers, reports, announcements, photos, audios, siteStats] = await Promise.all([
          prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.prayerRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.membershipApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.donationIntent.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.report.findMany({ orderBy: [{ year: 'desc' }, { createdAt: 'desc' }] }),
          prisma.announcement.findMany({ orderBy: [{ isUrgent: 'desc' }, { createdAt: 'desc' }] }),
          prisma.galleryPhoto.findMany({ orderBy: { createdAt: 'desc' } }),
          prisma.audioRecording.findMany({ orderBy: { createdAt: 'desc' } }),
          prisma.siteStatistic.findUnique({ where: { id: 'global-stats' } }),
        ]);
      } catch (dbError) {
        console.warn('Admin: Postgres not connected or table not initialized, using data fallback:', dbError.message);
      }
    }

    // Fallbacks if tables are empty initially
    if (!reports || reports.length === 0) {
      reports = periodicReports;
    }
    if (!announcements || announcements.length === 0) {
      announcements = initialAnnouncements;
    }
    if (!photos || photos.length === 0) {
      photos = photoGallery;
    }
    if (!audios || audios.length === 0) {
      audios = audioRecordings;
    }

    // Compute stats
    const totalDonationsHtg = donations
      .filter((d) => d.currency === 'HTG' && d.status === 'CONFIRMED')
      .reduce((sum, d) => sum + (d.amount || 0), 0);

    const totalDonationsUsd = donations
      .filter((d) => d.currency === 'USD' && d.status === 'CONFIRMED')
      .reduce((sum, d) => sum + (d.amount || 0), 0);

    const pendingDonationsCount = donations.filter((d) => d.status === 'DECLARED').length;
    const unreadContactsCount = contacts.filter((c) => c.status === 'UNREAD').length;
    const pendingMembershipsCount = memberships.filter((m) => m.status === 'PENDING').length;

    return NextResponse.json({
      success: true,
      stats: {
        totalContacts: contacts.length,
        unreadContacts: unreadContactsCount,
        totalPrayers: prayers.length,
        totalMemberships: memberships.length,
        pendingMemberships: pendingMembershipsCount,
        totalDonations: donations.length,
        pendingDonations: pendingDonationsCount,
        totalDonationsHtg,
        totalDonationsUsd,
        totalSubscribers: subscribers.length,
        totalReports: reports.length,
        totalAnnouncements: announcements.length,
        totalPhotos: photos.length,
        totalAudios: audios.length,
      },
      data: {
        contacts,
        prayers,
        memberships,
        donations,
        subscribers,
        reports,
        announcements,
        photos,
        audios,
        siteStats,
      },
    });
  } catch (error) {
    console.error('Erreur API Admin Data:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des données d’administration.' },
      { status: 500 }
    );
  }
}
