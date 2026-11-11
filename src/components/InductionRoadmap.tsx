/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Apprentice } from '../types/induction';
import { SENA_MODULES, INDUCTION_CHECKLIST } from '../data/senaData';
import { CheckCircle2, Circle, ArrowRight, ShieldCheck, User, Sparkles, BookOpen, Clock } from 'lucide-react';

interface InductionRoadmapProps {
  apprentice: Apprentice;
  onToggleChecklist: (itemId: string) => void;
  onSelectModuleTab: (tabName: string) => void;
  onOpenCertificate: () => void;
}

export const InductionRoadmap: React.FC<InductionRoadmapProps> = ({
  apprentice,
  onToggleChecklist,
  onSelectModuleTab,
  onOpenCertificate
}) => {
  const completedChecklistCount = Object.values(apprentice.checklist).filter(Boolean).length;
  const totalChecklistItems = INDUCTION_CHECKLIST.length;
  const isEligibleForCertificate = apprentice.progressPercentage >= 80;

  return (
    <div className="space-y-10">
      {/* Apprentice Profile & Induction Snapshot Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00324D] dark:bg-[#004D73] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              JD
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="text-[#39A900] font-semibold">Aprendiz Titulado</span>
                <span aria-hidden="true">·</span>
                <span>Ficha: {apprentice.fichaNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{apprentice.documentType} {apprentice.documentNumber}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-heading">
                {apprentice.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {apprentice.programName} — {apprentice.trainingCenter} ({apprentice.regional})
              </p>
            </div>
          </div>

          {/* Overall Percentage Ring / Counter */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-100 dark:border-slate-700/80 self-stretch sm:self-auto justify-between sm:justify-start">
            <div>
              <span className="text-2xl font-extrabold font-mono text-[#00324D] dark:text-emerald-400">
                {apprentice.progressPercentage}%
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                Avance Total Inducción
              </p>
            </div>
            {isEligibleForCertificate && (
              <button
                onClick={onOpenCertificate}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#2e8302] rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                Ver Certificado
              </button>
            )}
          </div>
        </div>

        {/* 4 Phases Visual Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {SENA_MODULES.map((mod, idx) => {
            const isCompleted = apprentice.completedModules.includes(mod.id);
            const tabTarget = mod.category === 'identidad'
              ? 'identidad'
              : mod.category === 'reglamento'
              ? 'reglamento'
              : 'cuestionarios';

            return (
              <div
                key={mod.id}
                onClick={() => onSelectModuleTab(tabTarget)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isCompleted
                    ? 'border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-[#39A900] hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Fase 0{idx + 1}</span>
                  {isCompleted ? (
                    <span className="text-[#39A900] font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Aprobada
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">Pendiente</span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                  {mod.shortTitle}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {mod.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {mod.durationMinutes} min
                  </span>
                  <span className="text-[#39A900] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Explorar →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Induction Checklist & Evidencias */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <span className="text-[#39A900] font-semibold">Portafolio del Aprendiz</span>
              <span aria-hidden="true">·</span>
              <span>Checklist de Evidencias Obligatorias</span>
              <span aria-hidden="true">·</span>
              <span>{completedChecklistCount} de {totalChecklistItems} completadas</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              Lista de Comprobación y Compromisos de Inducción
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Marca cada evidencia cumplida. La acreditación total habilita automáticamente tu Certificado Digital Oficial de Inducción SENA.
            </p>
          </div>

          <div className="w-full sm:w-48 bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden self-center">
            <div
              className="bg-[#39A900] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(completedChecklistCount / totalChecklistItems) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist Rows */}
        <div className="space-y-3 mt-6">
          {INDUCTION_CHECKLIST.map((item) => {
            const isChecked = !!apprentice.checklist[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onToggleChecklist(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isChecked
                    ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 focus:outline-none"
                  aria-label={isChecked ? 'Desmarcar tarea' : 'Marcar tarea'}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-[#39A900] shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-400 shrink-0" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className={`text-xs md:text-sm font-bold ${isChecked ? 'text-slate-900 dark:text-slate-300 line-through opacity-80' : 'text-slate-900 dark:text-white'}`}>
                      {item.title}
                    </h5>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300 font-semibold uppercase">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
