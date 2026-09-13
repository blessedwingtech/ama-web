import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import PeligreMap from '@/components/common/PeligreMap';
import {
  Calendar,
  Compass,
  Target,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Church,
  Cross,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

export const metadata = {
  title: 'À Propos & Statuts Légaux',
  description:
    "Découvrez l'historique, la vision 2050, la mission, le statut juridique et la cartographie d'intervention de l'Association 100,000 Âmes à Thomonde et autour du lac de Péligre.",
};

export default function AboutPage() {
  const faithStatements = [
    {
      title: "Les Saintes Écritures",
      content:
        "Nous croyons que la Bible est la Parole inspirée, infaillible et souveraine de Dieu, constituant l'unique règle suprême de foi et de conduite chrétienne.",
    },
    {
      title: "Le Dieu Unique et Trinitaire",
      content:
        "Nous croyons en un seul Dieu, éternellement existant en trois personnes divines distinctes et égales : le Père, le Fils et le Saint-Esprit.",
    },
    {
      title: "Le Salut par la Grâce en Jésus-Christ",
      content:
        "Nous croyons au salut parfait acquis par la mort expiatoire et la résurrection corporelle de Jésus-Christ, accessible à tout être humain par la seule foi et la repentance.",
    },
    {
      title: "L'Unité et la Mission de l'Église",
      content:
        "Nous croyons au sacerdoce de tous les croyants, à l'unité fraternelle des assemblées chrétiennes et à l'impératif de proclamer l'Évangile à toute créature.",
    },
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-ama-blue-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Church className="w-4 h-4 text-ama-blue-700" />
          <span>Identité • Vision • Engagement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          À Propos de l'Association 100,000 Âmes
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Une œuvre d’évangélisation, de discipulat et de relèvement communautaire ancrée au cœur du Plateau Central haïtien.
        </p>
      </section>

      {/* 1. HISTORIQUE & FONDATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-ama-gold-700 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Fondation Officielle</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Une vision née pour le réveil du Plateau Central
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Fondée le <strong>{siteConfig.foundationDate}</strong> à Thomonde, au sein de l'
                <strong>Église Évangélique Galilée de Delbourg</strong>, l'Association 100,000 Âmes (AMA) est née du fardeau spirituel d'ouvriers du Seigneur désirant unifier les forces évangéliques autour du lac de Péligre pour une moisson spirituelle sans précédent.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Face aux défis spirituels, économiques et sociaux de la région, AMA a choisi de déployer une stratégie holistique alliant la prédication sans compromis de l'Évangile, la formation doctrinale rigoureuse de la jeunesse et l'aide directe aux personnes vulnérables.
              </p>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-ama-blue-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-center text-center">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Date Mémorable
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold my-2 text-white">
                7 Août 2025
              </div>
              <p className="text-xs text-slate-300">
                Constitution officielle de l'Assemblée Générale constitutive à Thomonde (Centre, Haïti).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION - MISSION - BUT (TEXTES INTÉGRAUX EXACTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Notre Vision */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Notre Vision
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed italic bg-amber-50/60 p-4 rounded-xl border border-amber-100">
                « {siteConfig.vision} »
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-700">
              Horizon Stratégique 2050
            </div>
          </div>

          {/* Notre Mission */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-ama-blue-900 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6 text-ama-blue-700" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Notre Mission
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed italic bg-blue-50/60 p-4 rounded-xl border border-blue-100">
                « {siteConfig.mission} »
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-ama-blue-800">
              Coalition & Action Holistique
            </div>
          </div>

          {/* Notre But */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                <Target className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Notre But
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed italic bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                « {siteConfig.goal} »
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-800">
              Salut, Édification & Solidarité
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATUT JURIDIQUE & IDENTITÉ CONFESSIONNELLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conformité Légale & Institutionnelle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
              Statut Juridique & Identité Confessionnelle
            </h2>
            <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic bg-slate-800/80 p-5 rounded-2xl border border-slate-700 mb-6">
              « {siteConfig.legalStatus.fullStatement} »
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <span className="text-slate-400 block mb-1">Nature Juridique :</span>
                <span className="font-semibold text-amber-300">{siteConfig.legalStatus.nature}</span>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <span className="text-slate-400 block mb-1">Durée :</span>
                <span className="font-semibold text-amber-300">{siteConfig.legalStatus.duration}</span>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <span className="text-slate-400 block mb-1">Instances de tutelle :</span>
                <span className="font-semibold text-emerald-300">MAST, Cultes, Mairie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CARTOGRAPHIE D'ACTION (LEAFLET / OPENSTREETMAP COMPOSANT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Rayonnement Régional
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
            Cartographie d'Action autour du Lac de Péligre
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Découvrez nos zones d'intervention et nos assemblées partenaires (Thomonde, Delbourg, Péligre, Sylguerre, Mirebalais, Feuillet, Vieux-Cayes).
          </p>
        </div>

        <PeligreMap />
      </section>

      {/* 5. DÉCLARATION DE FOI CHRÉTIENNE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-ama-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-ama-blue-700" />
              <span>Fondement Doctrinal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Déclaration de Foi Chrétienne
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Les vérités bibliques inébranlables qui guident chacune de nos actions et proclamations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faithStatements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-ama-blue-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500 italic">
            * Déclaration doctrinale conforme aux principes évangéliques historiques de la Réforme et de la foi chrétienne orthodoxe.
          </div>
        </div>
      </section>
    </div>
  );
}
