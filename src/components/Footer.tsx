import React from 'react';
import { ShieldAlert, Atom, BookOpen, Compass, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenAITutor: () => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAITutor, onOpenSearch }) => {
  return (
    <footer className="w-full border-t border-slate-850 bg-[#07090e] text-slate-400 text-xs">
      {/* Educational & Safety Notice Ribbon */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-slate-200">Educational Simulation Policy:</strong> SciVerse models are simplified educational representations designed for conceptual understanding. Never attempt hazardous chemical mixtures, energetic reactions, or high-voltage experiments without certified laboratory supervision and proper safety apparatus.
            </span>
          </div>
          <span className="text-[11px] text-slate-300 font-mono shrink-0">
            SI Standards Verified
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-cyan-400/60 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            </div>
            <span className="text-base font-bold text-white tracking-tight">SciVerse</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            The ultimate interactive science universe. Explore everything, understand anything through safe virtual laboratories, orbital mechanics, and physical simulations.
          </p>
          <p className="text-[11px] text-slate-300 font-mono">
            Empirical STEM Education Engine
          </p>
        </div>

        {/* Labs Col */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Interactive Laboratories</h4>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => onNavigate('physics-lab')} className="hover:text-cyan-400 transition-colors">
                Physics & Speed Simulator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('space-explorer')} className="hover:text-cyan-400 transition-colors">
                Solar System & Gravity Explorer
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('rocket-lab')} className="hover:text-cyan-400 transition-colors">
                Rocket & Launch Engineering Lab
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('energy-lab')} className="hover:text-cyan-400 transition-colors">
                Combustion & Energy Laboratory
              </button>
            </li>
          </ul>
        </div>

        {/* Learning Tools Col */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Tools & Knowledge</h4>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => onNavigate('discover')} className="hover:text-cyan-400 transition-colors">
                Science Formula Explorer
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('discover')} className="hover:text-cyan-400 transition-colors">
                SI Unit Converter
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('challenges')} className="hover:text-cyan-400 transition-colors">
                Science Challenges & Quizzes
              </button>
            </li>
            <li>
              <button onClick={onOpenAITutor} className="hover:text-cyan-400 transition-colors">
                Gemini AI Science Tutor
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('my-learning')} className="hover:text-cyan-400 transition-colors">
                Learning Tracks & Lab Notebook
              </button>
            </li>
          </ul>
        </div>

        {/* Reference Standards */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Scientific Sources</h4>
          <p className="text-slate-400 leading-relaxed">
            Data verified with authoritative scientific resources including NASA Jet Propulsion Laboratory, NIST Chemistry WebBook, Royal Society of Chemistry, and the International System of Units (SI).
          </p>
          <div className="pt-2 text-[11px] text-slate-400">
            Open educational project built for curious minds worldwide.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <span>© 2026 SciVerse — Explore Everything. Understand Anything.</span>
        <div className="flex items-center gap-4">
          <span>Dark Mode Active</span>
          <span>·</span>
          <span>SI Metric Primary</span>
          <span>·</span>
          <span>WCAG AA Accessible</span>
        </div>
      </div>
    </footer>
  );
};
