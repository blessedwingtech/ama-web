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
  Megaphone,
  Edit,
  X,
  MapPin,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  Flame,
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
    announcements: [],
    photos: [],
    audios: [],
  });

  // Modals & Edit States
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const [showAddAnnouncementModal, setShowAddAnnouncementModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);

  const [showAddAudioModal, setShowAddAudioModal] = useState(false);
  const [editingAudio, setEditingAudio] = useState(null);

  // Form states - Report
  const [reportForm, setReportForm] = useState({
    title: '',
    period: '4ème Trimestre 2025',
    periodId: '2025-t4',
    year: 2025,
    category: 'theologie',
    author: 'Comité Exécutif AMA',
    summary: '',
    content: '',
    highlights: '',
    metrics: '',
    pdfUrl: '',
    isPublished: true,
  });

  // Form states - Announcement
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    category: 'COMMUNIQUE',
    author: 'Secrétariat Général AMA',
    summary: '',
    content: '',
    eventDate: '',
    location: 'Delbourg (#1), Thomonde',
    isUrgent: false,
    isPublished: true,
  });

  // Form states - Photo
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'theologie',
    date: 'Décembre 2025',
    location: 'Delbourg, Thomonde',
    image: '',
    caption: '',
    isPublished: true,
  });

  // Form states - Audio
  const [audioForm, setAudioForm] = useState({
    title: '',
    speaker: 'Pasteur Yvon BATHOL (Président AMA)',
    event: 'Cérémonie & Édification Fraternelle',
    duration: '40:00',
    category: 'theologie',
    date: 'Décembre 2025',
    audioSrc: '',
    description: '',
    isPublished: true,
  });

  // Form states - Site Stats
  const [editStats, setEditStats] = useState({
    visionTarget: 100000,
    currentReachedSouls: 2450,
    confirmedDecisionsForChrist: 114,
    partnerChurches: 5,
    competitionsOrganized: 4,
    laureatesAwarded: 14,
    youthAthletesEngaged: 320,
    biblesDistributed: 180,
    socialAidBeneficiaries: 85,
    activeVolunteers: 45,
    totalMobilizedHtg: 435000,
    fieldAllocationRate: 93.5,
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
            currentReachedSouls: resData.data.siteStats.currentReachedSouls || 2450,
            confirmedDecisionsForChrist: resData.data.siteStats.confirmedDecisionsForChrist || 114,
            partnerChurches: resData.data.siteStats.partnerChurches || 5,
            competitionsOrganized: resData.data.siteStats.competitionsOrganized || 4,
            laureatesAwarded: resData.data.siteStats.laureatesAwarded || 14,
            youthAthletesEngaged: resData.data.siteStats.youthAthletesEngaged || 320,
            biblesDistributed: resData.data.siteStats.biblesDistributed || 180,
            socialAidBeneficiaries: resData.data.siteStats.socialAidBeneficiaries || 85,
            activeVolunteers: resData.data.siteStats.activeVolunteers || 45,
            totalMobilizedHtg: resData.data.siteStats.totalMobilizedHtg || 435000,
            fieldAllocationRate: resData.data.siteStats.fieldAllocationRate || 93.5,
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

  // --- REPORT HANDLERS ---
  const openAddReportModal = () => {
    setEditingReport(null);
    setReportForm({
      title: '',
      period: '4ème Trimestre 2025',
      periodId: '2025-t4',
      year: 2025,
      category: 'theologie',
      author: 'Comité Exécutif AMA',
      summary: '',
      content: '',
      highlights: '',
      metrics: '',
      pdfUrl: '',
      isPublished: true,
    });
    setShowAddReportModal(true);
  };

  const openEditReportModal = (rep) => {
    setEditingReport(rep);
    const highlightsStr = Array.isArray(rep.highlights) ? rep.highlights.join('\n') : (rep.highlights || '');
    const metricsStr = Array.isArray(rep.metrics)
      ? rep.metrics.map((m) => `${m.label}: ${m.value}`).join('\n')
      : '';

    setReportForm({
      title: rep.title || '',
      period: rep.period || '4ème Trimestre 2025',
      periodId: rep.periodId || '2025-t4',
      year: rep.year || 2025,
      category: rep.category || 'theologie',
      author: rep.author || 'Comité Exécutif AMA',
      summary: rep.summary || '',
      content: rep.content || '',
      highlights: highlightsStr,
      metrics: metricsStr,
      pdfUrl: rep.pdfUrl || '',
      isPublished: rep.isPublished !== undefined ? rep.isPublished : true,
    });
    setShowAddReportModal(true);
  };

  const handleSaveReport = async (e) => {
    e.preventDefault();
    if (!reportForm.title || !reportForm.summary || !reportForm.content) {
      alert('Veuillez remplir les champs obligatoires (Titre, Résumé, Contenu).');
      return;
    }

    const highlightsArr = typeof reportForm.highlights === 'string'
      ? reportForm.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
      : reportForm.highlights || [];

    const metricsArr = typeof reportForm.metrics === 'string'
      ? reportForm.metrics.split('\n').map((line) => {
          const parts = line.split(':');
          return { label: parts[0]?.trim() || '', value: parts[1]?.trim() || '' };
        }).filter((m) => m.label && m.value)
      : reportForm.metrics || [];

    const payload = {
      title: reportForm.title,
      period: reportForm.period,
      periodId: reportForm.periodId || reportForm.period.toLowerCase().replace(/\s+/g, '-'),
      year: parseInt(reportForm.year) || 2025,
      category: reportForm.category,
      author: reportForm.author,
      summary: reportForm.summary,
      content: reportForm.content,
      highlights: highlightsArr,
      metrics: metricsArr,
      pdfUrl: reportForm.pdfUrl || null,
      isPublished: Boolean(reportForm.isPublished),
    };

    if (editingReport && editingReport.id) {
      await handleAction('report', 'update', editingReport.id, payload);
    } else {
      await handleAction('report', 'create', 'new', payload);
    }

    setShowAddReportModal(false);
    setEditingReport(null);
  };

  // --- ANNOUNCEMENT HANDLERS ---
  const openAddAnnouncementModal = () => {
    setEditingAnnouncement(null);
    setAnnouncementForm({
      title: '',
      category: 'COMMUNIQUE',
      author: 'Secrétariat Général AMA',
      summary: '',
      content: '',
      eventDate: '',
      location: 'Delbourg (#1), Thomonde',
      isUrgent: false,
      isPublished: true,
    });
    setShowAddAnnouncementModal(true);
  };

  const openEditAnnouncementModal = (ann) => {
    setEditingAnnouncement(ann);
    setAnnouncementForm({
      title: ann.title || '',
      category: ann.category || 'COMMUNIQUE',
      author: ann.author || 'Secrétariat Général AMA',
      summary: ann.summary || '',
      content: ann.content || '',
      eventDate: ann.eventDate || '',
      location: ann.location || 'Delbourg (#1), Thomonde',
      isUrgent: Boolean(ann.isUrgent),
      isPublished: ann.isPublished !== undefined ? ann.isPublished : true,
    });
    setShowAddAnnouncementModal(true);
  };

  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.summary || !announcementForm.content) {
      alert('Veuillez remplir au moins le Titre, le Résumé et le Contenu.');
      return;
    }

    const payload = {
      title: announcementForm.title,
      category: announcementForm.category,
      author: announcementForm.author,
      summary: announcementForm.summary,
      content: announcementForm.content,
      eventDate: announcementForm.eventDate || null,
      location: announcementForm.location || null,
      isUrgent: Boolean(announcementForm.isUrgent),
      isPublished: Boolean(announcementForm.isPublished),
    };

    if (editingAnnouncement && editingAnnouncement.id) {
      await handleAction('announcement', 'update', editingAnnouncement.id, payload);
    } else {
      await handleAction('announcement', 'create', 'new', payload);
    }

    setShowAddAnnouncementModal(false);
    setEditingAnnouncement(null);
  };

  // --- PHOTO HANDLERS ---
  const openAddPhotoModal = () => {
    setEditingPhoto(null);
    setPhotoForm({
      title: '',
      category: 'theologie',
      date: 'Décembre 2025',
      location: 'Delbourg, Thomonde',
      image: '',
      caption: '',
      isPublished: true,
    });
    setShowAddPhotoModal(true);
  };

  const openEditPhotoModal = (photo) => {
    setEditingPhoto(photo);
    setPhotoForm({
      title: photo.title || '',
      category: photo.category || 'theologie',
      date: photo.date || 'Décembre 2025',
      location: photo.location || 'Delbourg, Thomonde',
      image: photo.image || '',
      caption: photo.caption || '',
      isPublished: photo.isPublished !== undefined ? photo.isPublished : true,
    });
    setShowAddPhotoModal(true);
  };

  const handleSavePhoto = async (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.image) {
      alert('Veuillez renseigner le Titre et le Lien Image.');
      return;
    }

    const payload = {
      title: photoForm.title,
      category: photoForm.category,
      date: photoForm.date,
      location: photoForm.location,
      image: photoForm.image,
      caption: photoForm.caption || photoForm.title,
      isPublished: Boolean(photoForm.isPublished),
    };

    if (editingPhoto && editingPhoto.id) {
      await handleAction('photo', 'update', editingPhoto.id, payload);
    } else {
      await handleAction('photo', 'create', 'new', payload);
    }

    setShowAddPhotoModal(false);
    setEditingPhoto(null);
  };

  // --- AUDIO HANDLERS ---
  const openAddAudioModal = () => {
    setEditingAudio(null);
    setAudioForm({
      title: '',
      speaker: 'Pasteur Yvon BATHOL (Président AMA)',
      event: 'Cérémonie & Édification Fraternelle',
      duration: '40:00',
      category: 'theologie',
      date: 'Décembre 2025',
      audioSrc: '',
      description: '',
      isPublished: true,
    });
    setShowAddAudioModal(true);
  };

  const openEditAudioModal = (audio) => {
    setEditingAudio(audio);
    setAudioForm({
      title: audio.title || '',
      speaker: audio.speaker || '',
      event: audio.event || '',
      duration: audio.duration || '40:00',
      category: audio.category || 'theologie',
      date: audio.date || 'Décembre 2025',
      audioSrc: audio.audioSrc || '',
      description: audio.description || '',
      isPublished: audio.isPublished !== undefined ? audio.isPublished : true,
    });
    setShowAddAudioModal(true);
  };

  const handleSaveAudio = async (e) => {
    e.preventDefault();
    if (!audioForm.title || !audioForm.audioSrc) {
      alert('Veuillez renseigner le Titre et le Lien Audio.');
      return;
    }

    const payload = {
      title: audioForm.title,
      speaker: audioForm.speaker,
      event: audioForm.event,
      duration: audioForm.duration,
      category: audioForm.category,
      date: audioForm.date,
      audioSrc: audioForm.audioSrc,
      description: audioForm.description || audioForm.title,
      isPublished: Boolean(audioForm.isPublished),
    };

    if (editingAudio && editingAudio.id) {
      await handleAction('audio', 'update', editingAudio.id, payload);
    } else {
      await handleAction('audio', 'create', 'new', payload);
    }

    setShowAddAudioModal(false);
    setEditingAudio(null);
  };

  // --- STATS HANDLER ---
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
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Top Header Card */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Direction Exécutive & Trésorerie AMA</span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
            Tableau de Bord & Gestion des Activités
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Publication dynamique des annonces, gestion des rapports, suivi des adhésions et statistiques en direct.
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
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

      {/* KPI Overview Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Messages Reçus</span>
            <div className="text-xl sm:text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
              {stats.totalContacts}
              {stats.unreadContacts > 0 && (
                <span className="text-[10px] sm:text-xs font-sans font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  {stats.unreadContacts} new
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400">Formulaire contact</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-700">Requêtes Prière</span>
            <div className="text-xl sm:text-3xl font-serif font-bold text-amber-600">
              {stats.totalPrayers}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400">Intercession pastorale</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">Adhésions</span>
            <div className="text-xl sm:text-3xl font-serif font-bold text-ama-blue-900 flex items-center gap-2">
              {stats.totalMemberships}
              {stats.pendingMemberships > 0 && (
                <span className="text-[10px] sm:text-xs font-sans font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {stats.pendingMemberships} en attente
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400">Candidatures membres</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-700">Annonces & Rapports</span>
            <div className="text-xl sm:text-3xl font-serif font-bold text-purple-900">
              {(data.announcements || []).length + (data.reports || []).length}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400">Publications actives</p>
          </div>
        </div>
      )}

      {/* Responsive Tabs Navigation */}
      <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex overflow-x-auto gap-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'overview' ? 'bg-white text-ama-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📊 Vue Générale</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'announcements' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Megaphone className="w-4 h-4 text-blue-600" />
          <span>📢 Annonces ({(data.announcements || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'reports' ? 'bg-white text-amber-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>📑 Rapports & Concours ({(data.reports || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('statistics')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'statistics' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>📈 Statistiques Direct</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'photos' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Camera className="w-4 h-4 text-purple-600" />
          <span>📸 Photos ({(data.photos || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audios')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'audios' ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Headphones className="w-4 h-4 text-teal-600" />
          <span>🎙️ Audios ({(data.audios || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'contacts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Mail className="w-4 h-4 text-blue-600" />
          <span>Messages ({(data.contacts || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prayers')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'prayers' ? 'bg-white text-amber-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4 text-amber-600" />
          <span>Prières ({(data.prayers || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('memberships')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'memberships' ? 'bg-white text-ama-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-ama-blue-700" />
          <span>Adhésions ({(data.memberships || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('donations')}
          className={`flex items-center gap-1.5 py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'donations' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Dons ({(data.donations || []).length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="font-serif font-bold text-xl text-slate-900">
              Actions Rapides d'Administration
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={openAddAnnouncementModal}
                className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left hover:bg-blue-100 transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-blue-950">Publier une Annonce</h3>
                  <p className="text-xs text-blue-700">Communiqué officiel ou concours</p>
                </div>
              </button>

              <button
                onClick={openAddReportModal}
                className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left hover:bg-amber-100 transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-amber-950">Nouveau Rapport</h3>
                  <p className="text-xs text-amber-700">Résultats de concours & bilans</p>
                </div>
              </button>

              <button
                onClick={openAddPhotoModal}
                className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-left hover:bg-purple-100 transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-purple-950">Ajouter une Photo</h3>
                  <p className="text-xs text-purple-700">Galerie visuelle & événements</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('statistics')}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left hover:bg-emerald-100 transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-emerald-950">Mettre à Jour les Stats</h3>
                  <p className="text-xs text-emerald-700">Compteurs réels & impact 2050</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENTS & PUBLICATIONS */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-600" />
                <span>Annonces & Publications Officielles</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Publications dynamiques diffusées sur la page d'accueil et dans les espaces membres.
              </p>
            </div>

            <button
              onClick={openAddAnnouncementModal}
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Publier une Annonce</span>
            </button>
          </div>

          {data.announcements.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aucune annonce enregistrée. Cliquez sur « Publier une Annonce » pour commencer.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.announcements.map((ann) => (
                <div
                  key={ann.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    ann.isUrgent
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {ann.category}
                      </span>
                      {ann.isUrgent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                          Important
                        </span>
                      )}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        ann.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {ann.isPublished ? 'En Ligne' : 'Brouillon'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditAnnouncementModal(ann)}
                        title="Modifier"
                        className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('announcement', 'togglePublished', ann.id, { isPublished: !ann.isPublished })}
                        title={ann.isPublished ? 'Dépublier' : 'Publier'}
                        className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        {ann.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer définitivement l'annonce "${ann.title}" ?`)) {
                            handleAction('announcement', 'delete', ann.id);
                          }
                        }}
                        title="Supprimer"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900">{ann.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{ann.summary}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/80 pt-2.5">
                    <span>Auteur : {ann.author}</span>
                    {ann.eventDate && <span>{ann.eventDate}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REPORTS & CONCOURS */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>Rapports d'Activité & Résultats des Concours</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Rapports périodiques certifiés, palmarès des concours et bilans d'exercice.
              </p>
            </div>

            <button
              onClick={openAddReportModal}
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Rapport</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.reports.map((rep) => (
              <div
                key={rep.id || rep.slug}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {rep.period || `${rep.year}`}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {rep.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      rep.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {rep.isPublished ? 'En Ligne' : 'Brouillon'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditReportModal(rep)}
                      title="Modifier ce rapport"
                      className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction('report', 'togglePublished', rep.id, { isPublished: !rep.isPublished })}
                      title={rep.isPublished ? 'Masquer' : 'Publier'}
                      className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      {rep.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer définitivement le rapport "${rep.title}" ?`)) {
                          handleAction('report', 'delete', rep.id);
                        }
                      }}
                      title="Supprimer"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900">{rep.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{rep.summary}</p>
                </div>

                {rep.metrics && Array.isArray(rep.metrics) && rep.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                    {rep.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-100 text-[11px]">
                        <span className="text-slate-400 block truncate">{m.label}</span>
                        <span className="font-bold text-slate-800">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LIVE STATISTICS MANAGEMENT */}
      {activeTab === 'statistics' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Statistiques Réelles Institutionnelles (Base de Données)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mettez à jour les indicateurs officiels. Ils sont diffusés instantanément sur tout le site web.
              </p>
            </div>

            {statsMessage && (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                {statsMessage}
              </div>
            )}
          </div>

          <form onSubmit={handleSaveStatistics} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Objectif Vision 2050 (Âmes)
                </label>
                <input
                  type="number"
                  required
                  value={editStats.visionTarget}
                  onChange={(e) => setEditStats({ ...editStats, visionTarget: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Âmes Touchées (Contacts Réels)
                </label>
                <input
                  type="number"
                  required
                  value={editStats.currentReachedSouls}
                  onChange={(e) => setEditStats({ ...editStats, currentReachedSouls: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Engagements Spirituels pour Christ
                </label>
                <input
                  type="number"
                  required
                  value={editStats.confirmedDecisionsForChrist}
                  onChange={(e) => setEditStats({ ...editStats, confirmedDecisionsForChrist: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Églises Partenaires Réelles
                </label>
                <input
                  type="number"
                  required
                  value={editStats.partnerChurches}
                  onChange={(e) => setEditStats({ ...editStats, partnerChurches: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Grands Concours Organisés (2025)
                </label>
                <input
                  type="number"
                  required
                  value={editStats.competitionsOrganized || 4}
                  onChange={(e) => setEditStats({ ...editStats, competitionsOrganized: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Lauréats Récompensés
                </label>
                <input
                  type="number"
                  required
                  value={editStats.laureatesAwarded || 14}
                  onChange={(e) => setEditStats({ ...editStats, laureatesAwarded: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Jeunes Participants & Émulation
                </label>
                <input
                  type="number"
                  required
                  value={editStats.youthAthletesEngaged}
                  onChange={(e) => setEditStats({ ...editStats, youthAthletesEngaged: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Bibles & Nouveaux Testaments Distribués
                </label>
                <input
                  type="number"
                  required
                  value={editStats.biblesDistributed}
                  onChange={(e) => setEditStats({ ...editStats, biblesDistributed: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Bénéficiaires Aides & Diaconat
                </label>
                <input
                  type="number"
                  required
                  value={editStats.socialAidBeneficiaries}
                  onChange={(e) => setEditStats({ ...editStats, socialAidBeneficiaries: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Fonds Mobilisés (HTG)
                </label>
                <input
                  type="number"
                  required
                  value={editStats.totalMobilizedHtg}
                  onChange={(e) => setEditStats({ ...editStats, totalMobilizedHtg: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Taux Affectation Terrain (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={editStats.fieldAllocationRate}
                  onChange={(e) => setEditStats({ ...editStats, fieldAllocationRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Bénévoles Actifs & Moniteurs
                </label>
                <input
                  type="number"
                  required
                  value={editStats.activeVolunteers}
                  onChange={(e) => setEditStats({ ...editStats, activeVolunteers: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={statsSaving}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {statsSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Enregistrer & Diffuser les Statistiques</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: PHOTOS GALLERY */}
      {activeTab === 'photos' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                <span>Galerie Visuelle</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Photographies des cultes, concours et actions de terrain.
              </p>
            </div>

            <button
              onClick={openAddPhotoModal}
              className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.photos.map((photo) => (
              <div
                key={photo.id}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 hover:bg-white transition-all space-y-2 shadow-xs group"
              >
                <div className="relative h-44 w-full bg-slate-200 overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                    {photo.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{photo.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{photo.caption}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-400">
                    <span>{photo.location}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditPhotoModal(photo)}
                        title="Modifier"
                        className="p-1 text-slate-600 hover:text-purple-700"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAction('photo', 'togglePublished', photo.id, { isPublished: !photo.isPublished })}
                        title={photo.isPublished ? 'Masquer' : 'Publier'}
                        className="p-1 text-slate-600 hover:text-purple-700"
                      >
                        {photo.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer la photo "${photo.title}" ?`)) {
                            handleAction('photo', 'delete', photo.id);
                          }
                        }}
                        title="Supprimer"
                        className="p-1 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AUDIO RECORDINGS */}
      {activeTab === 'audios' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-teal-600" />
                <span>Enseignements & Messages Audio</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Prédications, forums doctrinaux et messages d'édification.
              </p>
            </div>

            <button
              onClick={openAddAudioModal}
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un Audio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.audios.map((audio) => (
              <div
                key={audio.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-900">
                      {audio.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{audio.duration}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditAudioModal(audio)}
                      title="Modifier"
                      className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction('audio', 'togglePublished', audio.id, { isPublished: !audio.isPublished })}
                      title={audio.isPublished ? 'Masquer' : 'Publier'}
                      className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      {audio.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer l'audio "${audio.title}" ?`)) {
                          handleAction('audio', 'delete', audio.id);
                        }
                      }}
                      title="Supprimer"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{audio.title}</h3>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">{audio.speaker}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{audio.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs">
                  <audio controls className="w-full h-8" src={audio.audioSrc}>
                    Votre navigateur ne supporte pas l'élément audio.
                  </audio>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: CONTACT MESSAGES */}
      {activeTab === 'contacts' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Messages Reçus</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Courriels et messages envoyés via le formulaire de contact public.
              </p>
            </div>
          </div>

          {data.contacts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aucun message de contact reçu pour le moment.
            </div>
          ) : (
            <div className="space-y-4">
              {data.contacts.map((c) => (
                <div
                  key={c.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    c.status === 'UNREAD'
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-sm text-slate-900">{c.fullName}</span>
                      <span className="text-xs text-slate-400 ml-2">({c.email} {c.phone ? `• ${c.phone}` : ''})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        c.status === 'UNREAD' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {c.status}
                      </span>
                      <button
                        onClick={() => handleAction('contact', 'updateStatus', c.id, { status: c.status === 'UNREAD' ? 'READ' : 'UNREAD' })}
                        className="text-xs text-blue-700 hover:underline font-semibold"
                      >
                        {c.status === 'UNREAD' ? 'Marquer comme lu' : 'Marquer non lu'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer le message de ${c.fullName} ?`)) {
                            handleAction('contact', 'delete', c.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">{c.subject}</h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 whitespace-pre-wrap">{c.message}</p>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-200/80 pt-2">
                    Reçu le {new Date(c.createdAt).toLocaleString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 8: PRAYERS */}
      {activeTab === 'prayers' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-600" />
                <span>Requêtes d'Intercession Pastorale</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Demandes de prière soumises par les frères, sœurs et visiteurs.
              </p>
            </div>
          </div>

          {data.prayers.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aucune requête de prière reçue pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.prayers.map((p) => (
                <div
                  key={p.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    p.isPrayedFor ? 'bg-emerald-50/40 border-emerald-200' : 'bg-amber-50/40 border-amber-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{p.title}</h3>
                      <p className="text-xs text-slate-500">
                        {p.isAnonymous ? 'Anonyme' : p.fullName} {p.location ? `• ${p.location}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAction('prayer', 'togglePrayed', p.id, { isPrayedFor: !p.isPrayedFor })}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                          p.isPrayedFor
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        {p.isPrayedFor ? '✓ Prié' : 'À prier'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer cette requête de prière ?`)) {
                            handleAction('prayer', 'delete', p.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 whitespace-pre-wrap">{p.description}</p>

                  <div className="text-[11px] text-slate-400 border-t border-slate-200/80 pt-2 flex items-center justify-between">
                    <span>{new Date(p.createdAt).toLocaleDateString('fr-FR')}</span>
                    <span>{p.isPrivate ? 'Confidentialité : Privé' : 'Public'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 9: MEMBERSHIPS */}
      {activeTab === 'memberships' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-ama-blue-700" />
                <span>Candidatures d'Adhésion</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Demandes pour rejoindre l'association comme travailleur, bénévole ou membre engagé.
              </p>
            </div>
          </div>

          {data.memberships.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aucune candidature d'adhésion enregistrée.
            </div>
          ) : (
            <div className="space-y-4">
              {data.memberships.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{m.fullName}</h3>
                      <p className="text-xs text-slate-500">
                        {m.email} • {m.phone} • {m.city}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={m.status}
                        onChange={(e) => handleAction('membership', 'updateStatus', m.id, { status: e.target.value })}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="PENDING">En attente</option>
                        <option value="CONTACTED">Contacté</option>
                        <option value="APPROVED">Approuvé</option>
                        <option value="REJECTED">Rejeté</option>
                      </select>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer la candidature de ${m.fullName} ?`)) {
                            handleAction('membership', 'delete', m.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-400 block">Assemblée locale & Rôle :</span>
                      <span className="text-slate-800">{m.church} ({m.roleInChurch || 'Membre'})</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block">Compétences / Talents :</span>
                      <span className="text-slate-800">{m.skills || 'Non spécifié'}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-xs text-slate-400 block mb-0.5">Motivation :</span>
                    <p className="text-xs text-slate-700 whitespace-pre-wrap bg-slate-100/60 p-3 rounded-xl">
                      {m.motivation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 10: DONATIONS & TREASURY */}
      {activeTab === 'donations' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span>Déclarations de Dons & Trésorerie</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Suivi des promesses et transferts MonCash, Natcash, PayPal et virements bancaires.
              </p>
            </div>

            <button
              onClick={exportDonationsToCSV}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Exporter CSV Trésorerie</span>
            </button>
          </div>

          {data.donations.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aucune déclaration de don enregistrée pour le moment.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 rounded-l-xl">Date</th>
                    <th className="p-3">Donateur</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3">Canal</th>
                    <th className="p-3">Projet</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.donations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="p-3 whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{d.donorName}</div>
                        <div className="text-[10px] text-slate-400">{d.donorPhone || d.donorEmail || ''}</div>
                      </td>
                      <td className="p-3 font-bold text-emerald-700 whitespace-nowrap">
                        {d.amount.toLocaleString()} {d.currency}
                      </td>
                      <td className="p-3 uppercase font-semibold">{d.channel}</td>
                      <td className="p-3">{d.targetProject}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : d.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleAction('donation', 'updateStatus', d.id, { status: 'CONFIRMED' })}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-bold"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Supprimer ce don ?`)) {
                                handleAction('donation', 'delete', d.id);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-md"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* --- MODAL 1: ADD / EDIT ANNOUNCEMENT --- */}
      {showAddAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {editingAnnouncement ? "Modifier l'Annonce" : "Publier une Nouvelle Annonce"}
                </h3>
                <p className="text-xs text-slate-500">
                  Diffusée dynamiquement sur la page d'accueil et les espaces d'information.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddAnnouncementModal(false);
                  setEditingAnnouncement(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Titre de l'Annonce *
                </label>
                <input
                  type="text"
                  required
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="ex: Proclamation des résultats officiels..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={announcementForm.category}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="COMMUNIQUE">Communiqué Officiel</option>
                    <option value="CONCOURS">Concours & Palmarès</option>
                    <option value="EVENEMENT">Événement & Culte</option>
                    <option value="SPIRITUEL">Édification & Prière</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Auteur / Émetteur
                  </label>
                  <input
                    type="text"
                    value={announcementForm.author}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Date de l'événement (optionnel)
                  </label>
                  <input
                    type="text"
                    value={announcementForm.eventDate}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, eventDate: e.target.value })}
                    placeholder="ex: 18 Novembre 2025"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Lieu (optionnel)
                  </label>
                  <input
                    type="text"
                    value={announcementForm.location}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, location: e.target.value })}
                    placeholder="ex: Delbourg (#1), Thomonde"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Résumé Court *
                </label>
                <textarea
                  required
                  rows={2}
                  value={announcementForm.summary}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, summary: e.target.value })}
                  placeholder="Bref résumé accrocheur..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Contenu Complet *
                </label>
                <textarea
                  required
                  rows={5}
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  placeholder="Texte détaillé de l'annonce..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementForm.isUrgent}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, isUrgent: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Marquer comme Important / Urgent</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementForm.isPublished}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, isPublished: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Publier immédiatement en ligne</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAnnouncementModal(false);
                    setEditingAnnouncement(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  {editingAnnouncement ? "Mettre à jour l'Annonce" : "Publier l'Annonce"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADD / EDIT REPORT --- */}
      {showAddReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {editingReport ? "Modifier le Rapport d'Activité" : "Enregistrer un Nouveau Rapport"}
                </h3>
                <p className="text-xs text-slate-500">
                  Publication dynamique avec segmentation périodique, points saillants et indicateurs.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddReportModal(false);
                  setEditingReport(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReport} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Titre du Rapport *
                </label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  placeholder="ex: Résultats Officiels : Compétition de Versets..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Période Affichée
                  </label>
                  <input
                    type="text"
                    required
                    value={reportForm.period}
                    onChange={(e) => setReportForm({ ...reportForm, period: e.target.value })}
                    placeholder="ex: 4ème Trimestre 2025"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Année
                  </label>
                  <input
                    type="number"
                    required
                    value={reportForm.year}
                    onChange={(e) => setReportForm({ ...reportForm, year: parseInt(e.target.value) || 2025 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={reportForm.category}
                    onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="theologie">Génie Biblique & Concours</option>
                    <option value="evangelisation">Évangélisation & Croisades</option>
                    <option value="social">Diaconat & Action Sociale</option>
                    <option value="finances">Trésorerie & Transparence</option>
                    <option value="annuel">Bilan Annuel Consolidé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Auteur / Jury / Commission
                </label>
                <input
                  type="text"
                  value={reportForm.author}
                  onChange={(e) => setReportForm({ ...reportForm, author: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Résumé Synthétique *
                </label>
                <textarea
                  required
                  rows={2}
                  value={reportForm.summary}
                  onChange={(e) => setReportForm({ ...reportForm, summary: e.target.value })}
                  placeholder="Résumé en 2-3 phrases pour l'aperçu..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Contenu Détaillé du Rapport *
                </label>
                <textarea
                  required
                  rows={5}
                  value={reportForm.content}
                  onChange={(e) => setReportForm({ ...reportForm, content: e.target.value })}
                  placeholder="Texte complet, notes des lauréats, déroulement..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Points Saillants (1 par ligne)
                  </label>
                  <textarea
                    rows={3}
                    value={reportForm.highlights}
                    onChange={(e) => setReportForm({ ...reportForm, highlights: e.target.value })}
                    placeholder="1ère Place : POLAS Vanessa...&#10;2ème Place : JEAN-MARY Sadrackson..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Indicateurs Chiffrés (Format : Libellé : Valeur)
                  </label>
                  <textarea
                    rows={3}
                    value={reportForm.metrics}
                    onChange={(e) => setReportForm({ ...reportForm, metrics: e.target.value })}
                    placeholder="1ère Place : 230 versets&#10;Participants : 45"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Lien Document PDF (Optionnel)
                </label>
                <input
                  type="text"
                  value={reportForm.pdfUrl}
                  onChange={(e) => setReportForm({ ...reportForm, pdfUrl: e.target.value })}
                  placeholder="/documents/resultats-concours.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportForm.isPublished}
                    onChange={(e) => setReportForm({ ...reportForm, isPublished: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Publier immédiatement ce rapport dans la Médiathèque</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddReportModal(false);
                    setEditingReport(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  {editingReport ? "Mettre à jour le Rapport" : "Enregistrer le Rapport"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ADD / EDIT PHOTO --- */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {editingPhoto ? "Modifier la Photo" : "Ajouter une Photo"}
                </h3>
                <p className="text-xs text-slate-500">
                  Intégration d'un visuel pour la galerie publique de l'association.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddPhotoModal(false);
                  setEditingPhoto(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Titre de la Photo *
                </label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="ex: Finale des 10 Psaumes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  URL de l'Image (Web / Unsplash / Hébergeur) *
                </label>
                <input
                  type="url"
                  required
                  value={photoForm.image}
                  onChange={(e) => setPhotoForm({ ...photoForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="theologie">Génie Biblique & Concours</option>
                    <option value="jeunesse">Jeunesse & Récitations</option>
                    <option value="evangelisation">Évangélisation & Cérémonies</option>
                    <option value="social">Diaconat & Fraternité</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Lieu
                  </label>
                  <input
                    type="text"
                    value={photoForm.location}
                    onChange={(e) => setPhotoForm({ ...photoForm, location: e.target.value })}
                    placeholder="Delbourg, Thomonde"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Légende explicative
                </label>
                <textarea
                  rows={2}
                  value={photoForm.caption}
                  onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                  placeholder="Détails sur l'événement photographié..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={photoForm.isPublished}
                    onChange={(e) => setPhotoForm({ ...photoForm, isPublished: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <span>Publier dans la galerie</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPhotoModal(false);
                    setEditingPhoto(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  {editingPhoto ? "Mettre à jour la Photo" : "Enregistrer la Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 4: ADD / EDIT AUDIO --- */}
      {showAddAudioModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {editingAudio ? "Modifier l'Enregistrement Audio" : "Ajouter un Enregistrement Audio"}
                </h3>
                <p className="text-xs text-slate-500">
                  Prédication, forum théologique ou exhortation.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddAudioModal(false);
                  setEditingAudio(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAudio} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Titre du Message Audio *
                </label>
                <input
                  type="text"
                  required
                  value={audioForm.title}
                  onChange={(e) => setAudioForm({ ...audioForm, title: e.target.value })}
                  placeholder="ex: L'Exercice des Ministères..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-ama-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Orateur / Prédicateur
                  </label>
                  <input
                    type="text"
                    required
                    value={audioForm.speaker}
                    onChange={(e) => setAudioForm({ ...audioForm, speaker: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={audioForm.duration}
                    onChange={(e) => setAudioForm({ ...audioForm, duration: e.target.value })}
                    placeholder="45:00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Lien Audio (Fichier MP3 / URL directe) *
                </label>
                <input
                  type="url"
                  required
                  value={audioForm.audioSrc}
                  onChange={(e) => setAudioForm({ ...audioForm, audioSrc: e.target.value })}
                  placeholder="https://.../message.mp3"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={audioForm.description}
                  onChange={(e) => setAudioForm({ ...audioForm, description: e.target.value })}
                  placeholder="Résumé de l'exhortation..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={audioForm.isPublished}
                    onChange={(e) => setAudioForm({ ...audioForm, isPublished: e.target.checked })}
                    className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  <span>Publier cet enregistrement</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAudioModal(false);
                    setEditingAudio(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  {editingAudio ? "Mettre à jour l'Audio" : "Enregistrer l'Audio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
