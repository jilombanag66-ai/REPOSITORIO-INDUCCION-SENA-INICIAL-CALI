/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { InductionRoadmap } from './components/InductionRoadmap';
import { IdentityModule } from './components/IdentityModule';
import { RegulationsModule } from './components/RegulationsModule';
import { InteractiveQuizzes } from './components/InteractiveQuizzes';
import { MultimediaExplorer } from './components/MultimediaExplorer';
import { InstructorDashboard } from './components/InstructorDashboard';
import { RegulationAdvisor } from './components/RegulationAdvisor';
import { CertificateModal } from './components/CertificateModal';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { SenaLogo } from './components/SenaSymbolsGraphic';
import { INITIAL_APPRENTICES, INDUCTION_CHECKLIST, QUIZZES, LEAD_INSTRUCTOR } from './data/senaData';
import { Apprentice } from './types/induction';

export default function App() {
  const [viewMode, setViewMode] = useState<'portal' | 'app'>('portal');
  const [currentTab, setCurrentTab] = useState<string>('ruta');
  const [userRole, setUserRole] = useState<'aprendiz' | 'instructor'>('aprendiz');
  const [apprentices, setApprentices] = useState<Apprentice[]>(() => {
    const saved = localStorage.getItem('sena_induction_apprentices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored apprentices', e);
      }
    }
    return INITIAL_APPRENTICES;
  });

  const [currentApprenticeId, setCurrentApprenticeId] = useState<string>('app-001');
  const [certificateModalApprentice, setCertificateModalApprentice] = useState<Apprentice | null>(null);

  // Dark mode state and screen blur transition
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sena_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isThemeBlurring, setIsThemeBlurring] = useState<boolean>(false);

  // Synchronize documentElement class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleDarkMode = () => {
    // 1. Trigger screen blur
    setIsThemeBlurring(true);

    // 2. Switch theme at peak blur
    setTimeout(() => {
      const nextMode = !isDarkMode;
      setIsDarkMode(nextMode);
      if (nextMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('sena_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('sena_theme', 'light');
      }

      // 3. Smoothly settle back from blur
      setTimeout(() => {
        setIsThemeBlurring(false);
      }, 350);
    }, 180);
  };

  // Sync with local storage
  useEffect(() => {
    localStorage.setItem('sena_induction_apprentices', JSON.stringify(apprentices));
  }, [apprentices]);

  const currentApprentice = apprentices.find(a => a.id === currentApprenticeId) || apprentices[0];

  // Helper to recompute apprentice completion percentage
  const recomputeApprenticeProgress = (app: Apprentice): Apprentice => {
    // 50% weight from checklist, 50% weight from quizzes
    const checklistCount = Object.values(app.checklist).filter(Boolean).length;
    const checklistRatio = checklistCount / INDUCTION_CHECKLIST.length;

    const quizPassedCount = Object.values(app.quizScores).filter(s => s >= 80).length;
    const quizRatio = quizPassedCount / QUIZZES.length;

    const totalPercentage = Math.round((checklistRatio * 50) + (quizRatio * 50));
    let status: 'Completado' | 'En progreso' | 'Pendiente' = 'En progreso';
    if (totalPercentage >= 95) {
      status = 'Completado';
    } else if (totalPercentage < 30) {
      status = 'Pendiente';
    }

    return {
      ...app,
      progressPercentage: totalPercentage,
      status
    };
  };

  const handleToggleChecklist = (itemId: string) => {
    setApprentices(prev =>
      prev.map(a => {
        if (a.id === currentApprentice.id) {
          const newChecklist = {
            ...a.checklist,
            [itemId]: !a.checklist[itemId]
          };
          return recomputeApprenticeProgress({ ...a, checklist: newChecklist });
        }
        return a;
      })
    );
  };

  const handleQuizComplete = (quizId: string, score: number) => {
    setApprentices(prev =>
      prev.map(a => {
        if (a.id === currentApprentice.id) {
          const newScores = {
            ...a.quizScores,
            [quizId]: score
          };

          const correspondingQuiz = QUIZZES.find(q => q.id === quizId);
          const newCompletedModules = [...a.completedModules];
          if (correspondingQuiz && score >= correspondingQuiz.passingScore) {
            if (!newCompletedModules.includes(correspondingQuiz.moduleId)) {
              newCompletedModules.push(correspondingQuiz.moduleId);
            }
          }

          // Check if all 4 quizzes passed
          const allQuizzesPassed = QUIZZES.every(q => (newScores[q.id] || 0) >= q.passingScore);
          const newChecklist = {
            ...a.checklist,
            'chk-8': allQuizzesPassed
          };

          return recomputeApprenticeProgress({
            ...a,
            quizScores: newScores,
            completedModules: newCompletedModules,
            checklist: newChecklist
          });
        }
        return a;
      })
    );
  };

  const handleUpdateApprentice = (updated: Apprentice) => {
    setApprentices(prev =>
      prev.map(a => (a.id === updated.id ? recomputeApprenticeProgress(updated) : a))
    );
  };

  const handleSaveAndEnterApprentice = (apprenticeData: Apprentice) => {
    setApprentices(prev => {
      const existsIndex = prev.findIndex(
        a => a.id === apprenticeData.id || a.documentNumber === apprenticeData.documentNumber
      );
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = recomputeApprenticeProgress({
          ...updated[existsIndex],
          ...apprenticeData
        });
        return updated;
      } else {
        return [recomputeApprenticeProgress(apprenticeData), ...prev];
      }
    });

    setCurrentApprenticeId(apprenticeData.id);
    setUserRole('aprendiz');
    setCurrentTab('ruta');
    setViewMode('app');
  };

  const handleEnterAsInstructor = () => {
    setUserRole('instructor');
    setCurrentTab('instructor');
    setViewMode('app');
  };

  const handleRoleToggle = () => {
    if (userRole === 'aprendiz') {
      setUserRole('instructor');
      setCurrentTab('instructor');
    } else {
      setUserRole('aprendiz');
      setCurrentTab('ruta');
    }
  };

  // If in Portal Landing Mode
  if (viewMode === 'portal') {
    return (
      <div className={`relative ${isThemeBlurring ? 'theme-blur-active' : 'theme-blur-settling'}`}>
        <RoleSelectionLanding
          apprentices={apprentices}
          selectedApprenticeId={currentApprenticeId}
          onSelectApprentice={(id) => setCurrentApprenticeId(id)}
          onSaveAndEnterApprentice={handleSaveAndEnterApprentice}
          onEnterAsInstructor={handleEnterAsInstructor}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        {/* Screen Blur Transition Floating Feedback */}
        {isThemeBlurring && (
          <div className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-black/10 dark:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="px-5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-semibold shadow-xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#39A900] animate-ping" />
              <span>{isDarkMode ? 'Aplicando Modo Claro...' : 'Aplicando Modo Oscuro...'}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-[#39A900] selection:text-white transition-colors duration-300 relative ${isThemeBlurring ? 'theme-blur-active' : 'theme-blur-settling'}`}>
      {/* Top Navigation Bar with strict 3-zone contract */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'instructor') {
            setUserRole('instructor');
          } else {
            setUserRole('aprendiz');
          }
        }}
        userRole={userRole}
        onRoleToggle={handleRoleToggle}
        onOpenPortal={() => setViewMode('portal')}
        activeApprenticeName={currentApprentice.name}
        activeInstructorName={LEAD_INSTRUCTOR.name}
        completionPercentage={currentApprentice.progressPercentage}
        onOpenCertificate={() => setCertificateModalApprentice(currentApprentice)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Screen Blur Transition Floating Feedback */}
      {isThemeBlurring && (
        <div className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-black/10 dark:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="px-5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-semibold shadow-xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#39A900] animate-ping" />
            <span>{isDarkMode ? 'Aplicando Modo Claro...' : 'Aplicando Modo Oscuro...'}</span>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Tab 1: General Induction Route */}
        {currentTab === 'ruta' && (
          <div className="space-y-10">
            <HeroBanner
              onStartRoute={() => {
                const element = document.getElementById('checklist-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreIdentity={() => setCurrentTab('identidad')}
              onExploreRegulation={() => setCurrentTab('reglamento')}
              completionPercentage={currentApprentice.progressPercentage}
            />

            <div id="checklist-section">
              <InductionRoadmap
                apprentice={currentApprentice}
                onToggleChecklist={handleToggleChecklist}
                onSelectModuleTab={(tab) => setCurrentTab(tab)}
                onOpenCertificate={() => setCertificateModalApprentice(currentApprentice)}
              />
            </div>

            <MultimediaExplorer />

            <RegulationAdvisor />
          </div>
        )}

        {/* Tab 2: Símbolos, Himno & Valores SENA */}
        {currentTab === 'identidad' && (
          <IdentityModule
            onCompleteSection={() => {
              handleToggleChecklist('chk-2');
              setCurrentTab('cuestionarios');
            }}
          />
        )}

        {/* Tab 3: Reglamento & Casos de Convivencia */}
        {currentTab === 'reglamento' && (
          <div className="space-y-10">
            <RegulationsModule />
            <RegulationAdvisor />
          </div>
        )}

        {/* Tab 4: Cuestionarios Evaluativos */}
        {currentTab === 'cuestionarios' && (
          <InteractiveQuizzes
            quizScores={currentApprentice.quizScores}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {/* Tab 5: Instructor / Coordinator Dashboard */}
        {currentTab === 'instructor' && (
          <InstructorDashboard
            apprentices={apprentices}
            onUpdateApprentice={handleUpdateApprentice}
            onOpenCertificateForApprentice={(app) => setCertificateModalApprentice(app)}
          />
        )}
      </main>

      {/* Certificate Modal */}
      {certificateModalApprentice && (
        <CertificateModal
          apprentice={certificateModalApprentice}
          onClose={() => setCertificateModalApprentice(null)}
        />
      )}

      {/* Institutional Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#39A900] flex items-center justify-center p-1">
              <SenaLogo className="w-full h-full" inverted={true} />
            </div>
            <span className="font-semibold text-slate-800 dark:text-white">
              Servicio Nacional de Aprendizaje SENA — Formación Profesional Integral
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Ministerio del Trabajo de Colombia</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento del Aprendiz (Acuerdo 007 de 2012)</span>
            <span aria-hidden="true">·</span>
            <span>Atención al Ciudadano: 018000 910270</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
