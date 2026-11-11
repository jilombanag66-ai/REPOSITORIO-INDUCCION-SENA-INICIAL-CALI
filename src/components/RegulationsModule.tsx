/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REGULATION_ARTICLES, CASE_STUDIES } from '../data/senaData';
import { CaseStudy } from '../types/induction';
import { Scale, BookOpen, AlertTriangle, CheckCircle, Search, HelpCircle, ArrowRight } from 'lucide-react';

export const RegulationsModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Derechos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentCaseIdx, setCurrentCaseIdx] = useState<number>(0);
  const [selectedCaseOption, setSelectedCaseOption] = useState<string | null>(null);
  const [caseEvaluated, setCaseEvaluated] = useState<boolean>(false);

  // Filter articles
  const filteredArticles = REGULATION_ARTICLES.filter(art => {
    const matchesCategory = activeCategory === 'Todos' || art.category === activeCategory;
    const matchesSearch = searchTerm === '' ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.keyPoints.some(kp => kp.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeCase = CASE_STUDIES[currentCaseIdx] || CASE_STUDIES[0];

  const handleOptionSelect = (optId: string) => {
    setSelectedCaseOption(optId);
    setCaseEvaluated(true);
  };

  const handleNextCase = () => {
    setCurrentCaseIdx((prev) => (prev + 1) % CASE_STUDIES.length);
    setSelectedCaseOption(null);
    setCaseEvaluated(false);
  };

  const selectedOptObj = activeCase.options.find(o => o.id === selectedCaseOption);

  return (
    <div className="space-y-10">
      {/* Intro Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <span className="text-[#39A900] font-semibold">Marco Legal Institucional</span>
              <span aria-hidden="true">·</span>
              <span>Acuerdo 009 de 2024</span>
              <span aria-hidden="true">·</span>
              <span>Reglamento del Aprendiz SENA (Ref. 2026)</span>
            </div>
            <h2 className="text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              Norma, Convivencia y Régimen Disciplinario
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-3xl">
              El Reglamento del Aprendiz (Acuerdo 009 de 2024, actualizado por el Acuerdo 2 de 2026) rige tus derechos, deberes y el debido proceso garantizando la inclusión y la participación democrática.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por artículo o palabra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          {['Derechos', 'Deberes', 'Prohibiciones', 'Faltas y Sanciones', 'Debido Proceso'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#00324D] dark:bg-[#39A900] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Regulation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.chapter}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-semibold text-[#39A900]">{art.article}</span>
                <span className="font-mono text-slate-400 dark:text-slate-500">{art.category}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2">
                {art.chapter}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/60 leading-relaxed">
                {art.summary}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Puntos fundamentales:</p>
                <ul className="space-y-1.5">
                  {art.keyPoints.map((kp, idx) => (
                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] mt-1.5 shrink-0" />
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Studies Simulation Deck */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <span className="text-[#39A900] font-semibold">Simulador Pedagógico</span>
              <span aria-hidden="true">·</span>
              <span>Comité de Evaluación y Seguimiento</span>
              <span aria-hidden="true">·</span>
              <span>Caso {currentCaseIdx + 1} de {CASE_STUDIES.length}</span>
            </div>
            <h3 className="text-xl font-bold text-[#00324D] dark:text-white font-heading">
              {activeCase.title}
            </h3>
          </div>

          <button
            onClick={handleNextCase}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>Siguiente Caso</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Case Description Box */}
        <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                Hechos y Situación Reportada:
              </p>
              <p className="text-sm text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                {activeCase.situation}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                Marco aplicable: {activeCase.contextArticle}
              </p>
            </div>
          </div>
        </div>

        {/* Decision Options */}
        <div className="mt-6 space-y-3">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            ¿Qué dictamen debe emitir el Comité o el Instructor según el reglamento?
          </p>

          <div className="grid grid-cols-1 gap-3">
            {activeCase.options.map((opt) => {
              const isSelected = selectedCaseOption === opt.id;
              let stateStyles = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200';

              if (caseEvaluated && isSelected) {
                stateStyles = opt.isCorrect
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500 text-emerald-950 dark:text-emerald-200'
                  : 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/30 ring-1 ring-rose-400 text-rose-950 dark:text-rose-200';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${stateStyles}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs md:text-sm font-medium leading-relaxed">
                      {opt.text}
                    </span>
                    {caseEvaluated && isSelected && (
                      <span className="shrink-0 text-xs font-bold">
                        {opt.isCorrect ? (
                          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Acierto
                          </span>
                        ) : (
                          <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Incorrecto
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Resolution Feedback */}
        {caseEvaluated && selectedOptObj && (
          <div className={`mt-6 p-5 rounded-xl border ${selectedOptObj.isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-100'}`}>
            <h4 className="text-xs font-bold uppercase tracking-wide mb-1">
              Retroalimentación Formativa
            </h4>
            <p className="text-xs md:text-sm leading-relaxed mb-3">
              {selectedOptObj.feedback}
            </p>
            <div className="pt-2 border-t border-current/10 text-xs font-mono opacity-90">
              Fundamento: {activeCase.resolutionRule}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
