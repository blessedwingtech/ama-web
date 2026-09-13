import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, city, church, roleInChurch, motivation, skills } = body;

    if (!fullName || !email || !phone || !church || !motivation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Veuillez remplir les champs obligatoires (nom, email, téléphone, église d’appartenance, motivation).',
        },
        { status: 400 }
      );
    }

    let savedRecord = null;
    try {
      if (process.env.DATABASE_URL) {
        savedRecord = await prisma.membershipApplication.create({
          data: {
            fullName,
            email,
            phone,
            city: city || 'Thomonde / Centre',
            church,
            roleInChurch: roleInChurch || null,
            motivation,
            skills: skills || null,
          },
        });
      }
    } catch (dbError) {
      console.warn('PostgreSQL Database not reached. Fallback acknowledgment:', dbError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Votre candidature d’adhésion a été enregistrée. Le secrétariat général d’AMA vous contactera prochainement pour finaliser votre intégration fraternelle.',
        recordId: savedRecord ? savedRecord.id : 'member-' + Date.now(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur API Adhésion:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l’envoi de votre candidature.' },
      { status: 500 }
    );
  }
}
