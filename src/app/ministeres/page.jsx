import React from 'react';
import { ministries } from '@/data/ministries';
import MinistryCard from '@/components/cards/MinistryCard';
import Link from 'next/link';
import {
  Layers,
  Heart,
  Trophy,
  Users,
  Megaphone,
  BookOpen,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Nos Ministères & Actions',
  description:
    'Découvrez les 5 piliers d’action de l’Association 100,000 Âmes : évangélisation de proximité, formation théologique, forums doctrinaux, championnats de football et diaconat.',
};

export default function MinistriesPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-ama-blue-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Layers className="w-4 h-4 text-ama-blue-700" />
          <span>Stratégie Holistique & Terrain</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Nos Ministères & Piliers d'Intervention
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Pour toucher durablement plus de 100 000 âmes d'ici 2050, notre action se déploie à travers 5 départements structurés répondant aux besoins spirituels, intellectuels et sociaux du Plateau Central.
        </p>
      </section>

      {/* 5 Detailed Ministry Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10">
          {ministries.map((ministry) => (
            <div key={ministry.id} id={ministry.id} className="scroll-mt-24">
              <MinistryCard ministry={ministry} isDetailed={true} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Focus on Sports Evangelism */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500/15 via-white to-blue-50/50 rounded-3xl p-8 sm:p-12 border border-amber-300 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-amber-700" />
                <span>Le Sport au Service de l'Évangile</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Pourquoi les 4 Championnats d’Été de Football à Thomonde ?
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Durant la période estivale, des milliers de jeunes et de familles se rassemblent spontanément autour du terrain communal de Thomonde. Plutôt que de laisser cet espace à l'oisiveté, AMA en a fait un sanctuaire de réconciliation, de saine émulation et de proclamation christocentrique.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-800 pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  ⚽ <strong>Tournoi Inter-Églises :</strong> Unité des dénominations.
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  ⚽ <strong>Tournoi Féminin :</strong> Valorisation des jeunes filles.
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  ⚽ <strong>Tournoi Inter-Zones :</strong> Paix entre quartiers & sections.
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  ⚽ <strong>Tournoi Juniors :</strong> Formation éthique des enfants.
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-amber-200 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-ama-blue-900 mb-1">
                +5 000
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4">
                Spectateurs et participants mobilisés chaque été
              </p>
              <Link
                href="/faire-un-don"
                className="w-full bg-gradient-to-r from-ama-gold-600 to-amber-600 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Parrainer un tournoi</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
