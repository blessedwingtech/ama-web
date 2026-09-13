'use client';

import React from 'react';
import { Shield, BookOpen, Briefcase, Award } from 'lucide-react';

export default function TeamMemberCard({ member, index }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ama-blue-900 via-amber-500 to-ama-blue-900 group-hover:h-2 transition-all"></div>

      <div>
        {/* Header with Photo / Avatar & Badge */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-ama-blue-900 to-ama-blue-700 text-amber-300 font-serif font-bold text-2xl flex items-center justify-center shadow-md border-2 border-amber-400/40 shrink-0 group-hover:scale-105 transition-transform">
            <span>{member.fallbackInitial || member.name.substring(0, 2).toUpperCase()}</span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 mb-1">
              #{index + 1} • {member.role}
            </span>
            <h3 className="font-serif font-bold text-slate-900 text-lg sm:text-xl truncate group-hover:text-ama-blue-900 transition-colors">
              {member.name}
            </h3>
            <p className="text-xs font-semibold text-ama-blue-800 leading-snug">
              {member.title}
            </p>
          </div>
        </div>

        {/* Affiliation Pill */}
        {member.affiliation && (
          <div className="mb-3.5 flex items-start gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{member.affiliation}</span>
          </div>
        )}

        {/* Biography */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {member.bio}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="font-medium text-slate-500">Comité Exécutif AMA</span>
        <span className="text-amber-600 font-semibold">Thomonde, Haïti</span>
      </div>
    </div>
  );
}
