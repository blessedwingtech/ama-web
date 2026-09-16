'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Phone, X, Check, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function StickyDonationBar() {
  const [copiedType, setCopiedType] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  const copyNumber = (num, type) => {
    navigator.clipboard.writeText(num.replace(/[^0-9]/g, ''));
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  if (dismissed) return null;

  return (
    <aside hidden aria-label="Bannière de soutien" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-300/60 shadow-2xl px-3 py-2.5 sm:px-6 sm:py-3 transition-transform">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div hidden className="flex items-center gap-2.5 text-xs sm:text-sm">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div className="text-slate-800">
            <span className="font-bold text-ama-blue-900 block sm:inline">
              Soutenez la Vision 2050 :
            </span>{' '}
            <span className="text-slate-600 hidden md:inline">
              Évangélisation, tournois de jeunesse et secours aux familles de Thomonde.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {/* Quick MonCash Button */}
          <button
            onClick={() => copyNumber(siteConfig.primaryPhone, 'moncash')}
            className="flex-1 sm:flex-none text-xs px-2.5 py-1.5 rounded-lg font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 flex items-center justify-center gap-1 transition-colors"
            title="Copier le numéro MonCash"
          >
            {copiedType === 'moncash' ? (
              <span className="flex items-center gap-1 text-emerald-700">
                <Check className="w-3.5 h-3.5" /> 3252-9060 Copié !
              </span>
            ) : (
              <span>MonCash : <strong>3252-9060</strong></span>
            )}
          </button>

          {/* Quick Natcash Button */}
          <button
            onClick={() => copyNumber(siteConfig.secondaryPhone, 'natcash')}
            className="flex-1 sm:flex-none text-xs px-2.5 py-1.5 rounded-lg font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 flex items-center justify-center gap-1 transition-colors"
            title="Copier le numéro Natcash"
          >
            {copiedType === 'natcash' ? (
              <span className="flex items-center gap-1 text-emerald-700">
                <Check className="w-3.5 h-3.5" /> 3651-2047 Copié !
              </span>
            ) : (
              <span>Natcash : <strong>3651-2047</strong></span>
            )}
          </button>

          {/* Full Don Page Link */}
          <Link 
            href="/faire-un-don"
            className="flex-1 sm:flex-none text-xs px-3.5 py-1.5 rounded-lg font-bold bg-gradient-to-r from-ama-gold-600 to-amber-600 text-white shadow-xs hover:from-ama-gold-700 hover:to-amber-700 flex items-center justify-center gap-1 transition-all"
          >
            <span>Faire un Don</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Fermer la bannière"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
