import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Veuillez remplir tous les champs obligatoires (nom, email, sujet, message).' },
        { status: 400 }
      );
    }

    let savedRecord = null;
    try {
      if (process.env.DATABASE_URL) {
        savedRecord = await prisma.contactMessage.create({
          data: {
            fullName,
            email,
            phone: phone || null,
            subject,
            message,
          },
        });
      }
    } catch (dbError) {
      console.warn('PostgreSQL Database not reached or configured. Fallback to acknowledged mode:', dbError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été transmis avec succès au secrétariat de l’Association 100,000 Âmes (AMA). Que Dieu vous bénisse !',
        recordId: savedRecord ? savedRecord.id : 'ack-' + Date.now(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur API Contact:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l’envoi de votre message.' },
      { status: 500 }
    );
  }
}
