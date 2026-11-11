/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Apprentice } from '../types/induction';
import { SenaLogo, SenaShield } from './SenaSymbolsGraphic';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  apprentice: Apprentice;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  apprentice,
  onClose
}) => {
  const currentDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 md:p-10 shadow-2xl relative border border-slate-200 print:border-none print:shadow-none print:m-0">
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <CheckCircle className="w-4 h-4 text-[#39A900]" />
            <span>Documento Oficial Generado — Proceso Aprobado</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2e8302] rounded-lg transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Sheet */}
        <div className="mt-6 border-4 border-double border-[#39A900]/40 p-6 md:p-10 rounded-xl relative bg-linear-to-b from-white via-slate-50/30 to-white text-center">
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
            <SenaLogo className="w-72 h-72" />
          </div>

          {/* Institutional Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 relative z-10">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 bg-[#39A900] rounded-xl flex items-center justify-center p-2 shadow-xs">
                <SenaLogo className="w-full h-full" inverted={true} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#00324D] uppercase tracking-wider font-heading leading-tight">
                  Servicio Nacional de Aprendizaje
                </h4>
                <p className="text-[11px] text-slate-600 font-semibold tracking-normal">
                  Ministerio del Trabajo · República de Colombia
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
                <span className="block font-bold text-slate-800">REGIONAL {apprentice.regional.toUpperCase()}</span>
                <span>{apprentice.trainingCenter}</span>
              </div>
              <SenaShield className="w-11 h-14" />
            </div>
          </div>

          {/* Certificate Title */}
          <div className="my-8 relative z-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#39A900]">
              Certificación de Inducción Institucional
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#00324D] font-heading mt-1">
              CONSTANCIA DE APROBACIÓN
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Por haber cursado y superado satisfactoriamente los módulos normativos, axiológicos y pedagógicos.
            </p>
          </div>

          {/* Body Prose */}
          <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto relative z-10">
            <p>
              El Centro de Formación hace constar que el (la) aprendiz:
            </p>
            <p className="text-lg md:text-xl font-extrabold text-slate-900 font-heading border-b border-slate-300 pb-1">
              {apprentice.name.toUpperCase()}
            </p>
            <p className="text-xs text-slate-600">
              Identificado(a) con <strong>{apprentice.documentType} No. {apprentice.documentNumber}</strong>, matriculado(a) en el programa de formación:
            </p>
            <p className="font-bold text-[#00324D] text-sm md:text-base">
              {apprentice.programName}
            </p>
            <p className="text-xs text-slate-600">
              Ficha de Caracterización No. <strong>{apprentice.fichaNumber}</strong>
            </p>
            <p className="text-xs text-slate-600 pt-2">
              Ha cumplido a cabalidad con la ruta de inducción del SENA, demostrando conocimiento y adhesión al <strong>Reglamento del Aprendiz (Acuerdo 007 de 2012)</strong>, los símbolos institucionales, el Código de Integridad y los lineamientos de la Formación Profesional Integral.
            </p>
          </div>

          {/* Signatures & QR Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 items-end relative z-10">
            {/* Signature 1 */}
            <div className="text-center">
              <div className="w-28 mx-auto border-b border-slate-400 mb-1" />
              <p className="text-[11px] font-bold text-slate-800">Subdirección de Centro</p>
              <p className="text-[10px] text-slate-500">SENA Regional {apprentice.regional}</p>
            </div>

            {/* QR Mockup */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white border border-slate-300 p-1 rounded shadow-xs flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800" fill="currentColor">
                  {/* Stylized QR pattern */}
                  <rect x="5" y="5" width="25" height="25" />
                  <rect x="70" y="5" width="25" height="25" />
                  <rect x="5" y="70" width="25" height="25" />
                  <rect x="10" y="10" width="15" height="15" fill="white" />
                  <rect x="75" y="10" width="15" height="15" fill="white" />
                  <rect x="10" y="75" width="15" height="15" fill="white" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="79" y="14" width="7" height="7" />
                  <rect x="14" y="79" width="7" height="7" />
                  <rect x="40" y="20" width="20" height="8" />
                  <rect x="35" y="45" width="30" height="12" />
                  <rect x="40" y="70" width="15" height="15" />
                  <rect x="70" y="50" width="15" height="25" />
                </svg>
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1">
                VALIDACIÓN: SENA-{apprentice.fichaNumber}-{apprentice.documentNumber.slice(-4)}
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center">
              <div className="w-28 mx-auto border-b border-slate-400 mb-1" />
              <p className="text-[11px] font-bold text-slate-800">Coordinación Académica</p>
              <p className="text-[10px] text-slate-500">Expedido el {currentDate}</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[10px] text-slate-400 mt-4 print:hidden">
          Documento digital generado a través del Sistema Integrado de Inducción SENA con validez institucional.
        </p>
      </div>
    </div>
  );
};
