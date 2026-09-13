'use client';

import React, { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrayerRequestForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    description: '',
    isAnonymous: false,
    isPrivate: true,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/prayer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Votre sujet de prière a été reçu avec amour. Nous prions avec vous.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          title: '',
          description: '',
          isAnonymous: false,
          isPrivate: true,
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Erreur lors de l’envoi de votre requête.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Impossible de contacter le serveur. Veuillez vérifier votre connexion.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xl text-slate-900">
            {t('contact.prayerTitle', 'Demande de Prière Confidentielle')}
          </h3>
          <p className="text-xs text-amber-900 font-medium">
            Confiez votre fardeau à la chaîne d'intercession pastorale d'AMA.
          </p>
        </div>
      </div>

      <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          <strong>Garantie de Confidentialité :</strong> Votre demande de prière ne sera partagée qu'avec les pasteurs et intercesseurs consacrés de l'Association 100,000 Âmes.
        </span>
      </div>

      {status.type === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>{status.message}</div>
        </div>
      )}

      {status.type === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>{status.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <input
            type="checkbox"
            id="isAnon"
            checked={formData.isAnonymous}
            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
            className="w-4 h-4 text-ama-blue-900 rounded-sm border-slate-300 focus:ring-ama-blue-900"
          />
          <label htmlFor="isAnon" className="text-xs font-semibold text-slate-700 cursor-pointer">
            Je souhaite soumettre cette prière de manière <strong>Anonyme</strong>
          </label>
        </div>

        {!formData.isAnonymous && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Votre Nom / Prénom
              </label>
              <input
                type="text"
                placeholder="Votre nom"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Téléphone ou WhatsApp
              </label>
              <input
                type="tel"
                placeholder="+509 ... ou +1 ..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Titre ou Sujet du Besoin *
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Guérison d'un proche, Délivrance, Paix familiale, Emploi..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Détails de la Requête de Prière *
          </label>
          <textarea
            required
            rows="4"
            placeholder="Expliquez votre situation en toute confiance..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-ama-gold-600 to-amber-600 hover:from-ama-gold-700 hover:to-amber-700 text-white font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmission...</span>
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 fill-white" />
              <span>Transmettre à l’Équipe d’Intercession</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
