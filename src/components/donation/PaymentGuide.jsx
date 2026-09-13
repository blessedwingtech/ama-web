'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import {
  Smartphone,
  Copy,
  Check,
  CreditCard,
  Building,
  Heart,
  BookOpen,
  Trophy,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function PaymentGuide() {
  const [activeTab, setActiveTab] = useState('moncash');
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const tabs = [
    { id: 'moncash', label: 'MonCash (Digicel)', icon: Smartphone, color: 'text-red-600' },
    { id: 'natcash', label: 'Natcash (Natcom)', icon: Smartphone, color: 'text-emerald-600' },
    { id: 'paypal', label: 'PayPal / CB (Diaspora)', icon: CreditCard, color: 'text-blue-600' },
    { id: 'sponsorship', label: 'Parrainages Ciblés', icon: Trophy, color: 'text-amber-600' },
    { id: 'bank', label: 'Virement Églises', icon: Building, color: 'text-slate-700' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
      {/* Tabs selector */}
      <div className="bg-slate-100/80 p-2 border-b border-slate-200 flex overflow-x-auto gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-ama-blue-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-8">
        {/* MonCash Guide */}
        {activeTab === 'moncash' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-red-50 p-5 rounded-2xl border border-red-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-100/80 px-2.5 py-0.5 rounded-full">
                  Paiement Mobile Local
                </span>
                <h3 className="font-serif font-bold text-xl text-red-950 mt-1">
                  Compte Officiel MonCash Digicel
                </h3>
                <p className="text-xs text-red-800 mt-0.5 font-medium">
                  Titulaire : {siteConfig.paymentMethods.moncash.accountName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="font-mono text-2xl font-bold text-red-700 bg-white px-4 py-2 rounded-xl border border-red-200 shadow-xs">
                  {siteConfig.primaryPhone}
                </div>
                <button
                  onClick={() => copyToClipboard(siteConfig.primaryPhone, 'moncash-num')}
                  className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors"
                  title="Copier le numéro"
                >
                  {copiedKey === 'moncash-num' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">
                Comment envoyer votre don via MonCash :
              </h4>
              <ol className="space-y-2.5 text-sm text-slate-700 list-decimal list-inside">
                {siteConfig.paymentMethods.moncash.instructionSteps.map((step, idx) => (
                  <li key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Natcash Guide */}
        {activeTab === 'natcash' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Paiement Mobile Local
                </span>
                <h3 className="font-serif font-bold text-xl text-emerald-950 mt-1">
                  Compte Officiel Natcash Natcom
                </h3>
                <p className="text-xs text-emerald-800 mt-0.5 font-medium">
                  Titulaire : {siteConfig.paymentMethods.natcash.accountName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="font-mono text-2xl font-bold text-emerald-700 bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-xs">
                  {siteConfig.secondaryPhone}
                </div>
                <button
                  onClick={() => copyToClipboard(siteConfig.secondaryPhone, 'natcash-num')}
                  className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
                  title="Copier le numéro"
                >
                  {copiedKey === 'natcash-num' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">
                Comment envoyer votre don via Natcash :
              </h4>
              <ol className="space-y-2.5 text-sm text-slate-700 list-decimal list-inside">
                {siteConfig.paymentMethods.natcash.instructionSteps.map((step, idx) => (
                  <li key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* PayPal & Diaspora Guide */}
        {activeTab === 'paypal' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                Soutien Diaspora & Monde
              </span>
              <h3 className="font-serif font-bold text-xl text-blue-950 mt-2 mb-1">
                PayPal et Cartes Bancaires Internationales (Visa / MasterCard / Amex)
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {siteConfig.paymentMethods.paypal.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={siteConfig.paymentMethods.paypal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors"
                >
                  <span>Faire un Don Sécurisé par Carte / PayPal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => copyToClipboard(siteConfig.paymentMethods.paypal.email, 'paypal-email')}
                  className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 px-4 py-3 rounded-xl font-mono text-xs font-semibold transition-colors"
                >
                  <span>{siteConfig.paymentMethods.paypal.email}</span>
                  {copiedKey === 'paypal-email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Targeted Sponsorships */}
        {activeTab === 'sponsorship' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900 mb-1">
                  Parrainage de Bibles & Portions
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Offrez une Bible complète d’étude ou un Nouveau Testament aux nouveaux convertis et aux participants des concours de génie biblique.
                </p>
                <div className="p-3 bg-white rounded-xl border border-amber-200/70 text-xs font-semibold text-amber-900">
                  Formule recommandée : <strong>1 500 HTG / ~12 USD</strong> par Bible
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="w-10 h-10 rounded-xl bg-ama-blue-800 text-white flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900 mb-1">
                  Parrainage de Trophées & Équipements
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Soutenez les prix d'excellence sportive et spirituelle pour les championnats d'été (Inter-Églises, Féminin, Juniors).
                </p>
                <div className="p-3 bg-white rounded-xl border border-blue-200/70 text-xs font-semibold text-ama-blue-900">
                  Formule recommandée : <strong>5 000 HTG / ~40 USD</strong> par Trophée
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Guide */}
        {activeTab === 'bank' && (
          <div className="space-y-4 animate-fade-in bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Virements Bancaires & Soutien Institutionnel
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {siteConfig.paymentMethods.bankTransfer.note}
            </p>
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Email officiel :</strong>{' '}
                <a href={`mailto:${siteConfig.paymentMethods.bankTransfer.contactEmail}`} className="text-ama-blue-700 underline">
                  {siteConfig.paymentMethods.bankTransfer.contactEmail}
                </a>
              </p>
              <p>
                <strong>Téléphone Trésorerie :</strong>{' '}
                <span className="font-mono font-bold text-slate-800">
                  {siteConfig.paymentMethods.bankTransfer.contactPhone}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Transparency note */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex items-start gap-3 text-xs text-slate-500">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p>
            <strong>Transparence & Rigueur Financière :</strong> L'Association 100,000 Âmes (AMA) opère sous la supervision de son Trésorier Général (Jean-Rony Fontil) et publie des rapports réguliers aux églises membres. Chaque don est rigoureusement alloué selon l'intention du donateur.
          </p>
        </div>
      </div>
    </div>
  );
}
