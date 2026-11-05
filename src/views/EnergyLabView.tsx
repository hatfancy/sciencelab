import React, { useState, useRef, useEffect } from 'react';
import { Flame, ShieldAlert, Sparkles, Check, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

export const EnergyLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fire-triangle' | 'combustion-types' | 'heat-transfer' | 'engine-cycle'>('fire-triangle');

  // Fire Triangle State
  const [hasFuel, setHasFuel] = useState<boolean>(true);
  const [hasHeat, setHasHeat] = useState<boolean>(true);
  const [hasOxygen, setHasOxygen] = useState<boolean>(true);

  // 4-Stroke Engine State
  const [engineStroke, setEngineStroke] = useState<number>(0); // 0: Intake, 1: Compression, 2: Power, 3: Exhaust
  const [isEngineRunning, setIsEngineRunning] = useState<boolean>(true);

  // Engine automatic cycle timer
  useEffect(() => {
    let timer: any;
    if (isEngineRunning && activeTab === 'engine-cycle') {
      timer = setInterval(() => {
        setEngineStroke((prev) => (prev + 1) % 4);
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isEngineRunning, activeTab]);

  const isFireBurning = hasFuel && hasHeat && hasOxygen;

  const strokeDetails = [
    { name: '1. Intake Stroke', desc: 'Piston moves downward, drawing fresh air-fuel mixture into the cylinder through the open intake valve.' },
    { name: '2. Compression Stroke', desc: 'Both valves close. Piston moves upward, compressing the mixture and dramatically raising temperature and pressure.' },
    { name: '3. Power (Combustion) Stroke', desc: 'Spark plug fires, igniting compressed fuel. Expanding hot gases drive the piston downward with immense mechanical work.' },
    { name: '4. Exhaust Stroke', desc: 'Exhaust valve opens. Piston moves upward, sweeping burnt combustion gases out of the cylinder.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Combustion & Energy Laboratory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore the Fire Triangle, exothermic reaction enthalpies, complete vs incomplete combustion, and thermodynamic engines.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('fire-triangle')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'fire-triangle' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            The Fire Triangle
          </button>
          <button
            onClick={() => setActiveTab('combustion-types')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'combustion-types' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Complete vs Incomplete
          </button>
          <button
            onClick={() => setActiveTab('heat-transfer')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'heat-transfer' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Heat Transfer Modes
          </button>
          <button
            onClick={() => setActiveTab('engine-cycle')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'engine-cycle' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            4-Stroke Heat Engine
          </button>
        </div>
      </div>

      {/* TAB 1: THE FIRE TRIANGLE */}
      {activeTab === 'fire-triangle' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Triangle Controls */}
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4 text-xs">
            <h3 className="font-mono uppercase text-amber-400 font-bold text-sm">
              Combustion Preconditions
            </h3>
            <p className="text-slate-400">
              Combustion is a self-sustaining chain reaction requiring three simultaneous inputs. Toggle any element to observe the outcome.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setHasFuel(!hasFuel)}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                  hasFuel ? 'bg-amber-950/60 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <div>
                  <span className="font-bold text-white block">1. Combustible Fuel</span>
                  <span className="text-[11px] text-slate-400">Hydrocarbon gas, wood, liquid alcohol</span>
                </div>
                <span className="font-mono text-xs font-bold">{hasFuel ? 'PRESENT' : 'REMOVED'}</span>
              </button>

              <button
                onClick={() => setHasHeat(!hasHeat)}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                  hasHeat ? 'bg-rose-950/60 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <div>
                  <span className="font-bold text-white block">2. Heat (Activation Energy)</span>
                  <span className="text-[11px] text-slate-400">Threshold ignition temperature ($E_a$)</span>
                </div>
                <span className="font-mono text-xs font-bold">{hasHeat ? 'PRESENT' : 'REMOVED'}</span>
              </button>

              <button
                onClick={() => setHasOxygen(!hasOxygen)}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                  hasOxygen ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <div>
                  <span className="font-bold text-white block">3. Oxidizer (Oxygen)</span>
                  <span className="text-[11px] text-slate-400">Atmospheric O₂ (over 16% concentration)</span>
                </div>
                <span className="font-mono text-xs font-bold">{hasOxygen ? 'PRESENT' : 'REMOVED'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setHasFuel(true);
                setHasHeat(true);
                setHasOxygen(true);
              }}
              className="w-full mt-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
            >
              Reset All Three Factors
            </button>
          </div>

          {/* Visual Flame Chamber & Analysis */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#07090e] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase text-slate-400">Combustion Chamber Status</span>
              <span className={`font-mono font-bold ${isFireBurning ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`}>
                {isFireBurning ? 'ACTIVE FLAME PROPAGATING' : 'EXTINGUISHED (SAFE)'}
              </span>
            </div>

            {/* Visual Flame graphic */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${
                isFireBurning ? 'bg-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.5)]' : 'bg-slate-900/50'
              }`}>
                <Flame className={`w-16 h-16 transition-all ${
                  isFireBurning ? 'text-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]' : 'text-slate-700 scale-90'
                }`} />
              </div>

              <div className="mt-4 font-mono text-sm text-center">
                {isFireBurning ? (
                  <span className="text-amber-300 font-bold">
                    Exothermic Redox Active: CH₄ + 2O₂ → CO₂ + 2H₂O + 891 kJ
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Reaction Halted: {!hasFuel ? 'No Fuel Source' : !hasHeat ? 'Below Activation Temperature (Cooled)' : 'Smothered (Oxygen Deprived)'}
                  </span>
                )}
              </div>
            </div>

            {/* Fire Safety Extinguishment Principles */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs space-y-2">
              <h5 className="font-bold text-white">How Modern Firefighting Exploits the Triangle:</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>Removing Heat:</strong> Water spray cools burning material below its flash point ($E_a$) via high latent heat of vaporization (2,260 kJ/kg).</li>
                <li><strong>Removing Oxygen:</strong> Carbon dioxide ($CO_2$) or foam extinguishers blanket the burning material, depriving it of oxygen.</li>
                <li><strong>Removing Fuel:</strong> Firebreaks in forestry clear vegetation ahead of advancing wildfires to starve the front.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPLETE VS INCOMPLETE COMBUSTION */}
      {activeTab === 'combustion-types' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Complete Combustion */}
          <div className="p-6 rounded-xl border border-cyan-800/40 bg-[#0c1220] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-cyan-400 uppercase font-bold text-[10px]">Excess Oxygen Supply</span>
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>

            <h3 className="text-base font-bold text-white">Complete Combustion (Clean Blue Flame)</h3>
            <div className="p-3 bg-slate-950 rounded font-mono text-cyan-300 border border-slate-800">
              CH₄ (g) + 2 O₂ (g) → CO₂ (g) + 2 H₂O (g) + ΔH
            </div>

            <p className="text-slate-300 leading-relaxed">
              When oxygen is abundant, all carbon atoms fully oxidize into harmless carbon dioxide (CO₂) and water vapor. The flame burns with a pale blue color at high temperatures (~1,900°C), producing zero black soot particulates and maximum energy release per mole.
            </p>
          </div>

          {/* Incomplete Combustion */}
          <div className="p-6 rounded-xl border border-amber-800/40 bg-[#0c1220] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-amber-400 uppercase font-bold text-[10px]">Restricted Oxygen Supply</span>
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            </div>

            <h3 className="text-base font-bold text-white">Incomplete Combustion (Lethal Hazard)</h3>
            <div className="p-3 bg-slate-950 rounded font-mono text-amber-300 border border-slate-800">
              4 CH₄ + 5 O₂ → 2 CO (g) + 2 C (s) + 8 H₂O + Less Heat
            </div>

            <p className="text-slate-300 leading-relaxed">
              When oxygen supply is restricted, incomplete combustion produces <strong>Carbon Monoxide (CO)</strong>—a colorless, odorless, highly lethal toxic gas that binds irreversibly to blood hemoglobin—and unburnt glowing carbon soot ($C$) which gives the flame a yellow color at lower efficiency.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: HEAT TRANSFER */}
      {activeTab === 'heat-transfer' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
            <span className="font-mono uppercase text-amber-400 font-bold">1. Conduction</span>
            <h4 className="text-sm font-bold text-white">Direct Molecular Collisions</h4>
            <p className="text-slate-300 leading-relaxed">
              Thermal kinetic energy transfers directly through physical contact from high-energy vibrating atoms to adjacent lower-energy atoms without moving the bulk material.
            </p>
            <span className="text-[11px] text-slate-400 block font-mono">Example: Metal frying pan handle heating up.</span>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
            <span className="font-mono uppercase text-cyan-400 font-bold">2. Convection</span>
            <h4 className="text-sm font-bold text-white">Bulk Fluid Circulation</h4>
            <p className="text-slate-300 leading-relaxed">
              Heated liquid or gas expands, becomes less dense, and floats upward under buoyant forces, while cooler denser fluid sinks to replace it, setting up convection currents.
            </p>
            <span className="text-[11px] text-slate-400 block font-mono">Example: Boiling water bubbling; planetary mantle currents.</span>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
            <span className="font-mono uppercase text-violet-400 font-bold">3. Radiation</span>
            <h4 className="text-sm font-bold text-white">Electromagnetic Photons</h4>
            <p className="text-slate-300 leading-relaxed">
              Energy emitted as infrared and optical electromagnetic waves by vibrating charged particles. Operates freely across the total vacuum of empty space without any medium.
            </p>
            <span className="text-[11px] text-slate-400 block font-mono">Example: Sunlight warming the surface of Earth across 150M km.</span>
          </div>
        </div>
      )}

      {/* TAB 4: 4-STROKE ENGINE DEMONSTRATOR */}
      {activeTab === 'engine-cycle' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">4-Stroke Internal Combustion Heat Engine</h3>
              <p className="text-xs text-slate-400">
                Converting chemical energy into heat, high pressure, and mechanical rotational torque via the Otto cycle.
              </p>
            </div>
            <button
              onClick={() => setIsEngineRunning(!isEngineRunning)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                isEngineRunning ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {isEngineRunning ? 'Cycle Running (Auto)' : 'Cycle Paused'}
            </button>
          </div>

          {/* 4 Strokes Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {strokeDetails.map((st, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setEngineStroke(idx);
                  setIsEngineRunning(false);
                }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  engineStroke === idx
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200 ring-2 ring-amber-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span className="font-bold block text-white">{st.name}</span>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-3">{st.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
