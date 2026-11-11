/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Apprentice } from '../types/induction';
import { LEAD_INSTRUCTOR } from '../data/senaData';
import { SenaLogo, SenaShield } from './SenaSymbolsGraphic';
import {
  GraduationCap,
  UserCheck,
  ShieldCheck,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  ChevronRight,
  Compass,
  Moon,
  Sun,
  Sparkles,
  CheckCircle2,
  Clock,
  IdCard,
  Building,
  Mail,
  Phone,
  FileCheck,
  UserPlus,
  Lightbulb,
  Eraser,
  HelpCircle,
  PlayCircle,
  X
} from 'lucide-react';

interface RoleSelectionLandingProps {
  apprentices: Apprentice[];
  selectedApprenticeId: string;
  onSelectApprentice: (apprenticeId: string) => void;
  onSaveAndEnterApprentice: (apprentice: Apprentice) => void;
  onEnterAsInstructor: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  apprentices,
  selectedApprenticeId,
  onSelectApprentice,
  onSaveAndEnterApprentice,
  onEnterAsInstructor,
  isDarkMode,
  onToggleDarkMode
}) => {
  // Form State for Apprentice Identification & Follow-up — STARTS CLEAN BY DEFAULT
  const [formData, setFormData] = useState({
    name: '',
    documentType: 'CC' as 'CC' | 'TI' | 'CE' | 'PEP',
    documentNumber: '',
    email: '',
    phone: '',
    fichaNumber: '',
    programName: '',
    regional: '',
    trainingCenter: ''
  });

  const [matchedApprentice, setMatchedApprentice] = useState<Apprentice | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Group metrics for the single instructor overview
  const total = apprentices.length;
  const completed = apprentices.filter(a => a.status === 'Completado').length;
  const avgProgress = Math.round(
    apprentices.reduce((acc, curr) => acc + curr.progressPercentage, 0) / (total || 1)
  );

  // Whenever document number changes, check if there's an existing registered profile
  useEffect(() => {
    const trimmedDoc = formData.documentNumber.trim();
    if (trimmedDoc) {
      const match = apprentices.find(a => a.documentNumber === trimmedDoc);
      if (match) {
        setMatchedApprentice(match);
      } else {
        setMatchedApprentice(null);
      }
    } else {
      setMatchedApprentice(null);
    }
  }, [formData.documentNumber, apprentices]);

  // Handler to clear the form completely
  const handleClearForm = () => {
    setFormData({
      name: '',
      documentType: 'CC',
      documentNumber: '',
      email: '',
      phone: '',
      fichaNumber: '',
      programName: '',
      regional: '',
      trainingCenter: ''
    });
    setMatchedApprentice(null);
  };

  // Handler to fill with sample data for quick demonstration
  const handleFillDemoData = () => {
    setFormData({
      name: 'Laura Valentina Pérez Restrepo',
      documentType: 'CC',
      documentNumber: '1029384756',
      email: 'lvperez756@soy.sena.edu.co',
      phone: '312 456 7890',
      fichaNumber: '2825410',
      programName: 'Análisis y Desarrollo de Software (ADSO)',
      regional: 'Distrito Capital',
      trainingCenter: 'Centro de Diseño y Metrología'
    });
    setMatchedApprentice(null);
  };

  // Handler to load an existing apprentice quickly from the quick-pick dropdown
  const handleQuickLoadApprentice = (id: string) => {
    if (id === 'NEW') {
      handleClearForm();
      return;
    }

    const app = apprentices.find(a => a.id === id);
    if (app) {
      setFormData({
        name: app.name,
        documentType: app.documentType,
        documentNumber: app.documentNumber,
        email: app.email,
        phone: app.phone,
        fichaNumber: app.fichaNumber,
        programName: app.programName,
        regional: app.regional,
        trainingCenter: app.trainingCenter
      });
      setMatchedApprentice(app);
      onSelectApprentice(app.id);
    }
  };

  // Submit Form: Save Profile & Continue to Induction Prototype
  const handleSubmitApprenticeForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.documentNumber.trim()) {
      return;
    }

    let apprenticeToSave: Apprentice;

    if (matchedApprentice) {
      // Update existing apprentice data while preserving progress, scores, checklist
      apprenticeToSave = {
        ...matchedApprentice,
        name: formData.name.trim(),
        documentType: formData.documentType,
        documentNumber: formData.documentNumber.trim(),
        email: formData.email.trim() || matchedApprentice.email,
        phone: formData.phone.trim() || matchedApprentice.phone,
        fichaNumber: formData.fichaNumber.trim() || matchedApprentice.fichaNumber,
        programName: formData.programName.trim(),
        regional: formData.regional.trim(),
        trainingCenter: formData.trainingCenter.trim(),
        lastAccess: 'Hoy a las ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    } else {
      // Create a brand new apprentice profile
      apprenticeToSave = {
        id: `app-${Date.now()}`,
        name: formData.name.trim(),
        documentNumber: formData.documentNumber.trim(),
        documentType: formData.documentType,
        email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@soy.sena.edu.co`,
        phone: formData.phone.trim() || '310 000 0000',
        fichaNumber: formData.fichaNumber.trim() || '2825410',
        programName: formData.programName.trim(),
        regional: formData.regional.trim(),
        trainingCenter: formData.trainingCenter.trim(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        status: 'En progreso',
        progressPercentage: 0,
        completedModules: [],
        quizScores: {},
        checklist: {
          'chk-1': false,
          'chk-2': false,
          'chk-3': false,
          'chk-4': false,
          'chk-5': false,
          'chk-6': false,
          'chk-7': false,
          'chk-8': false
        },
        startDate: new Date().toISOString().slice(0, 10),
        lastAccess: 'Hoy a las ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: ['Registro de identificación formal del aprendiz en el portal institucional.']
      };
    }

    onSaveAndEnterApprentice(apprenticeToSave);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Institutional Top Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#39A900] flex items-center justify-center p-1.5 shadow-xs">
              <SenaLogo className="w-full h-full" inverted={true} />
            </div>
            <div>
              <span className="text-base font-extrabold text-[#00324D] dark:text-white leading-none font-heading block">
                SENA <span className="text-[#39A900]">Inducción</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Portal de Formación Profesional Integral
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="text-[#39A900] font-semibold">Ficha 2825410</span>
              <span aria-hidden="true">·</span>
              <span>ADSO</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Alternar modo oscuro"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Video Manual Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all animate-pulse hover:animate-none"
              title="Ver Video Manual de la Plataforma"
            >
              <PlayCircle className="w-4 h-4" />
              <span className="hidden md:inline">Video Manual</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Role Selection */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39A900]/10 dark:bg-[#39A900]/20 text-[#2E8302] dark:text-emerald-400 text-xs font-semibold tracking-wide border border-[#39A900]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema Institucional de Inducción SENA 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#00324D] dark:text-white font-heading tracking-tight leading-tight">
            Acceso al Portal de <span className="text-[#39A900]">Inducción y Convivencia</span>
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Selecciona tu rol. Los aprendices diligencian sus datos de interés para registrar y hacer seguimiento a su progreso; el instructor único asignado supervisa y certifica a toda la cohorte.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95 group"
            >
              <PlayCircle className="w-5 h-5 group-hover:animate-pulse" />
              <span>Ver Manual de Usuario en Video</span>
            </button>
          </div>
        </div>

        {/* The Two Portals: APRENDIZ (Multi-user with form) vs INSTRUCTOR (Single supervisor) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ======================================================== */}
          {/* PORTAL 1: APRENDIZ — FORMULARIO DE DATOS Y SEGUIMIENTO   */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:shadow-md">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center border border-emerald-200 dark:border-emerald-800/60">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                    Paso 1: Rol de Aprendiz
                  </span>
                  <h2 className="text-2xl font-bold text-[#00324D] dark:text-white font-heading">
                    Soy Aprendiz SENA
                  </h2>
                </div>
              </div>

              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                Paso 2: Datos y Progreso
              </span>
            </div>

            {/* Quick Auto-complete Helper & Toolbar */}
            <div className="mt-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                  <IdCard className="w-4 h-4 text-[#39A900]" />
                  <span>¿Ya tienes progreso registrado en la ficha? Cárgalo aquí:</span>
                </div>
                <select
                  value={matchedApprentice ? matchedApprentice.id : 'NEW'}
                  onChange={(e) => handleQuickLoadApprentice(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                >
                  <option value="NEW">+ Formulario limpio (Nuevo aprendiz)</option>
                  {apprentices.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.progressPercentage}% · Doc: {a.documentNumber})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Actions: Demo Fill & Clear */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Atajos de diligenciamiento:</span>
                <button
                  type="button"
                  onClick={handleFillDemoData}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 transition-colors text-[11px] font-semibold cursor-pointer"
                  title="Rellenar todos los campos con datos válidos de demostración"
                >
                  <Lightbulb className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Cargar datos de ejemplo de prueba</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-[11px] font-medium cursor-pointer"
                  title="Vaciar todos los campos"
                >
                  <Eraser className="w-3 h-3" />
                  <span>Limpiar campos</span>
                </button>
              </div>
            </div>

            {/* Identification & Progress Form */}
            <form onSubmit={handleSubmitApprenticeForm} className="mt-6 space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Datos de Identificación del Aprendiz
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Diligencia cada campo siguiendo las pistas contextuales para registrar tu avance de inducción de forma oficial.
                </p>
              </div>

              {/* Row 1: Nombre completo */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombres y Apellidos Completos *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Laura Valentina Pérez Restrepo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Pista:</strong> Escribe tus dos nombres y dos apellidos completos exactamente como figuran en tu documento oficial (sin apodos ni abreviaturas).</span>
                </p>
              </div>

              {/* Row 2: Tipo de Documento y Número de Documento */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo de Documento *
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value as 'CC' | 'TI' | 'CE' | 'PEP' })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="CC">C.C. — Cédula de Ciudadanía</option>
                    <option value="TI">T.I. — Tarjeta de Identidad</option>
                    <option value="CE">C.E. — Cédula de Extranjería</option>
                    <option value="PEP">P.E.P. — Permiso Especial</option>
                  </select>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>CC para mayores de 18 años, TI si eres menor.</span>
                  </p>
                </div>

                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="Ej. 1029384756"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>Solo dígitos sin puntos ni comas (identificador único SofiaPlus / Zajuna).</span>
                  </p>
                </div>
              </div>

              {/* Row 3: Correo electrónico y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Correo Electrónico</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ej. lvperez756@soy.sena.edu.co"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>Usa tu correo institucional @soy.sena.edu.co o tu correo personal habitual.</span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Teléfono / WhatsApp de Contacto</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej. 312 456 7890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>Número de 10 dígitos para comunicación directa con el instructor y bienestar.</span>
                  </p>
                </div>
              </div>

              {/* Row 4: Ficha y Programa de Formación */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Ficha *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fichaNumber}
                    onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                    placeholder="Ej. 2825410"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Código de cohorte</span>
                    <button
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, fichaNumber: '2825410' }))}
                      className="text-[10px] text-[#2E8302] dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Pista: Usar 2825410
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Programa de Formación *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.programName}
                    onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                    placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Nombre de carrera</span>
                    <button
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, programName: 'Análisis y Desarrollo de Software (ADSO)' }))}
                      className="text-[10px] text-[#2E8302] dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Pista: Sugerir ADSO
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 5: Regional y Centro de Formación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Regional SENA</span>
                  </label>
                  <input
                    type="text"
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    placeholder="Ej. Distrito Capital, Antioquia, Valle..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Jurisdicción SENA</span>
                    <button
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, regional: 'Distrito Capital' }))}
                      className="text-[10px] text-[#2E8302] dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Pista: Distrito Capital
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Centro de Formación</span>
                  </label>
                  <input
                    type="text"
                    value={formData.trainingCenter}
                    onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                    placeholder="Ej. Centro de Diseño y Metrología"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Sede o complejo</span>
                    <button
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, trainingCenter: 'Centro de Diseño y Metrología' }))}
                      className="text-[10px] text-[#2E8302] dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Pista: Usar CDM
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Profile Status Badge */}
              <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  {matchedApprentice ? (
                    <CheckCircle2 className="w-5 h-5 text-[#39A900] shrink-0" />
                  ) : (
                    <UserPlus className="w-5 h-5 text-blue-500 shrink-0" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">
                      {matchedApprentice ? 'Perfil Detectado en la Ficha' : 'Nuevo Registro de Aprendiz'}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {matchedApprentice
                        ? `Continuarás con tu avance previo: ${matchedApprentice.progressPercentage}% (${matchedApprentice.status})`
                        : 'Se iniciará tu portafolio individual de inducción desde 0% con seguimiento en tiempo real.'}
                    </span>
                  </div>
                </div>

                {matchedApprentice && (
                  <span className="text-xs font-mono font-bold text-[#39A900] bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md shrink-0">
                    {matchedApprentice.progressPercentage}%
                  </span>
                )}
              </div>

              {/* Action Button: Guardar Perfil y Continuar */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#39A900] hover:bg-[#2E8302] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer group hover:shadow-lg"
              >
                <FileCheck className="w-4 h-4" />
                <span>Guardar Perfil y Continuar al Prototipo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* ======================================================== */}
          {/* PORTAL 2: INSTRUCTOR (Un solo Instructor Encargado)      */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#00324D] to-[#002235] text-white rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col justify-between border border-[#004D73] relative overflow-hidden">
            {/* Background watermark shield */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none w-64 h-64">
              <SenaShield className="w-full h-full" />
            </div>

            <div className="relative z-10">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center border border-white/20">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Un Solo Instructor Encargado
                    </span>
                    <h2 className="text-2xl font-bold text-white font-heading">
                      Soy Instructor Líder
                    </h2>
                  </div>
                </div>

                <span className="text-xs text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  Líder de Ficha
                </span>
              </div>

              {/* Dedicated Lead Instructor Profile */}
              <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-3.5">
                  <img
                    src={LEAD_INSTRUCTOR.avatar}
                    alt={LEAD_INSTRUCTOR.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#39A900] shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {LEAD_INSTRUCTOR.name}
                    </h3>
                    <p className="text-xs text-emerald-300 font-medium">
                      {LEAD_INSTRUCTOR.roleTitle}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {LEAD_INSTRUCTOR.trainingCenter} · {LEAD_INSTRUCTOR.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role explanation */}
              <div className="mt-5 space-y-3 text-xs text-slate-200">
                <p className="text-slate-300 leading-relaxed">
                  El instructor líder es el único encargado de revisar el avance de cada aprendiz, calificar cuestionarios, validar evidencias del portafolio pedagógico y autorizar la emisión de las constancias de inducción.
                </p>

                {/* Cohort Key Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                    <span className="block text-lg font-black text-white">{total}</span>
                    <span className="text-[10px] text-slate-300 block">Aprendices</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                    <span className="block text-lg font-black text-[#39A900]">{avgProgress}%</span>
                    <span className="text-[10px] text-slate-300 block">Avance Ficha</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                    <span className="block text-lg font-black text-amber-300">{completed}</span>
                    <span className="text-[10px] text-slate-300 block">Certificados</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 mt-3 space-y-1">
                  <span className="block font-semibold text-white text-[11px]">Funciones del Instructor a Cargo:</span>
                  <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5">
                    <li>Seguimiento nominal a los {total} aprendices de la ficha.</li>
                    <li>Revisión de respuestas en casos prácticos y reglamentarios.</li>
                    <li>Firma y validación institucional de constancias.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Instructor Action Button */}
            <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
              <button
                onClick={onEnterAsInstructor}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#00324D] font-black text-sm shadow-md transition-all cursor-pointer group"
              >
                <span>Acceder al Tablero del Instructor</span>
                <ChevronRight className="w-4 h-4 text-[#39A900] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the SENA Induction */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900] block mb-1">
              Pilares Formativos
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              Estructura de la Inducción Profesional Integral
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Desarrollado bajo los lineamientos pedagógicos del SENA y el marco regulatorio del Ministerio del Trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#39A900] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#00324D] dark:text-white">Identidad y Símbolos</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Apropiación del himno, escudo oficial, bandera, logotipo y los 5 valores del Código de Integridad SENA.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#00324D] dark:text-white">Marco Normativo</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Estudio del Acuerdo 007 de 2012: derechos, deberes, prohibiciones y debido proceso formativo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#00324D] dark:text-white">Evaluación Continua</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Cuestionarios interactivos con retroalimentación inmediata, resolución de casos y multimedia institucional.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#00324D] dark:text-white">Constancia Validadora</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Certificado oficial de inducción con verificación de autenticidad por código QR y firma institucional.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400 mt-12">
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
            <span>Ministerio del Trabajo</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento del Aprendiz (Acuerdo 007 de 2012)</span>
            <span aria-hidden="true">·</span>
            <span>Línea Gratuita: 018000 910270</span>
          </div>
        </div>
      </footer>

      {/* Floating Video Manual Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Video Manual de Inducción</h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Guía rápida de uso de la plataforma 2026</span>
                </div>
              </div>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Cerrar video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="aspect-video bg-black relative group flex items-center justify-center">
              <video 
                src="/assets/aistudio/2026__5_17_p.m._47b36e00.mp4" 
                controls 
                autoPlay
                className="max-w-full max-h-full object-contain"
              >
                Tu navegador no soporta el elemento de video.
              </video>
              
              {/* Institutional overlay (subtle) */}
              <div className="absolute top-4 left-4 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                <SenaLogo className="w-10 h-10" color="#FFFFFF" />
              </div>
            </div>

            {/* Modal Footer / Quick Tips */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-md">
                <strong>Consejo:</strong> Recuerda completar todos los campos del formulario de aprendiz para que el instructor pueda validar tu proceso satisfactoriamente.
              </p>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Entendido, Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
