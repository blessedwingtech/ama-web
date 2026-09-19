'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import { ministries } from '@/data/ministries';
import { initialAnnouncements } from '@/data/announcements';
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
  Megaphone,
  Bell,
  Clock,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    // Fetch dynamic announcements
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.announcements && data.announcements.length > 0) {
          setAnnouncements(data.announcements);
        }
      })
      .catch(() => {});

    // Fetch dynamic stats
    fetch('/api/statistics')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.globalStats) {
          setLiveStats(data.data.globalStats);
        }
      })
      .catch(() => {});
  }, []);

  const urgentAnnouncement = announcements.find((a) => a.isUrgent);

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* 0. URGENT ANNOUNCEMENT TOP BANNER (IF ANY) */}
      {urgentAnnouncement && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white px-4 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-white text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider shrink-0">
                Officiel
              </span>
              <span className="font-semibold">{urgentAnnouncement.title}</span>
            </div>
            <Link
              href="/mediatheque"
              className="inline-flex items-center gap-1 font-bold underline hover:text-amber-200 text-xs shrink-0"
            >
              <span>Consulter le communiqué</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ama-blue-950 via-ama-blue-900 to-slate-900 text-white py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{t('hero.badge', 'Vision 2050 pour le Plateau Central')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                {t('hero.title', 'Plus de 100 000 Âmes Gagnées, Restaurées et Formées pour Christ')}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t(
                  'hero.subtitle',
                  "Organisation chrétienne protestante unissant les assemblées évangéliques de Thomonde, Delbourg, Plaine du Pré, Vieux-Cayes, Feuillet et Sylguerre pour un réveil spirituel et un impact social concret."
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

                <Link
                  href="/mediatheque"
                  className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Palmarès & Concours 2025</span>
                </Link>
              </div>

              {/* Location Badge */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
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
                        <p className="text-xs text-amber-400">Plateau Central • Siège Delbourg</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Fondée le 7 Août 2025
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
                      <span>Coalition d’églises du Plateau Central</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Compétitions de Versets & Génie Biblique</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>4 Grands Concours Officiels réalisés en 2025</span>
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

      {/* 2. COMPTEUR D'IMPACT (DONNÉES RÉELLES SYNCHRONISÉES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Chiffres Réels & Trajectoire 2050
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Un Impact Spirituel et Scripturaire Concret
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col justify-center items-center">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-ama-blue-900">
                100 000
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1">Objectif Vision 2050</p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col justify-center items-center">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-600">
                {liveStats ? liveStats.competitionsOrganized || 4 : 4}
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1">Grands Concours (2025)</p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col justify-center items-center">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-emerald-700">
                {liveStats ? liveStats.laureatesAwarded || 14 : 14}
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1">Lauréats Récompensés</p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col justify-center items-center">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-blue-900">
                {liveStats ? liveStats.partnerChurches || 5 : 5}
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1">Églises Partenaires</p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col justify-center items-center col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-purple-900">
                230
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1">Record Versets Mémorisés</p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400 italic">
            * Données certifiées issues des procès-verbaux de jury et des assemblées générales d'AMA.
          </div>
        </div>
      </section>

      {/* 3. SECTION PUBLICATIONS & ANNONCES OFFICIELLES (DYNAMIQUE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Actualités & Communiqués
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Annonces & Publications Officielles
            </h2>
          </div>

          <Link
            href="/mediatheque"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-800 hover:text-blue-900"
          >
            <span>Voir toute la médiathèque</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.slice(0, 2).map((ann) => (
            <div
              key={ann.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-4 ${
                ann.isUrgent
                  ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                  : 'bg-white border-slate-200 shadow-sm hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-900">
                  {ann.category}
                </span>
                {ann.eventDate && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{ann.eventDate}</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">{ann.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{ann.summary}</p>
              </div>

              {ann.location && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{ann.location}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. MOT DU PRÉSIDENT (PASTEUR YVON BATHOL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-ama-blue-950 rounded-3xl text-white p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* President Avatar */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-[22px] bg-slate-800 flex items-center justify-center font-serif text-4xl sm:text-5xl font-bold text-amber-300 border border-white/20">
                    YB
                  </div>
                </div>
                <div className="absolute -bottom-3 bg-ama-blue-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/50 shadow-md">
                  Président AMA
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-serif font-bold text-xl text-white">
                  Pasteur Yvon BATHOL
                </h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">
                  Président du Comité Exécutif
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Pasteur de l'Église Évangélique Galilée de Delbourg
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
                Le Pasteur Yvon Bathol veille à l'ancrage scripturaire, à la pureté de la doctrine et au déploiement des compétitions de mémorisation de la Parole de Dieu. Épaulé par Julberson TOUTOUTE (Vice-Président), Jean-Paul BLANC (Secrétaire Général), Gilbert VOYELLE (Secrétaire Adjoint) et l'ensemble du corps pastoral régional, l'Association œuvre sans relâche pour la propagation du salut en Jésus-Christ.
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

      {/* 5. APERÇU DES PILIERS D'INTERVENTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Nos Ministères
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
              {t('pillars.title', 'Nos Piliers d’Intervention')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              {t(
                'pillars.subtitle',
                'Une action équilibrée unissant proclamation de l’Évangile, génie biblique, encadrement de la jeunesse et diaconat.'
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
      </section>

      {/* 6. BANDEAU DE CONTACT & ENGAGEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-ama-blue-900 via-blue-900 to-ama-blue-950 rounded-3xl text-white p-8 sm:p-12 shadow-xl border border-blue-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full">
                Rejoignez la Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Participez activement à la moisson des 100 000 âmes
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Que vous soyez serviteur de Dieu, jeune récitateur ou croyant désireux de vous engager comme membre actif ou bénévole, votre place est parmi nous.
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
