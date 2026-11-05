import React, { useRef, useEffect, useState } from 'react';
import { 
  FlaskConical, Gauge, Waves, Wind, Sparkles, Rocket, Flame, 
  Orbit, Zap, Atom, HeartPulse, Mountain, Cog, Radio, Radiation, 
  Cpu, ArrowRight, Play, BookOpen, Compass, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';
import { DAILY_FACTS, DISCOVERIES_TIMELINE } from '../data/discoveriesTimeline';
import { CHALLENGES_DATA } from '../data/challengesData';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenSearch: () => void;
  onOpenAITutor: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenSearch, onOpenAITutor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [factIndex, setFactIndex] = useState(0);
  const [challengeAnswered, setChallengeAnswered] = useState<number | null>(null);

  // Rotating Science Fact
  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % DAILY_FACTS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  // Futuristic Canvas Universe Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for cosmos & molecular lattice
    const particleCount = Math.min(65, Math.floor(width / 20));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, '
    }));

    // Orbiting celestial bodies in canvas
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep celestial radial background
      const grad = ctx.createRadialGradient(width * 0.5, height * 0.35, 20, width * 0.5, height * 0.5, width * 0.75);
      grad.addColorStop(0, 'rgba(8, 20, 40, 0.85)');
      grad.addColorStop(0.5, 'rgba(6, 12, 24, 0.95)');
      grad.addColorStop(1, '#07090e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Orbiting planetary rings
      ctx.save();
      ctx.translate(width * 0.5, height * 0.45);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1;

      // Orbit 1
      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 80, -0.2, 0, Math.PI * 2);
      ctx.stroke();

      // Planet 1
      const p1x = Math.cos(angle) * 220;
      const p1y = Math.sin(angle) * 80;
      ctx.fillStyle = '#22d3ee';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p1x, p1y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Orbit 2 (Counter-orbiting)
      ctx.beginPath();
      ctx.ellipse(0, 0, 360, 130, 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.stroke();

      const p2x = Math.cos(-angle * 0.6) * 360;
      const p2y = Math.sin(-angle * 0.6) * 130;
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p2x, p2y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      angle += 0.006;

      // Draw particle lattice
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `${p.color}0.7)`;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with subtle molecular bonds
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-cyan-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-blue-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-cyan-300" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-violet-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-orange-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Orbit': return <Orbit className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-300" />;
      case 'Atom': return <Atom className="w-5 h-5 text-teal-300" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-emerald-400" />;
      case 'Cog': return <Cog className="w-5 h-5 text-slate-300" />;
      case 'Radio': return <Radio className="w-5 h-5 text-purple-400" />;
      case 'Radiation': return <Radiation className="w-5 h-5 text-yellow-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      default: return <Atom className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getDestinationForCategory = (topicId: string): string => {
    switch (topicId) {
      case 'chemistry-reactions': return 'discover';
      case 'physics-speed': return 'physics-lab';
      case 'water-fluids': return 'water-lab';
      case 'wind-weather': return 'wind-lab';
      case 'space-astronomy': return 'space-explorer';
      case 'rockets-spacecraft': return 'rocket-lab';
      case 'combustion-energy': return 'energy-lab';
      case 'electricity-magnetism': return 'electricity-lab';
      case 'earth-volcanoes': return 'volcano-lab';
      case 'biology-human-body':
      case 'engineering-machines':
      case 'sound-light-waves': return 'biology-earth-lab';
      default: return 'discover';
    }
  };

  const todaysChallenge = CHALLENGES_DATA[1]; // Density challenge

  return (
    <div className="w-full flex flex-col space-y-12 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[580px] w-full flex items-center justify-center overflow-hidden border-b border-slate-800">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          {/* Subtitle kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <span>Next-Generation STEM Simulator</span>
            <span>·</span>
            <span>SI Standards Verified</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Explore Everything.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
              Understand Anything.
            </span>
          </h1>

          {/* Supporting Pitch */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The ultimate interactive science platform. Simulate relativistic speed, navigate planetary orbits, design multi-stage rockets, explore fluid mechanics, and discover the physical laws governing reality.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('physics-lab')}
              className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-600/30 hover:scale-105 flex items-center gap-2"
            >
              <Gauge className="w-4 h-4" />
              <span>Launch Physics Lab</span>
            </button>

            <button
              onClick={() => onNavigate('space-explorer')}
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Orbit className="w-4 h-4 text-violet-400" />
              <span>Explore the Universe</span>
            </button>

            <button
              onClick={() => onNavigate('physics-lab')}
              className="px-6 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-cyan-800/40 hover:border-cyan-500/60 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-cyan-400" />
              <span>Start Experimenting</span>
            </button>
          </div>

          {/* Quick Search trigger bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-750 text-slate-400 hover:border-cyan-500/50 hover:text-slate-200 text-xs transition-colors shadow-xl"
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>What do you want to discover today? (Search elements, formulas, planets...)</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                ⌘K / Click
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ROTATING DISCOVERY & DAILY FACT RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#0c1220]/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold">
                  Verified Scientific Fact #{factIndex + 1}
                </span>
                <span className="text-[11px] text-slate-400">·</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Source: {DAILY_FACTS[factIndex].source}
                </span>
              </div>
              <p className="text-xs text-slate-200">
                "{DAILY_FACTS[factIndex].fact}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setFactIndex((prev) => (prev + 1) % DAILY_FACTS.length)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              Next Fact
            </button>
            <button
              onClick={onOpenAITutor}
              className="text-xs px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 transition-colors"
            >
              Ask AI Tutor
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED WORKBENCHES & CHALLENGE OF THE DAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Discovery Card */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-[#0c1322] to-[#07090e] space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Featured Discovery
            </span>
            <span className="text-xs text-slate-400 font-mono">2026 Space Observation</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            James Webb Space Telescope: Probing the Earliest Cosmic Epochs
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            JWST's 6.5-meter gold-coated beryllium mirror and infrared instruments have detected primordial galaxies formed a mere 300 million years following the Big Bang, challenging earlier stellar evolution timelines and measuring atmospheric water vapor and methane in transiting exoplanets.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('space-explorer')}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Explore the Solar System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('rocket-lab')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <span>Rocket Engineering Lab</span>
            </button>
          </div>
        </div>

        {/* Interactive Challenge of the Day */}
        <div className="p-6 rounded-xl border border-amber-900/40 bg-gradient-to-br from-[#131118] to-[#0c0f18] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-amber-400 font-semibold">
              Challenge of the Day
            </span>
            <span className="text-xs text-amber-300/80 font-mono">+{todaysChallenge.points} pts</span>
          </div>

          <h4 className="text-sm font-bold text-slate-100">
            {todaysChallenge.title}
          </h4>
          <p className="text-xs text-slate-300">
            {todaysChallenge.question}
          </p>

          {/* Options */}
          <div className="space-y-2 pt-1">
            {todaysChallenge.options.map((opt, idx) => {
              const isSelected = challengeAnswered === idx;
              const isCorrect = idx === todaysChallenge.correctIndex;
              let btnClass = 'w-full text-left p-2.5 rounded-lg border text-xs transition-colors ';
              if (challengeAnswered === null) {
                btnClass += 'bg-slate-900/80 border-slate-750 text-slate-300 hover:border-cyan-500/60 hover:text-white';
              } else if (isCorrect) {
                btnClass += 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
              } else if (isSelected && !isCorrect) {
                btnClass += 'bg-rose-950/80 border-rose-500 text-rose-200';
              } else {
                btnClass += 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setChallengeAnswered(idx)}
                  className={btnClass}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {challengeAnswered !== null && (
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-cyan-400">Explanation: </strong>
              {todaysChallenge.explanation}
            </div>
          )}

          <div className="pt-1">
            <button
              onClick={() => onNavigate('challenges')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              <span>View All Science Challenges</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* THE 16 SCIENCE CATEGORIES UNIVERSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              The Interactive Science Universe
            </h2>
            <p className="text-xs text-slate-400">
              Select any domain to launch its dedicated virtual laboratory, experiment, or simulation
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
            16 Specialized Disciplines
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOPICS_DATA.map((topic, index) => {
            const dest = getDestinationForCategory(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => onNavigate(dest, topic.id)}
                className="lab-card-interactive p-5 rounded-xl cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:scale-110 transition-all">
                      {getCategoryIcon(topic.iconName)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {topic.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                  <span>Enter Lab & Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* POPULAR SIMULATIONS QUICK LAUNCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-200">Featured & Popular Laboratories</h3>
          <span className="text-xs font-mono text-cyan-400">Interactive Simulations</span>
        </div>
        
        {/* NEW LAB MODULE FEATURED SHOWCASE: VOLCANO EXPERIMENT LAB */}
        <div 
          onClick={() => onNavigate('volcano-lab')}
          className="animated-gradient-border cursor-pointer group shadow-2xl transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="animated-gradient-border-inner p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-950/80 border border-orange-500/50 text-orange-400 text-[10px] font-mono uppercase tracking-wider font-bold animate-pulse">
                  ✨ NEW LAB MODULE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-[10px] font-mono">
                  Geodynamics & Magma Physics
                </span>
              </div>
              <h4 className="text-2xl font-extrabold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-300 transition-all flex items-center gap-2.5">
                <Mountain className="w-6 h-6 text-orange-500 animate-bounce" />
                <span>Volcano Experiment Lab</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Step inside the high-temperature chamber of Earth's crust. Regulate magma viscosity, volatile gas bubbles, and lithostatic pressure across Stratovolcanoes, Shields, and Supervolcano calderas to simulate real-time Plinian explosive columns up to 40 km high.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); onNavigate('volcano-lab'); }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Launch Volcano Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] font-mono text-center text-slate-400">
                Interactive Canvas Physics & Seismograph
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div
            onClick={() => onNavigate('energy-lab')}
            className="lab-card-interactive p-4 rounded-xl cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                Thermodynamics
              </span>
              <Flame className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
            </div>
            <h4 className="text-sm font-semibold text-white group-hover:text-amber-300">
              Fire Triangle & Energy Lab
            </h4>
            <p className="text-xs text-slate-400">
              Manipulate fuel, oxygen, and ignition temperature. Observe complete vs. incomplete combustion and 4-stroke thermodynamic engine cycles.
            </p>
          </div>

          <div
            onClick={() => onNavigate('physics-lab')}
            className="lab-card-interactive p-4 rounded-xl cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                Kinematics
              </span>
              <Gauge className="w-4 h-4 text-blue-400 group-hover:scale-125 transition-transform" />
            </div>
            <h4 className="text-sm font-semibold text-white group-hover:text-blue-300">
              Speed & Track Motion Simulator
            </h4>
            <p className="text-xs text-slate-400">
              Compare walking humans to bullet trains, supersonic jets, and rockets. Observe real-time distance-time and velocity-time graphs.
            </p>
          </div>

          <div
            onClick={() => onNavigate('rocket-lab')}
            className="lab-card-interactive p-4 rounded-xl cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                Aerospace
              </span>
              <Rocket className="w-4 h-4 text-orange-400 group-hover:scale-125 transition-transform" />
            </div>
            <h4 className="text-sm font-semibold text-white group-hover:text-orange-300">
              Rocket Engineering & Staging Launch
            </h4>
            <p className="text-xs text-slate-400">
              Configure propellant, calculate specific impulse and Tsiolkovsky Δv, then execute a full countdown launch into orbit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
