import React, { useState } from 'react';
import { 
  BookOpen, Compass, Calculator, Clock, HelpCircle, 
  Search, ArrowRight, ChevronDown, ChevronUp, Check, ExternalLink 
} from 'lucide-react';
import { TOPICS_DATA } from '../data/topicsData';
import { FORMULAS_DATA } from '../data/formulasData';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { DISCOVERIES_TIMELINE } from '../data/discoveriesTimeline';

interface DiscoverViewProps {
  initialTopicId?: string;
  onNavigateLab?: (view: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({ initialTopicId, onNavigateLab }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'formulas' | 'converter' | 'timeline' | 'glossary' | 'what-if'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || TOPICS_DATA[0].id);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(initialTopicId || null);

  // Unit Converter State
  const [converterType, setConverterType] = useState<'speed' | 'temperature' | 'pressure' | 'energy'>('speed');
  const [inputValue, setInputValue] = useState<number>(100);

  // "What would happen if?" scenarios data
  const whatIfScenarios = [
    {
      title: 'What if Earth stopped spinning abruptly?',
      summary: 'Atmosphere and oceans would continue moving at ~1,670 km/h eastward, causing supersonic surface winds and global tsunamis.',
      assumptions: 'Assumes instant angular deceleration from current equatorial velocity ($460\text{ m/s}$).',
      science: 'By Newton’s First Law of Inertia, everything not anchored into bedrock would retain its eastward momentum. Additionally, the centrifugal equatorial bulge would collapse, draining water toward the poles into two massive polar oceans separated by a dry equatorial supercontinent.'
    },
    {
      title: 'What if Earth’s gravity were instantly doubled?',
      summary: 'Atmospheric pressure would double, human weight would double, and falling acceleration would reach 19.6 m/s².',
      assumptions: 'Assumes Earth mass doubled ($2M_E$) while keeping radius constant.',
      science: 'Structural bridges and buildings engineered with safety factors $<2.0$ would collapse under dead load. Trees would be capped at much shorter heights due to hydrostatic sap transport limits ($P = \rho g h$). Atmospheric scale height would compress, increasing air density and surface pressure to ~2 atmospheres.'
    },
    {
      title: 'What if sound could travel through the vacuum of space?',
      summary: 'The thermonuclear roar of the Sun’s core would reach Earth as a deafening ~100 to 125 decibel acoustic noise day and night.',
      assumptions: 'Hypothetical scenario ignoring the physical requirement of a compressive dielectric/atomic medium for longitudinal acoustic waves.',
      science: 'The Sun produces immense acoustic power through magnetic reconnections and convective granulation cells. At 150 million kilometers distance, acoustic geometric spreading would still deliver continuous sound comparable to standing beside a operating jet engine or rock concert.'
    }
  ];

  const currentTopic = TOPICS_DATA.find((t) => t.id === selectedTopicId) || TOPICS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Science Knowledge Base & Discovery Suite
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Structured encyclopedic articles, formula symbol breakdowns, SI unit converters, and discovery timelines.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'topics' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Science Disciplines
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'formulas' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Formula Explorer
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'converter' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            SI Unit Converter
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'timeline' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Discovery Timeline
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'glossary' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Glossary
          </button>
          <button
            onClick={() => setActiveTab('what-if')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeTab === 'what-if' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            What If Scenarios
          </button>
        </div>
      </div>

      {/* TAB 1: 16 DISCIPLINES DEEP DIVE */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Category Index */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0c1220] space-y-2 max-h-[650px] overflow-y-auto">
            <span className="text-xs font-mono uppercase text-slate-400 block px-2 pb-1">
              Select Science Subject
            </span>
            {TOPICS_DATA.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopicId(t.id)}
                className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${
                  selectedTopicId === t.id
                    ? 'bg-cyan-950/70 border border-cyan-500/50 text-cyan-200 font-bold'
                    : 'bg-slate-900/50 border border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="truncate pr-2">{t.title}</span>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{t.category}</span>
              </button>
            ))}
          </div>

