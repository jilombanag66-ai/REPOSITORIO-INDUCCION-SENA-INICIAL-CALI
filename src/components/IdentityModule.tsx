/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SENA_SYMBOLS, SENA_VALUES } from '../data/senaData';
import { SenaLogo, SenaShield, SenaFlag } from './SenaSymbolsGraphic';
import { AnthemPlayer } from './AnthemPlayer';
import { Compass, Heart, Shield, Globe, Award, Sparkles, CheckCircle2, Upload, RefreshCw, SlidersHorizontal, Check } from 'lucide-react';

export const IdentityModule: React.FC<{ onCompleteSection?: () => void }> = ({ onCompleteSection }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<'escudo' | 'bandera' | 'logotipo'>('escudo');
  const [highlightedElement, setHighlightedElement] = useState<string>('pinon');
  const [activeValue, setActiveValue] = useState<number | null>(0);
  const [customShield, setCustomShield] = useState<string>(() => {
    return localStorage.getItem('sena_custom_shield') || '';
  });
  const [isEditingShield, setIsEditingShield] = useState(false);
  const [shieldSvgInput, setShieldSvgInput] = useState('');

  const symbolData = SENA_SYMBOLS.find(s => s.id === selectedSymbol) || SENA_SYMBOLS[0];

  return (
    <div className="space-y-10">
      {/* Institutional Mission & Vision Banner */}
      <div className="bg-gradient-to-br from-[#00324D] to-[#004D73] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold tracking-wide uppercase mb-2">
            <Compass className="w-4 h-4" />
            <span>Horizonte Institucional SENA</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-white">
            Misión, Visión y Principios del Aprendiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-100 text-sm leading-relaxed">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-[#39A900] text-base mb-1 font-heading">Nuestra Misión</h4>
              <p>
                El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación de las personas en actividades productivas.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-[#39A900] text-base mb-1 font-heading">Nuestra Visión</h4>
              <p>
                Ser una entidad de clase mundial en formación profesional integral, líder en innovación tecnológica, emprendimiento social y articulación productiva con pertinencia global y equidad territorial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Símbolos Institucionales Explorer */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>Símbolos Patrios e Institucionales</span>
            <span aria-hidden="true">·</span>
            <span>Explorador Heráldico y Vectorial</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#00324D] dark:text-white font-heading">
            Anatomía de los Símbolos del SENA
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Selecciona un símbolo y descubre los elementos heráldicos e históricos que forjan el sentido de pertenencia de cada colombiano.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-md mb-8">
          <button
            onClick={() => setSelectedSymbol('escudo')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
              selectedSymbol === 'escudo'
                ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Escudo Oficial
          </button>
          <button
            onClick={() => setSelectedSymbol('bandera')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
              selectedSymbol === 'bandera'
                ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bandera
          </button>
          <button
            onClick={() => setSelectedSymbol('logotipo')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
              selectedSymbol === 'logotipo'
                ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Logotipo
          </button>
        </div>

        {/* Visual Stage & Explanations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Canvas Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl min-h-[320px]">
            {selectedSymbol === 'escudo' && (
              <div className="relative group flex flex-col items-center">
                <SenaShield
                  className="w-48 h-56 transition-transform group-hover:scale-105 duration-300"
                  interactive={true}
                  onSelectElement={(el) => setHighlightedElement(el)}
                  customSvg={customShield || undefined}
                />
                <span className="block text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                  {customShield ? 'Escudo personalizado activo' : 'Haz clic sobre las ramas, piñón o caduceo para explorar su significado'}
                </span>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShieldSvgInput(customShield);
                      setIsEditingShield(!isEditingShield);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#39A900]/10 hover:bg-[#39A900]/20 text-[#2E8302] dark:text-emerald-400 border border-[#39A900]/30 transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{customShield ? 'Modificar Escudo' : 'Cambiar / Cargar Escudo'}</span>
                  </button>

                  {customShield && (
                    <button
                      onClick={() => {
                        setCustomShield('');
                        localStorage.removeItem('sena_custom_shield');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Volver al Escudo Oficial HD"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Restablecer</span>
                    </button>
                  )}
                </div>

                {/* Inline Customizer Drawer */}
                {isEditingShield && (
                  <div className="mt-4 w-full p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md text-left text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-white">Cargar nuevo Escudo del SENA</span>
                      <button
                        onClick={() => setIsEditingShield(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        ✕
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                        Pega código SVG o Data URI:
                      </label>
                      <textarea
                        rows={3}
                        value={shieldSvgInput}
                        onChange={(e) => setShieldSvgInput(e.target.value)}
                        placeholder="data:image/svg+xml,... o <svg ...>...</svg>"
                        className="w-full p-2 text-[11px] font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#39A900]" />
                        <span>Subir Archivo (.svg / .png)</span>
                        <input
                          type="file"
                          accept=".svg,image/svg+xml,image/png,image/jpeg"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const result = event.target?.result as string;
                                if (result) {
                                  setShieldSvgInput(result);
                                }
                              };
                              if (file.type.includes('svg')) {
                                reader.readAsText(file);
                              } else {
                                reader.readAsDataURL(file);
                              }
                            }
                          }}
                        />
                      </label>

                      <button
                        onClick={() => {
                          if (shieldSvgInput.trim()) {
                            setCustomShield(shieldSvgInput.trim());
                            localStorage.setItem('sena_custom_shield', shieldSvgInput.trim());
                            setIsEditingShield(false);
                          }
                        }}
                        className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 bg-[#39A900] text-white font-semibold rounded-lg hover:bg-[#2E8302] transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Aplicar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedSymbol === 'bandera' && (
              <div className="relative group">
                <SenaFlag className="w-64 h-40 shadow-sm rounded transition-transform group-hover:scale-105 duration-300" />
                <span className="block text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                  Pabellón oficial en blanco y verde SENA
                </span>
              </div>
            )}
            {selectedSymbol === 'logotipo' && (
              <div className="relative group flex flex-col items-center">
                <div className="w-40 h-40 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                  <SenaLogo className="w-28 h-28" />
                </div>
                <span className="block text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                  El hombre libre caminando hacia el futuro
                </span>
              </div>
            )}
          </div>

          {/* Description & Elements Column */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-lg font-bold text-[#00324D] dark:text-white font-heading">{symbolData.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{symbolData.meaning}</p>
            </div>

            <div className="space-y-3 mt-4">
              {symbolData.elements.map((elem, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] transition-colors bg-white dark:bg-slate-900 shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#39A900]/10 text-[#39A900] flex items-center justify-center shrink-0 font-bold text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-white">{elem.title}</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{elem.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Anthem Player Section */}
      <AnthemPlayer />

      {/* Decálogo de Valores del Código de Integridad */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <span className="text-[#39A900] font-semibold">Ética y Convivencia</span>
              <span aria-hidden="true">·</span>
              <span>Código de Integridad del SENA</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              Los 7 Valores Fundamentales
            </h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Haz clic en un valor para ver su compromiso diario
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SENA_VALUES.map((val, idx) => {
            const isSelected = activeValue === idx;
            return (
              <div
                key={val.title}
                onClick={() => setActiveValue(idx)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#39A900]" />}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{val.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
