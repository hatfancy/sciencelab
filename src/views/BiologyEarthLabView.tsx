import React, { useState } from 'react';
import { HeartPulse, Mountain, Cog, Radio, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';

export const BiologyEarthLabView: React.FC = () => {
  const [activeSubLab, setActiveSubLab] = useState<'biology' | 'earth' | 'machines' | 'waves'>('biology');

  // Biology Cell Explorer State
  const [selectedCellType, setSelectedCellType] = useState<'animal' | 'plant'>('animal');
  const [selectedOrganelle, setSelectedOrganelle] = useState<string>('mitochondria');

  // DNA Base Pairing State
  const [activeDnaBase, setActiveDnaBase] = useState<'A' | 'T' | 'C' | 'G'>('A');

  // Earth Tectonic State
  const [plateBoundaryType, setPlateBoundaryType] = useState<'convergent' | 'divergent' | 'transform'>('convergent');

  // Engineering Simple Machines State
  const [leverEffortArm, setLeverEffortArm] = useState<number>(3); // 3 meters
  const [leverLoadArm, setLeverLoadArm] = useState<number>(1); // 1 meter
  const [loadMassKg, setLoadMassKg] = useState<number>(120); // 120 kg

  // Sound & Wave Generator State
  const [waveFrequencyHz, setWaveFrequencyHz] = useState<number>(440); // 440 Hz (Concert A)
  const [isAudioTonePlaying, setIsAudioTonePlaying] = useState<boolean>(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const oscRef = React.useRef<OscillatorNode | null>(null);

  // Optical Snell's law refraction
  const [n1, setN1] = useState<number>(1.0); // Air
  const [n2, setN2] = useState<number>(1.5); // Glass
  const [incidentAngleDeg, setIncidentAngleDeg] = useState<number>(45);

  const leverMA = Number((leverEffortArm / leverLoadArm).toFixed(2));
  const requiredEffortForceN = Math.round((loadMassKg * 9.807) / leverMA);

  // Snell's law: n1 * sin(theta1) = n2 * sin(theta2)
  const theta1Rad = (incidentAngleDeg * Math.PI) / 180;
  const sinTheta2 = (n1 / n2) * Math.sin(theta1Rad);
  const refractedAngleDeg = sinTheta2 <= 1 ? Number(((Math.asin(sinTheta2) * 180) / Math.PI).toFixed(1)) : 'Total Internal Reflection';

  const organelles = {
    nucleus: {
      name: 'Cell Nucleus',
      desc: 'Membrane-bound organelle containing the genomic DNA chromosomes and nucleolus where ribosomes are synthesized.'
    },
    mitochondria: {
      name: 'Mitochondria (ATP Powerhouse)',
      desc: 'Generates cellular ATP chemical energy via the electron transport chain, oxidative phosphorylation, and Krebs cycle.'
    },
    ribosomes: {
      name: 'Ribosomes',
      desc: 'Macromolecular machines that translate messenger RNA (mRNA) nucleotide sequences into polypeptide protein chains.'
    },
    chloroplasts: {
      name: 'Chloroplasts (Plant Only)',
      desc: 'Contains green chlorophyll pigments that capture sunlight energy to convert carbon dioxide and water into glucose via photosynthesis.'
    },
    cellWall: {
      name: 'Cellulose Cell Wall (Plant Only)',
      desc: 'Rigid outer layer providing structural support, tensile strength, and protection against osmotic pressure bursting.'
    }
  };

  const handleToggleAudioTone = () => {
    if (isAudioTonePlaying) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      setIsAudioTonePlaying(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(waveFrequencyHz, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscRef.current = osc;
        setIsAudioTonePlaying(true);
      } catch (e) {}
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-rose-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Life, Earth & Engineering Laboratories
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore cellular biology, DNA genetics, tectonic plate collisions, simple machines, and acoustic wave optics.
          </p>
        </div>

        {/* Sub-Laboratory Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto">
          <button
            onClick={() => setActiveSubLab('biology')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeSubLab === 'biology' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Biology & Cell Genetics
          </button>
          <button
            onClick={() => setActiveSubLab('earth')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeSubLab === 'earth' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Earth Tectonics & Seismology
          </button>
          <button
            onClick={() => setActiveSubLab('machines')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeSubLab === 'machines' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Machines & Mechanical Advantage
          </button>
          <button
            onClick={() => setActiveSubLab('waves')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeSubLab === 'waves' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sound, Light & Wave Optics
          </button>
        </div>
      </div>

      {/* MODULE 1: BIOLOGY & CELL GENETICS */}
      {activeSubLab === 'biology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cell Explorer */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-mono uppercase text-rose-400 font-bold">Cellular Organelle Explorer</span>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded">
                  <button
                    onClick={() => setSelectedCellType('animal')}
                    className={`px-2 py-0.5 rounded font-mono ${
                      selectedCellType === 'animal' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    Animal Cell
                  </button>
                  <button
                    onClick={() => setSelectedCellType('plant')}
                    className={`px-2 py-0.5 rounded font-mono ${
                      selectedCellType === 'plant' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    Plant Cell
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(organelles).map((orgKey) => {
                  const org = (organelles as any)[orgKey];
                  if (selectedCellType === 'animal' && (orgKey === 'chloroplasts' || orgKey === 'cellWall')) return null;
                  return (
                    <button
                      key={orgKey}
                      onClick={() => setSelectedOrganelle(orgKey)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        selectedOrganelle === orgKey
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-semibold block truncate">{org.name.split(' (')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Organelle Description */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 leading-relaxed text-slate-300">
                <span className="font-bold text-white block">{(organelles as any)[selectedOrganelle]?.name}</span>
                <p>{(organelles as any)[selectedOrganelle]?.desc}</p>
              </div>
            </div>

            {/* DNA Base Pairing Watson-Crick Rules */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4 text-xs">
              <span className="font-mono uppercase text-cyan-400 font-bold">DNA Complementary Base Pairing</span>
              <p className="text-slate-300 leading-relaxed">
                In double-stranded DNA, adenine (A) pairs strictly with thymine (T) via 2 hydrogen bonds, and cytosine (C) pairs strictly with guanine (G) via 3 hydrogen bonds ($A=T, C \equiv G$).
              </p>

              <div className="grid grid-cols-4 gap-2 pt-1 font-mono">
                {(['A', 'T', 'C', 'G'] as const).map((base) => (
                  <button
                    key={base}
                    onClick={() => setActiveDnaBase(base)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      activeDnaBase === base
                        ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400/50'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl block">{base}</span>
                    <span className="text-[10px] text-slate-400">
                      {base === 'A' ? 'Adenine' : base === 'T' ? 'Thymine' : base === 'C' ? 'Cytosine' : 'Guanine'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-400 block mb-1 uppercase text-[10px]">Complementary Strand Pairing:</span>
                <span className="text-cyan-300 font-bold text-base">
                  {activeDnaBase} ⟷ {activeDnaBase === 'A' ? 'T (2 Hydrogen Bonds)' : activeDnaBase === 'T' ? 'A (2 Hydrogen Bonds)' : activeDnaBase === 'C' ? 'G (3 Hydrogen Bonds)' : 'C (3 Hydrogen Bonds)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: EARTH SCIENCE & TECTONICS */}
      {activeSubLab === 'earth' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Tectonic Plate Boundaries & Seismology</h3>
              <p className="text-slate-400">
                Earth's lithospheric plates float on the semi-fluid asthenosphere, driven by internal radioactive mantle convection.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
              {(['convergent', 'divergent', 'transform'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setPlateBoundaryType(b)}
                  className={`px-3 py-1.5 rounded font-mono uppercase transition-colors ${
                    plateBoundaryType === b ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed text-slate-300">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <h4 className="font-bold text-white font-mono uppercase text-sm">
                Boundary Mechanism: {plateBoundaryType.toUpperCase()}
              </h4>
              <p>
                {plateBoundaryType === 'convergent'
                  ? 'Plates collide. In oceanic-continental convergence, the denser oceanic plate subducts into the mantle, creating deep trenches, explosive andesitic volcanoes (e.g., the Pacific Ring of Fire), and powerful megathrust earthquakes.'
                  : plateBoundaryType === 'divergent'
                  ? 'Plates pull apart. Magma rises from the upper mantle to fill the gap, creating brand-new oceanic basalt crust along mid-ocean ridges (e.g., Mid-Atlantic Ridge) and continental rift valleys (e.g., East African Rift).'
                  : 'Plates slide horizontally past one another along strike-slip fault lines (e.g., San Andreas Fault in California). Friction locks the plates until accumulated elastic strain energy snaps violently, releasing seismic earthquake waves.'}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-2 font-mono">
              <span className="text-emerald-400 font-bold block uppercase text-xs">Seismic Wave Propagation</span>
              <p className="text-slate-300 text-xs">
                <strong>Primary Waves (P-waves):</strong> Compressional longitudinal waves traveling at ~6–8 km/s through both solid rock and liquid outer core.
              </p>
              <p className="text-slate-300 text-xs">
                <strong>Secondary Waves (S-waves):</strong> Transverse shear waves (~3–5 km/s) that cannot travel through liquids, creating an S-wave shadow zone proving Earth's outer core is molten liquid iron.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: SIMPLE MACHINES & MECHANICAL ADVANTAGE */}
      {activeSubLab === 'machines' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6 text-xs">
          <div>
            <h3 className="text-lg font-bold text-white">Simple Machines: Lever Mechanical Advantage</h3>
            <p className="text-slate-400">
              Torque equilibrium ($\tau = F_1 d_1 = F_2 d_2$) allows a small effort applied over a long distance to balance a massive load.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
              <h4 className="font-mono uppercase text-cyan-400 font-bold">Lever Geometry</h4>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Effort Arm (d_effort):</span>
                  <span className="font-mono text-white font-bold">{leverEffortArm} m</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={leverEffortArm}
                  onChange={(e) => setLeverEffortArm(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Load Arm (d_load):</span>
                  <span className="font-mono text-white font-bold">{leverLoadArm} m</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={leverLoadArm}
                  onChange={(e) => setLeverLoadArm(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Load Mass ($m$):</span>
                  <span className="font-mono text-white font-bold">{loadMassKg} kg</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={loadMassKg}
                  onChange={(e) => setLoadMassKg(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
                />
              </div>
            </div>

            <div className="md:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#07090e] space-y-4 font-mono">
              <span className="text-slate-400 uppercase text-xs">Torque & Force Multiplication</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Mechanical Advantage (MA)</span>
                  <span className="text-3xl font-extrabold text-cyan-400">{leverMA}x</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Required Effort Force</span>
                  <span className="text-3xl font-extrabold text-emerald-400">{requiredEffortForceN} N</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                To lift the {loadMassKg} kg weight (load force = {Math.round(loadMassKg * 9.807)} N), you only need to exert {requiredEffortForceN} N of force—equivalent to lifting just {(requiredEffortForceN / 9.807).toFixed(1)} kg! Archimedes famously proclaimed: <em>"Give me a place to stand and with a lever I will move the whole world."</em>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: SOUND, LIGHT & WAVES */}
      {activeSubLab === 'waves' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6 text-xs">
          <div>
            <h3 className="text-lg font-bold text-white">Wave Dynamics: Sound Oscillator & Snell's Law Refraction</h3>
            <p className="text-slate-400">
              Waves transfer energy without transporting matter. Experiment with audible sound oscillation and optical refraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Web Audio Oscillator */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono uppercase text-purple-400 font-bold">Acoustic Audio Oscillator</span>
                <button
                  onClick={handleToggleAudioTone}
                  className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    isAudioTonePlaying ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {isAudioTonePlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isAudioTonePlaying ? 'Tone Playing' : 'Muted'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Frequency ($f$):</span>
                  <span className="font-mono text-white font-bold">{waveFrequencyHz} Hz (v = f·λ)</span>
                </div>
                <input
                  type="range"
                  min="110"
                  max="880"
                  value={waveFrequencyHz}
                  onChange={(e) => setWaveFrequencyHz(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
                Wavelength in air (v = 343 m/s): λ = v / f = {(343 / waveFrequencyHz).toFixed(2)} meters.
              </div>
            </div>

            {/* Snell's Law Refraction Calculator */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
              <span className="font-mono uppercase text-cyan-400 font-bold block">Snell's Law of Optical Refraction</span>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Incident Angle ($\theta_1$):</span>
                  <span className="font-mono text-white font-bold">{incidentAngleDeg}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="85"
                  value={incidentAngleDeg}
                  onChange={(e) => setIncidentAngleDeg(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-slate-400">Medium 1 (Air, n₁=1.0) ⟶ Medium 2 (Glass, n₂=1.5)</div>
                <div className="text-cyan-300 font-bold text-sm">
                  Refracted Angle ($\theta_2$): {refractedAngleDeg}°
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
