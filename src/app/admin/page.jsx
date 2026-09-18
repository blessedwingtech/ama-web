'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Mail,
  Heart,
  Users,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  ExternalLink,
  Download,
  Phone,
  RefreshCw,
  Search,
  Filter,
  ShieldCheck,
  Calendar,
  BookOpen,
  Plus,
  Eye,
  EyeOff,
  FileText,
  BarChart3,
  TrendingUp,
  Save,
  Camera,
  Headphones,
  Image as ImageIcon,
  Music,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [authKey, setAuthKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({
    contacts: [],
    prayers: [],
    memberships: [],
    donations: [],
    subscribers: [],
    reports: [],
    photos: [],
    audios: [],
  });

  const [newReport, setNewReport] = useState({
    title: '',
    period: '1er Trimestre 2026',
    periodId: '2026-t1',
    year: 2026,
    category: 'evangelisation',
    author: 'Comité Exécutif AMA',
    summary: '',
    content: '',
    highlights: '',
    metrics: '',
    pdfUrl: '',
  });
  const [showAddReportModal, setShowAddReportModal] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'evangelisation',
    date: 'Mars 2026',
    location: 'Thomonde, Plateau Central',
    image: '',
    caption: '',
  });
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const [newAudio, setNewAudio] = useState({
    title: '',
    speaker: 'Pasteur Évangéliste AMA',
    event: 'Croisade d\'Évangélisation Thomonde',
    duration: '45:00',
    category: 'theologie',
    date: 'Mars 2026',
    audioSrc: '',
    description: '',
  });
  const [showAddAudioModal, setShowAddAudioModal] = useState(false);


  const [editStats, setEditStats] = useState({
    visionTarget: 100000,
    currentReachedSouls: 12450,
    confirmedDecisionsForChrist: 424,
    partnerChurches: 24,
    youthAthletesEngaged: 1850,
    biblesDistributed: 875,
    socialAidBeneficiaries: 365,
    activeVolunteers: 120,
    totalMobilizedHtg: 1135000,
    fieldAllocationRate: 92.4,
  });
  const [statsSaving, setStatsSaving] = useState(false);
  const [statsMessage, setStatsMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('ama_admin_key');
    if (savedKey) {
      setAuthKey(savedKey);
      fetchDashboardData(savedKey);
    }
  }, []);

  const fetchDashboardData = async (keyToUse) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authKey: keyToUse || authKey }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setIsAuthenticated(true);
        setStats(resData.stats);
        setData(resData.data);
        if (resData.data.siteStats) {
          setEditStats({
            visionTarget: resData.data.siteStats.visionTarget || 100000,
            currentReachedSouls: resData.data.siteStats.currentReachedSouls || 12450,
            confirmedDecisionsForChrist: resData.data.siteStats.confirmedDecisionsForChrist || 424,
            partnerChurches: resData.data.siteStats.partnerChurches || 24,
            youthAthletesEngaged: resData.data.siteStats.youthAthletesEngaged || 1850,
            biblesDistributed: resData.data.siteStats.biblesDistributed || 875,
            socialAidBeneficiaries: resData.data.siteStats.socialAidBeneficiaries || 365,
            activeVolunteers: resData.data.siteStats.activeVolunteers || 120,
            totalMobilizedHtg: resData.data.siteStats.totalMobilizedHtg || 1135000,
            fieldAllocationRate: resData.data.siteStats.fieldAllocationRate || 92.4,
          });
        }
        localStorage.setItem('ama_admin_key', keyToUse || authKey);
      } else {
        setIsAuthenticated(false);
        setError(resData.error || 'Clé d’accès incorrecte.');
        localStorage.removeItem('ama_admin_key');
      }
    } catch (err) {
      setError('Impossible de joindre le serveur.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchDashboardData(authKey);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthKey('');
    localStorage.removeItem('ama_admin_key');
  };

  const handleAction = async (model, action, id, extraData = {}) => {
    try {
      const res = await fetch('/api/admin/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authKey,
          model,
          action,
          id,
          data: extraData,
        }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        // Refresh data
        fetchDashboardData(authKey);
      } else {
        alert(result.error || 'Erreur lors de l’action');
      }
    } catch (err) {
      alert('Erreur réseau');
    }
  };

  const exportDonationsToCSV = () => {
    if (!data.donations || data.donations.length === 0) return;
    const headers = ['Date', 'Donateur', 'Telephone', 'Email', 'Montant', 'Devise', 'Canal', 'Affectation', 'Reference', 'Statut'];
    const rows = data.donations.map((d) => [
      new Date(d.createdAt).toLocaleDateString('fr-FR'),
      `"${d.donorName}"`,
      `"${d.donorPhone || ''}"`,
      `"${d.donorEmail || ''}"`,
      d.amount,
      d.currency,
      d.channel,
      d.targetProject,
      `"${d.referenceCode || ''}"`,
      d.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AMA_Dons_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!newReport.title || !newReport.summary || !newReport.content) {
      alert('Veuillez remplir les champs obligatoires (Titre, Résumé, Contenu).');
      return;
    }

    // Parse highlights from newline-separated string if provided
    const highlightsArr = typeof newReport.highlights === 'string'
      ? newReport.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
      : newReport.highlights || [];

    // Parse metrics if provided in format: Label: Value
    const metricsArr = typeof newReport.metrics === 'string'
      ? newReport.metrics.split('\n').map((line) => {
          const parts = line.split(':');
          return { label: parts[0]?.trim() || '', value: parts[1]?.trim() || '' };
        }).filter((m) => m.label && m.value)
      : newReport.metrics || [];

    await handleAction('report', 'create', 'new', {
      title: newReport.title,
      period: newReport.period,
      periodId: newReport.periodId || newReport.period.toLowerCase().replace(/\s+/g, '-'),
      year: parseInt(newReport.year) || 2026,
      category: newReport.category,
      author: newReport.author,
      summary: newReport.summary,
      content: newReport.content,
      highlights: highlightsArr,
      metrics: metricsArr,
      pdfUrl: newReport.pdfUrl || null,
      isPublished: true,
    });

    setShowAddReportModal(false);
    setNewReport({
      title: '',
      period: '1er Trimestre 2026',
      periodId: '2026-t1',
      year: 2026,
      category: 'evangelisation',
      author: 'Comité Exécutif AMA',
      summary: '',
      content: '',
      highlights: '',
      metrics: '',
      pdfUrl: '',
    });
  };

  const handleCreatePhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.image) {
      alert('Veuillez renseigner au moins le titre et le lien de l\'image.');
      return;
    }

    await handleAction('photo', 'create', 'new', {
      title: newPhoto.title,
      category: newPhoto.category || 'evangelisation',
      date: newPhoto.date || 'Mars 2026',
      location: newPhoto.location || 'Thomonde, Haïti',
      image: newPhoto.image,
      caption: newPhoto.caption || newPhoto.title,
      isPublished: true,
    });

    setShowAddPhotoModal(false);
    setNewPhoto({
      title: '',
      category: 'evangelisation',
      date: 'Mars 2026',
      location: 'Thomonde, Plateau Central',
      image: '',
      caption: '',
    });
  };

  const handleCreateAudio = async (e) => {
    e.preventDefault();
    if (!newAudio.title || !newAudio.audioSrc) {
      alert('Veuillez renseigner au moins le titre et le lien audio (MP3/SoundCloud/URL).');
      return;
    }

    await handleAction('audio', 'create', 'new', {
      title: newAudio.title,
      speaker: newAudio.speaker || 'Comité Pastoral AMA',
      event: newAudio.event || 'Édification & Conférence',
      duration: newAudio.duration || '45:00',
      category: newAudio.category || 'theologie',
      date: newAudio.date || 'Mars 2026',
      audioSrc: newAudio.audioSrc,
      description: newAudio.description || newAudio.title,
      isPublished: true,
    });

    setShowAddAudioModal(false);
    setNewAudio({
      title: '',
      speaker: 'Pasteur Évangéliste AMA',
      event: 'Croisade d\'Évangélisation Thomonde',
      duration: '45:00',
      category: 'theologie',
      date: 'Mars 2026',
      audioSrc: '',
      description: '',
    });
  };

  const handleSaveStatistics = async (e) => {
    e.preventDefault();
    setStatsSaving(true);
    setStatsMessage('');
    try {
      await handleAction('statistics', 'update', 'global-stats', editStats);
      setStatsMessage('✓ Statistiques institutionnelles enregistrées et publiées en direct avec succès !');
      setTimeout(() => setStatsMessage(''), 5000);
    } catch (err) {
      alert('Erreur lors de la sauvegarde des statistiques : ' + err.message);
    } finally {
      setStatsSaving(false);
    }
  };



  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-ama-blue-900 text-amber-400 font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-md">
              AMA
            </div>
            <h1 className="font-serif font-bold text-2xl text-slate-900">
              Espace d'Administration
            </h1>
            <p className="text-xs text-slate-500">
              Portail sécurisé pour le Secrétariat Général, la Trésorerie et le Collège Pastoral.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Clé d'Accès Administrateur :
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Entrez la clé d'accès..."
                  value={authKey}
                  onChange={(e) => setAuthKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden text-sm"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ama-blue-900 hover:bg-ama-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Connexion Sécurisée</span>
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-400">
            Association 100,000 Âmes • Thomonde, Haïti
          </p>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Bar with Profile & Logout */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Direction Exécutive & Trésorerie AMA</span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
            Tableau de Bord & Gestion des Activités
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Suivi des messages, intercessions de prière, adhésions et réconciliation des dons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchDashboardData(authKey)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-500/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Messages Reçus</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              {stats.totalContacts}{' '}
              {stats.unreadContacts > 0 && (
                <span className="text-xs font-sans font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  {stats.unreadContacts} non lus
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Via formulaire contact</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Prières Soumises</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-600">
              {stats.totalPrayers}
            </div>
            <p className="text-[11px] text-slate-400">Intercession pastorale</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Candidatures Adhésion</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-ama-blue-900">
              {stats.totalMemberships}{' '}
              {stats.pendingMemberships > 0 && (
                <span className="text-xs font-sans font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {stats.pendingMemberships} en attente
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Nouveaux membres</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Dons Confirmés</span>
            <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-700">
              {stats.totalDonationsHtg.toLocaleString()} HTG
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              + {stats.totalDonationsUsd.toLocaleString()} USD ({stats.pendingDonations} en attente)
            </p>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'overview' ? 'bg-white text-ama-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📊 Vue Générale</span>
        </button>

        <button
          onClick={() => setActiveTab('donations')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'donations' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Dons & Trésorerie ({data.donations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'contacts' ? 'bg-white text-ama-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Mail className="w-4 h-4 text-blue-600" />
          <span>Messages ({data.contacts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prayers')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'prayers' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4 text-amber-600" />
          <span>Requêtes de Prière ({data.prayers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('memberships')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'memberships' ? 'bg-white text-ama-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-ama-blue-700" />
          <span>Adhésions ({data.memberships.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'reports' ? 'bg-white text-amber-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>📑 Rapports Périodiques ({(data.reports || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'photos' ? 'bg-white text-purple-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Camera className="w-4 h-4 text-purple-600" />
          <span>📸 Galerie Photos ({(data.photos || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audios')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'audios' ? 'bg-white text-teal-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Headphones className="w-4 h-4 text-teal-600" />
          <span>🎙️ Audios & Messages ({(data.audios || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('statistics')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'statistics' ? 'bg-white text-blue-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span>📈 Statistiques en Direct</span>
        </button>
      </div>

      {/* TAB 1: DONS & TRÉSORERIE */}
      {activeTab === 'donations' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900">
                Suivi des Intentions & Déclarations de Dons
              </h2>
              <p className="text-xs text-slate-500">
                Rapprochez les codes MonCash, Natcash et PayPal avec les relevés du Trésorier Général.
              </p>
            </div>

            <button
              onClick={exportDonationsToCSV}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exporter en CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Donateur</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Montant</th>
                  <th className="p-3">Canal</th>
                  <th className="p-3">Réf / Code</th>
                  <th className="p-3">Affectation</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.donations.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="p-6 text-center text-slate-400">
                      Aucune intention de don enregistrée pour le moment.
                    </td>
                  </tr>
                ) : (
                  data.donations.map((don) => (
                    <tr key={don.id} className="hover:bg-slate-50/80">
                      <td className="p-3 whitespace-nowrap text-slate-500">
                        {new Date(don.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="p-3 font-bold text-slate-900">{don.donorName}</td>
                      <td className="p-3">
                        <div className="text-slate-800">{don.donorPhone}</div>
                        <div className="text-slate-400 text-[10px]">{don.donorEmail}</div>
                      </td>
                      <td className="p-3 font-bold text-emerald-700 whitespace-nowrap">
                        {don.amount} {don.currency}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px]">
                          {don.channel}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px]">{don.referenceCode || '—'}</td>
                      <td className="p-3 text-slate-600">{don.targetProject}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            don.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : don.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {don.status}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap space-x-1">
                        {don.status !== 'CONFIRMED' && (
                          <button
                            onClick={() => handleAction('donation', 'updateStatus', don.id, { status: 'CONFIRMED' })}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs"
                            title="Confirmer la réception du don"
                          >
                            ✓ Confirmer
                          </button>
                        )}
                        {don.donorPhone && (
                          <a
                            href={`https://wa.me/${don.donorPhone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(
                              don.donorName
                            )},%20l'Association%20100,000%20%C3%82mes%20vous%20remercie%20chaleureusement%20pour%20votre%20don%20de%20${
                              don.amount
                            }%20${don.currency}%20!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg inline-block"
                            title="Remercier par WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('Supprimer cet enregistrement ?')) {
                              handleAction('donation', 'delete', don.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MESSAGES DE CONTACT */}
      {activeTab === 'contacts' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif font-bold text-xl text-slate-900">
            Messages de Contact Reçus
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {data.contacts.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-8">Aucun message de contact pour l'instant.</p>
            ) : (
              data.contacts.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{c.subject}</h3>
                      <p className="text-xs text-slate-500">
                        De : <strong>{c.fullName}</strong> • {c.email} {c.phone && `• Tél: ${c.phone}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        c.status === 'READ' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {c.status}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {c.message}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <a
                      href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                      className="px-3 py-1.5 bg-ama-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-ama-blue-800 flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Répondre par Email</span>
                    </a>
                    {c.status === 'UNREAD' && (
                      <button
                        onClick={() => handleAction('contact', 'updateStatus', c.id, { status: 'READ' })}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
                      >
                        Marquer Lu
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm('Supprimer ce message ?')) {
                          handleAction('contact', 'delete', c.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: REQUÊTES DE PRIÈRE CONFIDENTIELLES */}
      {activeTab === 'prayers' && (
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-amber-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Confidentiel • Collège Pastoral
            </span>
            <h2 className="font-serif font-bold text-xl text-slate-900 mt-2">
              Sujets & Requêtes d'Intercession Pastorale
            </h2>
            <p className="text-xs text-slate-500">
              Liste des fardeaux et sujets portés dans la prière par les pasteurs et intercesseurs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.prayers.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-8">Aucune requête de prière enregistrée.</p>
            ) : (
              data.prayers.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{p.title}</span>
                        {p.isAnonymous && (
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-sans">
                            Anonyme
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-amber-900">
                        Demandeur : <strong>{p.fullName}</strong> {p.phone && `• Tél: ${p.phone}`}{' '}
                        {p.location && `• Ville: ${p.location}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          p.isPrayedFor ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        {p.isPrayedFor ? '✓ Prié' : 'En attente d’intercession'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {p.description}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => handleAction('prayer', 'togglePrayed', p.id, { isPrayedFor: !p.isPrayedFor })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        p.isPrayedFor
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{p.isPrayedFor ? 'Marquer Non Prié' : 'Marquer comme Prié'}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Supprimer cette requête ?')) {
                          handleAction('prayer', 'delete', p.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: ADHÉSIONS & CANDIDATURES */}
      {activeTab === 'memberships' && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif font-bold text-xl text-slate-900">
            Candidatures & Demandes d'Adhésion
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {data.memberships.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-8">Aucune candidature d'adhésion pour l'instant.</p>
            ) : (
              data.memberships.map((m) => (
                <div key={m.id} className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{m.fullName}</h3>
                      <p className="text-xs text-ama-blue-900">
                        Église : <strong>{m.church}</strong> {m.roleInChurch && `(${m.roleInChurch})`} • Ville : {m.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        m.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {m.status}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(m.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <div>
                      <strong className="text-slate-900">Motivation :</strong> {m.motivation}
                    </div>
                    {m.skills && (
                      <div>
                        <strong className="text-slate-900">Talents & Compétences :</strong> {m.skills}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    {m.phone && (
                      <a
                        href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(
                          m.fullName
                        )},%20le%20secr%C3%A9tariat%20d'AMA%20vous%20contacte%20suite%20%C3%A0%20votre%20demande%20d'adh%C3%A9sion.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Contacter WhatsApp</span>
                      </a>
                    )}
                    {m.status === 'PENDING' && (
                      <button
                        onClick={() => handleAction('membership', 'updateStatus', m.id, { status: 'APPROVED' })}
                        className="px-3 py-1.5 bg-ama-blue-900 hover:bg-ama-blue-800 text-white rounded-lg text-xs font-semibold"
                      >
                        Approuver
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm('Supprimer cette demande ?')) {
                          handleAction('membership', 'delete', m.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: RAPPORTS PÉRIODIQUES */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Transparence & Médiathèque
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {(data.reports || []).length} rapport(s)
                </span>
              </div>
              <h2 className="font-serif font-bold text-xl text-slate-900 mt-1">
                Gestion & Publication des Rapports Périodiques
              </h2>
              <p className="text-xs text-slate-500">
                Publiez les bilans trimestriels, comptes-rendus de championnats et synthèses financières visibles dans la Médiathèque.
              </p>
            </div>

            <button
              onClick={() => setShowAddReportModal(true)}
              className="inline-flex items-center gap-2 bg-ama-blue-900 hover:bg-ama-blue-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Publier un Nouveau Rapport</span>
            </button>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Période / Année</th>
                  <th className="p-3">Titre du Rapport</th>
                  <th className="p-3">Catégorie</th>
                  <th className="p-3">Auteur</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(!data.reports || data.reports.length === 0) ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-400">
                      Aucun rapport enregistré. Cliquez sur « Publier un Nouveau Rapport ».
                    </td>
                  </tr>
                ) : (
                  data.reports.map((rep) => (
                    <tr key={rep.id} className="hover:bg-slate-50">
                      <td className="p-3 whitespace-nowrap">
                        <span className="bg-blue-50 text-ama-blue-900 font-bold px-2.5 py-1 rounded-md border border-blue-100 text-[11px]">
                          {rep.period}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900 max-w-xs">
                        <div>{rep.title}</div>
                        <div className="text-slate-400 text-[10px] line-clamp-1 mt-0.5">{rep.summary}</div>
                      </td>
                      <td className="p-3">
                        <span className="uppercase text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                          {rep.category}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{rep.author}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rep.isPublished !== false
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {rep.isPublished !== false ? '✓ Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap space-x-1">
                        <button
                          onClick={() =>
                            handleAction('report', 'togglePublished', rep.id, {
                              isPublished: rep.isPublished === false ? true : false,
                            })
                          }
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title={rep.isPublished !== false ? 'Masquer (Mettre en brouillon)' : 'Publier sur le site'}
                        >
                          {rep.isPublished !== false ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Supprimer définitivement ce rapport ?')) {
                              handleAction('report', 'delete', rep.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL CREATION RAPPORT */}
      {showAddReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Publier un Rapport Périodique
                </h3>
                <p className="text-xs text-slate-500">
                  Remplissez les informations institutionnelles pour alimenter la Médiathèque.
                </p>
              </div>
              <button
                onClick={() => setShowAddReportModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Période Libellé * :</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 2ème Trimestre 2026, Bilan Estival 2026"
                    value={newReport.period}
                    onChange={(e) => setNewReport({ ...newReport, period: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Année * :</label>
                  <input
                    type="number"
                    required
                    value={newReport.year}
                    onChange={(e) => setNewReport({ ...newReport, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Catégorie / Pilier * :</label>
                  <select
                    value={newReport.category}
                    onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                  >
                    <option value="evangelisation">Évangélisation & Croisades</option>
                    <option value="sport">Sports & Championnats d'Été</option>
                    <option value="social">Diaconat & Action Sociale</option>
                    <option value="theologie">Formation Théologique & Génie</option>
                    <option value="finances">Trésorerie & Transparence</option>
                    <option value="annuel">Bilan Annuel Consolidé</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Auteur / Rédacteur * :</label>
                  <input
                    type="text"
                    required
                    value={newReport.author}
                    onChange={(e) => setNewReport({ ...newReport, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Titre Complet du Rapport * :</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rapport d'Activité T2 2026 : Extension vers les Hameaux de Thomonde"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Résumé Exécutif (1 à 2 phrases) * :</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Synthèse claire pour la carte d'aperçu..."
                  value={newReport.summary}
                  onChange={(e) => setNewReport({ ...newReport, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Indicateurs Chiffrés (Un par ligne sous format "Label: Valeur") :</label>
                <textarea
                  rows={3}
                  placeholder={"Âmes touchées: 4 200\nDécisions: 130\nÉglises associées: 26\nBibles données: 210"}
                  value={newReport.metrics}
                  onChange={(e) => setNewReport({ ...newReport, metrics: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Points Forts / Faits Marquants (Un par ligne) :</label>
                <textarea
                  rows={3}
                  placeholder={"Grande traversée missionnaire sur le lac de Péligre.\nRemise de bourses d'encouragement aux lauréats du génie biblique.\nDistribution de 100 kits alimentaires aux familles isolées."}
                  value={newReport.highlights}
                  onChange={(e) => setNewReport({ ...newReport, highlights: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Compte Rendu Intégral & Récit Détaillé * :</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Texte complet du rapport qui apparaîtra dans le lecteur modal et la fiche imprimable..."
                  value={newReport.content}
                  onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddReportModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-ama-blue-900 hover:bg-ama-blue-800 text-white font-bold shadow-md transition-colors"
                >
                  Enregistrer & Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB PHOTOS: GESTION DE LA GALERIE VISUELLE */}
      {activeTab === 'photos' && (
        <div className="bg-white rounded-3xl border border-purple-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Médiathèque Dynamique
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {(data.photos || []).length} photo(s)
                </span>
              </div>
              <h2 className="font-serif font-bold text-xl text-slate-900 mt-1">
                Gestion de la Galerie Photos & Visuels
              </h2>
              <p className="text-xs text-slate-500">
                Ajoutez, gérez et publiez les clichés des croisades, championnats et actions de terrain affichés dans la Médiathèque.
              </p>
            </div>

            <button
              onClick={() => setShowAddPhotoModal(true)}
              className="inline-flex items-center gap-2 bg-purple-900 hover:bg-purple-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <Plus className="w-4 h-4 text-purple-300" />
              <span>Ajouter une Photo</span>
            </button>
          </div>

          {/* Photos Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Aperçu</th>
                  <th className="p-3">Titre & Légende</th>
                  <th className="p-3">Catégorie</th>
                  <th className="p-3">Lieu & Date</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(!data.photos || data.photos.length === 0) ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-400">
                      Aucune photo enregistrée. Cliquez sur « Ajouter une Photo ».
                    </td>
                  </tr>
                ) : (
                  data.photos.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/hero-bg.jpg';
                            }}
                          />
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-slate-900 max-w-xs">
                        <div>{p.title}</div>
                        <div className="text-slate-400 text-[10px] line-clamp-1 mt-0.5">{p.caption}</div>
                      </td>
                      <td className="p-3">
                        <span className="uppercase text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 whitespace-nowrap">
                        <div className="font-medium text-slate-800">{p.location || '—'}</div>
                        <div className="text-slate-400 text-[10px]">{p.date || '—'}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.isPublished !== false
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {p.isPublished !== false ? '✓ Publié' : 'Masqué'}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap space-x-1">
                        <button
                          onClick={() =>
                            handleAction('photo', 'togglePublished', p.id, {
                              isPublished: p.isPublished === false ? true : false,
                            })
                          }
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title={p.isPublished !== false ? 'Masquer la photo' : 'Publier la photo'}
                        >
                          {p.isPublished !== false ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Supprimer définitivement cette photo ?')) {
                              handleAction('photo', 'delete', p.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL CREATION PHOTO */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Ajouter une Photo à la Galerie
                </h3>
                <p className="text-xs text-slate-500">
                  Alimentez le diaporama et la médiathèque publique.
                </p>
              </div>
              <button
                onClick={() => setShowAddPhotoModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePhoto} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Titre de la Photo * :</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Croisade Évangélique de Bassin-Magnan"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lien de l'Image (URL ou chemin local) * :</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: /images/croisade.jpg ou https://images.unsplash.com/..."
                  value={newPhoto.image}
                  onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-900 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Catégorie * :</label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-900 focus:outline-hidden"
                  >
                    <option value="evangelisation">Évangélisation</option>
                    <option value="sport">Tournois & Sports</option>
                    <option value="social">Action Sociale</option>
                    <option value="theologie">Génie Biblique</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lieu :</label>
                  <input
                    type="text"
                    placeholder="Ex: Thomonde, Plateau Central"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Date :</label>
                <input
                  type="text"
                  placeholder="Ex: Mars 2026, Août 2025"
                  value={newPhoto.date}
                  onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Légende / Description courte :</label>
                <textarea
                  rows={2}
                  placeholder="Description du moment photographié..."
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-900 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold shadow-md transition-colors"
                >
                  Ajouter à la Galerie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB AUDIOS: GESTION DES ENSEIGNEMENTS AUDIO */}
      {activeTab === 'audios' && (
        <div className="bg-white rounded-3xl border border-teal-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-900 bg-teal-100 px-2.5 py-0.5 rounded-full">
                  Prédications & Formations
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {(data.audios || []).length} audio(s)
                </span>
              </div>
              <h2 className="font-serif font-bold text-xl text-slate-900 mt-1">
                Gestion des Enseignements & Podcasts Audio
              </h2>
              <p className="text-xs text-slate-500">
                Publiez les enregistrements de messages, conférences et exhortations écoutables en ligne.
              </p>
            </div>

            <button
              onClick={() => setShowAddAudioModal(true)}
              className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <Plus className="w-4 h-4 text-teal-300" />
              <span>Publier un Audio</span>
            </button>
          </div>

          {/* Audios Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Titre du Message</th>
                  <th className="p-3">Orateur / Intervenant</th>
                  <th className="p-3">Événement & Durée</th>
                  <th className="p-3">Catégorie</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(!data.audios || data.audios.length === 0) ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-400">
                      Aucun enregistrement audio pour le moment. Cliquez sur « Publier un Audio ».
                    </td>
                  </tr>
                ) : (
                  data.audios.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900 max-w-xs">
                        <div className="flex items-center gap-1.5">
                          <Headphones className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{a.title}</span>
                        </div>
                        <div className="text-slate-400 text-[10px] line-clamp-1 mt-0.5">{a.description}</div>
                      </td>
                      <td className="p-3 text-slate-800 font-medium whitespace-nowrap">{a.speaker}</td>
                      <td className="p-3 text-slate-600 whitespace-nowrap">
                        <div>{a.event || '—'}</div>
                        <div className="text-slate-400 text-[10px] font-mono">{a.duration || '—'} • {a.date}</div>
                      </td>
                      <td className="p-3">
                        <span className="uppercase text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                          {a.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            a.isPublished !== false
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {a.isPublished !== false ? '✓ Publié' : 'Masqué'}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap space-x-1">
                        <button
                          onClick={() =>
                            handleAction('audio', 'togglePublished', a.id, {
                              isPublished: a.isPublished === false ? true : false,
                            })
                          }
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title={a.isPublished !== false ? 'Masquer le message' : 'Publier le message'}
                        >
                          {a.isPublished !== false ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Supprimer définitivement cet audio ?')) {
                              handleAction('audio', 'delete', a.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL CREATION AUDIO */}
      {showAddAudioModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Publier un Enseignement Audio
                </h3>
                <p className="text-xs text-slate-500">
                  Diffusez une prédication ou un podcast pour l'édification de l'assemblée.
                </p>
              </div>
              <button
                onClick={() => setShowAddAudioModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAudio} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Titre de l'Enseignement * :</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Le Mandat de la Grande Commission en Milieu Rural"
                  value={newAudio.title}
                  onChange={(e) => setNewAudio({ ...newAudio, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lien Audio (Fichier MP3 ou Stream URL) * :</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: /audio/message.mp3 ou https://.../audio.mp3"
                  value={newAudio.audioSrc}
                  onChange={(e) => setNewAudio({ ...newAudio, audioSrc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Orateur / Intervenant * :</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pasteur Jean-Baptiste Paul"
                    value={newAudio.speaker}
                    onChange={(e) => setNewAudio({ ...newAudio, speaker: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Événement / Cadre :</label>
                  <input
                    type="text"
                    placeholder="Ex: Croisade d'Évangélisation Thomonde"
                    value={newAudio.event}
                    onChange={(e) => setNewAudio({ ...newAudio, event: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Catégorie * :</label>
                  <select
                    value={newAudio.category}
                    onChange={(e) => setNewAudio({ ...newAudio, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                  >
                    <option value="theologie">Théologie & Doctrine</option>
                    <option value="evangelisation">Évangélisation</option>
                    <option value="priere">Prière & Intercession</option>
                    <option value="jeunesse">Jeunesse & Témoignages</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durée :</label>
                  <input
                    type="text"
                    placeholder="Ex: 45:00"
                    value={newAudio.duration}
                    onChange={(e) => setNewAudio({ ...newAudio, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date :</label>
                  <input
                    type="text"
                    placeholder="Ex: Mars 2026"
                    value={newAudio.date}
                    onChange={(e) => setNewAudio({ ...newAudio, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Résumé du Message :</label>
                <textarea
                  rows={3}
                  placeholder="Points clés abordés et versets de référence..."
                  value={newAudio.description}
                  onChange={(e) => setNewAudio({ ...newAudio, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-800 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddAudioModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold shadow-md transition-colors"
                >
                  Publier l'Enseignement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 6: STATISTIQUES EN DIRECT */}
      {activeTab === 'statistics' && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  Impact Analytique & Données Réelles
                </span>
              </div>
              <h2 className="font-serif font-bold text-xl text-slate-900 mt-1">
                Mise à Jour des Statistiques Officielles en Direct
              </h2>
              <p className="text-xs text-slate-500">
                Ajustez les chiffres réels du ministère. Toute modification enregistrée ici met à jour immédiatement la page <code className="text-ama-blue-900 font-bold">/statistiques</code> et la jauge Vision 2050 pour tous les visiteurs.
              </p>
            </div>

            {statsMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{statsMessage}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSaveStatistics} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Vision Target */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Objectif Vision 2050 (Âmes) :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.visionTarget}
                  onChange={(e) => setEditStats({ ...editStats, visionTarget: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-base text-slate-900 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                />
                <p className="text-[10px] text-slate-400">Objectif historique d'AMA (100 000)</p>
              </div>

              {/* Current Reached Souls */}
              <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                  Âmes Touchées (Sur le terrain) :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.currentReachedSouls}
                  onChange={(e) => setEditStats({ ...editStats, currentReachedSouls: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 font-mono font-bold text-base text-amber-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-amber-700/80">Nombre cumulé d'auditeurs aux croisades & tournois</p>
              </div>

              {/* Confirmed Decisions for Christ */}
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Décisions pour Christ (Confirmées) :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.confirmedDecisionsForChrist}
                  onChange={(e) => setEditStats({ ...editStats, confirmedDecisionsForChrist: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-300 font-mono font-bold text-base text-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-emerald-700/80">Conversions répertoriées avec suivi en église</p>
              </div>

              {/* Partner Churches */}
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-900">
                  Églises Locales Partenaires :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.partnerChurches}
                  onChange={(e) => setEditStats({ ...editStats, partnerChurches: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-blue-300 font-mono font-bold text-base text-blue-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-blue-700/80">Assemblées associées dans le Plateau Central</p>
              </div>

              {/* Youth Athletes Engaged */}
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900">
                  Jeunes Participants aux Tournois :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.youthAthletesEngaged}
                  onChange={(e) => setEditStats({ ...editStats, youthAthletesEngaged: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 font-mono font-bold text-base text-indigo-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-indigo-700/80">Athlètes et joueurs enregistrés</p>
              </div>

              {/* Bibles Distributed */}
              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-900">
                  Bibles & Nouveaux Testaments Donnés :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.biblesDistributed}
                  onChange={(e) => setEditStats({ ...editStats, biblesDistributed: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-300 font-mono font-bold text-base text-purple-900 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-purple-700/80">Écritures saintes offertes aux communautés</p>
              </div>

              {/* Social Aid Beneficiaries */}
              <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-rose-900">
                  Familles Secourues (Diaconat) :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.socialAidBeneficiaries}
                  onChange={(e) => setEditStats({ ...editStats, socialAidBeneficiaries: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-rose-300 font-mono font-bold text-base text-rose-900 focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-rose-700/80">Aide directe : vivres, lessive et soins aux anciens</p>
              </div>

              {/* Active Volunteers */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Ouvriers & Bénévoles Actifs :
                </label>
                <input
                  type="number"
                  required
                  value={editStats.activeVolunteers}
                  onChange={(e) => setEditStats({ ...editStats, activeVolunteers: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-base text-slate-900 focus:ring-2 focus:ring-ama-blue-900 focus:outline-hidden"
                />
                <p className="text-[10px] text-slate-400">Évangélistes, arbitres et diacres mobilisés</p>
              </div>

              {/* Field Allocation Rate */}
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Taux d'Affectation Terrain (%) :
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={editStats.fieldAllocationRate}
                  onChange={(e) => setEditStats({ ...editStats, fieldAllocationRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-300 font-mono font-bold text-base text-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-emerald-700/80">Exemple: 92.4% pour les missions directes</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={statsSaving}
                className="inline-flex items-center gap-2 bg-ama-blue-900 hover:bg-ama-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
              >
                {statsSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Enregistrer & Mettre en Ligne Immédiatement</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}


      {/* TAB 0: VUE GÉNÉRALE & RESSOURCES */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Procédure de Traitement des Dons
            </h3>
            <ol className="space-y-2 text-xs sm:text-sm text-slate-600 list-decimal list-inside leading-relaxed">
              <li>Le donateur effectue son transfert via MonCash (*202#), Natcash ou PayPal.</li>
              <li>Il remplit le formulaire de déclaration sur le site et clique sur « Confirmer WhatsApp ».</li>
              <li>Le Trésorier Général vérifie le SMS de confirmation sur les téléphones officiels (MonCash : +509 3651-2047 / Natcash : +509 3252-9060).</li>
              <li>Dans ce tableau de bord, cliquez sur « Confirmer » pour valider la réception et consolider les totaux.</li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Gestion des Requêtes de Prière
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Les requêtes sont strictement protégées. Seules les personnes détentrices de la clé d'accès ont le droit de consulter les demandes intimes afin de garantir la confiance absolue des membres des assemblées.
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
              « Priez les uns pour les autres, afin que vous soyez guéris. » — Jacques 5:16
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
