'use client';

import React, { useState } from 'react';
import { Users, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MembershipForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Thomonde',
    church: '',
    roleInChurch: '',
    motivation: '',
    skills: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Votre adhésion a été enregistrée avec succès. Gloire à Dieu !',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: 'Thomonde',
          church: '',
          roleInChurch: '',
          motivation: '',
          skills: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Erreur lors de l’envoi de votre demande d’adhésion.',
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
    <div className="bg-white rounded-3xl border border-blue-200/80 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-ama-blue-900 text-white flex items-center justify-center">
          <Users className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xl text-slate-900">
            {t('contact.membershipTitle', 'Formulaire d’Adhésion & Engagement')}
          </h3>
          <p className="text-xs text-slate-500">
            Devenez membre actif ou serviteur bénévole dans les campagnes et ministères d'AMA.
          </p>
        </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Frère / Sœur ..."
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Adresse Email *
            </label>
            <input
              type="email"
              required
              placeholder="votre.email@domaine.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Téléphone / WhatsApp *
            </label>
            <input
              type="tel"
              required
              placeholder="+509 ... ou +1 ..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Ville / Commune de Résidence *
            </label>
            <input
              type="text"
              required
              placeholder="Thomonde, Mirebalais, Hinche, Diaspora..."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Église chrétienne d'appartenance *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Église Galilée de Delbourg, Église Baptiste..."
              value={formData.church}
              onChange={(e) => setFormData({ ...formData, church: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Responsabilité / Fonction ecclésiale
            </label>
            <input
              type="text"
              placeholder="Ex: Moniteur, Membre, Diacre, Choriste..."
              value={formData.roleInChurch}
              onChange={(e) => setFormData({ ...formData, roleInChurch: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Motivation pour rejoindre l’Association 100,000 Âmes *
          </label>
          <textarea
            required
            rows="3"
            placeholder="Partagez votre cœur pour la mission d'évangélisation et votre désir de servir..."
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Talents ou compétences que vous souhaitez mettre au service du Seigneur
          </label>
          <input
            type="text"
            placeholder="Ex: Évangélisation, enseignement d'enfants, chant, logistique, secrétariat, sport..."
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-ama-blue-900 hover:bg-ama-blue-800 text-white font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enregistrement...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Soumettre ma Demande d'Adhésion</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
