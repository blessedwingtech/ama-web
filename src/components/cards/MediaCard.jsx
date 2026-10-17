'use client';

import React, { useState } from 'react';
import { Eye, MapPin, Calendar, Play, Film } from 'lucide-react';
import {
  normalizeMediaUrl,
  isVideoMedia,
  DEFAULT_MEDIA_FALLBACK,
} from '@/lib/mediaUtils';

export default function MediaCard({ item, onOpen }) {
  const isVideo = isVideoMedia(item.image) || Boolean(item.videoUrl);
  const displaySrc = normalizeMediaUrl(item.image);
  const [imgSrc, setImgSrc] = useState(displaySrc || DEFAULT_MEDIA_FALLBACK);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(DEFAULT_MEDIA_FALLBACK);
    }
  };

  return (
    <div
      onClick={() => onOpen(item)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={item.title}
          onError={handleError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Video badge if video */}
        {isVideo && (
          <span className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-sm">
            <Play className="w-3 h-3 fill-white" />
            <span>Vidéo</span>
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="p-3.5 rounded-full bg-white/90 text-slate-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            {isVideo ? (
              <Play className="w-5 h-5 fill-slate-900 ml-0.5 text-slate-900" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </span>
        </div>

        <span className="absolute top-3 left-3 bg-ama-blue-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs">
          {item.category}
        </span>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-600" />
              {item.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {item.date}
            </span>
          </div>

          <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-ama-blue-900 transition-colors leading-snug">
            {item.title}
          </h3>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {item.caption}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-ama-blue-800 flex items-center justify-between">
          <span>{isVideo ? 'Lire la vidéo' : "Agrandir l'image"}</span>
          <span className="text-amber-600">→</span>
        </div>
      </div>
    </div>
  );
}
