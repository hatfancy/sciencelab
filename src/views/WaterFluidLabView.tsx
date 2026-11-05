import React, { useState, useRef, useEffect } from 'react';
import { Waves, Droplet, ArrowDown, ArrowUp, RefreshCw, Layers } from 'lucide-react';

interface TestFluid {
  id: string;
  name: string;
  densityGcm3: number; // g/cm³
  densityKgm3: number; // kg/m³
  color: string;
}

interface TestObject {
  id: string;
  name: string;
  densityGcm3: number;
  massKg: number;
  volumeM3: number;
  color: string;
}

const FLUIDS: TestFluid[] = [
  { id: 'freshwater', name: 'Freshwater (Pure H₂O)', densityGcm3: 1.0, densityKgm3: 1000, color: 'rgba(56, 189, 248, 0.25)' },
  { id: 'saltwater', name: 'Ocean Saltwater (3.5% salinity)', densityGcm3: 1.025, densityKgm3: 1025, color: 'rgba(14, 165, 233, 0.3)' },
  { id: 'vegetable-oil', name: 'Cooking Oil', densityGcm3: 0.92, densityKgm3: 920, color: 'rgba(234, 179, 8, 0.25)' },
  { id: 'liquid-mercury', name: 'Liquid Mercury', densityGcm3: 13.55, densityKgm3: 13550, color: 'rgba(148, 163, 184, 0.6)' }
];

const OBJECTS: TestObject[] = [
  { id: 'cork', name: 'Cork', densityGcm3: 0.24, massKg: 0.24, volumeM3: 0.001, color: '#d97706' },
  { id: 'wood-pine', name: 'Pine Wood Block', densityGcm3: 0.65, massKg: 0.65, volumeM3: 0.001, color: '#b45309' },
  { id: 'ice', name: 'Solid Ice (H₂O)', densityGcm3: 0.917, massKg: 0.917, volumeM3: 0.001, color: '#7dd3fc' },
  { id: 'aluminum', name: 'Solid Aluminum', densityGcm3: 2.7, massKg: 2.7, volumeM3: 0.001, color: '#94a3b8' },
  { id: 'solid-steel', name: 'Solid Steel Sphere', densityGcm3: 7.85, massKg: 7.85, volumeM3: 0.001, color: '#475569' },
  { id: 'gold-brick', name: 'Pure Gold Ingot', densityGcm3: 19.3, massKg: 19.3, volumeM3: 0.001, color: '#eab308' }
];

