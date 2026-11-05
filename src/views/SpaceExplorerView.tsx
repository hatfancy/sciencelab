import React, { useState, useRef, useEffect } from 'react';
import { 
  Orbit, Compass, Globe, Info, ZoomIn, ZoomOut, ArrowRight, 
  Sparkles, Layers, Moon, Sun, ShieldAlert, Award
} from 'lucide-react';
import { PLANETS_DATA, calculateWeightOnBody } from '../data/planetsData';
import { PlanetData } from '../types/science';

interface SpaceExplorerViewProps {
  initialPlanetId?: string;
}

export const SpaceExplorerView: React.FC<SpaceExplorerViewProps> = ({ initialPlanetId }) => {
  const [activeTab, setActiveTab] = useState<'solar-system' | 'gravity-playground' | 'scale-universe' | 'lunar-phases'>('solar-system');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData>(
    PLANETS_DATA.find((p) => p.id === initialPlanetId) || PLANETS_DATA[3] // Default Earth
  );

  // Gravity Playground State
  const [userMassKg, setUserMassKg] = useState<number>(70); // 70 kg

  // Scale of the Universe State
  const [scaleExponent, setScaleExponent] = useState<number>(0); // 10^0 = 1 meter (Human scale)

  // Solar System Canvas Animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== 'solar-system') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 420);

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw Sun at center with coronal glow
      const sunGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 35);
      sunGrad.addColorStop(0, '#fef08a');
      sunGrad.addColorStop(0.4, '#f59e0b');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Central core of Sun
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Scaled orbits for display (Mercury through Neptune)
      const orbitRadii = [35, 55, 80, 110, 150, 185, 220, 255];
      const planetsInOrbit = PLANETS_DATA.filter((p) => p.type !== 'star' && p.type !== 'moon' && p.id !== 'pluto');

      planetsInOrbit.forEach((planet, idx) => {
        const radius = orbitRadii[idx] || 100;
        const speed = (1 / Math.sqrt(radius)) * 0.45;
        const angle = t * speed;

        // Draw orbit track ring
        ctx.strokeStyle = planet.id === selectedPlanet.id ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = planet.id === selectedPlanet.id ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Planet coordinate
        const px = centerX + Math.cos(angle) * radius;
        const py = centerY + Math.sin(angle) * radius;

        // Draw Planet Body
        ctx.fillStyle = planet.color;
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = planet.id === selectedPlanet.id ? 10 : 3;
        ctx.beginPath();
        const pSize = Math.max(3, Math.min(8, planet.radiusKm / 10000 + 2));
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label if selected
        if (planet.id === selectedPlanet.id) {
          ctx.font = '10px monospace';
          ctx.fillStyle = '#22d3ee';
          ctx.fillText(planet.name, px + 8, py - 4);
        }
      });

      t += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeTab, selectedPlanet]);

  // Scale of the universe benchmark levels
  const scaleLevels = [
    { exp: -18, name: 'Quarks & Electron Bounds', desc: 'Fundamental subatomic particles in the Standard Model ($10^{-18}$ m).' },
    { exp: -15, name: 'Atomic Nucleus', desc: 'Protons and neutrons packed together via the Strong Nuclear Force ($10^{-15}$ m).' },
    { exp: -10, name: 'Atom Diameter (Angstrom)', desc: 'The typical diameter of a neutral Hydrogen atom ($10^{-10}$ m).' },
    { exp: -9, name: 'DNA Double Helix Width', desc: 'Width of a double-stranded DNA molecule ($2 \\times 10^{-9}$ m).' },
    { exp: -6, name: 'Human Red Blood Cell', desc: 'Erythrocyte transporting oxygen through capillaries ($6–8 \\times 10^{-6}$ m).' },
    { exp: -3, name: 'Grain of Sand', desc: 'Coarse quartz sand grain visible to the naked human eye ($10^{-3}$ m).' },
    { exp: 0, name: 'Human Being', desc: 'Everyday human scale: 1 to 2 meters ($10^0$ m).' },
    { exp: 3, name: 'Mountain Altitude / City Scale', desc: 'Mount Everest peak reaches 8,848 meters ($10^3$ m).' },
    { exp: 7, name: 'Earth Diameter', desc: 'Earth mean radius is 6,371 km ($1.27 \\times 10^7$ m).' },
    { exp: 9, name: 'The Sun Diameter', desc: 'Diameter of our host star is 1,392,700 km ($1.39 \\times 10^9$ m).' },
    { exp: 11, name: 'Earth-Sun Distance (1 AU)', desc: '1 Astronomical Unit: 149.6 million km ($1.49 \\times 10^{11}$ m).' },
    { exp: 13, name: 'Solar System Planetary Orbit Bounds', desc: 'Distance out to Neptune and Kuiper belt ($10^{13}$ m).' },
    { exp: 16, name: 'One Light Year (Distance Light Travels in 1 Year)', desc: '9.46 trillion kilometers ($9.46 \\times 10^{15}$ m).' },
    { exp: 21, name: 'Milky Way Galaxy Diameter', desc: 'Barred spiral galaxy spanning ~100,000 light-years ($10^{21}$ m).' },
    { exp: 26, name: 'The Observable Universe', desc: 'Cosmic particle horizon: 93 billion light-years in diameter ($8.8 \\times 10^{26}$ m).' }
  ];

  const currentScaleObj = scaleLevels.find((s) => s.exp === scaleExponent) || scaleLevels[6];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Orbit className="w-6 h-6 text-violet-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The Space Explorer
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Navigate the Solar System, compute your weight across celestial gravities, and zoom through the scale of the universe.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('solar-system')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'solar-system' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Solar System & Planets
          </button>
          <button
            onClick={() => setActiveTab('gravity-playground')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'gravity-playground' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gravity Playground
          </button>
          <button
            onClick={() => setActiveTab('scale-universe')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'scale-universe' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Scale of the Universe
          </button>
          <button
            onClick={() => setActiveTab('lunar-phases')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'lunar-phases' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lunar Phases & Eclipses
          </button>
        </div>
      </div>

      {/* TAB 1: SOLAR SYSTEM & PLANETARY EXPLORER */}
      {activeTab === 'solar-system' && (
        <div className="space-y-6">
          {/* Planet Selector Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto p-2 bg-[#0c1220] border border-slate-800 rounded-xl">
            {PLANETS_DATA.map((p) => {
              const isSelected = selectedPlanet.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanet(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Animated Solar System Canvas */}
            <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#07090e] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase text-slate-400">
                  Solar System Orbital Map (Illustrative Proportions)
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  Focused: {selectedPlanet.name}
                </span>
              </div>

              <div className="w-full flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-80" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-850 pt-3">
                <span>Keplerian orbital periods calculated from distance: $T^2 \propto a^3$</span>
                <span className="font-mono text-violet-400">Speed: {selectedPlanet.orbitalSpeedKmS} km/s</span>
              </div>
            </div>

            {/* Selected Celestial Body Data Card */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                      {selectedPlanet.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedPlanet.distanceFromSunAU > 0 ? `${selectedPlanet.distanceFromSunAU} AU from Sun` : 'Star System Center'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedPlanet.name}</h3>
                </div>

                <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center" style={{ backgroundColor: `${selectedPlanet.color}20` }}>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedPlanet.color }} />
                </div>
              </div>

              {/* Physical Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono uppercase">Mean Radius</span>
                  <span className="font-semibold text-white font-mono">{selectedPlanet.radiusKm.toLocaleString()} km</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono uppercase">Surface Gravity</span>
                  <span className="font-semibold text-cyan-300 font-mono">{selectedPlanet.gravityMps2} m/s² ({(selectedPlanet.gravityMps2 / 9.807).toFixed(2)}g)</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono uppercase">Orbital Period</span>
                  <span className="font-semibold text-white font-mono">{selectedPlanet.orbitalPeriodDays} Earth Days</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] font-mono uppercase">Average Temp</span>
                  <span className="font-semibold text-amber-300 font-mono">{selectedPlanet.averageTempC}°C</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 col-span-2">
                  <span className="text-slate-400 block text-[10px] font-mono uppercase">Known Moons</span>
                  <span className="font-semibold text-slate-200 font-mono">{selectedPlanet.moonsCount} natural satellites</span>
                </div>
              </div>

              {/* Surface Characteristics */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-slate-400">Surface Geology & Atmosphere</span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  {selectedPlanet.surfaceFeatures}
                </p>
              </div>

              {/* Exploration History */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-slate-400">Space Exploration History</span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  {selectedPlanet.explorationHistory}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GRAVITY PLAYGROUND */}
      {activeTab === 'gravity-playground' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">The Gravity Playground: Mass vs Weight</h3>
            <p className="text-xs text-slate-400">
              Your <strong>mass</strong> is the intrinsic amount of matter in your body and never changes. Your <strong>weight</strong> is the gravitational downward force ($W = m \cdot g$) exerted on that mass by a planet.
            </p>
          </div>

          {/* Mass Input Slider */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 max-w-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Your Mass on Earth:</span>
              <span className="font-mono text-cyan-400 font-bold text-sm">{userMassKg} kg</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              value={userMassKg}
              onChange={(e) => setUserMassKg(Number(e.target.value))}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Earth Weight: {(userMassKg * 9.807).toFixed(1)} N</span>
              <span>Mass is constant across the universe</span>
            </div>
          </div>

          {/* Grid of Celestial Bodies Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {PLANETS_DATA.map((planet) => {
              const { weightN, relativeWeightKg } = calculateWeightOnBody(userMassKg, planet.id);
              const isHeavy = relativeWeightKg > userMassKg * 1.5;
              const isLight = relativeWeightKg < userMassKg * 0.5;

              return (
                <div
                  key={planet.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{planet.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{planet.gravityMps2} m/s²</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 capitalize">{planet.type}</span>
                  </div>

                  <div className="space-y-1 border-t border-slate-800 pt-2 font-mono">
                    <div className="text-xl font-extrabold text-cyan-300">
                      {relativeWeightKg} kg
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {weightN} Newtons force
                    </div>
                  </div>

                  <div className={`text-[10px] px-2 py-1 rounded font-mono ${
                    isHeavy ? 'bg-amber-950/60 text-amber-300' : isLight ? 'bg-emerald-950/60 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isHeavy ? 'Crushing Gravity' : isLight ? 'High Leaping Ability' : 'Near-Earth Norm'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SCALE OF THE UNIVERSE */}
      {activeTab === 'scale-universe' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">The Scale of the Observable Universe</h3>
            <p className="text-xs text-slate-400">
              Drag the logarithmic slider to zoom across 44 orders of magnitude—from fundamental subatomic quarks (10⁻¹⁸ meters) to the entire observable cosmic horizon (10²⁶ meters).
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Logarithmic Scale:</span>
              <span className="font-mono text-cyan-400 font-bold text-base">10^{scaleExponent} meters</span>
            </div>

            <input
              type="range"
              min="-18"
              max="26"
              value={scaleExponent}
              onChange={(e) => setScaleExponent(Number(e.target.value))}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>10⁻¹⁸ m (Quarks)</span>
              <span>10⁰ m (Human Body)</span>
              <span>10²⁶ m (Cosmos)</span>
            </div>
          </div>

          {/* Active Scale Realm Display */}
          <div className="p-6 rounded-xl border border-cyan-800/40 bg-gradient-to-r from-cyan-950/30 to-violet-950/30 space-y-2">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">
              Realm: Order 10^{currentScaleObj.exp} m
            </span>
            <h4 className="text-xl font-bold text-white">{currentScaleObj.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{currentScaleObj.desc}</p>
          </div>

          {/* Quick Jump Buttons */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-mono uppercase">Quick Scale Jump:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {scaleLevels.map((lvl) => (
                <button
                  key={lvl.exp}
                  onClick={() => setScaleExponent(lvl.exp)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    scaleExponent === lvl.exp
                      ? 'bg-cyan-600 border-cyan-500 text-white font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {lvl.name} (10^{lvl.exp}m)
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LUNAR PHASES & ECLIPSES */}
      {activeTab === 'lunar-phases' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Lunar Phases & Celestial Eclipses</h3>
            <p className="text-xs text-slate-400">
              The Moon does not emit its own visible light; it shines by reflecting sunlight. As the Moon orbits Earth every 27.3 days, the fraction of its illuminated hemisphere visible from Earth continuously shifts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 text-center text-xs">
            {[
              { phase: 'New Moon', icon: '🌑', illum: '0%' },
              { phase: 'Waxing Crescent', icon: '🌒', illum: '25%' },
              { phase: 'First Quarter', icon: '🌓', illum: '50%' },
              { phase: 'Waxing Gibbous', icon: '🌔', illum: '75%' },
              { phase: 'Full Moon', icon: '🌕', illum: '100%' },
              { phase: 'Waning Gibbous', icon: '🌖', illum: '75%' },
              { phase: 'Third Quarter', icon: '🌗', illum: '50%' },
              { phase: 'Waning Crescent', icon: '🌘', illum: '25%' }
            ].map((p, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-2">
                <span className="text-3xl block">{p.icon}</span>
                <span className="font-semibold text-slate-200 block text-[11px]">{p.phase}</span>
                <span className="text-[10px] font-mono text-cyan-400">{p.illum} Visible</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2 text-xs">
              <h4 className="font-bold text-white">Solar Eclipse Geometry</h4>
              <p className="text-slate-300 leading-relaxed">
                Occurs during a <strong>New Moon</strong> when the Moon passes directly between the Sun and Earth, casting its dark umbral shadow onto Earth’s surface. Total solar eclipses are possible only because the Sun is ~400 times larger than the Moon, but also ~400 times farther away, giving them virtually identical angular sizes in our sky.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2 text-xs">
              <h4 className="font-bold text-white">Lunar Eclipse Geometry</h4>
              <p className="text-slate-300 leading-relaxed">
                Occurs during a <strong>Full Moon</strong> when Earth passes directly between the Sun and Moon, casting Earth’s shadow across the lunar surface. The Moon turns blood-red during totality because Rayleigh scattering strips blue light from sunlight passing through Earth’s atmospheric ring, leaving only red wavelengths to illuminate the lunar regolith.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
