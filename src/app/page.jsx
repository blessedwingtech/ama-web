'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import { ministries } from '@/data/ministries';
import MinistryCard from '@/components/cards/MinistryCard';
import {
  Heart,
  ArrowRight,
  Sparkles,
  Users,
  Trophy,
  BookOpen,
  MapPin,
  Play,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Radio,
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ama-blue-950 via-ama-blue-900 to-slate-900 text-white py-16 sm:py-24 lg:py-32">
        {/* Background glow & subtle patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{t('hero.badge', 'Vision 2050 pour le Plateau Central')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                {t('hero.title', 'Plus de 100 000 Âmes Gagnées, Restaurées et Formées pour Christ')}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t(
                  'hero.subtitle',
                  "Organisation chrétienne protestante engagée autour du Lac de Péligre, à Thomonde et dans tout le Plateau Central haïtien pour un réveil spirituel et un impact social concret."
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link hidden
                  href="/faire-un-don"
                  className="flex items-center gap-2 bg-gradient-to-r from-ama-gold-600 to-amber-600 hover:from-ama-gold-700 hover:to-amber-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{t('hero.ctaDonate', 'Soutenir l’Œuvre')}</span>
                </Link>

                <Link
                  href="/a-propos"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base backdrop-blur-xs transition-all"
                >
                  <span>{t('hero.ctaDiscover', 'Découvrir la Mission')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Location Badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>#1, Église Évangélique Galilée de Delbourg, Thomonde (Centre, Haïti)</span>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-md">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-serif font-bold text-xl flex items-center justify-center shadow-md">
                        AMA
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-white text-base">
                          Association 100,000 Âmes
                        </h3>
                        <p className="text-xs text-amber-400">Plateau Central • Lac de Péligre</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Fondée en 2025
                    </span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="italic bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 leading-relaxed text-amber-100">
                      « Voir plus de 100 000 âmes se tourner vers Jésus-Christ, être restaurées, fortifiées dans la foi et formées au discipulat d'ici l'horizon 2050. »
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 text-xs text-slate-300 pt-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Coalition d’églises autour du Lac de Péligre</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Évangélisation sur les marchés & visites aux malades</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>4 Championnats d’été de Football pour la jeunesse</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/ministeres"
                      className="w-full flex items-center justify-center gap-2 bg-ama-blue-800 hover:bg-ama-blue-700 text-white py-3 rounded-xl text-xs font-bold transition-colors"
                    >
                      <span>Explorer nos 5 ministères</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPTEUR D'IMPACT (ANIMÉ & VISUEL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Chiffres Clés & Objectifs
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Un Impact Spirituel et Communautaire Mesurable
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {siteConfig.impactStats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col justify-center items-center"
              >
                <div className="text-2xl sm:text-4xl font-serif font-extrabold text-ama-blue-900 tracking-tight flex items-baseline justify-center">
                  <span>{stat.value}</span>
                  <span className="text-amber-500 ml-0.5">{stat.suffix}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-slate-400 italic">
            * Statistiques prévisionnelles et jalons d'activité en cours de consolidation pour la Vision 2050.
          </div>
        </div>
      </section>

      {/* 3. MOT DU PRÉSIDENT (JULBERSON TOUTOUTE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-ama-blue-950 rounded-3xl text-white p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* President Photo / Placeholder */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-[22px] bg-slate-800 flex items-center justify-center font-serif text-4xl sm:text-5xl font-bold text-amber-300 border border-white/20">
                    JT
                  </div>
                </div>
                <div className="absolute -bottom-3 bg-ama-blue-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/50 shadow-md">
                  Président AMA
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-serif font-bold text-xl text-white">
                  TOUTOUTE Julberson
                </h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">
                  Président du Comité Exécutif
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Église Évangélique Galilée de Delbourg
                </p>
              </div>
            </div>

            {/* President Quote Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('president.sectionTitle', 'Mot du Président')}</span>
              </div>

              <blockquote className="text-lg sm:text-2xl font-serif italic text-slate-100 leading-relaxed">
                « {t('president.quote', siteConfig.vision)} »
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Leader engagé au sein de l'Église Évangélique Galilée de Delbourg, M. Toutoute coordonne la vision générale et le déploiement des activités d'évangélisation d'AMA. Entouré d'une équipe administrative compétente et sous le conseil pastoral des serviteurs de Dieu de la région, l'Association œuvre sans relâche pour la propagation du salut en Jésus-Christ.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/equipe"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Découvrir l'équipe exécutive & le collège pastoral</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APERÇU DES 4 PILIERS D'INTERVENTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Nos Ministères
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
              {t('pillars.title', 'Nos 4 Piliers d’Intervention')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              {t(
                'pillars.subtitle',
                'Une action holistique alliant proclamation de la foi, édification fraternelle et solidarité chrétienne.'
              )}
            </p>
          </div>

          <Link
            href="/ministeres"
            className="inline-flex items-center gap-2 text-sm font-bold text-ama-blue-900 hover:text-ama-blue-700 group"
          >
            <span>Voir tous les ministères</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ministries.slice(0, 3).map((min) => (
            <MinistryCard key={min.id} ministry={min} />
          ))}
        </div>

        {/* Highlight Banner for Sports Evangelism (Pillar 4) */}
        <div className="mt-8 bg-gradient-to-r from-amber-500/10 via-amber-100/50 to-blue-50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
              Piler Phare • Jeunesse
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Évangélisation par le Sport & 4 Championnats d’Été à Thomonde
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
              Plus de 5 000 spectateurs et jeunes réunis chaque été : Tournoi Inter-Églises, Tournoi Féminin, Tournoi Inter-Zones et Tournoi Juniors. L'Évangile au cœur du sport.
            </p>
          </div>

          <Link
            href="/ministeres#sport-championships"
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
          >
            Explorer les tournois
          </Link>
        </div>
      </section>

      {/* 5. TEMPS FORTS EN VIDÉO */}
      <section className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-ama-blue-900 bg-blue-100/80 px-3 py-1 rounded-full">
              Médiathèque Vidéo
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Temps Forts de nos Campagnes & Rassemblements
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Revivez l’atmosphère spirituelle et communautaire de nos missions dans le Plateau Central.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video border-4 border-white">
            {/* Poster / Video simulation */}
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-t from-black/80 via-slate-900/60 to-black/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80"
                alt="Temps forts vidéo AMA"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />

              <div className="relative z-10 text-center p-6 space-y-4">
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 mx-auto"
                  aria-label="Lire la vidéo"
                >
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </button>
                <h3 className="font-serif font-bold text-white text-lg sm:text-2xl">
                  Rétrospective des Missions & Tournois d'Été à Thomonde
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Témoignages, proclamation sur les marchés et communion fraternelle autour du Lac de Péligre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANDEAU ACCÈS RAPIDE AUX DONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-ama-blue-900 via-blue-900 to-ama-blue-950 rounded-3xl text-white p-8 sm:p-12 shadow-xl border border-blue-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full">
                Soutien & Offrandes
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Participez activement à la moisson des 100 000 âmes
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Chaque don — qu’il s’agisse d’un don local via MonCash/Natcash ou d’un soutien de la diaspora — permet de financer les bibles, les tournois et l’aide aux personnes vulnérables.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <Link hidden
                href="/faire-un-don"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-ama-gold-600 to-amber-600 hover:from-ama-gold-700 hover:to-amber-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Faire un Don en Ligne</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors"
              >
                <span>Nous Contacter</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
