import React, { useState, useRef, useEffect } from 'react';
import { 
  Gauge, Play, Pause, RotateCcw, FastForward, Activity, 
  ArrowRight, CheckCircle, Info, ChevronRight, Compass
} from 'lucide-react';

interface VehicleSpeedProfile {
  id: string;
  name: string;
  category: string;
  speedMs: number; // m/s
  speedKmh: number;
  speedMph: number;
  massKg: number;
  dragCoeff: number;
  description: string;
  iconText: string;
}

const VEHICLES: VehicleSpeedProfile[] = [
  {
    id: 'walking-person',
    name: 'Walking Human',
    category: 'Pedestrian',
    speedMs: 1.4,
    speedKmh: 5.0,
    speedMph: 3.1,
    massKg: 75,
    dragCoeff: 1.1,
    description: 'Average human walking speed on flat terrain.',
    iconText: '🚶'
  },
  {
    id: 'bicycle',
    name: 'Racing Road Bicycle',
    category: 'Cycling',
    speedMs: 10.0,
    speedKmh: 36.0,
    speedMph: 22.4,
    massKg: 85,
    dragCoeff: 0.88,
    description: 'Trained cyclist in aerodynamic tuck position.',
    iconText: '🚴'
  },
  {
    id: 'sports-car',
    name: 'Electric Sports Car',
    category: 'Automotive',
    speedMs: 55.5,
    speedKmh: 200.0,
    speedMph: 124.3,
    massKg: 1850,
    dragCoeff: 0.23,
    description: 'Dual-motor electric vehicle on a smooth closed circuit track.',
    iconText: '🏎️'
  },
  {
    id: 'bullet-train',
    name: 'Shinkansen Bullet Train',
    category: 'Rail Transit',
    speedMs: 88.9,
    speedKmh: 320.0,
    speedMph: 198.8,
    massKg: 450000,
    dragCoeff: 0.18,
    description: 'High-speed aerodynamically contoured passenger train.',
    iconText: '🚄'
  },
  {
    id: 'jet-aircraft',
    name: 'Supersonic Jet (Mach 2)',
    category: 'Aviation',
    speedMs: 686.0,
    speedKmh: 2470.0,
    speedMph: 1535.0,
    massKg: 15000,
    dragCoeff: 0.024,
    description: 'Supersonic jet slicing through low-density air at high altitude.',
    iconText: '✈️'
  },
  {
    id: 'rocket',
    name: 'Orbital Spacecraft / Rocket',
    category: 'Aerospace',
    speedMs: 7800.0,
    speedKmh: 28080.0,
    speedMph: 17448.0,
    massKg: 9500,
    dragCoeff: 0.05,
    description: 'Spacecraft in Low Earth Orbit traveling at orbital velocity.',
    iconText: '🚀'
  },
  {
    id: 'light-beam',
    name: 'Photon / Beam of Light',
    category: 'Relativistic Limit',
    speedMs: 299792458,
    speedKmh: 1079252848,
    speedMph: 670616629,
    massKg: 0,
    dragCoeff: 0,
    description: 'Speed of light in vacuum (c): the universal cosmic speed limit.',
    iconText: '⚡'
  }
];

