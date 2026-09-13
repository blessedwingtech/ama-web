'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Download } from 'lucide-react';

export default function AudioPlayer({ audio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <audio
        ref={audioRef}
        src={audio.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-ama-gold-700 uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5" />
            <span>{audio.event}</span>
            <span>•</span>
            <span>{audio.date}</span>
          </div>
          <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
            {audio.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Orateur : <span className="text-ama-blue-900 font-bold">{audio.speaker}</span>
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs px-2.5 py-1 rounded-full bg-blue-50 text-ama-blue-800 font-mono font-semibold">
          {audio.duration || 'Durée: Audio'}
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        {audio.description}
      </p>

      {/* Audio Controls */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-xl bg-ama-blue-900 text-white flex items-center justify-center hover:bg-ama-blue-800 active:scale-95 transition-all shrink-0 shadow-xs"
          aria-label={isPlaying ? 'Mettre en pause' : 'Écouter'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        {/* Progress scrub bar */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500 w-9 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-ama-blue-900"
            aria-label="Position audio"
          />
          <span className="text-[11px] font-mono text-slate-500 w-9">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume & Download */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
            title={isMuted ? 'Rétablir le son' : 'Couper le son'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <a
            href={audio.audioSrc}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
            title="Télécharger l'enregistrement"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
