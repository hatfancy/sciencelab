import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Mountain, Sparkles, AlertTriangle, Layers, Activity,
  Info, RotateCcw, Play, Pause, ChevronRight, Compass, ShieldAlert,
  Thermometer, Wind, Droplets, ArrowRight
} from 'lucide-react';

interface VolcanoType {
  id: string;
  name: string;
  tagline: string;
  example: string;
  viscosity: 'Low (Runny)' | 'Intermediate' | 'High (Sticky)';
  silicaContent: number; // percentage
  gasContent: 'Low' | 'Moderate' | 'Extremely High';
  explosivityIndex: number; // VEI rating 0-8
  magmaTempC: number;
  description: string;
  color: string;
  accentGlow: string;
}

const VOLCANO_PROFILES: VolcanoType[] = [
  {
    id: 'stratovolcano',
    name: 'Stratovolcano (Composite)',
    tagline: 'Steep conical peaks, violent pyroclastic eruptions',
    example: 'Mount St. Helens, Mt. Fuji, Mt. Vesuvius',
    viscosity: 'High (Sticky)',
    silicaContent: 65,
    gasContent: 'Extremely High',
    explosivityIndex: 5,
    magmaTempC: 850,
    description: 'Constructed from alternating strata of hardened lava, tephra, pumice, and volcanic ash. High viscosity and trapped volatiles lead to cataclysmic Plinian explosions.',
    color: 'from-orange-600 via-rose-600 to-amber-500',
    accentGlow: 'rgba(239, 68, 68, 0.5)'
  },
  {
    id: 'shield',
    name: 'Shield Volcano',
    tagline: 'Broad gentle domes, fluid effusive basalt flows',
    example: 'Mauna Loa, Kilauea, Olympus Mons',
    viscosity: 'Low (Runny)',
    silicaContent: 48,
    gasContent: 'Low',
    explosivityIndex: 1,
    magmaTempC: 1180,
    description: 'Formed from low-viscosity basaltic lava that travels vast distances before solidifying, creating massive, broad-profile volcanic shields resembling a warrior’s shield.',
    color: 'from-amber-600 via-yellow-600 to-red-600',
    accentGlow: 'rgba(245, 158, 11, 0.45)'
  },
  {
    id: 'cinder-cone',
    name: 'Cinder Cone (Scoria)',
    tagline: 'Steep conical hills of basaltic pyroclastic debris',
    example: 'Parícutin, Sunset Crater',
    viscosity: 'Intermediate',
    silicaContent: 54,
    gasContent: 'Moderate',
    explosivityIndex: 2,
    magmaTempC: 1020,
    description: 'Simplest volcanic structure. Gas-charged lava is blown into the air, breaks into small fragments called cinders or scoria, and accumulates around the central vent.',
    color: 'from-red-600 via-amber-700 to-orange-500',
    accentGlow: 'rgba(220, 38, 38, 0.45)'
  },
  {
    id: 'caldera',
    name: 'Supervolcano Caldera',
    tagline: 'Colossal crustal collapse basins with super-eruptions',
    example: 'Yellowstone, Lake Toba, Santorini',
    viscosity: 'High (Sticky)',
    silicaContent: 73,
    gasContent: 'Extremely High',
    explosivityIndex: 8,
    magmaTempC: 780,
    description: 'Catastrophic drainage of colossal magma chambers causes the overlying crust to collapse inward, leaving immense depressions tens of kilometers across.',
    color: 'from-purple-600 via-rose-700 to-orange-600',
    accentGlow: 'rgba(168, 85, 247, 0.5)'
  }
];

