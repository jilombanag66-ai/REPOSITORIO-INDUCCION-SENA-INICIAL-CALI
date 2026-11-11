/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

export const OFFICIAL_SENA_SHIELD_URL = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';

export const SenaLogo: React.FC<{ className?: string; color?: string; inverted?: boolean }> = ({
  className = 'w-8 h-8',
  color = '#39A900',
  inverted = false
}) => {
  const fillColor = inverted ? '#FFFFFF' : (color || '#39A900');

  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logotipo Oficial SENA"
    >
      <path
        d="M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z"
        fill={fillColor}
      />
    </svg>
  );
};

export const SenaShield: React.FC<{
  className?: string;
  interactive?: boolean;
  onSelectElement?: (el: string) => void;
  customSvg?: string;
  useVector?: boolean;
}> = ({
  className = 'w-48 h-56',
  interactive = false,
  onSelectElement,
  customSvg,
  useVector = false
}) => {
  const [imgError, setImgError] = useState(false);
  const effectiveSrc = customSvg || OFFICIAL_SENA_SHIELD_URL;

  // If user provided custom SVG string
  if (customSvg && (customSvg.startsWith('<svg') || customSvg.startsWith('<?xml'))) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        dangerouslySetInnerHTML={{ __html: customSvg }}
        aria-label="Escudo del SENA Personalizado"
      />
    );
  }

  // Primary: Official SENA Image Asset
  if (!useVector && !imgError) {
    return (
      <div className={`relative ${className} flex items-center justify-center group select-none`}>
        <img
          src={effectiveSrc}
          alt="Escudo Oficial del SENA"
          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />

        {interactive && (
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-auto">
            {/* Top half: Left quadrant (Piñón) & Right quadrant (Caduceo) */}
            <div className="flex justify-between h-[52%]">
              <button
                type="button"
                onClick={() => onSelectElement?.('pinon')}
                className="w-1/2 h-full rounded-tl-2xl opacity-0 hover:opacity-100 hover:bg-[#39A900]/15 transition-all cursor-pointer border border-transparent hover:border-[#39A900]/40 flex items-center justify-center group/btn"
                title="Sector Industria y Construcción (Piñón Dentado)"
                aria-label="Sector Industria y Construcción"
              >
                <span className="bg-[#00324D]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow opacity-0 group-hover/btn:opacity-100 transition-opacity">
                  Piñón (Industria)
                </span>
              </button>
              <button
                type="button"
                onClick={() => onSelectElement?.('caduceo')}
                className="w-1/2 h-full rounded-tr-2xl opacity-0 hover:opacity-100 hover:bg-amber-500/15 transition-all cursor-pointer border border-transparent hover:border-amber-500/40 flex items-center justify-center group/btn"
                title="Sector Comercio y Servicios (Caduceo de Mercurio)"
                aria-label="Sector Comercio y Servicios"
              >
                <span className="bg-[#00324D]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow opacity-0 group-hover/btn:opacity-100 transition-opacity">
                  Caduceo (Comercio)
                </span>
              </button>
            </div>

            {/* Bottom half: Ramas de café */}
            <button
              type="button"
              onClick={() => onSelectElement?.('cafe')}
              className="w-full h-[48%] rounded-b-3xl opacity-0 hover:opacity-100 hover:bg-emerald-600/15 transition-all cursor-pointer border border-transparent hover:border-emerald-600/40 flex items-center justify-center group/btn"
              title="Sector Agropecuario (Ramas de Café)"
              aria-label="Sector Agropecuario"
            >
              <span className="bg-[#00324D]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow opacity-0 group-hover/btn:opacity-100 transition-opacity">
                Ramas de Café (Agropecuario)
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Escudo Oficial del SENA"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="shieldBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
        <linearGradient id="senaGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39A900" />
          <stop offset="100%" stopColor="#2A7A00" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="cherryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="60%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <filter id="shieldShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00324D" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Main Heraldic Shield Contour */}
      <path
        d="M16 16 H184 V124 C184 182 100 224 100 224 C100 224 16 182 16 124 Z"
        fill="url(#shieldBgGrad)"
        stroke="#39A900"
        strokeWidth="6"
        strokeLinejoin="round"
        filter="url(#shieldShadow)"
      />

      {/* Inner Heraldic Inset Border */}
      <path
        d="M23 23 H177 V123 C177 175 100 214 100 214 C100 214 23 175 23 123 Z"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />

      {/* Chief / Franja Superior Verde con SENA */}
      <path
        d="M16 16 H184 V52 H16 Z"
        fill="url(#senaGreenGrad)"
      />
      <line x1="16" y1="52" x2="184" y2="52" stroke="#246D00" strokeWidth="2.5" />
      <text
        x="100"
        y="42"
        fill="#FFFFFF"
        fontSize="24"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="4.5"
        fontFamily="'Outfit', sans-serif"
      >
        SENA
      </text>

      {/* Subtle Quadrant Dividers */}
      <line x1="100" y1="52" x2="100" y2="132" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="23" y1="132" x2="177" y2="132" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* ======================================================== */}
      {/* CUADRANTE SUPERIOR IZQUIERDO: EL PIÑÓN (INDUSTRIA)       */}
      {/* ======================================================== */}
      <g
        className={interactive ? 'cursor-pointer group/pinon transition-all hover:scale-105 origin-[60px_92px]' : ''}
        onClick={() => onSelectElement && onSelectElement('pinon')}
      >
        <title>Sector de la Industria y de la Construcción: El Piñón Dentado</title>
        {/* Subtle highlight backplate on hover */}
        <circle cx="60" cy="92" r="32" fill="#39A900" fillOpacity="0.06" className="group-hover/pinon:fillOpacity-15 transition-all" />
        
        {/* Gear Main Ring */}
        <circle cx="60" cy="92" r="22" fill="#39A900" />
        {/* Hub axle and hole */}
        <circle cx="60" cy="92" r="14" fill="#FFFFFF" stroke="#39A900" strokeWidth="2.5" />
        <circle cx="60" cy="92" r="5" fill="#39A900" />

        {/* 4 Internal Spokes */}
        <line x1="60" y1="78" x2="60" y2="106" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="46" y1="92" x2="74" y2="92" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* 8 Radial Gear Teeth */}
        {/* 0 deg & 180 deg */}
        <rect x="56.5" y="65" width="7" height="6" rx="1" fill="#39A900" />
        <rect x="56.5" y="113" width="7" height="6" rx="1" fill="#39A900" />
        {/* 90 deg & 270 deg */}
        <rect x="33" y="88.5" width="6" height="7" rx="1" fill="#39A900" />
        <rect x="81" y="88.5" width="6" height="7" rx="1" fill="#39A900" />
        {/* 45 deg */}
        <rect x="56.5" y="65" width="7" height="6" rx="1" fill="#39A900" transform="rotate(45 60 92)" />
        {/* 135 deg */}
        <rect x="56.5" y="65" width="7" height="6" rx="1" fill="#39A900" transform="rotate(135 60 92)" />
        {/* 225 deg */}
        <rect x="56.5" y="65" width="7" height="6" rx="1" fill="#39A900" transform="rotate(225 60 92)" />
        {/* 315 deg */}
        <rect x="56.5" y="65" width="7" height="6" rx="1" fill="#39A900" transform="rotate(315 60 92)" />
      </g>

      {/* ======================================================== */}
      {/* CUADRANTE SUPERIOR DERECHO: EL CADUCEO (COMERCIO)        */}
      {/* ======================================================== */}
      <g
        className={interactive ? 'cursor-pointer group/caduceo transition-all hover:scale-105 origin-[140px_92px]' : ''}
        onClick={() => onSelectElement && onSelectElement('caduceo')}
      >
        <title>Sector del Comercio y Servicios: El Caduceo de Mercurio</title>
        {/* Backplate glow */}
        <circle cx="140" cy="92" r="32" fill="#CA8A04" fillOpacity="0.06" className="group-hover/caduceo:fillOpacity-15 transition-all" />

        {/* Central Golden Staff (Vara) */}
        <line x1="140" y1="63" x2="140" y2="123" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Top Sphere / Pommel */}
        <circle cx="140" cy="62" r="5" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="1" />

        {/* Wings of Hermes at Top */}
        {/* Left Wing */}
        <path
          d="M140 68 C133 60 118 61 114 69 C121 73 131 74 140 73 Z"
          fill="url(#goldGrad)"
          stroke="#B45309"
          strokeWidth="1"
        />
        {/* Right Wing */}
        <path
          d="M140 68 C147 60 162 61 166 69 C159 73 149 74 140 73 Z"
          fill="url(#goldGrad)"
          stroke="#B45309"
          strokeWidth="1"
        />

        {/* Two Entwined Serpents (Figure-8) */}
        {/* Serpent A */}
        <path
          d="M132 74 Q140 80 148 87 Q132 98 132 107 Q140 115 147 119"
          stroke="#00324D"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Serpent B */}
        <path
          d="M148 74 Q140 80 132 87 Q148 98 148 107 Q140 115 133 119"
          stroke="#00324D"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Serpent Heads facing inward */}
        <circle cx="133" cy="74" r="2.5" fill="#00324D" />
        <circle cx="147" cy="74" r="2.5" fill="#00324D" />
      </g>

      {/* ======================================================== */}
      {/* CUADRANTE INFERIOR: RAMAS DE CAFÉ (SECTOR AGROPECUARIO)  */}
      {/* ======================================================== */}
      <g
        className={interactive ? 'cursor-pointer group/cafe transition-all hover:scale-105 origin-[100px_175px]' : ''}
        onClick={() => onSelectElement && onSelectElement('cafe')}
      >
        <title>Sector Agropecuario: Las Ramas de Café con Frutos Rojos</title>
        {/* Left Coffee Branch Stem */}
        <path
          d="M100 206 C84 192 56 178 44 146"
          stroke="#2E8302"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Coffee Branch Stem */}
        <path
          d="M100 206 C116 192 144 178 156 146"
          stroke="#2E8302"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Branch Tie Knot at Bottom */}
        <path d="M96 203 L104 209 M96 209 L104 203" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />

        {/* Coffee Leaves - Left Branch */}
        <ellipse cx="48" cy="151" rx="5" ry="11" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(-40 48 151)" />
        <ellipse cx="61" cy="166" rx="5.5" ry="12" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(-30 61 166)" />
        <ellipse cx="75" cy="181" rx="5.5" ry="12" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(-20 75 181)" />
        <ellipse cx="89" cy="195" rx="5" ry="11" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(-10 89 195)" />

        {/* Coffee Leaves - Right Branch */}
        <ellipse cx="152" cy="151" rx="5" ry="11" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(40 152 151)" />
        <ellipse cx="139" cy="166" rx="5.5" ry="12" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(30 139 166)" />
        <ellipse cx="125" cy="181" rx="5.5" ry="12" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(20 125 181)" />
        <ellipse cx="111" cy="195" rx="5" ry="11" fill="#39A900" stroke="#246D00" strokeWidth="1" transform="rotate(10 111 195)" />

        {/* Coffee Cherries (Granos de Café Rojos Maduros) with Highlights */}
        {/* Left Cluster 1 */}
        <circle cx="56" cy="158" r="3.5" fill="url(#cherryGrad)" />
        <circle cx="55" cy="157" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="62" cy="160" r="3.2" fill="url(#cherryGrad)" />
        <circle cx="61" cy="159" r="0.9" fill="#FFFFFF" opacity="0.8" />

        {/* Left Cluster 2 */}
        <circle cx="70" cy="173" r="3.5" fill="url(#cherryGrad)" />
        <circle cx="69" cy="172" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="76" cy="176" r="3.2" fill="url(#cherryGrad)" />
        <circle cx="75" cy="175" r="0.9" fill="#FFFFFF" opacity="0.8" />

        {/* Left Cluster 3 */}
        <circle cx="84" cy="188" r="3.5" fill="url(#cherryGrad)" />
        <circle cx="83" cy="187" r="1" fill="#FFFFFF" opacity="0.8" />

        {/* Right Cluster 1 */}
        <circle cx="144" cy="158" r="3.5" fill="url(#cherryGrad)" />
        <circle cx="143" cy="157" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="138" cy="160" r="3.2" fill="url(#cherryGrad)" />
        <circle cx="137" cy="159" r="0.9" fill="#FFFFFF" opacity="0.8" />

        {/* Right Cluster 2 */}
        <circle cx="130" cy="173" r="3.5" fill="url(#cherryGrad)" />
        <circle cx="129" cy="172" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="124" cy="176" r="3.2" fill="url(#cherryGrad)" />
        <circle cx="123" cy="175" r="0.9" fill="#FFFFFF" opacity="0.8" />

        {/* Right Cluster 3 */}
        <circle cx="116" cy="188" r="3.5" fill="url(#cherryGrad)" />
        <circle cx="115" cy="187" r="1" fill="#FFFFFF" opacity="0.8" />

        {/* Center Base Cluster */}
        <circle cx="100" cy="201" r="3.8" fill="url(#cherryGrad)" />
        <circle cx="99" cy="200" r="1" fill="#FFFFFF" opacity="0.8" />
      </g>
    </svg>
  );
};

export const SenaFlag: React.FC<{ className?: string }> = ({ className = 'w-64 h-40' }) => {
  return (
    <svg viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Bandera Oficial del SENA">
      {/* White field */}
      <rect x="2" y="2" width="296" height="186" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      {/* Official SENA Shield */}
      <image
        href={OFFICIAL_SENA_SHIELD_URL}
        x="105"
        y="28"
        width="90"
        height="134"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
};
