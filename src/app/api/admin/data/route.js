import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { periodicReports } from '@/data/reports';

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'AMA2025*Admin';

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
    let siteStats = null;

    if (process.env.DATABASE_URL) {
      try {
        [contacts, prayers, memberships, donations, subscribers, reports, siteStats] = await Promise.all([
          prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.prayerRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.membershipApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.donationIntent.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
          prisma.report.findMany({ orderBy: { createdAt: 'desc' } }),
          prisma.siteStatistic.findUnique({ where: { id: 'global-stats' } }),
        ]);
      } catch (dbError) {
        console.warn('Admin: Postgres not connected or table not initialized, using data fallback:', dbError.message);
      }
    }

    // Fallback if reports table is empty initially
    if (!reports || reports.length === 0) {
      reports = periodicReports;
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
      },
      data: {
        contacts,
        prayers,
        memberships,
        donations,
        subscribers,
        reports,
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

