import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Award, CheckCircle2, ArrowRight, Clock, 
  FlaskConical, Gauge, Orbit, Rocket, Zap, Play 
} from 'lucide-react';
import { LabNote } from '../types/science';

interface MyLearningViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenNotebook: () => void;
}

interface LearningTrack {
  id: string;
  title: string;
  modulesCount: number;
  completedCount: number;
  category: string;
  destView: string;
}

export const MyLearningView: React.FC<MyLearningViewProps> = ({ onNavigate, onOpenNotebook }) => {
  const [savedNotes, setSavedNotes] = useState<LabNote[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    try {
      const notes = localStorage.getItem('sciverse_lab_notes');
      if (notes) setSavedNotes(JSON.parse(notes));
      const s = localStorage.getItem('sciverse_score');
      if (s) setScore(Number(s));
    } catch (e) {}
  }, []);

  const learningTracks: LearningTrack[] = [
    { id: 'track-1', title: '1. Science Foundations & Empirical Rigor', modulesCount: 6, completedCount: 4, category: 'General', destView: 'discover' },
    { id: 'track-2', title: '2. Chemistry from Atoms to Reactions', modulesCount: 8, completedCount: 5, category: 'Chemistry', destView: 'discover' },
    { id: 'track-3', title: '3. The Physics of Speed and Motion', modulesCount: 7, completedCount: 6, category: 'Physics', destView: 'physics-lab' },
    { id: 'track-4', title: '4. Water, Weather and Fluid Dynamics', modulesCount: 6, completedCount: 3, category: 'Fluids', destView: 'water-lab' },
    { id: 'track-5', title: '5. Electricity, Circuits and Energy', modulesCount: 7, completedCount: 4, category: 'Electromagnetism', destView: 'electricity-lab' },
    { id: 'track-6', title: '6. Rocket Science & Spaceflight Engineering', modulesCount: 8, completedCount: 6, category: 'Aerospace', destView: 'rocket-lab' },
    { id: 'track-7', title: '7. Astronomy, Cosmology & Black Holes', modulesCount: 9, completedCount: 7, category: 'Space', destView: 'space-explorer' },
    { id: 'track-8', title: '8. Engineering, Simple Machines & Robotics', modulesCount: 6, completedCount: 3, category: 'Engineering', destView: 'biology-earth-lab' },
    { id: 'track-9', title: '9. Earth, Plate Tectonics & Climate Science', modulesCount: 6, completedCount: 4, category: 'Earth Science', destView: 'biology-earth-lab' },
    { id: 'track-10', title: '10. Advanced Physics & Quantum Ideas', modulesCount: 8, completedCount: 2, category: 'Quantum', destView: 'discover' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Learning & Scientific Portfolio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track structured learning paths, review recorded lab notebook investigations, and monitor your STEM masteries.
          </p>
        </div>

        {/* Local Storage Indicator Banner */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Local Device Progress Saved</span>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-1">
          <span className="text-slate-400 text-xs uppercase font-mono">Science Mastery Score</span>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">{score} PTS</div>
          <p className="text-[11px] text-slate-400">Earned through challenges and lab simulations</p>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-1">
          <span className="text-slate-400 text-xs uppercase font-mono">Saved Lab Notebook Entries</span>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono">{savedNotes.length} LOGS</div>
          <button
            onClick={onOpenNotebook}
            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono"
          >
            Open Virtual Notebook →
          </button>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-1">
          <span className="text-slate-400 text-xs uppercase font-mono">Curriculum Tracks Active</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">10 PATHS</div>
          <p className="text-[11px] text-slate-400">Standard STEM competencies progression</p>
        </div>
      </div>

      {/* 10 STRUCTURED LEARNING TRACKS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-wide">
            Structured STEM Learning Paths
          </h3>
          <span className="text-xs font-mono text-slate-400">10 Comprehensive Tracks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningTracks.map((track) => {
            const pct = Math.round((track.completedCount / track.modulesCount) * 100);
            return (
              <div
                key={track.id}
                onClick={() => onNavigate(track.destView)}
                className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] hover:border-cyan-500/50 cursor-pointer group transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-cyan-400 px-2 py-0.5 rounded border border-slate-800">
                    {track.category}
                  </span>
                  <span className="font-mono text-slate-400">
                    {track.completedCount} / {track.modulesCount} Completed ({pct}%)
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {track.title}
                </h4>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-cyan-400">
                  <span>Continue Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RECENT LAB INVESTIGATION NOTES LOG */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-wide">
            Saved Laboratory Experiments
          </h3>
          <button
            onClick={onOpenNotebook}
            className="text-xs text-amber-400 hover:text-amber-300 font-mono"
          >
            + Create New Investigation
          </button>
        </div>

        {savedNotes.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed border-slate-800 bg-[#0c1220]/40 text-center space-y-2 text-xs">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="font-semibold text-slate-300">No Experiment Notes Recorded Yet</h4>
            <p className="text-slate-500 max-w-sm mx-auto">
              Open the Virtual Lab Notebook while running experiments to record your questions, hypotheses, variables, and conclusions.
            </p>
            <button
              onClick={onOpenNotebook}
              className="mt-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              Open Notebook Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedNotes.map((note) => (
              <div
                key={note.id}
                onClick={onOpenNotebook}
                className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] hover:border-amber-500/50 cursor-pointer space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{note.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">{note.date}</span>
                </div>
                <p className="text-slate-300 line-clamp-2">
                  <strong>Hypothesis: </strong>{note.hypothesis}
                </p>
                <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] text-amber-400">
                  <span>View Full Report & Measurements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
