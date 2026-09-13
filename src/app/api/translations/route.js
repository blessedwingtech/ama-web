import { NextResponse } from 'next/server';
import fr from '@/data/dictionaries/fr.json';
import ht from '@/data/dictionaries/ht.json';
import en from '@/data/dictionaries/en.json';

const dictionaries = {
  fr,
  ht,
  en,
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'fr';

    const selectedDict = dictionaries[lang] || dictionaries.fr;

    return NextResponse.json(
      {
        success: true,
        lang: selectedDict.lang,
        translations: selectedDict,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors du chargement des traductions',
      },
      { status: 500 }
    );
  }
}
