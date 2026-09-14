'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  globalImpactStats,
  quarterlyEvolution,
  localityImpact,
  pillarsDistribution,
  financialTransparency,
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
} from 'lucide-react';

export default function StatistiquesPage() {
  const [activeQuarterIndex, setActiveQuarterIndex] = useState(quarterlyEvolution.length - 1);
  const [selectedLocality, setSelectedLocality] = useState(localityImpact[0]);

  const progressPercent = Math.min(
    100,
    ((globalImpactStats.currentReachedSouls / globalImpactStats.visionTarget) * 100).toFixed(1)
  );

  const activeQuarter = quarterlyEvolution[activeQuarterIndex];

  return (
    <div className="py-10 sm:py-16 space-y-14 sm:space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span>Indicateurs de Performance & Évolution d'Impact</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
          Tableau de Bord Statistique & Vision 2050
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Suivi consolidé de la proclamation de l'Évangile, des conversions enregistrées, du réseau d'églises partenaires, des actions de diaconat et de la redevabilité financière dans le Plateau Central.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimer / Exporter cette Fiche Analytique</span>
          </button>
          <Link
            href="/mediatheque"
            className="inline-flex items-center gap-2 bg-ama-blue-900 hover:bg-ama-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Consulter les Rapports Périodiques Détaillés</span>
          </Link>
        </div>
      </section>

      {/* 2. VISION 2050 : JAUGE PRINCIPALE DE PROGRESSION */}
      <section className="bg-gradient-to-br from-slate-900 via-ama-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Flame className="w-4 h-4" />
                <span>Objectif Stratégique Suprême</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Progression vers la Vision 2050 : 100 000 Âmes
              </h2>
            </div>
            <div className="text-left md:text-right">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 font-mono">
                {globalImpactStats.currentReachedSouls.toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm font-medium"> / {globalImpactStats.visionTarget.toLocaleString()} âmes</span>
              <p className="text-xs text-slate-400 mt-0.5">Personnes sensibilisées & touchées sur le terrain</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Phase 1 : Enracinement Régional (2025-2027)</span>
              <span className="text-amber-400 font-mono font-bold">{progressPercent}% accompli</span>
            </div>
            <div className="w-full h-4 sm:h-5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-ama-gold-400 to-amber-300 rounded-full transition-all duration-1000 shadow-inner"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              ></div>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <Heart className="w-4 h-4" />
                <span>Décisions</span>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white font-mono">
                +{globalImpactStats.confirmedDecisionsForChrist}
              </div>
              <p className="text-[11px] text-slate-400">Engagements de foi</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1">
                <Globe className="w-4 h-4" />
                <span>Églises</span>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white font-mono">
                {globalImpactStats.partnerChurches}
              </div>
              <p className="text-[11px] text-slate-400">Assemblées associées</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <Trophy className="w-4 h-4" />
                <span>Jeunesse</span>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white font-mono">
                {globalImpactStats.youthAthletesEngaged.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400">Participants aux tournois</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Bibles</span>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white font-mono">
                {globalImpactStats.biblesDistributed}
              </div>
              <p className="text-[11px] text-slate-400">Bibles & portions données</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-1">
                <Users className="w-4 h-4" />
                <span>Secours</span>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white font-mono">
                {globalImpactStats.socialAidBeneficiaries}
              </div>
              <p className="text-[11px] text-slate-400">Familles secourues</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Ouvriers</span>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-white font-mono">
                {globalImpactStats.activeVolunteers}+
              </div>
              <p className="text-[11px] text-slate-400">Évangélistes & bénévoles</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ÉVOLUTION CHRONOLOGIQUE TRIMESTRIELLE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Séries Temporelles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-ama-blue-900" />
              <span>Évolution Périodique Trimestre par Trimestre</span>
            </h2>
          </div>

          {/* Period Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {quarterlyEvolution.map((q, idx) => (
              <button
                key={q.quarter}
                onClick={() => setActiveQuarterIndex(idx)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeQuarterIndex === idx
                    ? 'bg-ama-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {q.quarter}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Quarter Analytical Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Période Sélectionnée :
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                {activeQuarter.label}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
              <Calendar className="w-4 h-4 text-ama-blue-700" />
              <span>Budget Alloué & Exécuté : <strong>{activeQuarter.budgetSpentHtg.toLocaleString()} HTG</strong></span>
            </div>
          </div>

          {/* Visual Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-ama-blue-900 flex items-center justify-between">
                <span>Âmes Touchées</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 font-mono">
                {activeQuarter.soulsReached.toLocaleString()}
              </div>
              <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-ama-blue-900 h-full rounded-full"
                  style={{ width: `${Math.min(100, (activeQuarter.soulsReached / 5000) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500">Croisades, marchés & championnats</p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center justify-between">
                <span>Décisions pour Christ</span>
                <Heart className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-700 font-mono">
                +{activeQuarter.decisions}
              </div>
              <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (activeQuarter.decisions / 150) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500">Engagements orientés en églises</p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center justify-between">
                <span>Églises Actives</span>
                <Globe className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700 font-mono">
                {activeQuarter.churches} églises
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (activeQuarter.churches / 30) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500">Réseau pastoral concerté</p>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center justify-between">
                <span>Familles Aidées</span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-purple-800 font-mono">
                {activeQuarter.aidFamilies} familles
              </div>
              <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (activeQuarter.aidFamilies / 150) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500">Programme diaconal de secours</p>
            </div>
          </div>

          {/* Cumulative Growth Timeline Summary */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Historique Cumulé des Trimestres (T3 2025 → 2026) :
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quarterlyEvolution.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    activeQuarterIndex === i
                      ? 'bg-ama-blue-900 text-white border-ama-blue-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">{item.quarter}</div>
                  <div className="text-sm font-serif font-bold font-mono mt-1">
                    {item.soulsReached.toLocaleString()} âmes
                  </div>
                  <div className={`text-[10px] mt-0.5 ${activeQuarterIndex === i ? 'text-amber-300' : 'text-slate-500'}`}>
                    +{item.decisions} décisions • {item.churches} églises
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. VENTILATION TERRITORIALE & LOCALE (7 ZONES) */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Analyse Géographique
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-ama-blue-900" />
            <span>Répartition de l'Impact par Localité du Plateau Central</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Déploiement stratégique concentré sur les 7 zones prioritaires de Thomonde et du Bassin du Lac de Péligre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Locality Table & Percentages */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Données Consolidées par Zone d'Intervention
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Localité</th>
                    <th className="p-3">Commune</th>
                    <th className="p-3">Âmes Touchées</th>
                    <th className="p-3">Décisions</th>
                    <th className="p-3">Églises</th>
                    <th className="p-3">Part</th>
                    <th className="p-3 text-right">Détails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {localityImpact.map((loc) => {
                    const isSelected = selectedLocality.id === loc.id;
                    return (
                      <tr
                        key={loc.id}
                        onClick={() => setSelectedLocality(loc)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/80 font-bold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                          <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-ama-blue-900' : 'text-slate-400'}`} />
                          <span>{loc.name}</span>
                        </td>
                        <td className="p-3 text-slate-500">{loc.commune}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">
                          {loc.soulsReached.toLocaleString()}
                        </td>
                        <td className="p-3 font-mono font-bold text-amber-700">+{loc.decisions}</td>
                        <td className="p-3 text-slate-700">{loc.churches}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            {loc.percentage}%
                          </span>
                        </td>
                        <td className="p-3 text-right text-ama-blue-700 text-[11px] font-semibold">
                          {isSelected ? '★ Actif' : 'Voir'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Locality Detail Card */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  Fiche Zone
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedLocality.percentage}% de l'impact
                </span>
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-white leading-tight">
                  {selectedLocality.name}
                </h4>
                <p className="text-xs text-amber-300 font-medium mt-0.5">
                  Commune de {selectedLocality.commune}
                </p>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Action principale menée :</span>
                  <p className="font-semibold text-white mt-0.5">{selectedLocality.keyAction}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700 text-xs">
                  <div>
                    <span className="text-slate-400">Âmes atteintes :</span>
                    <p className="font-bold text-white font-mono text-base">{selectedLocality.soulsReached.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Décisions :</span>
                    <p className="font-bold text-amber-400 font-mono text-base">+{selectedLocality.decisions}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Les assemblées locales de cette zone assurent le suivi hebdomadaire des nouveaux convertis via les cours de discipulat et le baptême scripturaire.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <Link
                href="/a-propos"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                <span>Voir la Carte Interactive Complète</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PILIERS D'INTERVENTION & TRANSPARENCE FINANCIÈRE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pilier breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Ventilation Opérationnelle
            </span>
            <h3 className="font-serif font-bold text-xl text-slate-900 mt-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-ama-blue-900" />
              <span>Répartition par Pilier Ministériel</span>
            </h3>
          </div>

          <div className="space-y-4">
            {pillarsDistribution.map((pillar, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{pillar.name}</span>
                  <span className="font-bold font-mono text-slate-900">{pillar.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pillar.percentage}%`, backgroundColor: pillar.color }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Transparency */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Redevabilité & Éthique
            </span>
            <h3 className="font-serif font-bold text-xl text-slate-900 mt-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Transparence & Utilisation des Dons</span>
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Taux d'Affectation Terrain
              </span>
              <div className="text-3xl font-serif font-bold text-emerald-800 font-mono">
                {financialTransparency.fieldAllocationRate}%
              </div>
              <p className="text-[11px] text-emerald-700">Dépensé directement pour les missions & aides</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Frais administratifs :</span>
              <div className="text-lg font-bold text-slate-700 font-mono">
                {financialTransparency.adminOverheadRate}%
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Répartition des dépenses auditées ({financialTransparency.totalMobilizedHtg.toLocaleString()} HTG) :
            </h4>
            {financialTransparency.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <span className="text-slate-600 max-w-[65%]">{item.label}</span>
                <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                  {item.percentage}% ({item.amountHtg.toLocaleString()} HTG)
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEUILLE DE ROUTE VISION 2050 (4 PHASES) */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Vision 25 Ans
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Feuille de Route des 4 Phases Stratégiques
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Planification structurée pour l'expansion missionnaire dans les 10 départements d'Haïti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {visionMilestones.map((ms, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${
                idx === 0
                  ? 'bg-white border-ama-blue-900 shadow-md ring-2 ring-ama-blue-900/10'
                  : 'bg-white/80 border-slate-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 font-mono">{ms.year}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    idx === 0 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ms.status}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">{ms.phase}</h4>
                <div className="text-xs font-bold text-ama-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg">
                  Cible : {ms.target}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ms.description}</p>
              </div>

              {idx === 0 && (
                <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Phase active en cours de déploiement</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA BAS DE PAGE */}
      <section className="bg-gradient-to-r from-ama-blue-900 to-ama-blue-800 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-2xl mx-auto">
          Rejoignez ce Mouvement de Réveil et de Solidarité dans le Centre
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          Chaque chiffre représente une vie restaurée, une famille soutenue et une assemblée fortifiée dans les Écritures.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/faire-un-don"
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-slate-900" />
            <span>Soutenir les Prochaines Campagnes</span>
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            <span>Devenir Membre / Partenaire</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
