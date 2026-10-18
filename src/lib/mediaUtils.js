/**
 * Media utilities for Association 100,000 Âmes (AMA)
 * Handles detection, normalization, embed conversions, and fallbacks
 * for photos, videos (YouTube, Vimeo, MP4), Google Drive, Dropbox, MemoTonik, etc.
 */

export function isYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)/i.test(url);
}

export function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function getYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

export function getYouTubeThumbnail(url) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function isVimeoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /vimeo\.com\/([0-9]+)/i.test(url);
}

export function getVimeoEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/vimeo\.com\/([0-9]+)/i);
  return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : null;
}

export function isDirectVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const cleanUrl = url.split('?')[0].toLowerCase();
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(cleanUrl);
}

export function isVideoMedia(url) {
  return isYouTubeUrl(url) || isVimeoUrl(url) || isDirectVideoUrl(url);
}

/**
 * Normalizes URLs for optimal rendering:
 * - MemoTonik share links -> route through /api/media/proxy
 * - Google Drive share links -> direct stream/download view links
 * - Dropbox dl=0 -> raw=1
 * - YouTube -> high-res thumbnail when used in photo gallery
 * - Fixes known legacy 404 unsplash photos
 */
export function normalizeMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Known 404 photo repair (legacy seed)
  if (trimmed.includes('photo-1508098682722-e99c43a406b2')) {
    return 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80';
  }

  // MemoTonik share links
  if (trimmed.includes('memo.bittonik.com/share/') || trimmed.includes('/share/photo/')) {
    return `/api/media/proxy?url=${encodeURIComponent(trimmed)}`;
  }

  // Google Drive
  if (trimmed.includes('drive.google.com')) {
    const fileMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch && fileMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
    }
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
  }

  // Dropbox
  if (trimmed.includes('dropbox.com') && trimmed.includes('dl=0')) {
    return trimmed.replace('dl=0', 'raw=1');
  }

  // YouTube as image -> fallback to thumbnail
  if (isYouTubeUrl(trimmed)) {
    return getYouTubeThumbnail(trimmed) || trimmed;
  }

  return trimmed;
}

/**
 * Server-side helper to fetch and extract direct image/video URL from web pages
 */
export async function resolveDirectMediaUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();

  // Known 404 repair
  if (trimmed.includes('photo-1508098682722-e99c43a406b2')) {
    return 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80';
  }

  if (isYouTubeUrl(trimmed) || isVimeoUrl(trimmed) || isDirectVideoUrl(trimmed)) {
    return trimmed;
  }

  if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)(\?.*)?$/i.test(trimmed)) {
    return trimmed;
  }

  // Try extracting from MemoTonik or HTML page
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(trimmed, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.startsWith('image/')) {
      return trimmed;
    }

    if (contentType.includes('text/html')) {
      const html = await res.text();
      const memoMatch =
        html.match(/"url"\s*:\s*"(https?:\\\/\\\/[^"]+\.(?:png|jpg|jpeg|webp|gif|mp4|webm))"/i) ||
        html.match(/"url"\s*:\s*"(https?:\/\/[^"]+\.(?:png|jpg|jpeg|webp|gif|mp4|webm))"/i);

      if (memoMatch && memoMatch[1]) {
        return memoMatch[1].replace(/\\\//g, '/');
      }

      const ogImageMatch = html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
      );
      if (ogImageMatch && ogImageMatch[1]) {
        return ogImageMatch[1];
      }
    }
  } catch (e) {
    // Return normalized fallback
  }

  return normalizeMediaUrl(trimmed);
}

/**
 * Fallback branded placeholder image SVG
 */
export const DEFAULT_MEDIA_FALLBACK =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none">
      <rect width="800" height="450" fill="#0B1528"/>
      <circle cx="400" cy="190" r="60" fill="#1E293B"/>
      <path d="M380 205L395 185L410 200L425 175L440 205H360Z" fill="#F59E0B" opacity="0.8"/>
      <circle cx="380" cy="170" r="8" fill="#F59E0B"/>
      <text x="400" y="285" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#F1F5F9" text-anchor="middle">
        Association 100,000 Âmes (AMA)
      </text>
      <text x="400" y="315" font-family="system-ui, sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">
        Médiathèque Officielle • Plateau Central, Haïti
      </text>
    </svg>
  `);
