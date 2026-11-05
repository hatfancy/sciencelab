import React, { useState } from 'react';
import { Zap, Activity, ShieldAlert, RotateCcw, Power } from 'lucide-react';

export const ElectricityLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'circuit-sandbox' | 'series-parallel' | 'electromagnet'>('circuit-sandbox');

  // Circuit Sandbox State
  const [voltage, setVoltage] = useState<number>(12); // 12 Volts
  const [resistance, setResistance] = useState<number>(6); // 6 Ohms
  const [isSwitchClosed, setIsSwitchClosed] = useState<boolean>(true);
  const [showElectronDrift, setShowElectronDrift] = useState<boolean>(true);

  // Series vs Parallel State
  const [circuitType, setCircuitType] = useState<'series' | 'parallel'>('series');
  const [r1, setR1] = useState<number>(4);
  const [r2, setR2] = useState<number>(4);

  // Ohm's Law computations
  const current = isSwitchClosed && resistance > 0 ? Number((voltage / resistance).toFixed(2)) : 0;
  const powerWatts = Number((voltage * current).toFixed(2));
  const bulbBrightnessPct = Math.min(100, Math.round((powerWatts / 50) * 100));

  // Series vs Parallel computations
  const rEq = circuitType === 'series' ? r1 + r2 : Number(((r1 * r2) / (r1 + r2)).toFixed(2));
  const totalCircuitCurrent = Number((12 / rEq).toFixed(2));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-300" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Electricity & Magnetism Laboratory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate virtual electrical circuits, verify Ohm's law, analyze series vs parallel topologies, and explore electron drift.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('circuit-sandbox')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'circuit-sandbox' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ohm's Law Circuit Sandbox
          </button>
          <button
            onClick={() => setActiveTab('series-parallel')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'series-parallel' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Series vs Parallel Analysis
          </button>
          <button
            onClick={() => setActiveTab('electromagnet')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'electromagnet' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Electromagnetism & Induction
          </button>
        </div>
      </div>

      {/* TAB 1: CIRCUIT SANDBOX */}
      {activeTab === 'circuit-sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Column */}
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-5 text-xs">
            <h3 className="font-mono uppercase text-amber-400 font-bold text-sm">
              Circuit Components Controls
            </h3>

            {/* Voltage Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>DC Voltage Source ($V$):</span>
                <span className="font-mono text-cyan-400 font-bold">{voltage} Volts</span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
              />
            </div>

            {/* Resistance Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Load Resistance ($R$):</span>
                <span className="font-mono text-cyan-400 font-bold">{resistance} Ohms (Ω)</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
              />
            </div>

            {/* Switch Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Circuit Knife Switch:</span>
              <button
                onClick={() => setIsSwitchClosed(!isSwitchClosed)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  isSwitchClosed ? 'bg-emerald-600 text-white' : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isSwitchClosed ? 'Closed (Conducting)' : 'Open (Broken)'}</span>
              </button>
            </div>

            {/* Electrical Safety Note */}
            <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-600/40 text-[11px] text-amber-200 leading-relaxed">
              <strong>Electrical Safety Principle:</strong> Voltage pushes current; current ($I$) causes tissue shock and thermal heating ($P = I^2 R$). High-voltage equipment and mains power (120V/240V AC) can deliver lethal currents through the human body.
            </div>
          </div>

          {/* Interactive Circuit Schematic Stage */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#07090e] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase text-slate-400">Virtual Circuit Schematic</span>
              <span className="font-mono text-cyan-400">
                {isSwitchClosed ? `Conducting · Power: ${powerWatts} Watts` : 'Circuit Interrupted (0 Current)'}
              </span>
            </div>

            {/* SVG Interactive Circuit Layout */}
            <div className="flex items-center justify-center py-4">
              <svg viewBox="0 0 400 220" className="w-full max-w-md h-52">
                {/* Rectangular Circuit Wire */}
                <rect 
                  x="50" y="30" width="300" height="160" rx="8" 
                  fill="none" 
                  stroke={isSwitchClosed ? '#38bdf8' : '#475569'} 
                  strokeWidth="3" 
                  strokeDasharray={isSwitchClosed ? '8 6' : 'none'}
                />

                {/* Battery Source (Left) */}
                <rect x="35" y="90" width="30" height="40" fill="#0c1220" />
                <line x1="50" y1="95" x2="50" y2="125" stroke="#ffffff" strokeWidth="4" />
                <line x1="50" y1="102" x2="50" y2="118" stroke="#ef4444" strokeWidth="6" />
                <text x="25" y="115" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">{voltage}V</text>

                {/* Resistor (Bottom) */}
                <rect x="160" y="180" width="80" height="20" fill="#0c1220" />
                <path d="M 160 190 L 170 183 L 180 197 L 190 183 L 200 197 L 210 183 L 220 197 L 230 183 L 240 190" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="200" y="215" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="monospace">{resistance} Ω</text>

                {/* Light Bulb (Top) */}
                <circle cx="200" cy="30" r="22" fill="#0c1220" stroke={isSwitchClosed ? '#fbbf24' : '#475569'} strokeWidth="2" />
                {isSwitchClosed && (
                  <circle cx="200" cy="30" r="16" fill="#fef08a" opacity={bulbBrightnessPct / 100} className="filter drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
                )}
                <path d="M 193 25 L 207 35 M 193 35 L 207 25" stroke="#ffffff" strokeWidth="2" />
                <text x="200" y="8" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Bulb ({bulbBrightnessPct}%)</text>

                {/* Switch (Right) */}
                <rect x="340" y="95" width="20" height="30" fill="#0c1220" />
                <line x1="350" y1="90" x2={isSwitchClosed ? '350' : '362'} y2={isSwitchClosed ? '130' : '110'} stroke={isSwitchClosed ? '#22c55e' : '#ef4444'} strokeWidth="3" />
                <text x="375" y="115" fill="#94a3b8" fontSize="10" fontFamily="monospace">{isSwitchClosed ? 'ON' : 'OFF'}</text>
              </svg>
            </div>

            {/* Digital Multimeter Readings Grid */}
            <div className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Voltage (V)</span>
                <span className="text-xl font-bold text-cyan-400">{voltage} V</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Current (I = V/R)</span>
                <span className="text-xl font-bold text-white">{current} A</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Power (P = V·I)</span>
                <span className="text-xl font-bold text-amber-400">{powerWatts} W</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERIES VS PARALLEL */}
      {activeTab === 'series-parallel' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Series vs Parallel Circuit Topologies</h3>
              <p className="text-slate-400">
                In series, current is constant and resistances add up (R_eq = R1 + R2). In parallel, voltage is constant and equivalent resistance drops (1/R_eq = 1/R1 + 1/R2).
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setCircuitType('series')}
                className={`px-3 py-1.5 rounded font-mono uppercase transition-colors ${
                  circuitType === 'series' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Series
              </button>
              <button
                onClick={() => setCircuitType('parallel')}
                className={`px-3 py-1.5 rounded font-mono uppercase transition-colors ${
                  circuitType === 'parallel' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Parallel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3 font-mono">
              <span className="text-cyan-400 font-bold block uppercase text-xs">12V Power Source with Two Resistors</span>
              
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Resistor 1 (R1):</span>
                <span className="text-white font-bold">{r1} Ω</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Resistor 2 (R2):</span>
                <span className="text-white font-bold">{r2} Ω</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Equivalent Resistance (R_eq):</span>
                <span className="text-amber-300 font-bold">{rEq} Ω</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Total Battery Current (I):</span>
                <span className="text-cyan-400 font-bold">{totalCircuitCurrent} Amperes</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-2 leading-relaxed text-slate-300">
              <h4 className="font-bold text-white uppercase font-mono">Topological Trade-offs:</h4>
              <p>
                {circuitType === 'series'
                  ? 'In a series circuit, if one bulb burns out or is removed, the entire loop opens and all components shut off (like old holiday string lights). Each added component increases total resistance, reducing current.'
                  : 'In a parallel circuit, every branch receives full supply voltage (12V) independently. If one appliance or bulb turns off, the other branches continue operating unaffected, which is why all household building circuits are wired in parallel.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ELECTROMAGNETISM */}
      {activeTab === 'electromagnet' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4 text-xs leading-relaxed text-slate-300">
          <h3 className="text-lg font-bold text-white">Electromagnetism & Faraday's Law</h3>
          <p>
            In 1820, Hans Christian Ørsted discovered that an electric current creates a circular magnetic field around its wire (B = μ₀ · I / (2π · r)). Coiling wire into a solenoid concentrates this field; inserting a ferromagnetic iron core multiplies the magnetic flux by thousands of times.
          </p>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-cyan-300">
            Faraday's Law of Induction: ℰ = -N · (dΦ_B / dt). Changing magnetic flux induces electric voltage, powering every generator and wind turbine on planet Earth.
          </div>
        </div>
      )}
    </div>
  );
};
