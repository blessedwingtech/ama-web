'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  photoGallery,
  audioRecordings,
  mediaCategories,
} from '@/data/media';
import {
  periodicReports,
  reportCategories,
  reportPeriods,
} from '@/data/reports';
import MediaCard from '@/components/cards/MediaCard';
import Lightbox from '@/components/common/Lightbox';
import AudioPlayer from '@/components/common/AudioPlayer';
import {
  Film,
  Camera,
  Headphones,
  FileText,
  Filter,
  Trophy,
  Calendar,
  User,
  CheckCircle2,
  TrendingUp,
  Download,
  BookOpen,
  X,
  Printer,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export default function MediaPage() {
  // Gallery states
  const [activePhotoCategory, setActivePhotoCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photosList, setPhotosList] = useState(photoGallery);
  const [audiosList, setAudiosList] = useState(audioRecordings);

  // Dynamic Reports state from DB
  const [reportsList, setReportsList] = useState(periodicReports);
  const [loadingContent, setLoadingContent] = useState(false);

  // Reports segmentation states
  const [selectedReportPeriod, setSelectedReportPeriod] = useState('all');
  const [selectedReportCategory, setSelectedReportCategory] = useState('all');
  const [activeReportModal, setActiveReportModal] = useState(null);

  // Fetch dynamic reports & media from database API
  React.useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        setLoadingContent(true);
        const [repRes, mediaRes] = await Promise.all([
          fetch('/api/reports').catch(() => null),
          fetch('/api/media').catch(() => null),
        ]);

        if (repRes && repRes.ok) {
          const repData = await repRes.json();
          if (repData.reports && repData.reports.length > 0) {
            setReportsList(repData.reports);
          }
        }

        if (mediaRes && mediaRes.ok) {
          const mediaData = await mediaRes.json();
          if (mediaData.photos && mediaData.photos.length > 0) {
            setPhotosList(mediaData.photos);
          }
          if (mediaData.audios && mediaData.audios.length > 0) {
            setAudiosList(mediaData.audios);
          }
        }
      } catch (err) {
        console.warn('Utilisation des médias de secours:', err);
      } finally {
        setLoadingContent(false);
      }
    };
    fetchDynamicContent();
  }, []);

  // Filter photos
  const filteredPhotos =
    activePhotoCategory === 'all'
      ? photosList
      : photosList.filter((p) => p.category === activePhotoCategory);

  // Filter dynamic reports by period & category
  const filteredReports = reportsList.filter((report) => {
    const matchesPeriod =
      selectedReportPeriod === 'all' || report.periodId === selectedReportPeriod;
    const matchesCategory =
      selectedReportCategory === 'all' || report.category === selectedReportCategory;
    return matchesPeriod && matchesCategory;
  });

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-ama-blue-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Film className="w-4 h-4 text-ama-blue-700" />
          <span>Publications Officielles & Médiathèque</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Rapports Périodiques & Ressources
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Consultez nos bilans trimestriels, procès-verbaux de croisades, enregistrements doctrinaux et résumés des championnats d'été.
        </p>

        {/* Quick Link to Analytics */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/statistiques"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Découvrir la Page des Statistiques Globales & Vision 2050</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 1. SECTION RAPPORTS PÉRIODIQUES SEGMENTÉS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Transparence & Gouvernance
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
                <FileText className="w-6 h-6 text-ama-blue-900" />
                <span>Rapports d'Activité & Bilans Trimestriels</span>
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-xl">
              {filteredReports.length} publication(s) répertoriée(s)
            </span>
          </div>

          {/* Double Filter Bar : Périodes & Catégories */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {/* Period Filter */}
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-ama-blue-900" />
                <span>Filtrer par Période / Année :</span>
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {reportPeriods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedReportPeriod(period.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                      selectedReportPeriod === period.id
                        ? 'bg-ama-blue-900 text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                <span>Filtrer par Pilier / Catégorie :</span>
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {reportCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedReportCategory(cat.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                      selectedReportCategory === cat.id
                        ? 'bg-amber-600 text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-ama-blue-900 border border-blue-200 px-3 py-1 rounded-full">
                    {report.period}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {report.date}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Rédigé par : <strong>{report.author}</strong></span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {report.summary}
                </p>

                {/* Key Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {report.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center">
                      <div className="text-xs sm:text-sm font-bold font-mono text-ama-blue-900">{m.value}</div>
                      <div className="text-[10px] text-slate-500">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights preview */}
                <div className="pt-2 space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Faits Marquants de la Période :
                  </h4>
                  {report.highlights.slice(0, 2).map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveReportModal(report)}
                  className="inline-flex items-center gap-1.5 bg-ama-blue-900 hover:bg-ama-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Consulter l'Intégralité</span>
                </button>

                <button
                  onClick={() => setActiveReportModal(report)}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Synthèse PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-2">
            <p className="text-sm font-bold text-slate-700">Aucun rapport pour cette combinaison de filtres.</p>
            <button
              onClick={() => {
                setSelectedReportPeriod('all');
                setSelectedReportCategory('all');
              }}
              className="text-xs text-ama-blue-700 font-bold underline"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </section>

      {/* 2. MODAL LECTEUR DE RAPPORT COMPLET */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white max-w-3xl w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setActiveReportModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                  {activeReportModal.period}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeReportModal.date}</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                {activeReportModal.title}
              </h2>

              <p className="text-xs text-slate-500">
                Auteur & Émetteur : <strong>{activeReportModal.author}</strong> • Association 100,000 Âmes (AMA)
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              {activeReportModal.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-serif font-bold text-ama-blue-900 font-mono">{m.value}</div>
                  <div className="text-[11px] text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Points Forts & Réalisations :
              </h4>
              <ul className="space-y-1.5">
                {activeReportModal.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Narrative Content */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Compte Rendu Détaillé :
              </h4>
              <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed space-y-3">
                {activeReportModal.content}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer ce Rapport</span>
              </button>

              <button
                onClick={() => setActiveReportModal(null)}
                className="bg-ama-blue-900 hover:bg-ama-blue-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                Fermer la Fenêtre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. GALERIE PHOTOS AVEC SYSTÈME DE FILTRES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Galerie Visuelle
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
              <Camera className="w-6 h-6 text-ama-blue-900" />
              <span>Campagnes & Activités de Terrain</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {mediaCategories.map((cat) => {
              const active = activePhotoCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActivePhotoCategory(cat.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                    active
                      ? 'bg-ama-blue-900 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <MediaCard key={photo.id} item={photo} onOpen={setSelectedPhoto} />
          ))}
        </div>

        {/* Lightbox Component */}
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      </section>

      {/* 4. ENREGISTREMENTS AUDIO DES CONFÉRENCES & PRÉDICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Écoute & Édification
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Headphones className="w-6 h-6 text-ama-blue-900" />
            <span>Enseignements & Conférences Audio</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Écoutez les messages doctrinaux et exhortations délivrés par les pasteurs et intervenants d'AMA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiosList.map((audio) => (
            <AudioPlayer key={audio.id} audio={audio} />
          ))}
        </div>
      </section>
    </div>
  );
}
