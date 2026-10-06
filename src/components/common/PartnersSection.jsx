'use client';

import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';
import {
  ExternalLink,
  Cpu,
  GraduationCap,
  Server,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export default function PartnersSection() {
  const nticPillars = [
    {
      icon: Cpu,
      title: "Portée Technique & Ingénierie Logicielle",
      desc: "Conception, développement et maintenance des plateformes web interactives, portails d'adhésion et applications de gestion des concours.",
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    },
    {
      icon: GraduationCap,
      title: "Formation & Renforcement des Capacités",
      desc: "Formation continue des équipes et des jeunes aux outils NTIC, à la communication digitale et à la bureautique moderne.",
      color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
    {
      icon: Server,
      title: "Réalisation & Déploiement Cloud",
      desc: "Mise en place de serveurs haute performance, gestion de bases de données sécurisées et stockage cloud de la médiathèque.",
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    },
    {
      icon: ShieldCheck,
      title: "Gestion Complète des Infrastructures",
      desc: "Supervision 24/7, sécurité informatique, sauvegardes automatiques et optimisation de bande passante pour le Plateau Central.",
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-ama-blue-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Partenariat Stratégique Exclusif</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            Notre Partenaire Officiel NTIC & Digital
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Pour porter la Vision 2050 avec excellence, l'Association 100,000 Âmes a confié l'ensemble de son écosystème numérique et technologique à <strong>Blessed Wing Technology (BWT)</strong>.
          </p>
        </div>

        {/* BWT MAIN PARTNERSHIP SHOWCASE CARD */}
        <div className="bg-gradient-to-br from-slate-900 via-ama-blue-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative space-y-8">
            {/* Top Row: Identity + Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-8">
              {/* Logo & Identity */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-3 shadow-2xl border-2 border-amber-400/60 flex items-center justify-center shrink-0">
                  <Image
                    src={siteConfig.techPartner.logo}
                    alt={siteConfig.techPartner.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-contain rounded-xl"
                    priority
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                    Partenaire NTIC Officiel
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                    {siteConfig.techPartner.name}
                  </h3>
                  <p className="text-xs font-mono text-amber-400 font-semibold">
                    bwt.bittonik.com
                  </p>
                </div>
              </div>

              {/* Text Presentation */}
              <div className="lg:col-span-8 space-y-4 lg:border-l border-slate-800 lg:pl-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                    <Layers className="w-4 h-4" />
                    <span>Alliance Technologique & Gestion Globale des NTIC</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
                    Un accompagnement technologique intégral pour l'Association 100,000 Âmes
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {siteConfig.techPartner.description}
                  </p>
                </div>

                {/* External Link */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={siteConfig.techPartner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all"
                  >
                    <span>Consulter le site officiel de BWT</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="text-xs text-slate-400">
                    Propulsé par Blessed Wing Technology
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: 4 NTIC Pillars */}
            <div className="space-y-4">
              <h5 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Périmètre d'Intervention & Missions de BWT pour AMA</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nticPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 transition-all space-y-3"
                    >
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pillar.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h6 className="font-serif font-bold text-sm text-white">
                        {pillar.title}
                      </h6>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
