'use client';

import React, { useState } from 'react';
import {
  photoGallery,
  audioRecordings,
  tournamentArticles,
  mediaCategories,
} from '@/data/media';
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
} from 'lucide-react';

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos =
    activeCategory === 'all'
      ? photoGallery
      : photoGallery.filter((p) => p.category === activeCategory);

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
          <span>Ressources Multimédias & Témoignages</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Médiathèque de l'Association
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Photos des croisades, enregistrements audio des conférences théologiques et résumés des championnats d'été.
        </p>
      </section>

      {/* 1. GALERIE PHOTOS AVEC SYSTÈME DE FILTRES */}
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
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
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

      {/* 2. ENREGISTREMENTS AUDIO DES CONFÉRENCES & PRÉDICATIONS */}
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
          {audioRecordings.map((audio) => (
            <AudioPlayer key={audio.id} audio={audio} />
          ))}
        </div>
      </section>

      {/* 3. RÉSUMÉS DES TOURNOIS & ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ama-gold-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Chroniques & Bilan
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
            <FileText className="w-6 h-6 text-ama-blue-900" />
            <span>Rapports & Résumés des Championnats</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tournamentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-slate-900 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Points Forts de l'Édition :
                    </h4>
                    {article.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-mono text-ama-blue-900 font-semibold">
                  {Object.entries(article.stats).map(([k, v]) => (
                    <span key={k} className="bg-blue-50 px-2.5 py-1 rounded-md">
                      {k}: <strong>{v}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
