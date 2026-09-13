'use client';

import React, { useEffect, useState } from 'react';
import { mapLocations, mapCenter } from '@/data/mapLocations';
import { MapPin, Navigation, ShieldCheck, Sparkles } from 'lucide-react';

export default function PeligreMap() {
  const [selectedLocation, setSelectedLocation] = useState(mapLocations[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      {/* Map Header & Controls */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-4 h-4" />
            <span>Plateau Central & Bassin du Lac de Péligre</span>
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-white mt-0.5">
            Cartographie d'Action & Déploiement Territorial
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-ama-blue-800/80 px-3 py-1.5 rounded-lg border border-blue-700 text-blue-200">
            {mapLocations.length} Points Clés Référencés
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Interactive Map Visual (OpenStreetMap Embed + Interactive Points) */}
        <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[460px] bg-slate-100 flex flex-col">
          {isClient && (
            <iframe
              title="Carte de Thomonde et du Lac de Péligre"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', flex: 1 }}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=-72.25%2C18.80%2C-71.85%2C19.15&layer=mapnik&marker=${selectedLocation.lat}%2C${selectedLocation.lng}`}
            />
          )}

          {/* Quick Floating Location Selector */}
          <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 flex flex-wrap gap-1.5 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200 shadow-lg max-h-40 overflow-y-auto">
            {mapLocations.map((loc) => {
              const active = selectedLocation.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-ama-blue-900 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{loc.commune === 'Thomonde' ? loc.name.split('—')[0].trim() : loc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Details Panel */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                selectedLocation.isHeadquarters
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-blue-100 text-blue-900 border border-blue-200'
              }`}>
                {selectedLocation.isHeadquarters ? '★ Siège Principal AMA' : 'Zone d’Intervention'}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lng.toFixed(4)}°W
              </span>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                {selectedLocation.name}
              </h4>
              <p className="text-xs text-ama-blue-700 font-semibold mt-0.5">
                Commune : {selectedLocation.commune}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedLocation.description}
            </p>

            <div>
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Actions sur cette zone :
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedLocation.activities.map((act, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md shadow-2xs"
                  >
                    • {act}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Rayonnement ecclésial concerté avec les assemblées locales.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
