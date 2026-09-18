'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import ContactForm from '@/components/forms/ContactForm';
import PrayerRequestForm from '@/components/forms/PrayerRequestForm';
import MembershipForm from '@/components/forms/MembershipForm';
import PeligreMap from '@/components/common/PeligreMap';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  Users,
  Send,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const [activeFormTab, setActiveFormTab] = useState('contact');

  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-ama-blue-900 text-xs font-bold uppercase tracking-wider mb-4">
          <MessageSquare className="w-4 h-4 text-ama-blue-700" />
          <span>Écoute • Prière • Engagement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Contact & Adhésion
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Que vous souhaitiez nous poser une question, nous confier un sujet de prière confidentiel ou rejoindre l’Association en tant que membre, notre équipe est à votre service.
        </p>
      </section>

      {/* 1. COORDONNÉES OFFICIELLES & CARTE RAPIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Box 1: Téléphones */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Lignes Téléphoniques
              </h3>
              <p className="text-xs text-slate-500 mb-2">Appels & WhatsApp direct</p>
              <div className="space-y-1 font-mono text-xs sm:text-sm font-semibold text-ama-blue-900">
                <div>
                  <a href="tel:+50936512047" className="hover:underline">
                    +509 3651-2047
                  </a>{' '}
                  <span className="text-[10px] text-red-600 font-sans">(MonCash)</span>
                </div>
                <div>
                  <a href="tel:+50932529060" className="hover:underline">
                    +509 3252-9060
                  </a>{' '}
                  <span className="text-[10px] text-emerald-600 font-sans">(Natcash)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Email */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-ama-blue-800 border border-blue-200 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Courrier Électronique
              </h3>
              <p className="text-xs text-slate-500 mb-2">Secrétariat & Direction</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-xs sm:text-sm font-bold text-ama-blue-900 hover:underline break-all"
              >
                {siteConfig.email}
              </a>
              <p className="text-[11px] text-slate-400 mt-1">Réponse sous 24h à 48h</p>
            </div>
          </div>

          {/* Box 3: Siège */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Siège Institutionnel
              </h3>
              <p className="text-xs text-slate-500 mb-1">Delbourg, Thomonde</p>
              <p className="text-xs text-slate-700 leading-snug">
                {siteConfig.headquarters.fullAddress}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORMULAIRES AVEC SÉLECTEUR D'ONGLETS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-1">
          <button
            onClick={() => setActiveFormTab('contact')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFormTab === 'contact'
                ? 'bg-white text-ama-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Contact Général</span>
          </button>

          <button
            onClick={() => setActiveFormTab('prayer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFormTab === 'prayer'
                ? 'bg-white text-amber-900 shadow-sm border border-amber-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>Demande de Prière</span>
          </button>

          <button
            onClick={() => setActiveFormTab('membership')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFormTab === 'membership'
                ? 'bg-white text-ama-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-ama-blue-700" />
            <span>Formulaire d'Adhésion</span>
          </button>
        </div>

        {/* Form Containers */}
        {activeFormTab === 'contact' && <ContactForm />}
        {activeFormTab === 'prayer' && <PrayerRequestForm />}
        {activeFormTab === 'membership' && <MembershipForm />}
      </section>

      {/* 3. GÉOLOCALISATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Localisation
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Nous Trouver à Thomonde (Centre, Haïti)
          </h2>
        </div>

        <PeligreMap />
      </section>
    </div>
  );
}
