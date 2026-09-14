import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'AMA2025*Admin';

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
        message: 'Action simulée avec succès (Base de données en mode mémoire).',
      });
    }

    let result = null;

    if (model === 'contact') {
      if (action === 'updateStatus') {
        result = await prisma.contactMessage.update({
          where: { id },
          data: { status: data.status },
        });
      } else if (action === 'delete') {
        result = await prisma.contactMessage.delete({ where: { id } });
      }
    } else if (model === 'prayer') {
      if (action === 'togglePrayed') {
        result = await prisma.prayerRequest.update({
          where: { id },
          data: { isPrayedFor: Boolean(data.isPrayedFor) },
        });
      } else if (action === 'delete') {
        result = await prisma.prayerRequest.delete({ where: { id } });
      }
    } else if (model === 'membership') {
      if (action === 'updateStatus') {
        result = await prisma.membershipApplication.update({
          where: { id },
          data: { status: data.status },
        });
      } else if (action === 'delete') {
        result = await prisma.membershipApplication.delete({ where: { id } });
      }
    } else if (model === 'donation') {
      if (action === 'updateStatus') {
        result = await prisma.donationIntent.update({
          where: { id },
          data: { status: data.status },
        });
      } else if (action === 'delete') {
        result = await prisma.donationIntent.delete({ where: { id } });
      }
    } else if (model === 'report') {
      if (action === 'togglePublished') {
        result = await prisma.report.update({
          where: { id },
          data: { isPublished: Boolean(data.isPublished) },
        });
      } else if (action === 'create') {
        result = await prisma.report.create({
          data: {
            title: data.title,
            slug: data.slug || `rapport-${Date.now()}`,
            period: data.period,
            periodId: data.periodId,
            year: parseInt(data.year) || new Date().getFullYear(),
            category: data.category || 'evangelisation',
            author: data.author || 'Comité Exécutif AMA',
            summary: data.summary,
            content: data.content,
            metrics: data.metrics || [],
            highlights: data.highlights || [],
            pdfUrl: data.pdfUrl || null,
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
          },
        });
      } else if (action === 'delete') {
        result = await prisma.report.delete({ where: { id } });
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
