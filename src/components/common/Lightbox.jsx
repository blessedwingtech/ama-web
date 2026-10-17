'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  ExternalLink,
  Film,
} from 'lucide-react';
import {
  isYouTubeUrl,
  getYouTubeEmbedUrl,
  isVimeoUrl,
  getVimeoEmbedUrl,
  isDirectVideoUrl,
  normalizeMediaUrl,
  DEFAULT_MEDIA_FALLBACK,
} from '@/lib/mediaUtils';

export default function Lightbox({ photo, onClose, onPrev, onNext }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  const rawUrl = photo.image || photo.videoUrl || '';
  const isYT = isYouTubeUrl(rawUrl);
  const isVim = isVimeoUrl(rawUrl);
  const isDirectVid = isDirectVideoUrl(rawUrl);
  const isVideo = isYT || isVim || isDirectVid || Boolean(photo.videoUrl);

  const displayImgSrc = imgError
    ? DEFAULT_MEDIA_FALLBACK
    : normalizeMediaUrl(photo.image) || DEFAULT_MEDIA_FALLBACK;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Fermer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors hidden sm:flex items-center justify-center"
          aria-label="Photo précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors hidden sm:flex items-center justify-center"
          aria-label="Photo suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Content */}
      <div
        className="max-w-4xl w-full bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
          {isYT ? (
            <iframe
              src={getYouTubeEmbedUrl(rawUrl)}
              title={photo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : isVim ? (
            <iframe
              src={getVimeoEmbedUrl(rawUrl)}
              title={photo.title}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : isDirectVid ? (
            <video
              src={rawUrl}
              controls
              autoPlay
              className="max-h-full max-w-full"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={displayImgSrc}
              alt={photo.title}
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain"
              loading="eager"
            />
          )}
        </div>

        <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {isVideo && (
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  <span>Vidéo</span>
                </span>
              )}
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                {photo.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-amber-400 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {photo.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3.5 h-3.5" />
                {photo.date}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
