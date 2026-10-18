import { NextResponse } from 'next/server';
import { extractMediaFromHtml, DEFAULT_MEDIA_FALLBACK } from '@/lib/mediaUtils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return NextResponse.redirect(new URL('/placeholder.svg', request.url));
    }

    const decoded = decodeURIComponent(targetUrl).trim();

    // If already direct image or video
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)(\?.*)?$/i.test(decoded)) {
      return NextResponse.redirect(decoded, { status: 307 });
    }

    // If MemoTonik or share page link
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(decoded, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';

      // Direct image response
      if (contentType.startsWith('image/')) {
        return NextResponse.redirect(decoded, { status: 307 });
      }

      // If HTML page: extract direct image URL
      if (contentType.includes('text/html')) {
        const html = await res.text();
        const direct = extractMediaFromHtml(html);
        if (direct) {
          return NextResponse.redirect(direct, { status: 307 });
        }
      }
    } catch (e) {
      // Fallback
    }

    // Default redirect to decoded url
    return NextResponse.redirect(decoded, { status: 307 });
  } catch (err) {
    return new NextResponse('Media Proxy Error', { status: 500 });
  }
}
