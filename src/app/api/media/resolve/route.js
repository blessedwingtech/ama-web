import { NextResponse } from 'next/server';
import {
  normalizeMediaUrl,
  isYouTubeUrl,
  isVimeoUrl,
  isDirectVideoUrl,
  extractMediaFromHtml,
} from '@/lib/mediaUtils';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'URL manquante ou invalide.' },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();

    // 1. YouTube / Vimeo
    if (isYouTubeUrl(trimmedUrl)) {
      return NextResponse.json({
        success: true,
        directUrl: trimmedUrl,
        type: 'video',
        source: 'youtube',
      });
    }

    if (isVimeoUrl(trimmedUrl)) {
      return NextResponse.json({
        success: true,
        directUrl: trimmedUrl,
        type: 'video',
        source: 'vimeo',
      });
    }

    // 2. Direct Video
    if (isDirectVideoUrl(trimmedUrl)) {
      return NextResponse.json({
        success: true,
        directUrl: trimmedUrl,
        type: 'video',
        source: 'direct',
      });
    }

    // 3. Normalized Google Drive / Dropbox
    const normalized = normalizeMediaUrl(trimmedUrl);
    if (normalized !== trimmedUrl) {
      return NextResponse.json({
        success: true,
        directUrl: normalized,
        type: 'image',
        source: 'normalized',
      });
    }

    // 4. If URL ends with common image extensions, it's direct
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)(\?.*)?$/i.test(trimmedUrl)) {
      return NextResponse.json({
        success: true,
        directUrl: trimmedUrl,
        type: 'image',
        source: 'direct',
      });
    }

    // 5. Try fetching metadata if it looks like a web share page (e.g. MemoTonik, Imgur, etc.)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(trimmedUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';

      // If server returned direct image or video
      if (contentType.startsWith('image/')) {
        return NextResponse.json({
          success: true,
          directUrl: trimmedUrl,
          type: 'image',
          source: 'direct-response',
        });
      }
      if (contentType.startsWith('video/')) {
        return NextResponse.json({
          success: true,
          directUrl: trimmedUrl,
          type: 'video',
          source: 'direct-response',
        });
      }

      // If HTML page (like MemoTonik share page)
      if (contentType.includes('text/html')) {
        const html = await res.text();
        const extracted = extractMediaFromHtml(html);
        if (extracted) {
          const isVid = /\.(mp4|webm|mov|m4v)$/i.test(extracted);
          return NextResponse.json({
            success: true,
            directUrl: extracted,
            type: isVid ? 'video' : 'image',
            source: 'page-extracted',
          });
        }
      }
    } catch (fetchErr) {
      // Continue to fallback
    }

    // Fallback: return trimmed URL
    return NextResponse.json({
      success: true,
      directUrl: trimmedUrl,
      type: 'image',
      source: 'unmodified',
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
