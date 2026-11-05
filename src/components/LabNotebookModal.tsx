import React, { useState, useEffect } from 'react';
import { BookOpen, X, Plus, Trash2, Printer, Save, CheckCircle, FileText, Download } from 'lucide-react';
import { LabNote } from '../types/science';

interface LabNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeExperimentTitle?: string;
}

export const LabNotebookModal: React.FC<LabNotebookModalProps> = ({
  isOpen,
  onClose,
  activeExperimentTitle = 'Chemical Reaction & Dynamics Investigation',
}) => {
  const [savedNotes, setSavedNotes] = useState<LabNote[]>([]);
  const [currentNote, setCurrentNote] = useState<LabNote>({
    id: `note-${Date.now()}`,
    title: activeExperimentTitle,
    date: new Date().toLocaleDateString(),
    experimentType: 'Laboratory Investigation',
    question: 'How do changing temperature, concentration, or variables alter the observable reaction outcome?',
    hypothesis: 'If the kinetic temperature is elevated, then molecular collision rates increase, resulting in accelerated reaction velocity.',
    independentVar: 'Temperature (°C) / Quantity (mL or g)',
    dependentVar: 'Reaction Rate / Gas Volume / Velocity',
    controlledVars: 'Atmospheric pressure (1 atm), container volume, initial reagent purity',
    observations: 'Gas bubbles evolved vigorously upon combining reagents; temperature dropped noticeably by ~2.8°C indicating an endothermic reaction pathway.',
    conclusion: 'The empirical data supports the hypothesis that proton transfer occurs rapidly, liberating CO₂ gas and absorbing thermal energy from the aqueous solution.',
    dataPoints: [
      { variable: 'Trial 1 (20°C)', result: '14.2 mL gas evolved in 10s' },
      { variable: 'Trial 2 (35°C)', result: '28.6 mL gas evolved in 10s' },
      { variable: 'Trial 3 (50°C)', result: '51.4 mL gas evolved in 10s' }
    ]
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Load saved notes from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sciverse_lab_notes');
      if (stored) {
        setSavedNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage not available');
    }
  }, []);

  if (!isOpen) return null;

  const handleSaveNote = () => {
    const updated = [currentNote, ...savedNotes.filter((n) => n.id !== currentNote.id)];
    setSavedNotes(updated);
    try {
      localStorage.setItem('sciverse_lab_notes', JSON.stringify(updated));
    } catch (e) {}
    setNotification('Experiment note successfully recorded in local lab logbook!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLoadNote = (note: LabNote) => {
    setCurrentNote(note);
  };

  const handleDeleteNote = (id: string) => {
    const updated = savedNotes.filter((n) => n.id !== id);
    setSavedNotes(updated);
    try {
      localStorage.setItem('sciverse_lab_notes', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddDataRow = () => {
    const count = (currentNote.dataPoints?.length || 0) + 1;
    setCurrentNote((prev) => ({
      ...prev,
      dataPoints: [
        ...(prev.dataPoints || []),
        { variable: `Trial ${count}`, result: 'Measurement / value' }
      ]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-4xl bg-[#0c1220] border border-slate-700 rounded-xl shadow-2xl flex flex-col h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-600/50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">Virtual Scientific Lab Notebook</h3>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                  Experimental Log
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Record empirical hypotheses, experimental controls, measured data, and conclusions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
              title="Print or export experiment report as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Left Saved Entries & Right Active Editor */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Saved History Sidebar */}
          <div className="md:col-span-1 p-4 bg-slate-950/60 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Saved Logs</h4>
              <button
                onClick={() => {
                  setCurrentNote({
                    id: `note-${Date.now()}`,
                    title: 'New Scientific Investigation',
                    date: new Date().toLocaleDateString(),
                    experimentType: 'General Experiment',
                    question: '',
                    hypothesis: '',
                    independentVar: '',
                    dependentVar: '',
                    controlledVars: '',
                    observations: '',
                    conclusion: '',
                    dataPoints: [{ variable: 'Trial 1', result: '' }]
                  });
                }}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> New Log
              </button>
            </div>

            <div className="space-y-2">
              {savedNotes.length === 0 ? (
                <div className="text-xs text-slate-400 py-6 text-center">
                  No previous logs saved yet. Fill the fields and click "Save Note".
                </div>
              ) : (
                savedNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => handleLoadNote(note)}
                    className={`p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                      currentNote.id === note.id
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate pr-1">{note.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {note.date} · {note.experimentType}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Note Editor */}
          <div className="md:col-span-3 p-6 overflow-y-auto space-y-5 bg-[#0c1220]">
            {notification && (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-600/50 rounded-lg text-xs text-emerald-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            {/* Title & Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-400">Investigation Title</label>
                <input
                  type="text"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-400">Date of Experiment</label>
                <input
                  type="text"
                  value={currentNote.date}
                  onChange={(e) => setCurrentNote({ ...currentNote, date: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Scientific Method: Question & Hypothesis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-cyan-400">1. Research Question / Problem</label>
                <textarea
                  rows={2}
                  value={currentNote.question}
                  onChange={(e) => setCurrentNote({ ...currentNote, question: e.target.value })}
                  placeholder="What physical or chemical relationship are you testing?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-cyan-400">2. Testable Hypothesis</label>
                <textarea
                  rows={2}
                  value={currentNote.hypothesis}
                  onChange={(e) => setCurrentNote({ ...currentNote, hypothesis: e.target.value })}
                  placeholder="If [independent variable changes], then [dependent outcome] because..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Variables Classification (Rigorous STEM standards) */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <span>3. Experimental Variables Breakdown</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Independent Variable</span>
                  <input
                    type="text"
                    value={currentNote.independentVar}
                    onChange={(e) => setCurrentNote({ ...currentNote, independentVar: e.target.value })}
                    placeholder="Factor YOU deliberately change"
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Dependent Variable</span>
                  <input
                    type="text"
                    value={currentNote.dependentVar}
                    onChange={(e) => setCurrentNote({ ...currentNote, dependentVar: e.target.value })}
                    placeholder="Factor being MEASURED"
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase">Controlled Variables</span>
                  <input
                    type="text"
                    value={currentNote.controlledVars}
                    onChange={(e) => setCurrentNote({ ...currentNote, controlledVars: e.target.value })}
                    placeholder="Factors kept strictly constant"
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Experimental Data Points Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase text-slate-300">4. Measured Empirical Data Table</label>
                <button
                  onClick={handleAddDataRow}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Trial Row
                </button>
              </div>
              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-mono">
                    <tr>
                      <th className="p-2.5">Trial / Condition (Independent)</th>
                      <th className="p-2.5">Observed Measurement (Dependent)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/30">
                    {currentNote.dataPoints?.map((dp, idx) => (
                      <tr key={idx}>
                        <td className="p-2">
                          <input
                            type="text"
                            value={dp.variable}
                            onChange={(e) => {
                              const points = [...(currentNote.dataPoints || [])];
                              points[idx].variable = e.target.value;
                              setCurrentNote({ ...currentNote, dataPoints: points });
                            }}
                            className="w-full bg-transparent border-0 text-slate-200 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 font-mono">
                          <input
                            type="text"
                            value={dp.result}
                            onChange={(e) => {
                              const points = [...(currentNote.dataPoints || [])];
                              points[idx].result = e.target.value;
                              setCurrentNote({ ...currentNote, dataPoints: points });
                            }}
                            className="w-full bg-transparent border-0 text-cyan-300 focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Qualitative Observations & Conclusion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-300">5. Qualitative Observations</label>
                <textarea
                  rows={3}
                  value={currentNote.observations}
                  onChange={(e) => setCurrentNote({ ...currentNote, observations: e.target.value })}
                  placeholder="Record color changes, gas bubbling, sound, precipitate, heat..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-300">6. Scientific Conclusion</label>
                <textarea
                  rows={3}
                  value={currentNote.conclusion}
                  onChange={(e) => setCurrentNote({ ...currentNote, conclusion: e.target.value })}
                  placeholder="Does your data validate or disprove your hypothesis? Explain why."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Notes persist in browser local storage.
              </span>
              <button
                onClick={handleSaveNote}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-amber-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Note in Logbook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
