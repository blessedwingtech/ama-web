import React from 'react';
import PaymentGuide from '@/components/donation/PaymentGuide';
import DonationForm from '@/components/donation/DonationForm';
import {
  Heart,
  ShieldCheck,
  BookOpen,
  Trophy,
  Users,
  CheckCircle2,
  Sparkles,
  Smartphone,
  CreditCard,
} from 'lucide-react';

export const metadata = {
  title: 'Nous Soutenir & Faire un Don',
  description:
    'Soutenez l’Association 100,000 Âmes (AMA) à Thomonde via MonCash (3252-9060), Natcash (3651-2047), PayPal, cartes bancaires ou parrainage de bibles.',
};

export default function DonatePage() {
  const usageAreas = [
    {
      title: "Campagnes d'Évangélisation",
      desc: "Sonorisation, impression de tracts, logistique de transport dans les localités reculées de Thomonde et du lac de Péligre.",
      icon: Users,
    },
    {
      title: "Championnats & Jeunesse",
      desc: "Organisation des 4 tournois d'été, achat de ballons, trophées, médailles et collations pour les 5 000 participants.",
      icon: Trophy,
    },
    {
      title: "Programme de Secours & Diaconat",
      desc: "Aide directe aux familles endeuillées, produits d'hygiène et soutien ménager pour les personnes âgées isolées.",
      icon: Heart,
    },
    {
      title: "Bibles & Formation Théologique",
      desc: "Distribution gratuite de Bibles d'étude et soutien aux séminaires de formation pour les moniteurs et jeunes prédicateurs.",
      icon: BookOpen,
    },
  ];

  return (
    <div hidden className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span>Partenariat & Soutien de la Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Nous Soutenir / Faire un Don
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie. » — 2 Corinthiens 9:7
        </p>
      </section>

      {/* 1. UTILITÉ DES DONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full">
              Transparence & Affectation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
              À quoi servent concrètement vos dons ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Chaque contribution est allouée avec rigueur et intégrité sous le contrôle du Trésorier Général et du Comité Exécutif.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usageAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700/80 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">
                    {area.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. GUIDES DE PAIEMENT DÉTAILLÉS (MONCASH, NATCASH, PAYPAL, PARRAINAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Canaux Disponibles
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Instructions de Transfert & Coordonnées Officielles
          </h2>
        </div>

        <PaymentGuide />
      </section>

      {/* 3. FORMULAIRE DE DON DIRECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DonationForm />
      </section>
    </div>
  );
}
