/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Pause, BookOpen, ExternalLink, CheckCircle2, Monitor, Shield, Users, Lightbulb } from 'lucide-react';

const MULTIMEDIA_CHANNELS = [
  {
    id: 'zajuna',
    name: 'Zajuna LMS Oficial',
    subtitle: 'Ambiente Virtual de Aprendizaje (AVA)',
    description: 'La plataforma oficial del SENA para interactuar con tus instructores, responder foros temáticos, descargar guías de aprendizaje y subir tus evidencias formativas.',
    url: 'https://zajuna.sena.edu.co',
    badge: 'LMS Central',
    keyPoints: [
      'Acceso con las mismas credenciales de SofiaPlus.',
      'Portafolio digital de evidencias de aprendizaje.',
      'Notificaciones y retroalimentaciones de instructores en tiempo real.'
    ]
  },
  {
    id: 'sofiaplus',
    name: 'SofiaPlus Portal',
    subtitle: 'Sistema de Gestión Académica',
    description: 'Gestiona tu historia académica, descarga certificados de estudio, consulta los juicios de evaluación aprobados y programa trámites de formación.',
    url: 'https://oferta.senasofiaplus.edu.co',
    badge: 'Gestión Académica',
    keyPoints: [
      'Consulta del estado de matrícula y ficha de formación.',
      'Reporte de novedades (aplazamiento, traslado, reingreso).',
      'Descarga de certificados con código de verificación QR.'
    ]
  },
  {
    id: 'sbs',
    name: 'Sistema de Bibliotecas SENA (SBS)',
    subtitle: 'Recursos Bibliográficos y Científicos',
    description: 'Accede a más de 30 bases de datos científicas internacionales, libros electrónicos, tesis y repositorios de investigación de forma 100% gratuita.',
    url: 'https://biblioteca.sena.edu.co',
    badge: 'Investigación',
    keyPoints: [
      'Acceso ilimitado a bibliografía técnica y normas técnicas ICONTEC e ISO.',
      'Salas de consulta virtual y préstamo interbibliotecario en 118 centros.',
      'Talleres periódicos de alfabetización informacional y normas APA.'
    ]
  },
  {
    id: 'bienestar',
    name: 'Bienestar al Aprendiz',
    subtitle: 'Acompañamiento Integral y Permanencia',
    description: 'Espacio dedicado a tu desarrollo humano: salud preventiva, apoyos de sostenimiento (FIC), orientación psicológica, torneos deportivos y expresiones artísticas.',
    url: 'https://www.sena.edu.co/es-co/comunidades/aprendices/Paginas/bienestarAprendiz.aspx',
    badge: 'Permanencia',
    keyPoints: [
      'Convocatorias semestrales para apoyos de sostenimiento y monitorías.',
      'Juegos deportivos intercentros y festivales culturales nacionales.',
      'Líneas de atención en salud mental y consejería familiar.'
    ]
  }
];

export const MultimediaExplorer: React.FC = () => {
  const [activeChannelId, setActiveChannelId] = useState<string>('zajuna');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [currentVideoTimestamp, setCurrentVideoTimestamp] = useState<number>(45);

  const activeChannel = MULTIMEDIA_CHANNELS.find(c => c.id === activeChannelId) || MULTIMEDIA_CHANNELS[0];

  return (
    <div className="space-y-10">
      {/* Interactive Video Pill Spotlight */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <span className="text-[#39A900] font-semibold">Cápsula Multimedia</span>
              <span aria-hidden="true">·</span>
              <span>Inducción Integral</span>
              <span aria-hidden="true">·</span>
              <span>Píldora 01: El Ecosistema de Formación</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              Cápsula Formativa: ¿Cómo Funciona la Formación Profesional en el SENA?
            </h3>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Simulated Interactive Video Screen */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden relative shadow-md flex flex-col justify-between min-h-[360px]">
            {/* Background High Fidelity Photograph */}
            <div className="absolute inset-0">
              <img
                src="/src/assets/images/sena_apprentices_learning_1794325241697.jpg"
                alt="Aprendices SENA en laboratorio de robótica y tecnología"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </div>

            {/* Video Top Overlay */}
            <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">Inducción SENA Oficial</span>
              </div>
              <span className="font-mono bg-black/50 px-2 py-0.5 rounded text-[11px]">
                04:30 HD
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="w-16 h-16 rounded-full bg-[#39A900] hover:bg-[#2e8302] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
              >
                {isVideoPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                )}
              </button>
              <h4 className="text-white font-bold text-lg mt-4 font-heading drop-shadow-sm">
                {isVideoPlaying ? 'Reproduciendo cápsula formativa...' : 'Ver Introducción al Modelo Pedagógico SENA'}
              </h4>
              <p className="text-slate-300 text-xs max-w-md mt-1 drop-shadow-xs">
                Aprende la diferencia entre etapa lectiva y productiva, competencias laborales y manejo de plataformas.
              </p>
            </div>

            {/* Video Bottom Progress Bar */}
            <div className="relative z-10 p-4 bg-black/60 backdrop-blur-xs">
              <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#39A900] h-full transition-all duration-300"
                  style={{ width: isVideoPlaying ? '65%' : '15%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300 mt-2 font-mono">
                <span>{isVideoPlaying ? '02:55' : '00:45'}</span>
                <span>04:30</span>
              </div>
            </div>
          </div>

          {/* Key Video Chapters & Takeaways */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-3 uppercase tracking-wider text-xs">
                Contenidos de la Cápsula
              </h4>

              <div className="space-y-2.5">
                {[
                  { time: '00:00', title: 'Bienvenida institucional y saludo de Dirección General' },
                  { time: '01:15', title: 'Las dos etapas: Lectiva y Productiva explicadas' },
                  { time: '02:30', title: 'Portafolio de evidencias y uso de Zajuna' },
                  { time: '03:45', title: 'Alternativas de etapa productiva (contrato, pasantía)' }
                ].map((chap, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#39A900] dark:hover:border-[#39A900] transition-colors cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#39A900] font-bold">{chap.time}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{chap.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-800/60 text-[11px] text-emerald-900 dark:text-emerald-200">
              <p className="font-semibold">Objetivo pedagógico:</p>
              <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                Aclarar las dudas frecuentes sobre cómo avanzar trimestre a trimestre sin contratiempos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official SENA Platforms and Channels Explorer */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>Ecosistema Digital SENA</span>
            <span aria-hidden="true">·</span>
            <span>Plataformas de Apoyo al Aprendiz</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#00324D] dark:text-white font-heading">
            Canales Tecnológicos y de Bienestar
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Conoce los accesos imprescindibles durante toda tu vida como aprendiz en la comunidad institucional.
          </p>
        </div>

        {/* Channel Navigation Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {MULTIMEDIA_CHANNELS.map((ch) => {
            const isSelected = ch.id === activeChannelId;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChannelId(ch.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-[#39A900] shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block mb-1 uppercase">
                  {ch.badge}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{ch.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{ch.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Channel Detailed Feature View */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-700/80">
            <div>
              <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider">
                {activeChannel.subtitle}
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
                {activeChannel.name}
              </h4>
            </div>

            <a
              href={activeChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#00324D] dark:bg-[#39A900] hover:bg-[#004D73] dark:hover:bg-[#2e8302] rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>Ir al Portal Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-4 leading-relaxed">
            {activeChannel.description}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-2">
              Puntos clave a recordar:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeChannel.keyPoints.map((pt, i) => (
                <div key={i} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