export const VolcanoLabView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation Controls
  const [selectedVolcanoId, setSelectedVolcanoId] = useState<string>('stratovolcano');
  const [chamberPressure, setChamberPressure] = useState<number>(65); // 0 to 100%
  const [magmaViscosity, setMagmaViscosity] = useState<number>(60); // 10 to 90%
  const [dissolvedGas, setDissolvedGas] = useState<number>(75); // 0 to 100%
  const [isErupting, setIsErupting] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'simulation' | 'anatomy' | 'seismograph' | 'vei-scale'>('simulation');

  // Custom visualizer states
  const [glowColor, setGlowColor] = useState<string>('#f97316');
  const [glowIntensity, setGlowIntensity] = useState<number>(80); // 20 to 100
  const [plumeParticleCount, setPlumeParticleCount] = useState<number>(140);
  const [ambientSeismicJitter, setAmbientSeismicJitter] = useState<number>(2.4);

  const selectedVolcano = VOLCANO_PROFILES.find((v) => v.id === selectedVolcanoId) || VOLCANO_PROFILES[0];

  // Derived Explosivity Score (0 to 100)
  const computedExplosionEnergy = Math.min(
    100,
    Math.round((chamberPressure * 0.4 + dissolvedGas * 0.45 + magmaViscosity * 0.15))
  );

  const plumeHeightKm = Number(((computedExplosionEnergy / 100) * 38 + 2).toFixed(1));
  const estimatedVEI = computedExplosionEnergy < 20 ? 0 :
                       computedExplosionEnergy < 35 ? 1 :
                       computedExplosionEnergy < 50 ? 2 :
                       computedExplosionEnergy < 68 ? 3 :
                       computedExplosionEnergy < 82 ? 4 :
                       computedExplosionEnergy < 93 ? 5 :
                       computedExplosionEnergy < 98 ? 6 : 7;

  // Live Canvas Particle Physics for Magma, Ash Plume, Lava Bombs, and Glowing Vents
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    // Particle classes for ash plume, incandescent lava chunks, and sparks
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      color: string;
      isBomb?: boolean;
    }

    const particles: Particle[] = [];
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Sky background gradient with atmospheric twilight smoke
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (computedExplosionEnergy > 60) {
        skyGrad.addColorStop(0, '#06070a');
        skyGrad.addColorStop(0.5, '#160a08');
        skyGrad.addColorStop(1, '#1b0d0b');
      } else {
        skyGrad.addColorStop(0, '#040711');
        skyGrad.addColorStop(0.6, '#0b1324');
        skyGrad.addColorStop(1, '#0e1726');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Mountain Geometry Coordinates
      const ventX = width * 0.5;
      const ventY = height * 0.52;
      const ventWidth = selectedVolcano.id === 'shield' ? 140 : selectedVolcano.id === 'caldera' ? 220 : 48;
      const baseLeftX = selectedVolcano.id === 'shield' ? width * 0.05 : width * 0.18;
      const baseRightX = selectedVolcano.id === 'shield' ? width * 0.95 : width * 0.82;
      const baseY = height * 0.92;

      // Draw distant volcanic ridge silhouette
      ctx.beginPath();
      ctx.moveTo(0, height * 0.78);
      ctx.lineTo(width * 0.25, height * 0.68);
      ctx.lineTo(width * 0.45, height * 0.72);
      ctx.lineTo(width * 0.7, height * 0.65);
      ctx.lineTo(width, height * 0.76);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = 'rgba(8, 11, 20, 0.75)';
      ctx.fill();

      // Draw Main Volcano Cone
      ctx.beginPath();
      ctx.moveTo(baseLeftX, baseY);
      ctx.quadraticCurveTo(ventX - ventWidth * 1.5, ventY + 40, ventX - ventWidth / 2, ventY);
      ctx.lineTo(ventX + ventWidth / 2, ventY);
      ctx.quadraticCurveTo(ventX + ventWidth * 1.5, ventY + 40, baseRightX, baseY);
      ctx.lineTo(width, baseY);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.lineTo(0, baseY);
      ctx.closePath();

      const mountainGrad = ctx.createLinearGradient(0, ventY, 0, height);
      mountainGrad.addColorStop(0, '#1c1514');
      mountainGrad.addColorStop(0.4, '#120f12');
      mountainGrad.addColorStop(1, '#08080a');
      ctx.fillStyle = mountainGrad;
      ctx.fill();
      ctx.strokeStyle = '#2d1e1c';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Mountain strata / rock ridges
      ctx.beginPath();
      ctx.moveTo(ventX - ventWidth / 4, ventY + 2);
      ctx.lineTo(baseLeftX + 90, baseY);
      ctx.moveTo(ventX + ventWidth / 4, ventY + 2);
      ctx.lineTo(baseRightX - 80, baseY);
      ctx.strokeStyle = 'rgba(255, 100, 50, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glowing Magma Conduit inside Crater
      const craterPulse = Math.sin(tick * 0.08) * 0.2 + 0.8;
      const glowGrad = ctx.createRadialGradient(ventX, ventY, 2, ventX, ventY, ventWidth * 1.8);
      glowGrad.addColorStop(0, `rgba(255, 230, 120, ${0.9 * craterPulse})`);
      glowGrad.addColorStop(0.3, `rgba(249, 115, 22, ${0.75 * craterPulse})`);
      glowGrad.addColorStop(0.7, `rgba(220, 38, 38, ${0.4 * craterPulse})`);
      glowGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.ellipse(ventX, ventY, ventWidth * 1.4, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lava Cascade Runoff down flanks
      if (selectedVolcano.id === 'shield' || chamberPressure > 40) {
        const flowPulse = (Math.sin(tick * 0.05) + 1) * 0.5;
        ctx.beginPath();
        ctx.moveTo(ventX - 10, ventY + 4);
        ctx.bezierCurveTo(ventX - 45, ventY + 80, ventX - 30, ventY + 140, ventX - 70, baseY - 10);
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.65 + flowPulse * 0.25})`;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Spawn ash, fire, and tephra particles if erupting
      if (isErupting) {
        const spawnCount = Math.ceil((computedExplosionEnergy / 100) * 8) + 2;
        for (let i = 0; i < spawnCount; i++) {
          const spread = (Math.random() - 0.5) * ventWidth * 0.8;
          const energyFactor = computedExplosionEnergy / 100;
          const isAsh = Math.random() > 0.35;
          const isBomb = !isAsh && Math.random() < 0.25;

          particles.push({
            x: ventX + spread,
            y: ventY,
            vx: (Math.random() - 0.5) * (energyFactor * 7 + 1.5),
            vy: -Math.random() * (energyFactor * 10 + 3) - 2.5,
            size: isBomb ? Math.random() * 4 + 3 : isAsh ? Math.random() * 12 + 6 : Math.random() * 3 + 1,
            alpha: isAsh ? 0.6 : 1,
            decay: isAsh ? 0.004 : 0.015,
            color: isBomb 
              ? '#ffdd44' 
              : isAsh 
                ? (Math.random() > 0.4 ? 'rgba(90, 85, 85, ' : 'rgba(50, 45, 50, ')
                : (Math.random() > 0.5 ? '#f97316' : '#ef4444'),
            isBomb
          });
        }
      }

      // Update and draw all particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Physics behavior: Ash expands and slows upward, bombs curve with gravity
        if (p.isBomb) {
          p.vy += 0.16; // gravity pulls lava bomb down
          p.alpha -= p.decay;

          ctx.fillStyle = p.color;
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.color.startsWith('rgba(')) {
          // Ash plume smoke
          p.vy *= 0.985;
          p.vx += (Math.random() - 0.5) * 0.2;
          p.size += 0.28; // expanding umbrella cloud
          p.alpha -= p.decay;

          ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Incandescent fiery sparks
          p.alpha -= p.decay * 1.5;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.alpha <= 0.01 || p.y > height) {
          particles.splice(i, 1);
        }
      }

      // Draw Volcanic Lightning in Super Plumes
      if (computedExplosionEnergy > 70 && Math.random() < 0.06) {
        ctx.strokeStyle = '#c4b5fd';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 2;
        ctx.beginPath();
        let lx = ventX + (Math.random() - 0.5) * 70;
        let ly = ventY - 140;
        ctx.moveTo(lx, ly);
        for (let seg = 0; seg < 5; seg++) {
          lx += (Math.random() - 0.5) * 35;
          ly += Math.random() * 25 + 10;
          ctx.lineTo(lx, ly);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [selectedVolcano, computedExplosionEnergy, isErupting]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner / Header with Glow Accent */}
      <div className="relative rounded-2xl border border-orange-900/50 bg-gradient-to-r from-orange-950/40 via-red-950/30 to-[#0c1220] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div 
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 animate-pulse"
          style={{ background: glowColor }}
        />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/40 border border-orange-500/40 text-xs font-mono text-orange-300">
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
              <span>SciVerse New Module</span>
              <span>·</span>
              <span>Geophysics & Volcanology</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Volcano Experiment Lab</span>
              <span className="text-sm font-mono font-normal px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/30">
                VEI Simulator
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Investigate the thermodynamic forces powering volcanic eruptions. Manipulate magma viscosity, silica fractions, and dissolved gas volatile pressures to observe how tectonic conduit dynamics yield effusive basaltic flows or cataclysmic Plinian explosions.
            </p>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="grid grid-cols-2 gap-3 shrink-0 bg-slate-900/80 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Explosivity</div>
              <div className="text-xl font-bold font-mono text-orange-400">VEI {estimatedVEI}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Ash Column</div>
              <div className="text-xl font-bold font-mono text-cyan-400">{plumeHeightKm} km</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Magma Temp</div>
              <div className="text-xl font-bold font-mono text-amber-400">{selectedVolcano.magmaTempC}°C</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Conduit Energy</div>
              <div className="text-xl font-bold font-mono text-rose-400">{computedExplosionEnergy}%</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-6 border-t border-slate-800/80 overflow-x-auto">
          {[
            { id: 'simulation', label: '🌋 Live Eruption Simulator' },
            { id: 'anatomy', label: '🔬 Magma & Conduit Anatomy' },
            { id: 'seismograph', label: '📈 Harmonic Seismograph' },
            { id: 'vei-scale', label: '📊 Global VEI Index' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-102'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN SIMULATION VIEWPORT */}
      {activeTab === 'simulation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Center Canvas Simulator Viewport (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl border border-slate-800 bg-[#07090e] overflow-hidden shadow-2xl group">
              <canvas 
                ref={canvasRef} 
                className="w-full h-[460px] block cursor-crosshair"
              />

              {/* In-Canvas HUD Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-lg bg-black/60 border border-slate-750 backdrop-blur-md text-xs font-mono text-orange-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  {selectedVolcano.name}
                </span>

                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-slate-750 backdrop-blur-md text-[11px] font-mono text-cyan-300">
                  Viscosity: {magmaViscosity}% (SiO₂: {selectedVolcano.silicaContent}%)
                </span>

                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-slate-750 backdrop-blur-md text-[11px] font-mono text-amber-300">
                  Plume: {plumeHeightKm} km
                </span>
              </div>

              {/* Bottom Canvas Controls Toolbar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsErupting(!isErupting)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                      isErupting 
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                    }`}
                  >
                    {isErupting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isErupting ? 'Pause Vent' : 'Trigger Eruption'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setChamberPressure(65);
                      setMagmaViscosity(60);
                      setDissolvedGas(75);
                    }}
                    className="p-2 rounded-lg bg-slate-850 hover:bg-slate-750 text-slate-300 text-xs flex items-center gap-1"
                    title="Reset parameters"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Glow & Visual Effect Customizer Controls */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">Glow Color:</span>
                  <div className="flex items-center gap-1.5">
                    {['#f97316', '#ef4444', '#eab308', '#a855f7', '#06b6d4'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setGlowColor(color)}
                        className={`w-5 h-5 rounded-full transition-transform ${
                          glowColor === color ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                        title={`Set aura glow: ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Volcano Classification Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VOLCANO_PROFILES.map((volcano) => {
                const isSelected = volcano.id === selectedVolcanoId;
                return (
                  <div
                    key={volcano.id}
                    onClick={() => {
                      setSelectedVolcanoId(volcano.id);
                      setMagmaViscosity(volcano.silicaContent);
                      if (volcano.id === 'shield') {
                        setDissolvedGas(20);
                        setChamberPressure(30);
                      } else if (volcano.id === 'stratovolcano') {
                        setDissolvedGas(75);
                        setChamberPressure(65);
                      } else if (volcano.id === 'cinder-cone') {
                        setDissolvedGas(50);
                        setChamberPressure(45);
                      } else {
                        setDissolvedGas(95);
                        setChamberPressure(90);
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-b from-orange-950/60 to-slate-900 border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-orange-400 uppercase tracking-wider">
                      VEI {volcano.explosivityIndex}
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors mt-0.5">
                      {volcano.name.split(' ')[0]}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {volcano.example.split(',')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Parameters Console (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0c1220]/90 backdrop-blur-md space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <SlidersIcon className="w-4 h-4 text-orange-400" />
                  <span>Thermodynamic Parameters</span>
                </h3>
                <span className="text-[10px] font-mono text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                  Real-time
                </span>
              </div>

              {/* Slider 1: Chamber Pressure */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-400" />
                    Chamber Magmostatic Pressure
                  </span>
                  <span className="font-mono text-orange-400 font-bold">{chamberPressure} MPa</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={chamberPressure}
                  onChange={(e) => setChamberPressure(Number(e.target.value))}
                  className="w-full accent-orange-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Lithostatic Quiescence</span>
                  <span>Supercritical Burst</span>
                </div>
              </div>

              {/* Slider 2: Magma Viscosity & Silica */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    Magma Viscosity (Silica Fraction)
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">{magmaViscosity}% SiO₂</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="80"
                  value={magmaViscosity}
                  onChange={(e) => setMagmaViscosity(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Basaltic (Runny)</span>
                  <span>Rhyolitic (Sticky)</span>
                </div>
              </div>

              {/* Slider 3: Dissolved Volatile Gas Fraction */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-amber-400" />
                    Dissolved Volatiles (H₂O, CO₂, SO₂)
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{dissolvedGas}% vol</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={dissolvedGas}
                  onChange={(e) => setDissolvedGas(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Degassed Lava</span>
                  <span>Explosive Froth</span>
                </div>
              </div>

              {/* Physical Analysis Card */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hydrodynamic Consequence:</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {magmaViscosity > 65 && dissolvedGas > 60
                    ? 'Catastrophic explosive fragmentation. High silica cross-links lock gases in place until overpressure violently pulverizes lava into pyroclastic ash and pumice.'
                    : magmaViscosity <= 52
                    ? 'Effusive ' + (selectedVolcano.id === 'shield' ? 'Pāhoehoe and ʻAʻā' : 'fluid') + ' lava fountains. Gases escape smoothly without building destructive supersonic pressure waves.'
                    : 'Strombolian intermittent blasts. Expanding volcanic gas bubbles burst at the surface, ejecting glowing incandescent cinders and basaltic bombs.'}
                </p>
              </div>

              {/* Chemical Breakdown Mini-Table */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-slate-850 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">LAVA VELOCITY</div>
                  <div className="text-white font-bold mt-0.5">
                    {magmaViscosity > 65 ? '0.02 - 0.5 m/h' : '15 - 45 km/h'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-850 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">PYROCLASTIC SURGE</div>
                  <div className="text-rose-400 font-bold mt-0.5">
                    {computedExplosionEnergy > 55 ? '> 300 km/h' : 'None detected'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Fact Banner */}
            <div className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/20 text-xs text-amber-200/90 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Did you know?</strong> Olympus Mons on Mars is a giant shield volcano reaching 21.9 km in height—nearly 2.5× the elevation of Mount Everest—due to low gravity and the absence of drifting tectonic plates.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANATOMY VIEWPORT TAB */}
      {activeTab === 'anatomy' && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl font-bold text-white">Internal Volcanic Anatomy & Magma Plumbing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Subterranean geological systems transport buoyant magma from Earth’s asthenosphere up through lithospheric fissures into shallow magma reservoirs before erupting at the surface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-950 border border-orange-500/40 flex items-center justify-center text-orange-400 font-mono font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-bold text-white">Magma Reservoir (Chamber)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Large underground pool of molten rock beneath the crust. Fractional crystallization occurs here as mineral crystals settle, altering residual magma silica content over millennia.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-500/40 flex items-center justify-center text-red-400 font-mono font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-bold text-white">Central Conduit (Throat) & Dikes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vertical cylindrical pipe through which ascending magma pushes. Lateral conduits branching outward form sub-surface sills and parasitic flank vents.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-950 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-mono font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Crater & Plinian Cloud</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Circular depression at the summit surrounding the central vent. Rapid decompression of dissolved gases at the vent accelerates the supersonic mixture of ash, lapilli, and pumice into the stratosphere.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HARMONIC SEISMOGRAPH VIEWPORT TAB */}
      {activeTab === 'seismograph' && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Real-Time Volcanic Harmonic Tremor Monitor</h3>
              <p className="text-xs text-slate-400">Continuous seismic vibration generated by subterranean magma resonance and fracture propagation</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Seismic Station SCI-04: Online
            </span>
          </div>

          <div className="h-44 w-full bg-[#05070c] rounded-xl border border-slate-800 p-4 flex items-center justify-center relative overflow-hidden">
            {/* Moving simulated waveform lines */}
            <div className="w-full h-full flex items-center">
              <svg className="w-full h-28 stroke-orange-400 fill-none" preserveAspectRatio="none" viewBox="0 0 500 100">
                <path
                  d="M 0 50 Q 25 20, 50 50 T 100 50 T 150 10 T 200 90 T 250 50 T 300 20 T 350 70 T 400 40 T 450 65 T 500 50"
                  strokeWidth="2.5"
                  className="animate-pulse"
                />
              </svg>
            </div>

            <div className="absolute bottom-2 right-4 text-[10px] font-mono text-slate-400">
              Sampling Rate: 100 Hz · Frequency Spectrum: 1.5 - 3.2 Hz Harmonic Tremor
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Tremor Amplitude</span>
              <div className="text-lg font-bold font-mono text-orange-400 mt-1">
                {(computedExplosionEnergy * 0.12).toFixed(2)} μm/s
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">SO₂ Degassing Flux</span>
              <div className="text-lg font-bold font-mono text-amber-400 mt-1">
                {(dissolvedGas * 85).toLocaleString()} tonnes/day
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Ground Tilt Deformation</span>
              <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                +{(chamberPressure * 0.45).toFixed(1)} μrad (Inflation)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VEI INDEX SCALE TABLE */}
      {activeTab === 'vei-scale' && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c1220] space-y-4">
          <h3 className="text-xl font-bold text-white">Volcanic Explosivity Index (VEI)</h3>
          <p className="text-xs text-slate-300">
            Devised by Chris Newhall and Stephen Self in 1982, the logarithmic VEI scale classifies eruptions by volume of tephra ejecta and plume cloud height.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-2.5 px-3">VEI</th>
                  <th className="py-2.5 px-3">Classification</th>
                  <th className="py-2.5 px-3">Plume Height</th>
                  <th className="py-2.5 px-3">Ejecta Volume</th>
                  <th className="py-2.5 px-3">Historical Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {[
                  { vei: '0', name: 'Hawaiian', plume: '< 100 m', vol: '< 10,000 m³', ex: 'Kilauea' },
                  { vei: '1', name: 'Strombolian', plume: '100 m - 1 km', vol: '> 10,000 m³', ex: 'Stromboli' },
                  { vei: '2', name: 'Vulcanian', plume: '1 - 5 km', vol: '> 1,000,000 m³', ex: 'Galeras (1993)' },
                  { vei: '3', name: 'Sub-Plinian', plume: '3 - 15 km', vol: '> 10,000,000 m³', ex: 'Nevado del Ruiz (1985)' },
                  { vei: '4', name: 'Plinian', plume: '10 - 25 km', vol: '> 0.1 km³', ex: 'Eyjafjallajökull (2010)' },
                  { vei: '5', name: 'Plinian', plume: '> 25 km', vol: '> 1 km³', ex: 'Mount St. Helens (1980)' },
                  { vei: '6', name: 'Colossal', plume: '> 30 km', vol: '> 10 km³', ex: 'Krakatoa (1883), Pinatubo (1991)' },
                  { vei: '7', name: 'Super-Colossal', plume: '> 35 km', vol: '> 100 km³', ex: 'Tambora (1815)' },
                  { vei: '8', name: 'Mega-Colossal', plume: '> 45 km', vol: '> 1,000 km³', ex: 'Yellowstone, Toba (74,000 BP)' }
                ].map((row) => (
                  <tr 
                    key={row.vei}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      String(estimatedVEI) === row.vei ? 'bg-orange-950/40 text-orange-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-orange-400">VEI {row.vei}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold">{row.name}</td>
                    <td className="py-2.5 px-3">{row.plume}</td>
                    <td className="py-2.5 px-3">{row.vol}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">{row.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function SlidersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
}

