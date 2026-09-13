'use client';

import React from 'react';
import Link from 'next/link';
import {
  Megaphone,
  BookOpen,
  UsersRound,
  Trophy,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const iconMap = {
  Megaphone,
  BookOpen,
  UsersRound,
  Trophy,
  HeartHandshake,
};

export default function MinistryCard({ ministry, isDetailed = false }) {
  const IconComponent = iconMap[ministry.icon] || BookOpen;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header with Number & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-ama-blue-900 flex items-center justify-center group-hover:bg-ama-blue-900 group-hover:text-amber-400 group-hover:scale-105 transition-all shadow-xs border border-blue-100">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="font-mono text-2xl font-bold text-slate-300 group-hover:text-amber-500 transition-colors">
            {ministry.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-slate-900 text-xl group-hover:text-ama-blue-900 transition-colors leading-snug mb-3">
          {ministry.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {ministry.summary}
        </p>

        {/* If detailed or on Ministries page */}
        {isDetailed && ministry.actions && (
          <div className="space-y-2 mb-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Actions Concrètes :
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {ministry.actions.map((act, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If tournament pillar */}
        {isDetailed && ministry.tournaments && (
          <div className="space-y-3 mb-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Les 4 Tournois Phares :
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ministry.tournaments.map((t, i) => (
                <div key={i} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{t.name}</span>
                    <span className="text-[10px] bg-amber-200/60 text-amber-900 px-1.5 py-0.5 rounded font-medium">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
        <span className="text-xs font-semibold text-ama-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
          {ministry.stats}
        </span>
        <Link
          href="/ministeres"
          className="text-xs font-bold text-slate-700 hover:text-ama-blue-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <span>Détails</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
