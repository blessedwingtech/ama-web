import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'AMA2025*Admin';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { authKey, model, action, id, data } = body;

    if (!authKey || authKey !== ADMIN_KEY) {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé.' },
        { status: 401 }
      );
    }

    if (!model || !action || !id) {
      return NextResponse.json(
        { success: false, error: 'Paramètres manquants (model, action, id).' },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        message: 'Action simulée avec succès (Base de données locale sans URL configurée).',
      });
    }

    let result = null;

    // 1. CONTACT MESSAGES
    if (model === 'contact') {
      if (action === 'updateStatus') {
        result = await prisma.contactMessage.update({
          where: { id },
          data: { status: data.status },
        });
      } else if (action === 'delete') {
        result = await prisma.contactMessage.delete({ where: { id } });
      }
    }

    // 2. PRAYER REQUESTS
    else if (model === 'prayer') {
      if (action === 'togglePrayed') {
        result = await prisma.prayerRequest.update({
          where: { id },
          data: { isPrayedFor: Boolean(data.isPrayedFor) },
        });
      } else if (action === 'delete') {
        result = await prisma.prayerRequest.delete({ where: { id } });
      }
    }

    // 3. MEMBERSHIP APPLICATIONS
    else if (model === 'membership') {
      if (action === 'updateStatus') {
        result = await prisma.membershipApplication.update({
          where: { id },
          data: { status: data.status },
        });
      } else if (action === 'delete') {
        result = await prisma.membershipApplication.delete({ where: { id } });
      }
    }

    // 4. DONATION INTENTS
    else if (model === 'donation') {
      if (action === 'updateStatus') {
        result = await prisma.donationIntent.update({
          where: { id },
          data: { status: data.status },
        });
      } else if (action === 'delete') {
        result = await prisma.donationIntent.delete({ where: { id } });
      }
    }

    // 5. PERIODIC REPORTS
    else if (model === 'report') {
      if (action === 'togglePublished') {
        result = await prisma.report.update({
          where: { id },
          data: { isPublished: Boolean(data.isPublished) },
        });
      } else if (action === 'create') {
        const slugBase = (data.slug || data.title || `rapport-${Date.now()}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        const finalSlug = slugBase || `rapport-${Date.now()}`;

        result = await prisma.report.create({
          data: {
            title: data.title,
            slug: finalSlug,
            period: data.period || '4ème Trimestre 2025',
            periodId: data.periodId || '2025-t4',
            year: parseInt(data.year) || new Date().getFullYear(),
            category: data.category || 'theologie',
            author: data.author || 'Comité Exécutif AMA',
            summary: data.summary,
            content: data.content,
            metrics: data.metrics || [],
            highlights: data.highlights || [],
            pdfUrl: data.pdfUrl || null,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
          },
        });
      } else if (action === 'update') {
        result = await prisma.report.update({
          where: { id },
          data: {
            title: data.title,
            period: data.period,
            periodId: data.periodId,
            year: parseInt(data.year) || 2025,
            category: data.category,
            author: data.author,
            summary: data.summary,
            content: data.content,
            metrics: data.metrics,
            highlights: data.highlights,
            pdfUrl: data.pdfUrl || null,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
          },
        });
      } else if (action === 'delete') {
        result = await prisma.report.delete({ where: { id } });
      }
    }

    // 6. ANNOUNCEMENTS & PUBLICATIONS
    else if (model === 'announcement') {
      if (action === 'togglePublished') {
        result = await prisma.announcement.update({
          where: { id },
          data: { isPublished: Boolean(data.isPublished) },
        });
      } else if (action === 'toggleUrgent') {
        result = await prisma.announcement.update({
          where: { id },
          data: { isUrgent: Boolean(data.isUrgent) },
        });
      } else if (action === 'create') {
        const slugBase = (data.slug || data.title || `annonce-${Date.now()}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        const finalSlug = slugBase || `annonce-${Date.now()}`;

        result = await prisma.announcement.create({
          data: {
            title: data.title,
            slug: finalSlug,
            category: data.category || 'COMMUNIQUE',
            author: data.author || 'Secrétariat Général AMA',
            summary: data.summary,
            content: data.content,
            eventDate: data.eventDate || null,
            location: data.location || null,
            isUrgent: Boolean(data.isUrgent),
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
          },
        });
      } else if (action === 'update') {
        result = await prisma.announcement.update({
          where: { id },
          data: {
            title: data.title,
            category: data.category,
            author: data.author,
            summary: data.summary,
            content: data.content,
            eventDate: data.eventDate || null,
            location: data.location || null,
            isUrgent: data.isUrgent !== undefined ? Boolean(data.isUrgent) : undefined,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
          },
        });
      } else if (action === 'delete') {
        result = await prisma.announcement.delete({ where: { id } });
      }
    }

    // 7. SITE STATISTICS
    else if (model === 'statistics') {
      if (action === 'update') {
        result = await prisma.siteStatistic.upsert({
          where: { id: 'global-stats' },
          update: {
            visionTarget: parseInt(data.visionTarget) || 100000,
            currentReachedSouls: parseInt(data.currentReachedSouls) || 0,
            confirmedDecisionsForChrist: parseInt(data.confirmedDecisionsForChrist) || 0,
            partnerChurches: parseInt(data.partnerChurches) || 0,
            competitionsOrganized: parseInt(data.competitionsOrganized) || 4,
            laureatesAwarded: parseInt(data.laureatesAwarded) || 14,
            youthAthletesEngaged: parseInt(data.youthAthletesEngaged) || 0,
            biblesDistributed: parseInt(data.biblesDistributed) || 0,
            socialAidBeneficiaries: parseInt(data.socialAidBeneficiaries) || 0,
            activeVolunteers: parseInt(data.activeVolunteers) || 0,
            totalMobilizedHtg: parseFloat(data.totalMobilizedHtg) || 0,
            fieldAllocationRate: parseFloat(data.fieldAllocationRate) || 93.5,
            quarterlyData: data.quarterlyData || undefined,
            localityData: data.localityData || undefined,
          },
          create: {
            id: 'global-stats',
            visionTarget: parseInt(data.visionTarget) || 100000,
            currentReachedSouls: parseInt(data.currentReachedSouls) || 2450,
            confirmedDecisionsForChrist: parseInt(data.confirmedDecisionsForChrist) || 114,
            partnerChurches: parseInt(data.partnerChurches) || 5,
            competitionsOrganized: parseInt(data.competitionsOrganized) || 4,
            laureatesAwarded: parseInt(data.laureatesAwarded) || 14,
            youthAthletesEngaged: parseInt(data.youthAthletesEngaged) || 320,
            biblesDistributed: parseInt(data.biblesDistributed) || 180,
            socialAidBeneficiaries: parseInt(data.socialAidBeneficiaries) || 85,
            activeVolunteers: parseInt(data.activeVolunteers) || 45,
            totalMobilizedHtg: parseFloat(data.totalMobilizedHtg) || 435000,
            fieldAllocationRate: parseFloat(data.fieldAllocationRate) || 93.5,
            quarterlyData: data.quarterlyData || undefined,
            localityData: data.localityData || undefined,
          },
        });
      }
    }

    // 8. GALLERY PHOTOS
    else if (model === 'photo') {
      if (action === 'togglePublished') {
        result = await prisma.galleryPhoto.update({
          where: { id },
          data: { isPublished: Boolean(data.isPublished) },
        });
      } else if (action === 'create') {
        result = await prisma.galleryPhoto.create({
          data: {
            title: data.title,
            category: data.category || 'theologie',
            date: data.date || new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
            location: data.location || 'Delbourg, Thomonde',
            image: data.image,
            caption: data.caption || data.title,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
          },
        });
      } else if (action === 'update') {
        result = await prisma.galleryPhoto.update({
          where: { id },
          data: {
            title: data.title,
            category: data.category,
            date: data.date,
            location: data.location,
            image: data.image,
            caption: data.caption,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
          },
        });
      } else if (action === 'delete') {
        result = await prisma.galleryPhoto.delete({ where: { id } });
      }
    }

    // 9. AUDIO RECORDINGS
    else if (model === 'audio') {
      if (action === 'togglePublished') {
        result = await prisma.audioRecording.update({
          where: { id },
          data: { isPublished: Boolean(data.isPublished) },
        });
      } else if (action === 'create') {
        result = await prisma.audioRecording.create({
          data: {
            title: data.title,
            speaker: data.speaker || 'Pasteur Yvon BATHOL (Président AMA)',
            event: data.event || 'Cérémonie & Édification',
            duration: data.duration || '40:00',
            category: data.category || 'theologie',
            date: data.date || new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
            audioSrc: data.audioSrc,
            description: data.description || data.title,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
          },
        });
      } else if (action === 'update') {
        result = await prisma.audioRecording.update({
          where: { id },
          data: {
            title: data.title,
            speaker: data.speaker,
            event: data.event,
            duration: data.duration,
            category: data.category,
            date: data.date,
            audioSrc: data.audioSrc,
            description: data.description,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
          },
        });
      } else if (action === 'delete') {
        result = await prisma.audioRecording.delete({ where: { id } });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Mise à jour effectuée avec succès.',
      result,
    });
  } catch (error) {
    console.error('Erreur API Admin Action:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement de l’action : ' + error.message },
      { status: 500 }
    );
  }
}
