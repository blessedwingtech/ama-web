import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { periodicReports } from '@/data/reports';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    let reports = [];

    if (process.env.DATABASE_URL) {
      try {
        reports = await prisma.report.findMany({
          where: { isPublished: true },
          orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
        });
      } catch (dbErr) {
        console.warn('API Reports: DB not reached or table empty, using seed fallback:', dbErr.message);
      }
    }

    // If database table has no records yet, use the initial seed reports
    if (!reports || reports.length === 0) {
      reports = periodicReports;
    }

    return NextResponse.json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error('Erreur API Reports GET:', error);
    return NextResponse.json(
      { success: false, reports: periodicReports, error: error.message },
      { status: 500 }
    );
  }
}
