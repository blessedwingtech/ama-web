import React from 'react';
import { executiveCommittee, pastoralCollege } from '@/data/team';
import TeamMemberCard from '@/components/cards/TeamMemberCard';
import { Users, Shield, Award, Church, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Notre Équipe & Collège Pastoral',
  description:
    'Découvrez les membres du Comité Exécutif et le Collège Pastoral de l’Association 100,000 Âmes (AMA) à Thomonde, Haïti.',
};

export default function TeamPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Users className="w-4 h-4 text-amber-700" />
          <span>Gouvernance & Autorités Spirituelles</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Notre Équipe & Direction
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Des serviteurs et servantes dévoués, alliant rigueur administrative, compétences techniques et attachement inconditionnel à l'Évangile.
        </p>
      </section>

      {/* 1. COMITÉ EXÉCUTIF (6 MEMBRES DANS L'ORDRE STRICT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Organe Directeur
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
            Comité Exécutif de l'Association
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Les membres élus assurant la gestion stratégique, administrative et technique quotidienne d'AMA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {executiveCommittee.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* 2. COLLÈGE PASTORAL & MEMBRES FONDATEURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-ama-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full mb-3">
              <Church className="w-4 h-4 text-amber-400" />
              <span>Conseil Spirituel & Tutelle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {pastoralCollege.title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-1">
              {pastoralCollege.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {pastoralCollege.description}
            </p>
          </div>

          {/* Pastors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {pastoralCollege.pastors.map((pastor) => (
              <div
                key={pastor.id}
                className="bg-slate-800/80 p-6 sm:p-7 rounded-2xl border border-slate-700 hover:border-amber-400/50 transition-colors space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-serif font-bold text-lg">
                    {pastor.name.split(' ')[1]?.substring(0, 2) || 'P'}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">
                      {pastor.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-semibold">
                      {pastor.title}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-200">Assemblée :</span> {pastor.church}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {pastor.roleDescription}
                </p>
              </div>
            ))}
          </div>

          {/* Partner Churches Network */}
          <div className="pt-8 border-t border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>Assemblées Partenaires et Représentations Locales</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {pastoralCollege.partnerChurches.map((p, i) => (
                <div
                  key={i}
                  className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/80 text-center"
                >
                  <span className="text-amber-400 font-bold text-xs block">{p.zone}</span>
                  <span className="text-[11px] text-slate-300 line-clamp-1">{p.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 text-center mt-6 italic">
              Sous l'encadrement des diacres, diaconesses et délégués fraternels de Péligre, Sylguerre, Mirebalais, Feuillet et Vieux-Cayes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
