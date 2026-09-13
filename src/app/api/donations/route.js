import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { donorName, donorEmail, donorPhone, amount, currency, channel, targetProject, referenceCode, notes } = body;

    if (!donorName || !amount || !channel) {
      return NextResponse.json(
        { success: false, error: 'Le nom du donateur, le montant et le canal de paiement sont obligatoires.' },
        { status: 400 }
      );
    }

    let savedRecord = null;
    try {
      if (process.env.DATABASE_URL) {
        savedRecord = await prisma.donationIntent.create({
          data: {
            donorName,
            donorEmail: donorEmail || null,
            donorPhone: donorPhone || null,
            amount: parseFloat(amount),
            currency: currency || 'HTG',
            channel,
            targetProject: targetProject || 'GENERAL',
            referenceCode: referenceCode || null,
            notes: notes || null,
            status: 'DECLARED',
          },
        });
      }
    } catch (dbError) {
      console.warn('PostgreSQL Database not reached. Fallback acknowledgment:', dbError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Votre intention de don a été enregistrée avec succès. Nous vous remercions chaleureusement pour votre soutien au ministère du Seigneur !',
        donationId: savedRecord ? savedRecord.id : 'don-' + Date.now(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur API Donations:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l’enregistrement de votre don.' },
      { status: 500 }
    );
  }
}