export const PhysicsLabView: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSpeedProfile>(VEHICLES[2]); // Sports car
  const [unitMode, setUnitMode] = useState<'ms' | 'kmh' | 'mph'>('kmh');
  const [trackLengthMeters, setTrackLengthMeters] = useState<number>(1000); // 1 km
  const [simState, setSimState] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [simProgress, setSimProgress] = useState<number>(0); // 0 to 1
  const [simSpeedMultiplier, setSimSpeedMultiplier] = useState<number>(1);
  const [accelerationRate, setAccelerationRate] = useState<number>(4.5); // m/s²
  const [currentVelocity, setCurrentVelocity] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [frictionCoeff, setFrictionCoeff] = useState<number>(0.02);

  // Secondary sub-tab for experiments
  const [activePhysicsMode, setActivePhysicsMode] = useState<'speed-simulator' | 'newton-laws' | 'energy-exchange' | 'terminal-velocity'>('speed-simulator');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Time-series history for real-time graphs
  const [graphData, setGraphData] = useState<Array<{ t: number; s: number; v: number; a: number }>>([]);

  // Animation Frame Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const updateSim = (time: number) => {
      const dt = ((time - lastTime) / 1000) * simSpeedMultiplier;
      lastTime = time;

      if (simState === 'running') {
        setElapsedTime((prevT) => {
          const newT = prevT + dt;

          // Calculate kinematics: v = v0 + a*t up to max vehicle speed
          const maxV = selectedVehicle.speedMs;
          const newV = Math.min(maxV, currentVelocity + accelerationRate * dt);
          setCurrentVelocity(newV);

          // Distance s = s + v*dt
          const deltaS = newV * dt;
          const currentDistance = (simProgress * trackLengthMeters) + deltaS;
          const newProgress = Math.min(1.0, currentDistance / trackLengthMeters);
          setSimProgress(newProgress);

          // Record graph data
          if (Math.floor(newT * 10) % 2 === 0) {
            setGraphData((prev) => [
              ...prev.slice(-40),
              { t: Number(newT.toFixed(1)), s: Math.round(currentDistance), v: Math.round(newV), a: accelerationRate }
            ]);
          }

          if (newProgress >= 1.0) {
            setSimState('completed');
          }

          return newT;
        });
      }

      animId = requestAnimationFrame(updateSim);
    };

    animId = requestAnimationFrame(updateSim);
    return () => cancelAnimationFrame(animId);
  }, [simState, simSpeedMultiplier, currentVelocity, accelerationRate, simProgress, trackLengthMeters, selectedVehicle]);

  // Render Track on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activePhysicsMode !== 'speed-simulator') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 140);

    ctx.clearRect(0, 0, width, height);

    // Track surface asphalt
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 40, width, 60);

    // Road lane markings (dashed white line)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(width, 70);
    ctx.stroke();
    ctx.setLineDash([]);

    // Start Line
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(30, 100);
    ctx.stroke();

    // Finish Line (checkered pattern)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width - 30, 40);
    ctx.lineTo(width - 30, 100);
    ctx.stroke();

    // Position of vehicle on track
    const startX = 30;
    const endX = width - 40;
    const vehicleX = startX + (endX - startX) * simProgress;

    // Draw Vehicle Symbol
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedVehicle.iconText, vehicleX, 70);

    // Speed vector arrow
    if (currentVelocity > 0) {
      const arrowLen = Math.min(60, currentVelocity * 0.8);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(vehicleX + 15, 70);
      ctx.lineTo(vehicleX + 15 + arrowLen, 70);
      ctx.lineTo(vehicleX + 10 + arrowLen, 66);
      ctx.moveTo(vehicleX + 15 + arrowLen, 70);
      ctx.lineTo(vehicleX + 10 + arrowLen, 74);
      ctx.stroke();
    }
  }, [simProgress, currentVelocity, selectedVehicle, activePhysicsMode]);

  const handleReset = () => {
    setSimState('idle');
    setSimProgress(0);
    setCurrentVelocity(0);
    setElapsedTime(0);
    setGraphData([]);
  };

  const getDisplayedSpeed = (speedMs: number) => {
    if (unitMode === 'kmh') return `${(speedMs * 3.6).toFixed(1)} km/h`;
    if (unitMode === 'mph') return `${(speedMs * 2.23694).toFixed(1)} mph`;
    return `${speedMs.toFixed(1)} m/s`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Physics & Speed Laboratory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate acceleration, examine live kinematics graphs ($s$-$t$, $v$-$t$), test Newton's laws, and explore energy transformations.
          </p>
        </div>

        {/* Sub-modes Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto">
          <button
            onClick={() => setActivePhysicsMode('speed-simulator')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap transition-colors ${
              activePhysicsMode === 'speed-simulator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Track & Velocity Simulator
          </button>
          <button
            onClick={() => setActivePhysicsMode('newton-laws')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap transition-colors ${
              activePhysicsMode === 'newton-laws' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Newton's Three Laws
          </button>
          <button
            onClick={() => setActivePhysicsMode('energy-exchange')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap transition-colors ${
              activePhysicsMode === 'energy-exchange' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kinetic vs Potential Energy
          </button>
          <button
            onClick={() => setActivePhysicsMode('terminal-velocity')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap transition-colors ${
              activePhysicsMode === 'terminal-velocity' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Terminal Velocity & Free Fall
          </button>
        </div>
      </div>

      {/* MODE 1: SPEED & TRACK SIMULATOR */}
      {activePhysicsMode === 'speed-simulator' && (
        <div className="space-y-6">
          {/* Unit Toggle & Object Selector Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-800 bg-[#0c1220]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400">Select Object:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {VEHICLES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVehicle(v);
                      handleReset();
                    }}
                    className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                      selectedVehicle.id === v.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{v.iconText}</span>
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Units */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs self-end sm:self-auto shrink-0">
              {(['kmh', 'mph', 'ms'] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => setUnitMode(unit)}
                  className={`px-2 py-0.5 rounded font-mono uppercase transition-colors ${
                    unitMode === unit ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Track Stage */}
          <div className="p-6 rounded-xl border border-slate-800 bg-[#07090e] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-semibold uppercase">{selectedVehicle.name}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">Track Distance: {trackLengthMeters} meters</span>
              </div>
              <div className="font-mono text-slate-300">
                Progress: <strong className="text-cyan-400">{(simProgress * 100).toFixed(1)}%</strong>
              </div>
            </div>

            <canvas ref={canvasRef} className="w-full h-36" />

            {/* Simulation Controls Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-850">
              <div className="flex items-center gap-2">
                {simState === 'running' ? (
                  <button
                    onClick={() => setSimState('paused')}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-1.5"
                  >
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (simState === 'completed') handleReset();
                      setSimState('running');
                    }}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" /> {simState === 'paused' ? 'Resume' : 'Start Track Run'}
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              {/* Live Gauges */}
              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Instant Velocity</span>
                  <span className="text-lg font-bold text-cyan-400 tabular-nums">
                    {getDisplayedSpeed(currentVelocity)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Elapsed Time</span>
                  <span className="text-lg font-bold text-white tabular-nums">
                    {elapsedTime.toFixed(2)} s
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Distance Covered</span>
                  <span className="text-lg font-bold text-white tabular-nums">
                    {(simProgress * trackLengthMeters).toFixed(0)} m
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Kinematic Graphs: s-t, v-t, and a-t */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* s-t and v-t Live Visualizer */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                  Distance-Time Graph (s-t)
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Slope = Velocity</span>
              </div>

              {/* Simple Live SVG Graph */}
              <div className="h-44 w-full bg-slate-950 rounded-lg p-2 border border-slate-800 relative flex items-end">
                <svg className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(255,255,255,0.05)" />

                  {/* s-t Curve */}
                  {graphData.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                      points={graphData.map((d, idx) => {
                        const x = (idx / (graphData.length - 1)) * 100;
                        const y = 100 - (d.s / trackLengthMeters) * 100;
                        return `${x}%,${y}%`;
                      }).join(' ')}
                    />
                  )}
                </svg>

                {graphData.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-600">
                    Press "Start Track Run" to generate live motion curve
                  </div>
                )}
              </div>
            </div>

            {/* Velocity-Time Graph */}
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                  Velocity-Time Graph (v-t)
                </span>
                <span className="text-[10px] font-mono text-blue-400">Slope = Acceleration · Area = Distance</span>
              </div>

              <div className="h-44 w-full bg-slate-950 rounded-lg p-2 border border-slate-800 relative flex items-end">
                <svg className="w-full h-full overflow-visible">
                  <line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(255,255,255,0.05)" />

                  {graphData.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      points={graphData.map((d, idx) => {
                        const x = (idx / (graphData.length - 1)) * 100;
                        const y = 100 - (d.v / selectedVehicle.speedMs) * 100;
                        return `${x}%,${y}%`;
                      }).join(' ')}
                    />
                  )}
                </svg>

                {graphData.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-600">
                    Live velocity profile updates in real time
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kinematics Variables Deck */}
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4">
            <h4 className="text-xs font-mono uppercase text-slate-300 font-semibold">
              Kinematics Experiment Variables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Track Length:</span>
                  <span className="font-mono text-white">{trackLengthMeters} m</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={trackLengthMeters}
                  onChange={(e) => {
                    setTrackLengthMeters(Number(e.target.value));
                    handleReset();
                  }}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Acceleration Rate:</span>
                  <span className="font-mono text-white">{accelerationRate} m/s²</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={accelerationRate}
                  onChange={(e) => setAccelerationRate(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Vehicle Mass:</span>
                  <span className="font-mono text-white">{selectedVehicle.massKg.toLocaleString()} kg</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                  F_net = m · a = {(selectedVehicle.massKg * accelerationRate).toLocaleString()} N
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: NEWTON'S THREE LAWS */}
      {activePhysicsMode === 'newton-laws' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
            <span className="text-[10px] font-mono uppercase bg-blue-950/60 text-blue-400 px-2 py-0.5 rounded border border-blue-800/40">
              Newton's 1st Law
            </span>
            <h3 className="text-base font-bold text-white">The Law of Inertia</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              An object remains at rest or continues to move at a constant velocity in a straight line unless acted upon by a net external force ($\Sigma F = 0$).
            </p>
            <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
              Voyager 1 continues hurtling into interstellar space at 17 km/s with zero engine thrust because deep space has negligible frictional resistance.
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
            <span className="text-[10px] font-mono uppercase bg-blue-950/60 text-blue-400 px-2 py-0.5 rounded border border-blue-800/40">
              Newton's 2nd Law
            </span>
            <h3 className="text-base font-bold text-white">Force & Acceleration</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The acceleration ($a$) of an object is directly proportional to the net force ($F$) acting on it and inversely proportional to its mass ($m$): $F = m \cdot a$.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
              Pushing a 1,000 kg car with 2,000 N yields a = 2 m/s². Pushing a 10,000 kg truck with the same force yields only 0.2 m/s².
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3">
            <span className="text-[10px] font-mono uppercase bg-blue-950/60 text-blue-400 px-2 py-0.5 rounded border border-blue-800/40">
              Newton's 3rd Law
            </span>
            <h3 className="text-base font-bold text-white">Action & Reaction</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For every action, there is an equal and opposite reaction force (F_action = -F_reaction).
            </p>
            <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
              A rocket engine accelerates hot exhaust gas backwards; the escaping gas pushes the rocket forward with equal force in vacuum.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: KINETIC VS POTENTIAL ENERGY EXCHANGE */}
      {activePhysicsMode === 'energy-exchange' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Conservation of Mechanical Energy</h3>
            <p className="text-xs text-slate-400">
              Total mechanical energy remains constant in an ideal conservative system. Watch potential energy convert seamlessly into kinetic energy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Drop Height & Mass Simulation</span>
              
              <div className="space-y-1 text-xs">
                <span className="text-slate-400">Height (h): 100 meters</span>
                <span className="block text-slate-400">Mass (m): 50 kg</span>
                <span className="block text-slate-400">Gravitational Acceleration (g): 9.81 m/s²</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-850">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400">Potential Energy at Top:</span>
                  <span className="text-white font-bold">49,050 J (m·g·h)</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-cyan-400">Kinetic Energy at Bottom:</span>
                  <span className="text-white font-bold">49,050 J (½·m·v²)</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-400">Impact Velocity:</span>
                  <span className="text-white font-bold">v = √(2gh) = 44.3 m/s (159.5 km/h)</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-between space-y-3">
              <h4 className="text-xs font-bold text-white uppercase font-mono">Mass Invariance Discovery</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Notice that mass cancels out when calculating free-fall velocity: 1/2 · m · v² = m · g · h, which simplifies to v = √(2gh). This proves Galileo's legendary discovery: regardless of mass, all objects drop at identical velocities in the absence of air resistance!
              </p>
              <div className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-400 font-mono">
                NASA Apollo 15 astronaut David Scott dropped a 1.32 kg hammer and a 0.03 kg falcon feather simultaneously on the Moon—both landed at the exact same instant.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: TERMINAL VELOCITY */}
      {activePhysicsMode === 'terminal-velocity' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Terminal Velocity & Aerodynamic Drag</h3>
            <p className="text-xs text-slate-400">
              When an object falls through an atmosphere, upward aerodynamic drag increases with velocity squared until it exactly balances downward gravity (F_drag = F_gravity). At that equilibrium, acceleration drops to zero and the object falls at constant terminal velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <span className="font-mono text-cyan-400 font-bold uppercase">Human Skydiver (Belly-to-Earth)</span>
              <div className="text-2xl font-bold font-mono text-white">~54 m/s (195 km/h)</div>
              <p className="text-slate-400 text-[11px]">
                High drag area (~0.7 m²) produces moderate terminal velocity allowing freefall maneuvers.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <span className="font-mono text-emerald-400 font-bold uppercase">Human with Open Parachute</span>
              <div className="text-2xl font-bold font-mono text-white">~5 m/s (18 km/h)</div>
              <p className="text-slate-400 text-[11px]">
                Enormous canopy area (over 30 m²) creates high drag, safely reducing impact speed.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <span className="font-mono text-amber-400 font-bold uppercase">Solid Steel Cannonball</span>
              <div className="text-2xl font-bold font-mono text-white">~140 m/s (504 km/h)</div>
              <p className="text-slate-400 text-[11px]">
                High density and small cross-sectional area minimize drag relative to its immense gravitational weight.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
