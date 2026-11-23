import React from "react";

interface WaveProps {
  fillColor?: string;
  className?: string;
  flip?: boolean;
  withGlow?: boolean;
}

/**
 * ModernTopWave: High-end multi-layered organic wave for section transitions.
 * Carves out an elegant, flowing entrance into a colored section with luminous edge accents.
 */
export const TopWave: React.FC<WaveProps> = ({
  fillColor = "fill-white",
  className = "",
  flip = false,
  withGlow = true,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none relative -mt-0.5 ${
        flip ? "scale-x-[-1]" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-24 md:h-32 lg:h-40 block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="topWaveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="subLayerGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#005a9c" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0077c8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Ambient Back Layer 1 - Deep soft wave */}
        <path
          opacity="0.2"
          d="M0,0 L1440,0 L1440,85 C1220,150 940,30 680,105 C420,165 180,45 0,95 Z"
          className={fillColor}
        />

        {/* Mid Layer 2 - Floating harmonic curve */}
        <path
          opacity="0.4"
          d="M0,0 L1440,0 L1440,65 C1260,125 1000,20 720,80 C460,135 220,35 0,70 Z"
          className={fillColor}
        />

        {/* Main Front Layer - Crisp solid transition */}
        <path
          d="M0,0 L1440,0 L1440,45 C1200,115 920,15 640,75 C360,125 140,25 0,55 Z"
          className={fillColor}
        />

        {/* High-Tech Luminous Crest Stroke */}
        {withGlow && (
          <path
            d="M0,55 C140,25 360,125 640,75 C920,15 1200,115 1440,45"
            stroke="url(#topWaveGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

/**
 * ModernBottomWave: High-end multi-layered organic wave for section exits.
 * Creates an ultra-smooth cascading flow out of a colored section into light backgrounds.
 */
export const BottomWave: React.FC<WaveProps> = ({
  fillColor = "fill-white",
  className = "",
  flip = false,
  withGlow = true,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none relative -mb-0.5 ${
        flip ? "scale-x-[-1]" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-24 md:h-32 lg:h-40 block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bottomWaveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ambient Back Layer 1 */}
        <path
          opacity="0.2"
          d="M0,75 C240,15 500,135 780,55 C1060,-15 1280,105 1440,65 L1440,160 L0,160 Z"
          className={fillColor}
        />

        {/* Mid Layer 2 */}
        <path
          opacity="0.4"
          d="M0,95 C280,35 560,145 840,70 C1100,5 1300,115 1440,80 L1440,160 L0,160 Z"
          className={fillColor}
        />

        {/* Main Front Layer - Solid seamless transition */}
        <path
          d="M0,115 C260,55 540,155 820,85 C1120,15 1320,125 1440,95 L1440,160 L0,160 Z"
          className={fillColor}
        />

        {/* Luminous Edge Line */}
        {withGlow && (
          <path
            d="M0,115 C260,55 540,155 820,85 C1120,15 1320,125 1440,95"
            stroke="url(#bottomWaveGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

/**
 * LayeredWave: Multi-layer flowing wave for Hero and section footers.
 */
export const LayeredWave: React.FC<WaveProps> = ({
  fillColor = "fill-white",
  className = "",
  flip = false,
  withGlow = true,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none relative -mb-1 ${
        flip ? "scale-x-[-1]" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-24 md:h-36 lg:h-44 block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="heroWaveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Layer 1: Whispering deep wave */}
        <path
          opacity="0.18"
          d="M0,50 C320,135 560,15 880,85 C1180,145 1320,40 1440,95 L1440,180 L0,180 Z"
          className={fillColor}
        />

        {/* Layer 2: Harmonic wave */}
        <path
          opacity="0.4"
          d="M0,80 C360,20 620,140 940,65 C1220,5 1340,105 1440,85 L1440,180 L0,180 Z"
          className={fillColor}
        />

        {/* Layer 3: Main crisp solid wave */}
        <path
          d="M0,110 C300,45 580,155 900,80 C1200,10 1340,115 1440,95 L1440,180 L0,180 Z"
          className={fillColor}
        />

        {/* Glowing crest accent line */}
        {withGlow && (
          <path
            d="M0,110 C300,45 580,155 900,80 C1200,10 1340,115 1440,95"
            stroke="url(#heroWaveGlow)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

export const WaveDivider = LayeredWave;
