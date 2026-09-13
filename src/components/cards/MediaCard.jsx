'use client';

import React from 'react';
import { Eye, MapPin, Calendar } from 'lucide-react';

export default function MediaCard({ item, onOpen }) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-5 h-5" />
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
          <span>Agrandir l'image</span>
          <span className="text-amber-600">→</span>
        </div>
      </div>
    </div>
  );
}
