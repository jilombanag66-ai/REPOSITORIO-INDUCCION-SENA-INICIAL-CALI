/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import { LEAD_INSTRUCTOR } from '../data/senaData';
import { Users, CheckCircle2, Clock, AlertCircle, Search, Download, PlusCircle, ArrowUpDown, FileText, ChevronRight, X, UserCheck } from 'lucide-react';

interface InstructorDashboardProps {
  apprentices: Apprentice[];
  onUpdateApprentice: (updated: Apprentice) => void;
  onOpenCertificateForApprentice: (app: Apprentice) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprentices,
  onUpdateApprentice,
  onOpenCertificateForApprentice
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Completado' | 'En progreso' | 'Pendiente'>('Todos');
  const [selectedApprentice, setSelectedApprentice] = useState<Apprentice | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Calculations
  const total = apprentices.length;
  const completed = apprentices.filter(a => a.status === 'Completado').length;
  const inProgress = apprentices.filter(a => a.status === 'En progreso').length;
  const pending = apprentices.filter(a => a.status === 'Pendiente').length;
  const avgProgress = Math.round(
    apprentices.reduce((acc, curr) => acc + curr.progressPercentage, 0) / (total || 1)
  );

  // Filtering
  const filteredList = apprentices.filter(app => {
    const matchesStatus = statusFilter === 'Todos' || app.status === statusFilter;
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.documentNumber.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Nombre', 'Documento', 'Correo', 'Ficha', 'Programa', 'Estado', 'Progreso (%)', 'Ultimo Acceso'];
    const rows = apprentices.map(a => [
      a.id,
      `"${a.name}"`,
      a.documentNumber,
      a.email,
      a.fichaNumber,
      `"${a.programName}"`,
      a.status,
      a.progressPercentage,
      `"${a.lastAccess}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Reporte_Induccion_Ficha_2825410_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = () => {
    if (!selectedApprentice || !newNoteText.trim()) return;
    const updated = {
      ...selectedApprentice,
      notes: [...(selectedApprentice.notes || []), newNoteText.trim()]
    };
    onUpdateApprentice(updated);
    setSelectedApprentice(updated);
    setNewNoteText('');
  };

  return (
    <div className="space-y-8">
      {/* Executive KPI Summary Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <span className="text-[#39A900] font-semibold">Coordinación de Formación</span>
              <span aria-hidden="true">·</span>
              <span>Ficha 2825410</span>
              <span aria-hidden="true">·</span>
              <span>ADSO — Análisis y Desarrollo de Software</span>
            </div>
            <h2 className="text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              Tablero de Seguimiento a la Inducción
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Monitoreo del avance de los aprendices en la apropiación de la norma institucional, evidencias y evaluaciones.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Exportar Reporte (CSV)</span>
          </button>
        </div>

        {/* Dedicated Lead Instructor Profile Banner */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={LEAD_INSTRUCTOR.avatar}
              alt={LEAD_INSTRUCTOR.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#39A900] shrink-0 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-[#00324D] dark:text-white">
                  {LEAD_INSTRUCTOR.name}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Instructor Único Encargado
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {LEAD_INSTRUCTOR.roleTitle} · {LEAD_INSTRUCTOR.trainingCenter} · {LEAD_INSTRUCTOR.email}
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Ficha a cargo: </span>
            <strong className="text-slate-800 dark:text-slate-200 font-mono">{LEAD_INSTRUCTOR.assignedFicha}</strong>
            <span className="ml-1 text-slate-500">({total} aprendices)</span>
          </div>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Aprendices</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{total}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">en formación</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Avance Promedio</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-[#39A900]">{avgProgress}%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">de la ficha</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Inducción Aprobada</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">{completed}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">certificados</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-700/80">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">En Alerta / Pendiente</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-400">{pending}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">requieren tutoría</span>
            </div>
          </div>
        </div>
      </div>

      {/* Apprentices Table & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {(['Todos', 'Completado', 'En progreso', 'Pendiente'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 pr-4">Aprendiz</th>
                <th className="pb-3 px-4">Documento</th>
                <th className="pb-3 px-4">Estado</th>
                <th className="pb-3 px-4">Avance Inducción</th>
                <th className="pb-3 px-4">Cuestionarios</th>
                <th className="pb-3 px-4">Último Acceso</th>
                <th className="pb-3 pl-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredList.map((app) => {
                const passedQuizCount = Object.values(app.quizScores).filter(s => s >= 80).length;

                return (
                  <tr key={app.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                          {app.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{app.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{app.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {app.documentType} {app.documentNumber}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        app.status === 'Completado'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                          : app.status === 'En progreso'
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300'
                      }`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              app.progressPercentage >= 80 ? 'bg-[#39A900]' : 'bg-amber-500'
                            }`}
                            style={{ width: `${app.progressPercentage}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                          {app.progressPercentage}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {passedQuizCount}/4 aprobados
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                      {app.lastAccess}
                    </td>

                    <td className="py-3.5 pl-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedApprentice(app)}
                          className="px-2.5 py-1 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-semibold text-[11px] transition-colors"
                        >
                          Detalles & Notas
                        </button>
                        {app.progressPercentage >= 80 && (
                          <button
                            onClick={() => onOpenCertificateForApprentice(app)}
                            className="px-2.5 py-1 text-white bg-[#39A900] hover:bg-[#2e8302] rounded font-semibold text-[11px] transition-colors"
                          >
                            Certificado
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apprentice Details Modal */}
      {selectedApprentice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedApprentice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00324D] dark:bg-[#004D73] text-white flex items-center justify-center font-bold">
                {selectedApprentice.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  {selectedApprentice.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedApprentice.documentType} {selectedApprentice.documentNumber} · Ficha {selectedApprentice.fichaNumber}
                </p>
              </div>
            </div>

            {/* Checklist breakdown */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl mb-4 border border-slate-100 dark:border-slate-700/80">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2 uppercase tracking-wide">
                Historial de Observaciones del Instructor:
              </p>
              {selectedApprentice.notes && selectedApprentice.notes.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedApprentice.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 italic">No hay notas registradas para este aprendiz.</p>
              )}
            </div>

            {/* Add note input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Escribir novedad u orientación pedagógica..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
              <button
                onClick={handleAddNote}
                disabled={!newNoteText.trim()}
                className="px-3 py-2 bg-[#00324D] dark:bg-[#39A900] text-white text-xs font-semibold rounded-lg hover:bg-[#004D73] dark:hover:bg-[#2e8302] disabled:opacity-50 transition-colors shrink-0"
              >
                Agregar
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedApprentice(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
