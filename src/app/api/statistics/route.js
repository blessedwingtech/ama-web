import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  globalImpactStats,
  quarterlyEvolution,
  localityImpact,
  pillarsDistribution,
  financialTransparency,
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
        visionTarget: siteStats.visionTarget,
        currentReachedSouls: siteStats.currentReachedSouls,
        confirmedDecisionsForChrist: siteStats.confirmedDecisionsForChrist,
        partnerChurches: siteStats.partnerChurches,
        youthAthletesEngaged: siteStats.youthAthletesEngaged,
        biblesDistributed: siteStats.biblesDistributed,
        socialAidBeneficiaries: siteStats.socialAidBeneficiaries,
        activeVolunteers: siteStats.activeVolunteers,
        totalLocalitiesCovered: 7,
        foundingDate: "7 Août 2025",
        lastUpdated: new Date(siteStats.updatedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      } : globalImpactStats,
      quarterlyEvolution: (siteStats && siteStats.quarterlyData && Array.isArray(siteStats.quarterlyData) && siteStats.quarterlyData.length > 0)
        ? siteStats.quarterlyData
        : quarterlyEvolution,
      localityImpact: (siteStats && siteStats.localityData && Array.isArray(siteStats.localityData) && siteStats.localityData.length > 0)
        ? siteStats.localityData
        : localityImpact,
      pillarsDistribution,
      financialTransparency: siteStats ? {
        totalMobilizedHtg: siteStats.totalMobilizedHtg,
        fieldAllocationRate: siteStats.fieldAllocationRate,
        adminOverheadRate: Number((100 - siteStats.fieldAllocationRate).toFixed(1)),
        breakdown: financialTransparency.breakdown,
      } : financialTransparency,
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
        quarterlyEvolution,
        localityImpact,
        pillarsDistribution,
        financialTransparency,
        visionMilestones,
      },
      error: error.message,
    });
  }
}
