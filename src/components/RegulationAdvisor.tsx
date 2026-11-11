/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, BookOpen, AlertCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: '¿Qué plazo tengo para justificar una inasistencia médica o por fuerza mayor?',
    a: 'Dispones de tres (3) días hábiles siguientes a la fecha de la inasistencia para radicar por escrito la incapacidad médica EPS o soporte de fuerza mayor ante el instructor y coordinación.',
    ref: 'Acuerdo 007 de 2012, Art. 22.'
  },
  {
    q: '¿Qué consecuencias acarrea la pérdida o no porte del carné institucional?',
    a: 'El porte del carné es obligatorio para ingresar y permanecer en las sedes. En caso de pérdida, debes denunciar la pérdida en la página de la Policía Nacional y solicitar el duplicado ante la oficina de administración educativa de tu centro.',
    ref: 'Acuerdo 007 de 2012, Art. 8 numeral 1.'
  },
  {
    q: '¿Qué es y cuándo se formula un Plan de Mejoramiento Académico?',
    a: 'Es una medida pedagógica concertada entre el instructor y el aprendiz para superar deficiencias en los resultados de aprendizaje no aprobados. Debe contener objetivos claros, actividades de refuerzo y fecha límite estricta de entrega.',
    ref: 'Acuerdo 007 de 2012, Art. 24 numeral 2.'
  },
  {
    q: '¿Cuál es la diferencia entre falta leve, grave y gravísima?',
    a: 'Las leves son descuidos menores sin dolo. Las graves involucran reiteración o afectación al proceso. Las gravísimas incluyen delitos tipificados en la ley, fraude documental, plagio deliberado, porte de armas o violencia física.',
    ref: 'Acuerdo 007 de 2012, Art. 25 a 27.'
  },
  {
    q: '¿Cómo garantizo el derecho al debido proceso si soy citado a Comité?',
    a: 'Tienes derecho a: 1. Ser notificado por escrito con los cargos; 2. Contar con 3 días hábiles para presentar descargos; 3. Asistir acompañado del vocero de ficha; 4. Interponer Recurso de Reposición en los 5 días siguientes a la decisión.',
    ref: 'Acuerdo 007 de 2012, Art. 29 a 35.'
  }
];

export const RegulationAdvisor: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(f =>
    f.q.toLowerCase().includes(query.toLowerCase()) ||
    f.a.toLowerCase().includes(query.toLowerCase()) ||
    f.ref.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span className="text-[#39A900] font-semibold">Orientación Rápida</span>
            <span aria-hidden="true">·</span>
            <span>Preguntas Frecuentes de Inducción</span>
          </div>
          <h3 className="text-xl font-bold text-[#00324D] dark:text-white font-heading">
            Consultorio Normativo del Aprendiz
          </h3>
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Preguntar sobre una norma..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
              >
                <span className="text-xs md:text-sm font-semibold text-slate-900 dark:text-white">
                  {faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>{faq.a}</p>
                  <p className="mt-2 text-xs font-mono text-[#39A900] font-semibold">
                    Referencia: {faq.ref}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
