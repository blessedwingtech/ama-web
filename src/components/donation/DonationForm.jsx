'use client';

import React, { useState } from 'react';
import {
  Heart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Printer,
  FileCheck,
  Send,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function DonationForm() {
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    amount: '1000',
    currency: 'HTG',
    channel: 'MONCASH',
    targetProject: 'GENERAL',
    referenceCode: '',
    notes: '',
  });

  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const predefinedAmounts = [
    { htg: '500', usd: '5', label: '500 HTG / $5' },
    { htg: '1000', usd: '10', label: '1 000 HTG / $10' },
    { htg: '2500', usd: '20', label: '2 500 HTG / $20' },
    { htg: '5000', usd: '40', label: '5 000 HTG / $40' },
    { htg: '10000', usd: '80', label: '10 000 HTG / $80' },
  ];

  const projectLabels = {
    GENERAL: 'Fonds Général — Mission Globale AMA',
    EVANGELISM: 'Campagnes d’Évangélisation & Croisades',
    TOURNAMENTS: 'Championnats de Football d’Été (4 Tournois)',
    SOCIAL_AID: 'Diaconat, Lessive & Secours aux Malades',
    BIBLE_SPONSOR: 'Parrainage de Bibles d’Étude',
    THEOLOGY: 'Forums Théologiques & Concours Bibliques',
  };

  const channelLabels = {
    MONCASH: 'MonCash (3651-2047)',
    NATCASH: 'Natcash (3252-9060)',
    PAYPAL: 'PayPal / Carte Bancaire Diaspora',
    BANK_TRANSFER: 'Virement Bancaire',
    IN_PERSON: 'Espèces au Siège (Delbourg)',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const generatedReceipt = {
          receiptNumber: `AMA-${Date.now().toString().slice(-6)}`,
          date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          donorName: formData.donorName,
          donorPhone: formData.donorPhone,
          amount: formData.amount,
          currency: formData.currency,
          channel: channelLabels[formData.channel] || formData.channel,
          project: projectLabels[formData.targetProject] || formData.targetProject,
          referenceCode: formData.referenceCode || 'En attente',
        };

        setReceiptData(generatedReceipt);
        setStatus({
          type: 'success',
          message: data.message || 'Merci infiniment ! Votre déclaration a été transmise à la trésorerie.',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Erreur lors de l’enregistrement de votre don.',
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

  const handlePrintReceipt = () => {
    window.print();
  };

  const generateWhatsAppUrl = () => {
    if (!receiptData) return '#';
    const message = `Bonjour Trésorier AMA, je viens de faire un don pour l'Association 100,000 Âmes :
- Nom : ${receiptData.donorName}
- Montant : ${receiptData.amount} ${receiptData.currency}
- Canal : ${receiptData.channel}
- Affectation : ${receiptData.project}
- Réf. Transaction : ${receiptData.referenceCode}
- Reçu Provisoire : ${receiptData.receiptNumber}
Merci de confirmer la bonne réception ! Que Dieu bénisse l'œuvre !`;

    return `https://wa.me/50932529060?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xl text-slate-900">
            Formulaire de Déclaration & Reçu de Don
          </h3>
          <p className="text-xs text-slate-500">
            Enregistrez votre don pour notifier le trésorier et imprimer votre reçu.
          </p>
        </div>
      </div>

      {status.type === 'success' && receiptData && (
        <div className="mb-8 p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-slate-800 space-y-4 animate-fade-in print:p-0 print:border-none">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Déclaration de don enregistrée avec succès !</span>
          </div>

          {/* Printable Receipt Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 print:shadow-none print:border-slate-400">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-serif font-bold text-ama-blue-900 text-lg">
                  Association 100,000 Âmes (AMA)
                </h4>
                <p className="text-xs text-slate-500">#1, Delbourg, Thomonde (Centre, Haïti)</p>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  {receiptData.receiptNumber}
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">{receiptData.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-500 block">Donateur :</span>
                <span className="font-bold text-slate-800 text-sm">{receiptData.donorName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Montant Déclaré :</span>
                <span className="font-bold text-emerald-700 text-base">
                  {receiptData.amount} {receiptData.currency}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Moyen de Transfert :</span>
                <span className="font-semibold text-slate-800">{receiptData.channel}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Affectation :</span>
                <span className="font-semibold text-slate-800">{receiptData.project}</span>
              </div>
            </div>

            {receiptData.referenceCode && (
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                <span className="text-slate-500">Code / Réf : </span>
                <span className="font-mono font-bold text-slate-900">{receiptData.referenceCode}</span>
              </div>
            )}
          </div>

          {/* Instant WhatsApp Action + Print */}
          <div className="flex flex-wrap gap-3 pt-2 print:hidden">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Confirmer par WhatsApp au Trésorier (+509 3252-9060)</span>
            </a>

            <button
              onClick={handlePrintReceipt}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer le Reçu</span>
            </button>
          </div>
        </div>
      )}

      {status.type === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>{status.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        {/* Project Target */}
        <div>
          <label className="block font-bold text-slate-700 text-xs uppercase tracking-wider mb-2">
            Affectation du don :
          </label>
          <select
            value={formData.targetProject}
            onChange={(e) => setFormData({ ...formData, targetProject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden bg-slate-50 text-slate-800 text-sm"
          >
            <option value="GENERAL">Fonds Général — Là où le besoin est le plus grand</option>
            <option value="EVANGELISM">Campagnes d’Évangélisation & Croisades</option>
            <option value="TOURNAMENTS">Championnats de Football de la Jeunesse (4 Tournois)</option>
            <option value="SOCIAL_AID">Diaconat, Lessive & Secours aux Malades</option>
            <option value="BIBLE_SPONSOR">Parrainage de Bibles d’Étude (1 500 HTG / $12)</option>
            <option value="THEOLOGY">Forums Théologiques & Concours Bibliques</option>
          </select>
        </div>

        {/* Currency & Amount */}
        <div>
          <label className="block font-bold text-slate-700 text-xs uppercase tracking-wider mb-2">
            Montant du Don :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
            {predefinedAmounts.map((pa, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setFormData({ ...formData, amount: pa.htg })}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                  formData.amount === pa.htg
                    ? 'bg-ama-blue-900 text-white border-ama-blue-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {pa.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-bold text-xs"
            >
              <option value="HTG">HTG (Gourdes)</option>
              <option value="USD">USD ($)</option>
              <option value="CAD">CAD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
            <input
              type="number"
              min="1"
              required
              placeholder="Autre montant libre"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Payment Channel */}
        <div>
          <label className="block font-bold text-slate-700 text-xs uppercase tracking-wider mb-2">
            Moyen utilisé pour le transfert :
          </label>
          <select
            value={formData.channel}
            onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden bg-slate-50 text-slate-800 text-sm"
          >
            <option value="MONCASH">MonCash (Digicel : 3651-2047)</option>
            <option value="NATCASH">Natcash (Natcom : 3252-9060)</option>
            <option value="PAYPAL">PayPal / Carte Bancaire Diaspora</option>
            <option value="BANK_TRANSFER">Virement Bancaire (UNIBANK / SOGEBANK / BNC)</option>
            <option value="IN_PERSON">Don en espèces au Siège (Delbourg)</option>
          </select>
        </div>

        {/* Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 text-xs mb-1">
              Votre Nom complet *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Frère Jean Baptiste"
              value={formData.donorName}
              onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 text-xs mb-1">
              Numéro de Téléphone (ou WhatsApp)
            </label>
            <input
              type="tel"
              placeholder="+509 ... ou +1 ..."
              value={formData.donorPhone}
              onChange={(e) => setFormData({ ...formData, donorPhone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 text-xs mb-1">
              Adresse Email (pour reçu)
            </label>
            <input
              type="email"
              placeholder="votre.email@domaine.com"
              value={formData.donorEmail}
              onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 text-xs mb-1">
              Code de Transaction (ID MonCash / Natcash / Réf)
            </label>
            <input
              type="text"
              placeholder="Ex: 3849204892"
              value={formData.referenceCode}
              onChange={(e) => setFormData({ ...formData, referenceCode: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 text-xs mb-1">
            Remarques ou mot d’encouragement
          </label>
          <textarea
            rows="2"
            placeholder="Un message pour l’équipe missionnaire..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-ama-gold-600 to-amber-600 hover:from-ama-gold-700 hover:to-amber-700 text-white py-3.5 px-6 rounded-xl font-bold shadow-md active:scale-98 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Enregistrement du don...</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 fill-white" />
              <span>Valider & Générer Mon Reçu de Don</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