export const WaterFluidLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buoyancy-tank' | 'bernoulli-flow' | 'phase-change'>('buoyancy-tank');
  const [selectedFluid, setSelectedFluid] = useState<TestFluid>(FLUIDS[0]);
  const [selectedObject, setSelectedObject] = useState<TestObject>(OBJECTS[1]); // Pine wood
  const [tankDepthMeters, setTankDepthMeters] = useState<number>(3.0);

  // Bernoulli pipe state
  const [pipeInletDiameter, setPipeInletDiameter] = useState<number>(10); // cm
  const [pipeConstrictionDiameter, setPipeConstrictionDiameter] = useState<number>(5); // cm
  const [inletFlowSpeed, setInletFlowSpeed] = useState<number>(2.0); // m/s

  // Phase transition state
  const [waterTempC, setWaterTempC] = useState<number>(20);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Buoyancy Calculations (Archimedes' Principle)
  const g = 9.807;
  const gravityForceN = Number((selectedObject.massKg * g).toFixed(2));
  
  // Is object denser than fluid?
  const willSink = selectedObject.densityGcm3 > selectedFluid.densityGcm3;
  const isNeutral = Math.abs(selectedObject.densityGcm3 - selectedFluid.densityGcm3) < 0.01;
  const submergedFraction = willSink ? 1.0 : selectedObject.densityGcm3 / selectedFluid.densityGcm3;
  const displacedVolumeM3 = selectedObject.volumeM3 * submergedFraction;
  const displacedMassKg = displacedVolumeM3 * selectedFluid.densityKgm3;
  const buoyantForceN = Number((displacedMassKg * g).toFixed(2));

  // Render Buoyancy Tank Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== 'buoyancy-tank') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 300);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Tank glass walls
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 40, width - 120, height - 60);

      // Fluid Fill
      ctx.fillStyle = selectedFluid.color;
      ctx.fillRect(62, 80, width - 124, height - 102);

      // Fluid surface meniscus line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 80);
      ctx.lineTo(width - 60, 80);
      ctx.stroke();

      // Object position in fluid
      const objWidth = 50;
      const objHeight = 50;
      const centerX = width * 0.5 - objWidth * 0.5;

      let objY = 80 - (objHeight * (1 - submergedFraction)); // Floating at surface
      if (willSink) {
        objY = height - 20 - objHeight; // Rest at bottom
      } else if (isNeutral) {
        objY = 150; // Neutral buoyancy in middle
      }

      // Draw Object
      ctx.fillStyle = selectedObject.color;
      ctx.fillRect(centerX, objY, objWidth, objHeight);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(centerX, objY, objWidth, objHeight);

      // Force vectors: Gravity Downward (Red) vs Buoyancy Upward (Cyan)
      ctx.lineWidth = 2.5;

      // Gravity Force Downward
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(width * 0.5, objY + objHeight * 0.5);
      ctx.lineTo(width * 0.5, objY + objHeight * 0.5 + Math.min(60, gravityForceN * 2));
      ctx.stroke();

      // Buoyant Force Upward
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(width * 0.5, objY + objHeight * 0.5);
      ctx.lineTo(width * 0.5, objY + objHeight * 0.5 - Math.min(60, buoyantForceN * 2));
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, selectedFluid, selectedObject, submergedFraction, willSink, isNeutral, gravityForceN, buoyantForceN]);

  // Bernoulli calculations: A1*v1 = A2*v2 => v2 = v1 * (A1/A2) = v1 * (d1/d2)^2
  const areaRatio = Math.pow(pipeInletDiameter / pipeConstrictionDiameter, 2);
  const constrictionFlowSpeed = Number((inletFlowSpeed * areaRatio).toFixed(2));
  // Pressure difference: ΔP = 1/2 * ρ * (v2^2 - v1^2)
  const deltaPressurePa = Math.round(0.5 * 1000 * (Math.pow(constrictionFlowSpeed, 2) - Math.pow(inletFlowSpeed, 2)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Waves className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Water & Fluid Dynamics Laboratory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Archimedes' buoyancy principle, Bernoulli fluid flow through pipes, and molecular phase change dynamics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('buoyancy-tank')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'buoyancy-tank' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Buoyancy & Archimedes Tank
          </button>
          <button
            onClick={() => setActiveTab('bernoulli-flow')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'bernoulli-flow' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bernoulli Pipe Flow
          </button>
          <button
            onClick={() => setActiveTab('phase-change')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'phase-change' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Water Phase & Crystal Lattice
          </button>
        </div>
      </div>

      {/* TAB 1: BUOYANCY & ARCHIMEDES TANK */}
      {activeTab === 'buoyancy-tank' && (
        <div className="space-y-6">
          {/* Fluid & Object Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-800 bg-[#0c1220]">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2">1. Choose Liquid Medium:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {FLUIDS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFluid(f)}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      selectedFluid.id === f.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold block truncate">{f.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{f.densityGcm3} g/cm³</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2">2. Choose Test Object:</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {OBJECTS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedObject(o)}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      selectedObject.id === o.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold block text-[11px] truncate">{o.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{o.densityGcm3} g/cm³</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Tank Canvas */}
            <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#07090e] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase text-slate-400">
                  Virtual Fluid Tank Simulator
                </span>
                <span className="font-mono text-cyan-400">
                  {willSink ? 'Object Sinks (Dense)' : isNeutral ? 'Neutral Buoyancy' : 'Object Floats'}
                </span>
              </div>

              <div className="w-full flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-72" />
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-850 font-mono">
                <span className="text-rose-400 flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5" /> Gravity Force: {gravityForceN} N
                </span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <ArrowUp className="w-3.5 h-3.5" /> Buoyant Force: {buoyantForceN} N
                </span>
              </div>
            </div>

            {/* Archimedes Scientific Telemetry Inspector */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4 text-xs">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold border-b border-slate-800 pb-2">
                Archimedes' Principle Analysis
              </h4>

              <div className="space-y-2.5">
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Object Density:</span>
                  <span className="font-mono font-bold text-white">{selectedObject.densityGcm3} g/cm³</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Fluid Density:</span>
                  <span className="font-mono font-bold text-white">{selectedFluid.densityGcm3} g/cm³</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Submerged Fraction:</span>
                  <span className="font-mono font-bold text-cyan-300">{(submergedFraction * 100).toFixed(1)}% Submerged</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Fluid Displaced Mass:</span>
                  <span className="font-mono font-bold text-white">{displacedMassKg.toFixed(3)} kg</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 leading-relaxed text-slate-300">
                <strong className="text-white">Why does this happen?</strong>
                <p>
                  By Archimedes' principle, the upward buoyant force equals the weight of the fluid pushed aside: F_b = ρ_fluid · V_disp · g.
                </p>
                <p>
                  {willSink
                    ? `Because ${selectedObject.name} has a density (${selectedObject.densityGcm3} g/cm³) greater than ${selectedFluid.name} (${selectedFluid.densityGcm3} g/cm³), the maximum possible buoyant force (${buoyantForceN} N) cannot balance its gravitational weight (${gravityForceN} N), causing it to sink.`
                    : `Because ${selectedObject.name} is less dense than the liquid, it reaches equilibrium when ${(submergedFraction * 100).toFixed(0)}% of its volume is submerged, exactly matching upward buoyant force (${buoyantForceN} N) with downward gravity (${gravityForceN} N).`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BERNOULLI PIPE FLOW */}
      {activeTab === 'bernoulli-flow' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Bernoulli's Principle & Venturi Constriction</h3>
            <p className="text-xs text-slate-400">
              In a moving fluid, where velocity increases due to a narrowing pipe, static pressure simultaneously drops. This fundamental law explains airplane wing lift, carburetors, and atomizers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-4 text-xs">
              <h4 className="font-mono uppercase text-cyan-400 font-bold">Pipe Geometry & Inlet Speed</h4>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Inlet Diameter ($d_1$):</span>
                  <span className="font-mono text-white font-bold">{pipeInletDiameter} cm</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="20"
                  value={pipeInletDiameter}
                  onChange={(e) => setPipeInletDiameter(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Constriction Diameter ($d_2$):</span>
                  <span className="font-mono text-white font-bold">{pipeConstrictionDiameter} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max={pipeInletDiameter - 1}
                  value={pipeConstrictionDiameter}
                  onChange={(e) => setPipeConstrictionDiameter(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Inlet Flow Speed ($v_1$):</span>
                  <span className="font-mono text-white font-bold">{inletFlowSpeed} m/s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={inletFlowSpeed}
                  onChange={(e) => setInletFlowSpeed(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded"
                />
              </div>
            </div>

            {/* Calculations Output */}
            <div className="md:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#07090e] space-y-4">
              <span className="text-xs font-mono uppercase text-slate-400">Fluid Dynamics Telemetry</span>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Wide Inlet Speed ($v_1$)</span>
                  <span className="text-xl font-bold text-white">{inletFlowSpeed} m/s</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Narrow Throat Speed ($v_2$)</span>
                  <span className="text-xl font-bold text-cyan-400">{constrictionFlowSpeed} m/s</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase">Pressure Drop (Bernoulli Venturi Depression)</span>
                  <span className="text-2xl font-bold text-amber-400">ΔP = -{(deltaPressurePa / 1000).toFixed(2)} kPa</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                Because fluid is incompressible, conservation of mass ($A_1 v_1 = A_2 v_2$) forces water through the narrow section {areaRatio.toFixed(1)} times faster. To accelerate, work must be done by pressure, creating a localized low-pressure zone at the constriction ($P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2$).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WATER PHASE & LATTICE */}
      {activeTab === 'phase-change' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Water Molecule & Phase Transitions</h3>
            <p className="text-xs text-slate-400">
              Water exhibits exceptional properties due to hydrogen bonding. Discover why ice expands upon freezing and why water has such a high specific heat capacity.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Water Temperature:</span>
              <span className="font-mono text-cyan-400 font-bold text-base">{waterTempC}°C ({waterTempC + 273} K)</span>
            </div>
            <input
              type="range"
              min="-20"
              max="120"
              value={waterTempC}
              onChange={(e) => setWaterTempC(Number(e.target.value))}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>-20°C (Solid Hexagonal Ice)</span>
              <span>0°C (Melting Point)</span>
              <span>100°C (Boiling Steam)</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3 text-xs leading-relaxed text-slate-300">
            <h4 className="font-bold text-white text-sm">
              Current Thermodynamic State: {waterTempC <= 0 ? 'Solid Ice Crystal Lattice' : waterTempC < 100 ? 'Liquid Water' : 'Gaseous Steam / Vapor'}
            </h4>
            <p>
              {waterTempC <= 0
                ? 'Below 0°C, thermal kinetic energy drops low enough that hydrogen bonds hold water molecules in fixed, open hexagonal rings. This open crystal geometry leaves large empty spaces between molecules, reducing its density to 0.917 g/cm³ and making ice float on liquid water.'
                : waterTempC < 100
                ? 'Between 0°C and 100°C, thermal vibration partially collapses the rigid open ice lattice, allowing molecules to pack closer together (reaching maximum density at 4°C: 1.000 g/cm³) while continuously breaking and reforming hydrogen bonds on picosecond timescales.'
                : 'Above 100°C (at 1 atm), water molecules possess sufficient thermal kinetic energy to completely overcome intermolecular hydrogen bonds, expanding into a high-entropy gas (steam) where molecules travel freely in straight lines.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
