import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Sparkles, ArrowRight, BookOpen, FlaskConical, Globe, Orbit, Zap } from 'lucide-react';
import { ELEMENTS_DATA } from '../data/elementsData';
import { TOPICS_DATA } from '../data/topicsData';
import { PLANETS_DATA } from '../data/planetsData';
import { FORMULAS_DATA } from '../data/formulasData';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { CHALLENGES_DATA } from '../data/challengesData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, detailParam?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'topics' | 'elements' | 'planets' | 'formulas' | 'glossary'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const q = query.toLowerCase().trim();
    const results: Array<{
      id: string;
      type: 'topic' | 'element' | 'planet' | 'formula' | 'glossary' | 'challenge';
      title: string;
      subtitle: string;
      viewTarget: string;
      param?: string;
    }> = [];

    // Search Topics
    if (selectedFilter === 'all' || selectedFilter === 'topics') {
      TOPICS_DATA.forEach(t => {
        if (t.title.toLowerCase().includes(q) || t.shortDesc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
          results.push({
            id: `topic-${t.id}`,
            type: 'topic',
            title: t.title,
            subtitle: `${t.category} · ${t.shortDesc.slice(0, 75)}...`,
            viewTarget: 'discover',
            param: t.id
          });
        }
      });
    }

    // Search Elements
    if (selectedFilter === 'all' || selectedFilter === 'elements') {
      ELEMENTS_DATA.forEach(e => {
        if (e.name.toLowerCase().includes(q) || e.symbol.toLowerCase() === q || e.number.toString() === q || e.category.includes(q)) {
          results.push({
            id: `element-${e.number}`,
            type: 'element',
            title: `${e.number}. ${e.name} (${e.symbol})`,
            subtitle: `${e.category} · Mass ${e.mass} · State: ${e.state}`,
            viewTarget: 'discover',
            param: e.symbol
          });
        }
      });
    }

    // Search Planets
    if (selectedFilter === 'all' || selectedFilter === 'planets') {
      PLANETS_DATA.forEach(p => {
        if (p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.surfaceFeatures.toLowerCase().includes(q)) {
          results.push({
            id: `planet-${p.id}`,
            type: 'planet',
            title: p.name,
            subtitle: `${p.type.toUpperCase()} · Gravity: ${p.gravityMps2} m/s² · Distance: ${p.distanceFromSunAU} AU`,
            viewTarget: 'space-explorer',
            param: p.id
          });
        }
      });
    }

    // Search Formulas
    if (selectedFilter === 'all' || selectedFilter === 'formulas') {
      FORMULAS_DATA.forEach(f => {
        if (f.name.toLowerCase().includes(q) || f.equation.toLowerCase().includes(q) || f.field.toLowerCase().includes(q)) {
          results.push({
            id: `formula-${f.id}`,
            type: 'formula',
            title: `${f.name}: ${f.equation}`,
            subtitle: `${f.field} · ${f.description.slice(0, 80)}...`,
            viewTarget: 'discover',
            param: f.id
          });
        }
      });
    }

    // Search Glossary
    if (selectedFilter === 'all' || selectedFilter === 'glossary') {
      GLOSSARY_DATA.forEach(g => {
        if (g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)) {
          results.push({
            id: `glossary-${g.term}`,
            type: 'glossary',
            title: g.term,
            subtitle: `${g.discipline} · ${g.definition.slice(0, 80)}...`,
            viewTarget: 'discover',
            param: g.term
          });
        }
      });
    }

    // Search Challenges
    if (selectedFilter === 'all') {
      CHALLENGES_DATA.forEach(c => {
        if (c.title.toLowerCase().includes(q) || c.question.toLowerCase().includes(q)) {
          results.push({
            id: `challenge-${c.id}`,
            type: 'challenge',
            title: `Challenge: ${c.title}`,
            subtitle: `${c.difficulty} · ${c.category} (${c.points} pts)`,
            viewTarget: 'challenges',
            param: c.id
          });
        }
      });
    }

    return results.slice(0, 15);
  }, [query, selectedFilter]);

  if (!isOpen) return null;

  const handleSelectResult = (viewTarget: string, param?: string) => {
    onNavigate(viewTarget, param);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0c1220] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to discover today? (e.g. hydrogen, gravity, speed, rocket, combustion...)"
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-slate-950/40 text-xs overflow-x-auto">
          {(['all', 'topics', 'elements', 'planets', 'formulas', 'glossary'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap capitalize ${
                selectedFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {filter === 'all' ? 'All Results' : filter}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-850 flex-1">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-cyan-400/60" />
              <p className="text-sm font-medium text-slate-300">Discover the Universe</p>
              <p className="text-xs mt-1 text-slate-400">
                Type any scientific concept, chemical element, planet, equation, or laboratory to jump instantly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                {['Hydrogen', 'Bernoulli', 'Newton 2nd Law', 'Mars', 'Tsiolkovsky', 'Combustion'].map((example) => (
                  <button
                    key={example}
                    onClick={() => setQuery(example)}
                    className="px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-slate-800 text-cyan-300 border border-slate-700/60"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              <p className="text-sm">No matches found for "{query}"</p>
              <p className="text-xs mt-1 text-slate-400">Try searching for an element, formula, planet, or topic.</p>
            </div>
          ) : (
            searchResults.map((res) => (
              <div
                key={res.id}
                onClick={() => handleSelectResult(res.viewTarget, res.param)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/60 cursor-pointer group transition-colors"
              >
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/90 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      {res.type}
                    </span>
                    <span className="text-sm font-medium text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {res.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {res.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-slate-850 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC to close</span>
          <span>Instant Jump to Simulation</span>
        </div>
      </div>
    </div>
  );
};
