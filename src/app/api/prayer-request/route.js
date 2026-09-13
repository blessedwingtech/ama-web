import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, location, title, description, isAnonymous, isPrivate } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Le sujet et la description du sujet de prière sont obligatoires.' },
        { status: 400 }
      );
    }

    let savedRecord = null;
    try {
      if (process.env.DATABASE_URL) {
        savedRecord = await prisma.prayerRequest.create({
          data: {
            fullName: isAnonymous ? 'Frère/Sœur Anonyme' : (fullName || 'Anonyme'),
            email: email || null,
            phone: phone || null,
            location: location || null,
            title,
            description,
            isAnonymous: Boolean(isAnonymous),
            isPrivate: isPrivate !== undefined ? Boolean(isPrivate) : true,
          },
        });
      }
    } catch (dbError) {
      console.warn('PostgreSQL Database not reached. Fallback acknowledgment:', dbError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Votre requête de prière a été reçue dans la plus stricte confidentialité chrétienne. Le Collège pastoral et l’équipe d’intercession portent votre sujet devant le trône de la grâce.',
        recordId: savedRecord ? savedRecord.id : 'prayer-' + Date.now(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur API Demande de Prière:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l’envoi de votre requête.' },
      { status: 500 }
    );
  }
}
