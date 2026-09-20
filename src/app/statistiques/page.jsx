'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  globalImpactStats,
  officialCompetitionsList,
  partnerChurchesStats,
  pillarsDistribution,
  visionMilestones,
} from '@/data/statistics';
import {
  BarChart3,
  TrendingUp,
  Users,
  Heart,
  BookOpen,
  Trophy,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowUpRight,
  Printer,
  Download,
  Flame,
  Globe,
  Layers,
  Sparkles,
  ChevronRight,
  Medal,
  Star,
} from 'lucide-react';

export default function StatistiquesPage() {
  const [statsData, setStatsData] = useState({
    globalStats: globalImpactStats,
    officialCompetitions: officialCompetitionsList,
    partnerChurches: partnerChurchesStats,
    pillarsDistribution,
    visionMilestones,
  });
  const [loading, setLoading] = useState(false);
  const [activeCompetitionId, setActiveCompetitionId] = useState(officialCompetitionsList[0]?.id);

  useEffect(() => {
    const fetchDynamicStats = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/statistics');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setStatsData(json.data);
          }
        }
      } catch (err) {
        console.warn('Utilisation des statistiques certifiées locales:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDynamicStats();
  }, []);

  const {
    globalStats,
    officialCompetitions = officialCompetitionsList,
    partnerChurches = partnerChurchesStats,
    pillarsDistribution: pillars = pillarsDistribution,
    visionMilestones: milestones = visionMilestones,
  } = statsData;

  const activeCompetition =
    officialCompetitions.find((c) => c.id === activeCompetitionId) || officialCompetitions[0];

  return (
    <div className="py-10 sm:py-16 space-y-12 sm:space-y-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span>Données Certifiées • Exercice 2025 - 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
          Tableau de Bord & Palmarès Officiel 2025
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Statistiques certifiées issues des procès-verbaux de jurys, des 4 grands concours bibliques et des assemblées générales de l'Association 100,000 Âmes.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/mediatheque"
            className="inline-flex items-center gap-2 bg-ama-blue-900 hover:bg-ama-blue-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Consulter les Rapports Complets dans la Médiathèque</span>
          </Link>
        </div>
      </section>

      {/* 2. SYNTHÈSE DES CHIFFRES CLÉS RÉELS 2025 */}
      <section className="bg-gradient-to-br from-slate-900 via-ama-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Flame className="w-4 h-4" />
                <span>Objectif Suprême d'Évangélisation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Vision 2050 : 100 000 Âmes Gagnées pour Christ
              </h2>
            </div>
            <div className="text-left md:text-right">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 font-mono">
                {globalStats?.visionTarget?.toLocaleString()}
              </span>
              <p className="text-xs text-slate-400 mt-0.5">Objectif à l'horizon 2050 dans le Plateau Central</p>
            </div>
          </div>

          {/* 6 Real KPI Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold">
                <Trophy className="w-4 h-4" />
                <span>Concours</span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white font-mono">
                {globalStats?.competitionsOrganized || 4}
              </div>
              <p className="text-[11px] text-slate-400">Épreuves officielles 2025</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
                <Medal className="w-4 h-4" />
                <span>Lauréats</span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 font-mono">
                {globalStats?.laureatesAwarded || 14}
              </div>
              <p className="text-[11px] text-slate-400">Gagnants récompensés</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-bold">
                <BookOpen className="w-4 h-4" />
                <span>Versets</span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-purple-300 font-mono">
                {globalStats?.totalVersesRecited || 723}
              </div>
              <p className="text-[11px] text-slate-400">Récités sans faute</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-blue-400 text-xs font-bold">
                <Globe className="w-4 h-4" />
                <span>Églises</span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-blue-300 font-mono">
                {globalStats?.partnerChurches || 5}
              </div>
              <p className="text-[11px] text-slate-400">Assemblées engagées</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-bold">
                <MapPin className="w-4 h-4" />
                <span>Localités</span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-rose-300 font-mono">
                {globalStats?.totalLocalitiesCovered || 5}
              </div>
              <p className="text-[11px] text-slate-400">Secteurs représentés</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-bold">
                <Star className="w-4 h-4" />
                <span>Record</span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 font-mono">
                230
              </div>
              <p className="text-[11px] text-slate-400">Versets (POLAS Vanessa)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PALMARÈS EXHAUSTIF DES 4 GRANDS CONCOURS 2025 */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Résultats Officiels
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-600" />
              <span>Palmarès Certifié des 4 Concours de l'Année 2025</span>
            </h2>
          </div>

          {/* Competition Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {officialCompetitions.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveCompetitionId(comp.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeCompetitionId === comp.id
                    ? 'bg-ama-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {comp.title.replace('Compétition de ', '').replace('Concours de ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Active Competition Detail Card */}
        {activeCompetition && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {activeCompetition.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeCompetition.date}</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 mt-1">
                  {activeCompetition.title}
                </h3>
                {activeCompetition.theme && (
                  <p className="text-xs sm:text-sm italic text-slate-600 mt-1">
                    Sujet : {activeCompetition.theme}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{activeCompetition.location}</span>
              </div>
            </div>

            {/* Laureates Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] sm:text-xs border-b border-slate-200">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Rang</th>
                    <th className="p-3.5">Nom & Prénom du Lauréat</th>
                    <th className="p-3.5">Assemblée / Église d'Origine</th>
                    <th className="p-3.5 text-center">Score / Performance</th>
                    <th className="p-3.5 rounded-r-xl">Distinction Officielle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeCompetition.laureates.map((l) => (
                    <tr key={l.rank} className="hover:bg-amber-50/30 transition-colors">
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          l.rank === 1
                            ? 'bg-amber-400 text-slate-900 shadow-xs'
                            : l.rank === 2
                            ? 'bg-slate-200 text-slate-800'
                            : l.rank === 3
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {l.rank === 1 ? '🥇' : l.rank === 2 ? '🥈' : l.rank === 3 ? '🥉' : l.rank}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                        {l.name}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {l.church}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-ama-blue-900 whitespace-nowrap">
                        {l.score}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-block bg-blue-50 text-blue-900 font-semibold text-xs px-2.5 py-1 rounded-lg border border-blue-100">
                          {l.distinction}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* 4. LES 5 ÉGLISES MEMBRES FONDATRICES RÉELLES */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Réseau d'Églises
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Globe className="w-6 h-6 text-ama-blue-900" />
            <span>Les 5 Églises Partenaires Fondatrices de l'Association</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Assemblées évangéliques ayant officiellement participé aux épreuves et siégeant au sein d'AMA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partnerChurches.map((church) => (
            <div
              key={church.id}
              className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs hover:border-amber-300 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {church.locality}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-600">
                    {church.laureatesCount} lauréat{church.laureatesCount > 1 ? 's' : ''}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                  {church.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{church.pastor}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <span className="text-slate-400 block font-semibold">Distinctions obtenues :</span>
                <p className="font-medium text-slate-800">{church.awards}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LES 4 PILIERS D'ACTION AUTHENTIQUES */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Structure Ministérielle
          </span>
          <h3 className="font-serif font-bold text-xl text-slate-900 mt-2 flex items-center gap-2">
            <Layers className="w-5 h-5 text-ama-blue-900" />
            <span>Répartition des 4 Piliers d'Action d'AMA</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-bold text-slate-900">{pillar.name}</span>
                <span className="font-bold font-mono text-slate-900">{pillar.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pillar.percentage}%`, backgroundColor: pillar.color }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. JALONS HISTORIQUES & PERSPECTIVES 2050 */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Trajectoire Historique
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Jalons Officiels de la Vision 2050
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2">
          {milestones.map((ms, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${
                idx < 4
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-white/80 border-slate-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 font-mono">{ms.year}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ms.status === 'Accompli' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ms.status}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">{ms.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ms.description}</p>
              </div>

              {ms.status === 'Accompli' && (
                <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1 border-t border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Jalon certifié & enregistré</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
