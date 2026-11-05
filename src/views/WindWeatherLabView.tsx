import React, { useState, useRef, useEffect } from 'react';
import { Wind, Gauge, Compass, ShieldAlert, ArrowRight, CloudRain } from 'lucide-react';

interface ObstacleProfile {
  id: string;
  name: string;
  dragCoeff: number;
  liftCoeff: number;
  shapeType: 'airfoil' | 'sphere' | 'sports-car' | 'flat-plate' | 'teardrop';
  description: string;
}

const OBSTACLES: ObstacleProfile[] = [
  { id: 'airfoil', name: 'Aerodynamic Airfoil (NACA Wing)', dragCoeff: 0.045, liftCoeff: 1.15, shapeType: 'airfoil', description: 'Streamlined asymmetric camber generates high aerodynamic lift with minimal drag.' },
  { id: 'teardrop', name: 'Streamlined Teardrop Body', dragCoeff: 0.04, liftCoeff: 0.0, shapeType: 'teardrop', description: 'The most aerodynamically efficient subsonic solid body; eliminates boundary layer separation.' },
  { id: 'sports-car', name: 'Sleek Automobile Silhouette', dragCoeff: 0.24, liftCoeff: -0.15, shapeType: 'sports-car', description: 'Modern electric car profile with diffuser and subtle downforce generation.' },
  { id: 'sphere', name: 'Smooth Sphere', dragCoeff: 0.47, liftCoeff: 0.0, shapeType: 'sphere', description: 'Classic aerodynamic baseline; experiences turbulent vortex shedding in its wake.' },
  { id: 'flat-plate', name: 'Flat Perpendicular Plate', dragCoeff: 1.28, liftCoeff: 0.0, shapeType: 'flat-plate', description: 'Maximum resistance; creates massive turbulent low-pressure separation zone behind.' }
];

