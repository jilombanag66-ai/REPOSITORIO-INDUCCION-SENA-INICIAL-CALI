/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SenaLogo } from './SenaSymbolsGraphic';
import { Award, Users, BookOpen, Sun, Moon, ArrowLeftRight, UserCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'aprendiz' | 'instructor';
  onRoleToggle: () => void;
  onOpenPortal: () => void;
  activeApprenticeName?: string;
  activeInstructorName?: string;
  completionPercentage: number;
  onOpenCertificate: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  userRole,
  onRoleToggle,
  onOpenPortal,
  activeApprenticeName,
  activeInstructorName = 'Ing. Carlos Mora (Líder)',
  completionPercentage,
  onOpenCertificate,
  isDarkMode,
  onToggleDarkMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element brand wordmark */}
          <div
            onClick={() => onTabChange('ruta')}
            className="flex items-center gap-3 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#39A900] flex items-center justify-center p-1.5 shadow-sm transition-transform group-hover:scale-105">
              <SenaLogo className="w-full h-full" inverted={true} />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#00324D] dark:text-white block leading-none font-heading">
                SENA <span className="text-[#39A900]">Inducción</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-normal block mt-0.5">
                Portal de Formación y Convivencia
              </span>
            </div>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onTabChange('ruta')}
              className={`hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'ruta'
                  ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : ''
              }`}
            >
              Ruta & Evidencias
            </button>
            <button
              onClick={() => onTabChange('identidad')}
              className={`hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'identidad'
                  ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : ''
              }`}
            >
              Identidad SENA
            </button>
            <button
              onClick={() => onTabChange('reglamento')}
              className={`hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'reglamento'
                  ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : ''
              }`}
            >
              Reglamento & Casos
            </button>
            <button
              onClick={() => onTabChange('cuestionarios')}
              className={`hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'cuestionarios'
                  ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : ''
              }`}
            >
              Cuestionarios
            </button>
            <button
              onClick={() => onTabChange('instructor')}
              className={`hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap shrink-0 pb-1 ${
                currentTab === 'instructor'
                  ? 'text-[#39A900] dark:text-[#39A900] font-semibold border-b-2 border-[#39A900]'
                  : ''
              }`}
            >
              Seguimiento Ficha
            </button>
          </nav>

          {/* Zone 3: 1 primary action + role toggle + dark mode button in upper right */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Active Identity Label */}
            {userRole === 'aprendiz' ? (
              <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Aprendiz:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                  {activeApprenticeName}
                </span>
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#00324D] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/80 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-[#39A900]" />
                <span className="truncate max-w-[180px]">{activeInstructorName}</span>
              </div>
            )}

            {/* Portal / Role Switcher Button */}
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shadow-2xs"
              title="Volver a la Landing de selección de rol (Aprendiz / Instructor)"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#39A900]" />
              <span className="hidden sm:inline">Cambiar Rol / Portal</span>
            </button>

            {/* Primary Action: Certificate */}
            <button
              onClick={onOpenCertificate}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                completionPercentage >= 80
                  ? 'bg-[#39A900] text-white hover:bg-[#2e8302] shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificado ({completionPercentage}%)</span>
            </button>

            {/* Dark Mode Toggle Button in the upper right corner */}
            <button
              onClick={onToggleDarkMode}
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shrink-0 cursor-pointer border border-transparent dark:border-slate-700 shadow-xs"
              title={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
