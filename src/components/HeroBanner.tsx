/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, Award } from 'lucide-react';

interface HeroBannerProps {
  onStartRoute: () => void;
  onExploreIdentity: () => void;
  onExploreRegulation: () => void;
  completionPercentage: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartRoute,
  onExploreIdentity,
  onExploreRegulation,
  completionPercentage
}) => {
  return (
    <div className="relative overflow-hidden bg-[#00324D] rounded-3xl text-white shadow-lg border border-slate-800">
      {/* 2-Column Responsive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between z-10">
          <div>
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-3">
              <span>SENA Colombia</span>
              <span aria-hidden="true">·</span>
              <span>Proceso de Inducción Integral</span>
              <span aria-hidden="true">·</span>
              <span>Acuerdo 007 de 2012</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white max-w-2xl">
              Bienvenido al SENA: Formación para la Vida y el Trabajo
            </h1>

            <p className="mt-4 text-sm md:text-base text-slate-200 leading-relaxed max-w-xl">
              Apropia la identidad institucional, comprende tus derechos y deberes según el Reglamento del Aprendiz, canta el himno oficial y evalúa tu aprendizaje con cuestionarios interactivos.
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={onStartRoute}
              className="px-5 py-2.5 text-xs md:text-sm font-bold text-white bg-[#39A900] hover:bg-[#2e8302] rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <span>Continuar Ruta de Inducción</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreIdentity}
              className="px-4 py-2.5 text-xs md:text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl backdrop-blur-xs transition-colors whitespace-nowrap"
            >
              Identidad & Himno
            </button>
            <button
              onClick={onExploreRegulation}
              className="px-4 py-2.5 text-xs md:text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl backdrop-blur-xs transition-colors whitespace-nowrap"
            >
              Reglamento & Casos
            </button>
          </div>
        </div>

        {/* Right Column: High Fidelity Generated Photography */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
          <img
            src="/src/assets/images/sena_induction_hero_1794325241104.jpg"
            alt="Campus moderno del Centro Tecnológico SENA con aprendices en formación"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00324D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#00324D] lg:via-transparent lg:to-transparent opacity-80" />

          {/* Floating Progress Chip in Hero */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-white text-xs">
            <span className="text-slate-300 block text-[10px] uppercase tracking-wider font-semibold">Tu Avance Actual</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-bold font-mono text-[#39A900]">{completionPercentage}%</span>
              <span className="text-slate-300">completado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-Column Strip below hero split */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-white/10 bg-black/25">
        <div className="p-4 md:px-6">
          <span className="text-[11px] text-slate-400 block font-mono">01. IDENTIDAD</span>
          <p className="text-xs font-bold text-white mt-0.5">Símbolos, Himno y Valores</p>
        </div>
        <div className="p-4 md:px-6">
          <span className="text-[11px] text-slate-400 block font-mono">02. NORMATIVA</span>
          <p className="text-xs font-bold text-white mt-0.5">Acuerdo 007 de 2012</p>
        </div>
        <div className="p-4 md:px-6">
          <span className="text-[11px] text-slate-400 block font-mono">03. CASOS REALES</span>
          <p className="text-xs font-bold text-white mt-0.5">Simulador de Convivencia</p>
        </div>
        <div className="p-4 md:px-6">
          <span className="text-[11px] text-slate-400 block font-mono">04. CERTIFICACIÓN</span>
          <p className="text-xs font-bold text-white mt-0.5">Constancia Oficial Digital</p>
        </div>
      </div>
    </div>
  );
};
