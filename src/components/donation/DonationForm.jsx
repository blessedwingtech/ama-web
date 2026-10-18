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
    if (!receiptData) return;

    const printWindow = window.open('', '_blank', 'width=800,height=750');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <title>Reçu Officiel — ${receiptData.receiptNumber} — Association 100,000 Âmes</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              background: #ffffff;
              margin: 0;
              padding: 24px;
            }
            .receipt-card {
              max-width: 680px;
              margin: 0 auto;
              border: 2px solid #0f172a;
              border-radius: 16px;
              padding: 32px;
              background: #ffffff;
              position: relative;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 16px;
              margin-bottom: 20px;
            }
            .logo-title h1 {
              font-family: Georgia, serif;
              font-size: 22px;
              color: #0f172a;
              margin: 0;
              font-weight: 700;
            }
            .logo-title p {
              font-size: 11px;
              color: #64748b;
              margin: 4px 0 0;
            }
            .receipt-meta {
              text-align: right;
            }
            .receipt-num {
              display: inline-block;
              background: #fef3c7;
              color: #92400e;
              border: 1px solid #fde68a;
              font-family: monospace;
              font-weight: bold;
              font-size: 13px;
              padding: 4px 10px;
              border-radius: 6px;
            }
            .receipt-date {
              font-size: 11px;
              color: #64748b;
              margin-top: 4px;
            }
            .banner {
              text-align: center;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              padding: 8px 12px;
              border-radius: 8px;
              font-weight: 700;
              font-size: 13px;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #1e293b;
              margin-bottom: 24px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 20px;
            }
            .cell {
              padding: 10px 14px;
              background: #f8fafc;
              border-radius: 8px;
              border: 1px solid #f1f5f9;
            }
            .cell-label {
              font-size: 10px;
              text-transform: uppercase;
              color: #64748b;
              font-weight: 700;
              letter-spacing: 0.5px;
              margin-bottom: 2px;
            }
            .cell-value {
              font-size: 14px;
              font-weight: 700;
              color: #0f172a;
            }
            .amount-cell {
              grid-column: span 2;
              background: #ecfdf5;
              border: 1px solid #a7f3d0;
              padding: 14px 18px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 8px;
            }
            .amount-val {
              font-size: 24px;
              font-weight: 800;
              color: #047857;
              font-family: monospace;
            }
            .ref-cell {
              grid-column: span 2;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              background: #f1f5f9;
              padding: 10px 14px;
              border-radius: 8px;
            }
            .verse {
              text-align: center;
              font-style: italic;
              font-size: 11px;
              color: #475569;
              margin-top: 24px;
              padding-top: 14px;
              border-top: 1px dashed #cbd5e1;
              line-height: 1.5;
            }
            .signatures {
              display: flex;
              justify-content: space-between;
              margin-top: 28px;
              padding-top: 10px;
            }
            .sign-box {
              width: 220px;
              text-align: center;
              font-size: 11px;
              color: #475569;
            }
            .sign-line {
              border-bottom: 1px solid #94a3b8;
              margin-bottom: 6px;
              height: 35px;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 40px;
              font-family: Georgia, serif;
              font-weight: bold;
              color: rgba(15, 23, 42, 0.03);
              pointer-events: none;
              text-transform: uppercase;
              white-space: nowrap;
            }
            @media print {
              body { padding: 0; }
              .receipt-card { border: 1px solid #0f172a; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-card">
            <div class="watermark">ASSOCIATION 100,000 ÂMES</div>

            <div class="header">
              <div class="logo-title">
                <h1>Association 100,000 Âmes (AMA)</h1>
                <p>#1, Delbourg, Thomonde (Plateau Central, Haïti)</p>
                <p>Mission d'Évangélisation, Formation & Secours Fraternel</p>
              </div>
              <div class="receipt-meta">
                <span class="receipt-num">${receiptData.receiptNumber}</span>
                <div class="receipt-date">Émis le : ${receiptData.date}</div>
              </div>
            </div>

            <div class="banner">
              Reçu Officiel de Déclaration de Don
            </div>

            <div class="grid">
              <div class="cell">
                <div class="cell-label">Donateur / Bienfaiteur</div>
                <div class="cell-value">${receiptData.donorName}</div>
              </div>

              <div class="cell">
                <div class="cell-label">Téléphone / Contact</div>
                <div class="cell-value">${receiptData.donorPhone || 'Non renseigné'}</div>
              </div>

              <div class="amount-cell">
                <div>
                  <div class="cell-label" style="color: #065f46;">Montant Total Déclaré</div>
                  <div style="font-size: 11px; color: #047857;">Contribution volontaire pour la Mission</div>
                </div>
                <div class="amount-val">${receiptData.amount} ${receiptData.currency}</div>
              </div>

              <div class="cell">
                <div class="cell-label">Canal de Transfert</div>
                <div class="cell-value">${receiptData.channel}</div>
              </div>

              <div class="cell">
                <div class="cell-label">Affectation du Don</div>
                <div class="cell-value">${receiptData.project}</div>
              </div>

              ${receiptData.referenceCode ? `
                <div class="ref-cell">
                  <span style="font-weight: 600; color: #475569;">Code / Réf. Transaction :</span>
                  <span style="font-family: monospace; font-weight: bold; color: #0f172a;">${receiptData.referenceCode}</span>
                </div>
              ` : ''}
            </div>

            <div class="verse">
              « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie. »<br>
              <strong>2 Corinthiens 9:7</strong>
            </div>

            <div class="signatures">
              <div class="sign-box">
                <div class="sign-line"></div>
                <div>Pour le Donateur</div>
              </div>
              <div class="sign-box">
                <div class="sign-line"></div>
                <div>Trésorerie Générale AMA</div>
              </div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
