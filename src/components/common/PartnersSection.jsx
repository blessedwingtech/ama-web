'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { ExternalLink, Cpu, ShieldCheck, Church, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PartnersSection() {
  const partnerChurches = [
    {
      name: "Église Évangélique Galilée de Delbourg",
      location: "Delbourg (#1), Thomonde",
      role: "Siège Social & Présidence (Pasteur Yvon BATHOL)",
      badge: "Siège AMA",
    },
    {
      name: "Église de Dieu de la Prophétie",
      location: "Plaine du Pré, Thomonde",
      role: "Pastorat & Commission des Concours",
      badge: "Membre Fondateur",
    },
    {
      name: "Église Évangélique Chrétienne",
      location: "Vieux-Cayes, Thomonde",
      role: "Évangélisation & Mobilisation Rurale",
      badge: "Membre Fondateur",
    },
    {
      name: "Église Baptiste Messianique",
      location: "Feuillet, Thomonde",
      role: "Jeunesse, Médias & Enseignement",
      badge: "Membre Fondateur",
    },
    {
      name: "Église de Dieu de la Prophétie",
      location: "Sylguerre, Thomonde",
      role: "Diaconat & Fraternité Pastorale",
      badge: "Membre Fondateur",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-ama-blue-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Alliances Stratégiques & Soutien Numérique</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            Nos Partenaires & Alliances
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            L'Association 100,000 Âmes s'appuie sur la communion fraternelle des églises locales et sur l'expertise technologique de partenaires dédiés pour porter l'Évangile jusqu'aux extrémités du Plateau Central.
          </p>
        </div>

        {/* 1. BWT OFFICIAL TECH PARTNER CARD */}
        <div className="bg-gradient-to-br from-slate-900 via-ama-blue-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logo & Identity */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-5">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-2.5 shadow-2xl border-2 border-amber-400/60 flex items-center justify-center shrink-0">
                <Image
                  src={siteConfig.techPartner.logo}
                  alt={siteConfig.techPartner.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain rounded-xl"
                  priority
                />
              </div>

              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                  Partenaire Technologique Officiel
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  {siteConfig.techPartner.name}
                </h3>
                <p className="text-xs font-mono text-amber-400 font-semibold">
                  bwt.bittonik.com
                </p>
              </div>
            </div>

            {/* Description & Impact Points */}
            <div className="lg:col-span-8 space-y-5 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Ingénierie & Transformation Digitale pour la Vision 2050</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {siteConfig.techPartner.description}
                </p>
              </div>

              {/* Specific contributions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Plateforme web institutionnelle & portail d'adhésion</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Médiathèque cloud & diffusion des résultats de concours</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Système de suivi statistique en direct & sécurité</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Optimisation pour connexions bas débit du Plateau Central</span>
                </div>
              </div>

              {/* External Link Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={siteConfig.techPartner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all"
                >
                  <span>Découvrir Blessed Wing Technology</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-xs text-slate-400">
                  Partenaire engagé pour le réveil et la diffusion de l'Évangile.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FOUNDER CHURCHES NETWORK */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Church className="w-5 h-5 text-ama-blue-900" />
              <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                Coalition des 5 Églises Fondatrices du Réseau AMA
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Plateau Central • Haïti
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerChurches.map((church, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-blue-50/40 p-4 sm:p-5 rounded-2xl border border-slate-200/80 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 group-hover:border-blue-300">
                    {church.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">#0{idx + 1}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-ama-blue-900 transition-colors">
                  {church.name}
                </h4>
                <p className="text-xs text-amber-700 font-medium">{church.location}</p>
                <p className="text-[11px] text-slate-500">{church.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
