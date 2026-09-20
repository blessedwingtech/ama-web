import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  globalImpactStats,
  officialCompetitionsList,
  partnerChurchesStats,
  pillarsDistribution,
  visionMilestones,
} from '@/data/statistics';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    let siteStats = null;

    if (process.env.DATABASE_URL) {
      try {
        siteStats = await prisma.siteStatistic.findUnique({
          where: { id: 'global-stats' },
        });
      } catch (dbErr) {
        console.warn('API Statistics: DB not reached, using fallback:', dbErr.message);
      }
    }

    const payload = {
      globalStats: siteStats ? {
        visionTarget: siteStats.visionTarget || 100000,
        competitionsOrganized: siteStats.competitionsOrganized || 4,
        laureatesAwarded: siteStats.laureatesAwarded || 14,
        partnerChurches: siteStats.partnerChurches || 5,
        totalVersesRecited: 723,
        totalLocalitiesCovered: 5,
        foundingDate: "7 Août 2025",
        lastUpdated: siteStats.updatedAt ? new Date(siteStats.updatedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : "Exercice 2025 - 2026",
      } : globalImpactStats,
      officialCompetitions: officialCompetitionsList,
      partnerChurches: partnerChurchesStats,
      pillarsDistribution,
      visionMilestones,
    };

    return NextResponse.json({
      success: true,
      data: payload,
    });
  } catch (error) {
    console.error('Erreur API Statistics GET:', error);
    return NextResponse.json({
      success: false,
      data: {
        globalStats: globalImpactStats,
        officialCompetitions: officialCompetitionsList,
        partnerChurches: partnerChurchesStats,
        pillarsDistribution,
        visionMilestones,
      },
      error: error.message,
    });
  }
}