export const WindWeatherLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wind-tunnel' | 'atmosphere-layers' | 'coriolis-weather'>('wind-tunnel');
  const [selectedObstacle, setSelectedObstacle] = useState<ObstacleProfile>(OBSTACLES[0]);
  const [windSpeedKmh, setWindSpeedKmh] = useState<number>(80);

  // Atmospheric altitude explorer
  const [altitudeKm, setAltitudeKm] = useState<number>(5);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Airflow drag force: F_drag = 1/2 * rho * v^2 * Cd * A
  const airDensityKgM3 = 1.225; // sea level air density
  const windSpeedMs = windSpeedKmh / 3.6;
  const frontalAreaM2 = 1.5;
  const calculatedDragForceN = Math.round(0.5 * airDensityKgM3 * Math.pow(windSpeedMs, 2) * selectedObstacle.dragCoeff * frontalAreaM2);
  const calculatedLiftForceN = Math.round(0.5 * airDensityKgM3 * Math.pow(windSpeedMs, 2) * selectedObstacle.liftCoeff * frontalAreaM2);

  // Wind Tunnel Streamline Particles Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== 'wind-tunnel') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 300);

    // Streamline particles
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (windSpeedMs / 10) + Math.random() * 0.5 + 1.5,
      vy: 0
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Tunnel walls
      ctx.fillStyle = '#07090e';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, height);

      const centerX = width * 0.45;
      const centerY = height * 0.5;

      // Draw Obstacle
      ctx.fillStyle = '#94a3b8';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;

      if (selectedObstacle.shapeType === 'airfoil') {
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY);
        ctx.bezierCurveTo(centerX - 10, centerY - 25, centerX + 30, centerY - 20, centerX + 60, centerY);
        ctx.bezierCurveTo(centerX + 30, centerY + 8, centerX - 10, centerY + 8, centerX - 40, centerY);
        ctx.fill();
        ctx.stroke();
      } else if (selectedObstacle.shapeType === 'sphere') {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (selectedObstacle.shapeType === 'flat-plate') {
        ctx.fillRect(centerX - 4, centerY - 45, 8, 90);
        ctx.strokeRect(centerX - 4, centerY - 45, 8, 90);
      } else if (selectedObstacle.shapeType === 'teardrop') {
        ctx.beginPath();
        ctx.arc(centerX - 15, centerY, 30, Math.PI * 0.5, Math.PI * 1.5);
        ctx.lineTo(centerX + 55, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        // Sports car silhouette
        ctx.fillRect(centerX - 50, centerY + 5, 100, 25);
        ctx.beginPath();
        ctx.moveTo(centerX - 35, centerY + 5);
        ctx.lineTo(centerX - 10, centerY - 15);
        ctx.lineTo(centerX + 25, centerY - 15);
        ctx.lineTo(centerX + 40, centerY + 5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Render streamlines particles flowing around obstacle
      ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;

        // Flow deflection calculation
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 55) {
          p.y += (dy > 0 ? 2.5 : -2.5);
        }

        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }

        ctx.fillRect(p.x, p.y, 4, 1.5);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, selectedObstacle, windSpeedMs]);

  // Atmospheric Layers Information
  const getAtmosphereLayer = (alt: number) => {
    if (alt <= 12) return { name: 'Troposphere (0–12 km)', desc: 'Contains 75% of atmospheric mass and virtually all weather systems, clouds, and commercial flight corridors. Temperature drops with altitude to ~ -55°C.' };
    if (alt <= 50) return { name: 'Stratosphere (12–50 km)', desc: 'Contains the critical Ozone Layer (O₃) which absorbs hazardous ultraviolet (UV-C and UV-B) radiation. Temperature rises with altitude due to ozone absorption.' };
    if (alt <= 85) return { name: 'Mesosphere (50–85 km)', desc: 'Coldest atmospheric layer (-90°C). Atmospheric friction burns up incoming meteors, creating visible shooting stars.' };
    if (alt <= 600) return { name: 'Thermosphere (85–600 km)', desc: 'Home to the International Space Station and polar auroras (Northern/Southern lights). High-energy solar X-rays heat gas particles to >1,500°C, though air is too thin to feel hot.' };
    return { name: 'Exosphere (>600 km)', desc: 'Gradual transition zone between Earth’s upper atmosphere and interplanetary vacuum.' };
  };

  const currentLayer = getAtmosphereLayer(altitudeKm);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Wind className="w-6 h-6 text-sky-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Wind, Weather & Atmosphere Laboratory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Aerodynamic wind tunnel testing, atmospheric pressure layers, and Coriolis global weather systems.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('wind-tunnel')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'wind-tunnel' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Wind Tunnel
          </button>
          <button
            onClick={() => setActiveTab('atmosphere-layers')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'atmosphere-layers' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Atmospheric Layers
          </button>
          <button
            onClick={() => setActiveTab('coriolis-weather')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'coriolis-weather' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Coriolis & Global Cyclones
          </button>
        </div>
      </div>

      {/* TAB 1: WIND TUNNEL */}
      {activeTab === 'wind-tunnel' && (
        <div className="space-y-6">
          {/* Shape Selector Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto p-3 bg-[#0c1220] border border-slate-800 rounded-xl text-xs">
            <span className="font-mono uppercase text-slate-400 shrink-0 pr-2">Object Shape:</span>
            {OBSTACLES.map((obs) => (
              <button
                key={obs.id}
                onClick={() => setSelectedObstacle(obs)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedObstacle.id === obs.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                {obs.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Canvas Stage */}
            <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#07090e] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase text-slate-400">Streamline Airflow Simulation</span>
                <span className="font-mono text-cyan-400">Wind Velocity: {windSpeedKmh} km/h ({(windSpeedKmh / 3.6).toFixed(1)} m/s)</span>
              </div>

              <div className="w-full flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-72" />
              </div>

              {/* Speed Slider */}
              <div className="space-y-1 pt-2 border-t border-slate-850 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Tunnel Air Speed:</span>
                  <span className="font-mono text-cyan-400 font-bold">{windSpeedKmh} km/h</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={windSpeedKmh}
                  onChange={(e) => setWindSpeedKmh(Number(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Aerodynamic Telemetry Card */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4 text-xs">
              <h4 className="font-mono uppercase text-sky-400 font-bold border-b border-slate-800 pb-2">
                Aerodynamic Force Telemetry
              </h4>

              <div className="space-y-2.5">
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Drag Coefficient ($C_d$):</span>
                  <span className="font-mono font-bold text-white">{selectedObstacle.dragCoeff}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Lift Coefficient ($C_l$):</span>
                  <span className="font-mono font-bold text-cyan-300">{selectedObstacle.liftCoeff}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Calculated Drag Force:</span>
                  <span className="font-mono font-bold text-rose-400">{calculatedDragForceN} N</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Calculated Lift Force:</span>
                  <span className="font-mono font-bold text-emerald-400">{calculatedLiftForceN} N</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 leading-relaxed text-slate-300">
                <strong className="text-white block">Engineering Takeaway:</strong>
                <p>{selectedObstacle.description}</p>
                <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                  Notice that aerodynamic drag scales with the square of wind velocity ($F_d \propto v^2$). Doubling speed quadruples air resistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATMOSPHERIC LAYERS EXPLORER */}
      {activeTab === 'atmosphere-layers' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Earth's Atmospheric Layers & Pressure Gradient</h3>
            <p className="text-xs text-slate-400">
              Drag the altitude slider to inspect temperature changes and air pressure drops as you climb from sea level into the edge of space.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Selected Altitude:</span>
              <span className="font-mono text-cyan-400 font-bold text-base">{altitudeKm} km</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={altitudeKm}
              onChange={(e) => setAltitudeKm(Number(e.target.value))}
              className="w-full accent-sky-500 h-2 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>0 km (Sea Level)</span>
              <span>100 km (Kármán Line Space Boundary)</span>
              <span>150 km (Thermosphere)</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-sky-800/40 bg-slate-900/60 space-y-2">
            <span className="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">
              Current Layer Profile
            </span>
            <h4 className="text-xl font-bold text-white">{currentLayer.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{currentLayer.desc}</p>
          </div>
        </div>
      )}

      {/* TAB 3: CORIOLIS & WEATHER */}
      {activeTab === 'coriolis-weather' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3 text-xs leading-relaxed">
            <span className="text-[10px] font-mono uppercase bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800/40">
              Coriolis Deflection
            </span>
            <h4 className="text-base font-bold text-white">Why Winds Rotate</h4>
            <p className="text-slate-300">
              Because Earth rotates eastward on its axis, points at the equator move much faster (~1,670 km/h) than points near the poles. Air moving toward the poles carries this extra eastward momentum, causing it to deflect to the <strong>right in the Northern Hemisphere</strong> and to the <strong>left in the Southern Hemisphere</strong>.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3 text-xs leading-relaxed">
            <span className="text-[10px] font-mono uppercase bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800/40">
              Cyclonic Systems
            </span>
            <h4 className="text-base font-bold text-white">Hurricanes & Typhoons</h4>
            <p className="text-slate-300">
              Tropical cyclones require warm ocean waters (above 26.5°C) to feed evaporating moisture. As rising warm air creates intense low surface pressure, inward-rushing winds are twisted by the Coriolis effect into counterclockwise rotation in the North and clockwise rotation in the South.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
