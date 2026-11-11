/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw, Volume2, Music } from 'lucide-react';
import { SENA_ANTHEM_STANZAS } from '../data/senaData';
import { senaAnthemPlayer } from '../utils/audioSynth';

export const AnthemPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStanza, setCurrentStanza] = useState(0);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    return () => {
      senaAnthemPlayer.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      senaAnthemPlayer.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      senaAnthemPlayer.play(
        (stanzaIdx, verseIdx) => {
          setCurrentStanza(stanzaIdx);
          setCurrentVerse(verseIdx);
          setSelectedTab(stanzaIdx);
        },
        () => {
          setIsPlaying(false);
        }
      );
    }
  };

  const handleReset = () => {
    senaAnthemPlayer.stop();
    setIsPlaying(false);
    setCurrentStanza(0);
    setCurrentVerse(0);
    setSelectedTab(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span className="text-[#39A900] font-semibold">Símbolo Cultural</span>
            <span aria-hidden="true">·</span>
            <span>Himno Oficial del SENA</span>
            <span aria-hidden="true">·</span>
            <span>Letra: Jesús Daniel Montoya</span>
          </div>
          <h3 className="text-xl font-bold text-[#00324D] dark:text-white font-heading">
            Reproductor Interactivo del Himno
          </h3>
        </div>

        {/* Audio Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isPlaying
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-[#39A900] text-white hover:bg-[#2e8302]'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-white" />
                <span>Pausar Marcha</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Escuchar Himno</span>
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Reiniciar Himno"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Sound Wave & Visualizer */}
      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg flex items-center justify-between gap-4 border border-transparent dark:border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPlaying ? 'bg-[#39A900] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            <Music className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {isPlaying ? 'Reproduciendo melodía marcial en vivo (Web Audio)' : 'Melodía marcial en compás de 4/4'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Sigue la letra en tiempo real como parte de la apropiación institucional
            </p>
          </div>
        </div>

        {/* Dynamic Equalizer Bars */}
        <div className="flex items-end gap-1 h-6">
          {[12, 22, 16, 28, 14, 24, 18, 30, 16, 22].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isPlaying ? 'bg-[#39A900]' : 'bg-slate-300 dark:bg-slate-600'
              }`}
              style={{
                height: isPlaying ? `${Math.max(6, (height * ((i % 3) + 1.2)) % 26)}px` : '6px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Stanza Selector Tabs */}
      <div className="flex items-center gap-2 mt-5 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto">
        {SENA_ANTHEM_STANZAS.map((stanza, idx) => (
          <button
            key={stanza.number}
            onClick={() => setSelectedTab(idx)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedTab === idx
                ? 'bg-[#00324D] text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {stanza.type}
          </button>
        ))}
      </div>

      {/* Karaoke / Lyric Display */}
      <div className="mt-5 p-6 bg-slate-900 rounded-xl text-center relative overflow-hidden">
        <div className="absolute top-2 right-3 text-[10px] text-emerald-400 font-mono tracking-wider">
          {isPlaying ? '● EN REPRODUCCIÓN' : 'LISTO PARA INTERPRETAR'}
        </div>

        <p className="text-xs uppercase tracking-widest text-[#39A900] font-semibold mb-3">
          {SENA_ANTHEM_STANZAS[selectedTab].type}
        </p>

        <div className="space-y-2">
          {SENA_ANTHEM_STANZAS[selectedTab].verses.map((verseText, vIdx) => {
            const isCurrentActive = isPlaying && currentStanza === selectedTab && currentVerse === vIdx;
            return (
              <p
                key={vIdx}
                className={`text-base md:text-lg transition-all duration-200 font-medium ${
                  isCurrentActive
                    ? 'text-white font-bold scale-105 tracking-wide text-emerald-300'
                    : 'text-slate-400'
                }`}
              >
                {verseText}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