          {/* Right Detailed Article & Knowledge Check */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-5 text-xs">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                {currentTopic.category} Curriculum
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{currentTopic.title}</h2>
              <p className="text-slate-300 mt-2 leading-relaxed text-sm">
                {currentTopic.beginnerExplanation}
              </p>
            </div>

            {/* Deep Technical Explanation */}
            <div className="space-y-2">
              <h4 className="font-mono uppercase text-slate-300 font-bold text-xs">
                In-Depth Scientific Analysis & Mathematical Rigor
              </h4>
              <p className="text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800">
                {currentTopic.deepExplanation}
              </p>
            </div>

            {/* Core Equations */}
            <div className="space-y-2">
              <h4 className="font-mono uppercase text-slate-300 font-bold text-xs">
                Governing Equations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTopic.keyEquations.map((eq, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-mono text-cyan-300 font-bold block text-sm">{eq.formula}</span>
                    <p className="text-slate-400 text-[11px]">{eq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Applications & Common Misconceptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white block">Real-World Technologies:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                  {currentTopic.applications.map((app, i) => (
                    <li key={i}>{app}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-1.5">
                <span className="font-bold text-amber-200 block">Common Misconceptions:</span>
                <ul className="list-disc list-inside space-y-0.5 text-amber-300/80">
                  {currentTopic.commonMisconceptions.map((misc, i) => (
                    <li key={i}>{misc}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Knowledge Check Interactive Section */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                Quick Knowledge Check
              </span>
              <p className="text-white font-medium text-xs">
                {currentTopic.knowledgeCheck.question}
              </p>
              <div className="p-3 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                <strong className="text-emerald-400">Answer: </strong>
                {currentTopic.knowledgeCheck.options[currentTopic.knowledgeCheck.correctIndex]} — {currentTopic.knowledgeCheck.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FORMULA EXPLORER */}
      {activeTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FORMULAS_DATA.map((form) => (
            <div key={form.id} className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-mono text-cyan-400 uppercase text-[10px] font-bold">{form.field}</span>
                <span className="text-xs text-slate-400 font-mono">SI Standard</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{form.name}</h3>
                <div className="text-xl font-mono font-bold text-cyan-300 py-2">
                  {form.equation}
                </div>
                <p className="text-slate-300 leading-relaxed">{form.description}</p>
              </div>

              {/* Variables breakdown table */}
              <div className="space-y-1.5 pt-2 border-t border-slate-850">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Variable Definitions & Units:</span>
                <div className="space-y-1 font-mono text-[11px]">
                  {form.variables.map((v, i) => (
                    <div key={i} className="flex items-baseline justify-between p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
                      <span className="text-cyan-300 font-bold">{v.symbol}</span>
                      <span className="text-slate-300">{v.meaning}</span>
                      <span className="text-slate-400 text-[10px]">[{v.siUnit}]</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                <strong>Real Application: </strong>{form.realWorldExample}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: UNIT CONVERTER */}
      {activeTab === 'converter' && (
        <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] max-w-2xl mx-auto space-y-6 text-xs">
          <div>
            <h3 className="text-lg font-bold text-white">Scientific SI Multi-Unit Converter</h3>
            <p className="text-slate-400">
              Convert across standard International System of Units (SI) and imperial quantities without rounding errors.
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            {(['speed', 'temperature', 'pressure', 'energy'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setConverterType(type)}
                className={`px-3 py-1.5 rounded font-mono uppercase transition-colors capitalize ${
                  converterType === type ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="space-y-1">
            <label className="text-slate-400 font-mono uppercase text-[11px]">Input Numerical Value:</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-base text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Computed Conversions Grid */}
          <div className="space-y-2 pt-2 border-t border-slate-800 font-mono">
            {converterType === 'speed' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Metres / Second (SI)</span>
                  <span className="text-lg font-bold text-cyan-300">{(inputValue / 3.6).toFixed(2)} m/s</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Kilometres / Hour</span>
                  <span className="text-lg font-bold text-white">{inputValue} km/h</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Miles / Hour</span>
                  <span className="text-lg font-bold text-white">{(inputValue * 0.621371).toFixed(2)} mph</span>
                </div>
              </div>
            )}

            {converterType === 'temperature' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Celsius (°C)</span>
                  <span className="text-lg font-bold text-white">{inputValue} °C</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Kelvin (SI Base)</span>
                  <span className="text-lg font-bold text-cyan-300">{(inputValue + 273.15).toFixed(2)} K</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Fahrenheit (°F)</span>
                  <span className="text-lg font-bold text-white">{((inputValue * 9) / 5 + 32).toFixed(1)} °F</span>
                </div>
              </div>
            )}

            {converterType === 'pressure' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Pascals (SI: N/m²)</span>
                  <span className="text-lg font-bold text-cyan-300">{(inputValue * 1000).toLocaleString()} Pa</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Atmospheres (atm)</span>
                  <span className="text-lg font-bold text-white">{(inputValue / 101.325).toFixed(3)} atm</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Bar</span>
                  <span className="text-lg font-bold text-white">{(inputValue / 100).toFixed(3)} bar</span>
                </div>
              </div>
            )}

            {converterType === 'energy' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Joules (SI)</span>
                  <span className="text-lg font-bold text-cyan-300">{inputValue} J</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Kilocalories (kcal)</span>
                  <span className="text-lg font-bold text-white">{(inputValue / 4184).toFixed(4)} kcal</span>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Watt-Hours (Wh)</span>
                  <span className="text-lg font-bold text-white">{(inputValue / 3600).toFixed(4)} Wh</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: DISCOVERY TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-l-2 border-cyan-500/40 ml-4 pl-6 space-y-8">
            {DISCOVERIES_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#07090e] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />

                <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-400 font-bold text-sm">{item.year}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded">
                      {item.field}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{item.discovery}</h3>
                  <div className="text-slate-400 font-medium">Discovered by: {item.scientist}</div>
                  <p className="text-slate-300 leading-relaxed pt-1 border-t border-slate-850">
                    {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GLOSSARY_DATA.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-[#0c1220] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{item.term}</h4>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {item.discipline}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{item.definition}</p>
              <div className="pt-2 border-t border-slate-850 text-slate-400">
                <strong>Example: </strong>{item.example}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: "WHAT WOULD HAPPEN IF?" */}
      {activeTab === 'what-if' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {whatIfScenarios.map((sc, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-slate-800 bg-[#0c1220] space-y-3 text-xs">
              <span className="font-mono text-amber-400 font-bold uppercase text-[10px]">
                Conceptual Physics Scenario #{idx + 1}
              </span>
              <h3 className="text-base font-bold text-white">{sc.title}</h3>
              <p className="text-cyan-300 font-medium text-xs">{sc.summary}</p>
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-400 font-mono text-[11px]">
                <strong>Physical Assumptions: </strong>{sc.assumptions}
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">
                {sc.science}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
