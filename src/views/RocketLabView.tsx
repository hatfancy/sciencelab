import React, { useState, useRef, useEffect } from 'react';
import { 
  Rocket, Play, RotateCcw, Volume2, VolumeX, FastForward, 
  Layers, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Activity, Orbit
} from 'lucide-react';

interface RocketConfig {
  noseCone: string;
  payloadType: 'cubesat' | 'weather-sat' | 'deep-space-probe' | 'crew-capsule';
  payloadMassKg: number;
  propellantType: 'rp1-lox' | 'lh2-lox' | 'methane-lox' | 'solid-booster' | 'ion';
  engineCount: number;
  fuelTanksCount: number;
  hasSecondStage: boolean;
}

export const RocketLabView: React.FC = () => {
  const [config, setConfig] = useState<RocketConfig>({
    noseCone: 'aerodynamic-conical',
    payloadType: 'weather-sat',
    payloadMassKg: 1500,
    propellantType: 'methane-lox',
    engineCount: 9,
    fuelTanksCount: 4,
    hasSecondStage: true
  });

  const [activeTab, setActiveTab] = useState<'configure' | 'launch-sim' | 'propulsion-compare'>('configure');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  // Launch Simulation State
  const [launchPhase, setLaunchPhase] = useState<'pad' | 'countdown' | 'boost' | 'staging' | 'orbit' | 'abort'>('pad');
  const [countdownNum, setCountdownNum] = useState<number>(3);
  const [altitudeKm, setAltitudeKm] = useState<number>(0);
  const [velocityKmS, setVelocityKmS] = useState<number>(0);
  const [fuelRemainingPct, setFuelRemainingPct] = useState<number>(100);
  const [simTimeSeconds, setSimTimeSeconds] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Physics Calculations
  const getPropellantSpecs = (type: RocketConfig['propellantType']) => {
    switch (type) {
      case 'rp1-lox': return { name: 'Kerosene / Liquid Oxygen (RP-1/LOX)', isp: 310, density: 'High', thrustPerEngineKn: 845 };
      case 'lh2-lox': return { name: 'Liquid Hydrogen / LOX (Hydrolox)', isp: 450, density: 'Low', thrustPerEngineKn: 1100 };
      case 'methane-lox': return { name: 'Liquid Methane / LOX (Methalox)', isp: 380, density: 'Medium', thrustPerEngineKn: 2200 };
      case 'solid-booster': return { name: 'Solid Rocket Propellant (HTPB)', isp: 265, density: 'Very High', thrustPerEngineKn: 12000 };
      case 'ion': return { name: 'Xenon Ion Plasma Thruster', isp: 3100, density: 'Gas', thrustPerEngineKn: 0.25 };
    }
  };

  const propSpec = getPropellantSpecs(config.propellantType);
  const dryMassKg = 25000 + config.payloadMassKg + (config.hasSecondStage ? 12000 : 0);
  const fuelMassKg = config.fuelTanksCount * 110000;
  const totalWetMassKg = dryMassKg + fuelMassKg;
  const totalThrustKn = config.engineCount * propSpec.thrustPerEngineKn;
  const totalThrustN = totalThrustKn * 1000;
  const totalWeightN = totalWetMassKg * 9.807;
  const twr = Number((totalThrustN / totalWeightN).toFixed(2));

  // Tsiolkovsky delta-v calculation: Δv = Isp * g0 * ln(m0 / mf)
  const g0 = 9.807;
  const deltaVMps = Math.round(propSpec.isp * g0 * Math.log(totalWetMassKg / dryMassKg));

  // Audio tone synth using Web Audio API when sound enabled
  const playIgnitionTone = () => {
    if (isAudioMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 3);
    } catch (e) {}
  };

  // Launch Sequence Runner
  const handleStartLaunch = () => {
    setActiveTab('launch-sim');
    setLaunchPhase('countdown');
    setCountdownNum(3);
    setAltitudeKm(0);
    setVelocityKmS(0);
    setFuelRemainingPct(100);
    setSimTimeSeconds(0);
  };

  // Countdown and Ascent ticker
  useEffect(() => {
    let timer: any;
    if (launchPhase === 'countdown') {
      if (countdownNum > 1) {
        timer = setTimeout(() => setCountdownNum(countdownNum - 1), 1000);
      } else {
        timer = setTimeout(() => {
          setLaunchPhase('boost');
          playIgnitionTone();
        }, 1000);
      }
    } else if (launchPhase === 'boost') {
      timer = setInterval(() => {
        setSimTimeSeconds((prev) => prev + 1);
        setFuelRemainingPct((prev) => Math.max(0, prev - 2.5));

        // Ascent kinematics
        setAltitudeKm((prevAlt) => {
          const newAlt = prevAlt + (prevAlt < 30 ? 1.8 : 3.5);
          return Number(newAlt.toFixed(1));
        });

        setVelocityKmS((prevV) => {
          const newV = Math.min(7.85, prevV + 0.22);
          return Number(newV.toFixed(2));
        });

        setFuelRemainingPct((f) => {
          if (f <= 40 && config.hasSecondStage) {
            setLaunchPhase('staging');
          }
          if (f <= 5) {
            setLaunchPhase('orbit');
          }
          return f;
        });
      }, 350);
    } else if (launchPhase === 'staging') {
      timer = setTimeout(() => {
        setLaunchPhase('boost');
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [launchPhase, countdownNum, config.hasSecondStage]);

  // Launch Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== 'launch-sim') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 360);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Sky background shifting from dark navy to deep space black as altitude rises
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (altitudeKm < 40) {
        skyGrad.addColorStop(0, '#0c162d');
        skyGrad.addColorStop(1, '#1e293b');
      } else {
        skyGrad.addColorStop(0, '#020408');
        skyGrad.addColorStop(1, '#070b14');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Stars in high altitude / space
      if (altitudeKm > 20) {
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 40; i++) {
          const sx = (i * 37) % width;
          const sy = (i * 19) % height;
          ctx.fillRect(sx, sy, 1.5, 1.5);
        }
      }

      const rocketX = width * 0.5;
      let rocketY = height - 70;
      if (launchPhase === 'boost' || launchPhase === 'staging') {
        rocketY = Math.max(90, height - 70 - (altitudeKm * 1.8));
      } else if (launchPhase === 'orbit') {
        rocketY = 80;
      }

      // Draw Exhaust Flame plume when boosting
      if (launchPhase === 'boost') {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(rocketX - 8, rocketY + 35);
        ctx.lineTo(rocketX + 8, rocketY + 35);
        ctx.lineTo(rocketX, rocketY + 85 + (Math.random() * 20));
        ctx.fill();

        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(rocketX - 4, rocketY + 35);
        ctx.lineTo(rocketX + 4, rocketY + 35);
        ctx.lineTo(rocketX, rocketY + 60 + (Math.random() * 10));
        ctx.fill();
      }

      // Draw Rocket Body Cylinder
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(rocketX - 9, rocketY - 10, 18, 45);

      // Second stage separation gap if staging
      if (launchPhase === 'staging') {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(rocketX - 10, rocketY + 15, 20, 2);
      }

      // Nose Cone
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(rocketX - 9, rocketY - 10);
      ctx.lineTo(rocketX + 9, rocketY - 10);
      ctx.lineTo(rocketX, rocketY - 32);
      ctx.fill();

      // Fins
      ctx.fillStyle = '#0369a1';
      ctx.beginPath();
      ctx.moveTo(rocketX - 9, rocketY + 25);
      ctx.lineTo(rocketX - 18, rocketY + 38);
      ctx.lineTo(rocketX - 9, rocketY + 35);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(rocketX + 9, rocketY + 25);
      ctx.lineTo(rocketX + 18, rocketY + 38);
      ctx.lineTo(rocketX + 9, rocketY + 35);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, launchPhase, altitudeKm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-orange-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Rocket & Spacecraft Engineering Lab
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure vehicle stages, compute Tsiolkovsky $\Delta v$, execute orbital countdown launches, and analyze telemetry.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('configure')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'configure' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Vehicle Configuration
          </button>
          <button
            onClick={() => setActiveTab('launch-sim')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'launch-sim' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Launch Sequence & Telemetry
          </button>
          <button
            onClick={() => setActiveTab('propulsion-compare')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'propulsion-compare' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Propulsion Concepts
          </button>
        </div>
      </div>

      {/* TAB 1: VEHICLE CONFIGURATION WORKBENCH */}
      {activeTab === 'configure' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Component Selectors Column */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-5">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Spacecraft Staging & Propellant Architecture
            </h3>

            {/* Propellant Chemistry Choice */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium block">1. Propellant & Oxidizer Chemistry</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {(['methane-lox', 'rp1-lox', 'lh2-lox'] as const).map((prop) => (
                  <button
                    key={prop}
                    onClick={() => setConfig({ ...config, propellantType: prop })}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      config.propellantType === prop
                        ? 'bg-orange-950/60 border-orange-500 text-orange-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold block capitalize">{prop.replace('-', ' ')}</span>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                      I_sp: {getPropellantSpecs(prop).isp} s
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payload Category Choice */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium block">2. Payload Mission Profile</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'cubesat', name: 'CubeSat Constellation', mass: 250 },
                  { id: 'weather-sat', name: 'Geostationary Weather Sat', mass: 1500 },
                  { id: 'deep-space-probe', name: 'Interplanetary Probe', mass: 850 },
                  { id: 'crew-capsule', name: 'Crew Exploration Capsule', mass: 9500 }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setConfig({ ...config, payloadType: p.id as any, payloadMassKg: p.mass })}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      config.payloadType === p.id
                        ? 'bg-orange-950/60 border-orange-500 text-orange-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold block text-[11px] truncate">{p.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{p.mass.toLocaleString()} kg</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Engines & Fuel Tanks Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>First Stage Engines:</span>
                  <span className="font-mono text-white font-bold">{config.engineCount} Engines</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="33"
                  value={config.engineCount}
                  onChange={(e) => setConfig({ ...config, engineCount: Number(e.target.value) })}
                  className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Propellant Tank Volume:</span>
                  <span className="font-mono text-white font-bold">{config.fuelTanksCount} Tanks</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={config.fuelTanksCount}
                  onChange={(e) => setConfig({ ...config, fuelTanksCount: Number(e.target.value) })}
                  className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded"
                />
              </div>
            </div>

            {/* Multi-Stage Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span className="font-semibold text-white block">Include Vacuum Second Stage</span>
                <span className="text-[11px] text-slate-400">Discards heavy first stage booster after atmospheric ascent</span>
              </div>
              <button
                onClick={() => setConfig({ ...config, hasSecondStage: !config.hasSecondStage })}
                className={`px-3 py-1.5 rounded font-mono text-xs transition-colors ${
                  config.hasSecondStage
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {config.hasSecondStage ? 'Enabled (2-Stage)' : 'Single Stage to Orbit (SSTO)'}
              </button>
            </div>
          </div>

          {/* Real-Time Physics Telemetry Deck */}
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">
                Tsiolkovsky Flight Dynamics Analysis
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Total Takeoff Wet Mass:</span>
                  <span className="font-mono font-bold text-white">{(totalWetMassKg / 1000).toFixed(1)} metric tonnes</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Dry Mass at Burnout:</span>
                  <span className="font-mono font-bold text-white">{(dryMassKg / 1000).toFixed(1)} tonnes</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Total Sea-Level Thrust:</span>
                  <span className="font-mono font-bold text-white">{totalThrustKn.toLocaleString()} kN</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Thrust-to-Weight Ratio (TWR):</span>
                  <span className={`font-mono font-bold ${twr >= 1.2 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {twr} {twr < 1.0 ? '(Will not lift off)' : '(Nominal Lift)'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Delta-v (Δv Budget):</span>
                  <span className="font-mono font-bold text-cyan-300">{deltaVMps.toLocaleString()} m/s</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                twr >= 1.2 && deltaVMps >= 7800
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                  : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
              }`}>
                {twr >= 1.2 && deltaVMps >= 7800 ? (
                  <span>
                    ✓ <strong>Orbital Ready:</strong> Vehicle possesses adequate initial TWR ({twr}) and sufficient Δv ({deltaVMps} m/s) to achieve Low Earth Orbit insertion.
                  </span>
                ) : (
                  <span>
                    ⚠️ <strong>Insufficient Performance:</strong> Add more engines or configure a second stage to reach orbital velocity (~7,800 m/s).
                  </span>
                )}
              </div>
            </div>

            {/* Launch Action */}
            <button
              onClick={handleStartLaunch}
              className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/30"
            >
              <Rocket className="w-4 h-4" />
              <span>Proceed to Simulated Launch</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: LAUNCH SEQUENCE & TELEMETRY */}
      {activeTab === 'launch-sim' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-950 text-orange-400 border border-orange-800/40">
                  Mission Status: {launchPhase.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">T+{simTimeSeconds}s</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Simulated Ascent & Telemetry HUD</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Toggle launch audio synth"
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
              <button
                onClick={handleStartLaunch}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Re-launch
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Visual Launch Stage */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-80" />

              {/* Countdown overlay */}
              {launchPhase === 'countdown' && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center font-mono animate-pulse">
                  <span className="text-6xl font-extrabold text-orange-400">{countdownNum}</span>
                  <span className="text-xs uppercase text-slate-400 tracking-widest mt-2">Ignition in T-{countdownNum}</span>
                </div>
              )}

              {/* Orbital Insertion Badge */}
              {launchPhase === 'orbit' && (
                <div className="absolute top-4 right-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs px-3 py-1.5 rounded-lg font-mono">
                  ✓ Low Earth Orbit Achieved (7.8 km/s)
                </div>
              )}
            </div>

            {/* Flight Telemetry Gauges */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Current Altitude</span>
                  <span className="text-2xl font-bold text-white tabular-nums">{altitudeKm} km</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Telemetry Velocity</span>
                  <span className="text-2xl font-bold text-cyan-400 tabular-nums">{velocityKmS} km/s</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Propellant Remaining</span>
                  <span className="text-2xl font-bold text-orange-400 tabular-nums">{fuelRemainingPct.toFixed(0)}%</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Dynamic Pressure (Max-Q)</span>
                  <span className="text-2xl font-bold text-white tabular-nums">
                    {altitudeKm > 10 && altitudeKm < 20 ? 'HIGH (Max-Q)' : 'Nominal'}
                  </span>
                </div>
              </div>

              {/* Staging explanation */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2 text-xs">
                <h5 className="font-bold text-slate-200">The Physics of Staging:</h5>
                <p className="text-slate-400 leading-relaxed">
                  As fuel burns, propellant mass decreases while structural tank mass remains fixed. Discarding empty tanks reduces vehicle mass (m_final), multiplying the remaining acceleration according to a = F / m so the second stage can accelerate to orbital velocity (7.8 km/s).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROPULSION CONCEPTS COMPARISON */}
      {activeTab === 'propulsion-compare' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Spacecraft Propulsion Concepts & Trade-offs</h3>
            <p className="text-xs text-slate-400">
              Compare chemical, nuclear, and electric propulsion technologies. Understand the trade-off between raw thrust and specific impulse (I_sp).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-[10px] font-mono uppercase text-orange-400 font-bold">Chemical Rockets</span>
              <h4 className="text-sm font-bold text-white">Liquid & Solid Propellant</h4>
              <p className="text-slate-300 leading-relaxed">
                Immense thrust capable of lifting vehicles off Earth's launch pad against gravity (TWR exceeding 1.2). Moderate efficiency (I_sp ~ 250–450 s).
              </p>
              <div className="font-mono text-[11px] text-slate-400">
                Best for: Earth ascent & rapid orbital insertion.
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Electric / Ion Propulsion</span>
              <h4 className="text-sm font-bold text-white">Hall-Effect Xenon Thrusters</h4>
              <p className="text-slate-300 leading-relaxed">
                Microscopic thrust (fractions of a Newton), but extraordinary efficiency (I_sp ~ 3,000–5,000 s). Accelerates continuously over months.
              </p>
              <div className="font-mono text-[11px] text-slate-400">
                Best for: Deep-space probes (Dawn, Psyche) & satellite station-keeping.
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Nuclear Thermal (NTP)</span>
              <h4 className="text-sm font-bold text-white">Fission Reactor Hydrogen Core</h4>
              <p className="text-slate-300 leading-relaxed">
                Fission reactor heats liquid hydrogen to extreme temperatures, yielding both high thrust and double the specific impulse of chemical engines (I_sp ~ 900 s).
              </p>
              <div className="font-mono text-[11px] text-slate-400">
                Best for: Rapid crewed transit to Mars.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
