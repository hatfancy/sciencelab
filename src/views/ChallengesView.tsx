import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { CHALLENGES_DATA } from '../data/challengesData';
import { ChallengeItem } from '../types/science';

export const ChallengesView: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Score & Streak tracking
  const [totalScore, setTotalScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('sciverse_score') || 0);
    } catch (e) {
      return 0;
    }
  });

  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const filteredChallenges = CHALLENGES_DATA.filter(
    (c) => selectedDifficulty === 'All' || c.difficulty === selectedDifficulty
  );

  const currentChallenge = filteredChallenges[activeChallengeIndex] || filteredChallenges[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentChallenge.correctIndex) {
      const newScore = totalScore + currentChallenge.points;
      setTotalScore(newScore);
      setCurrentStreak((prev) => prev + 1);
      try {
        localStorage.setItem('sciverse_score', String(newScore));
      } catch (e) {}
    } else {
      setCurrentStreak(0);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setActiveChallengeIndex((prev) => (prev + 1) % filteredChallenges.length);
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Science Challenges & Missions
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test your empirical knowledge across physics, chemistry, astronomy, and fluid dynamics. Earn score points and build your streak.
          </p>
        </div>

        {/* Score & Streak HUD */}
        <div className="flex items-center gap-4 bg-[#0c1220] border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Total Score</span>
            <span className="text-lg font-bold text-amber-400">{totalScore} PTS</span>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <span className="text-slate-400 block text-[10px] uppercase">Current Streak</span>
            <span className="text-lg font-bold text-cyan-400">{currentStreak} 🔥</span>
          </div>
        </div>
      </div>

      {/* Difficulty Tier Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs w-fit">
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((tier) => (
          <button
            key={tier}
            onClick={() => {
              setSelectedDifficulty(tier);
              setActiveChallengeIndex(0);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedDifficulty === tier ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Main Challenge Card */}
      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl border border-slate-800 bg-[#0c1220] space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {currentChallenge.category}
            </span>
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
              currentChallenge.difficulty === 'Beginner'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : currentChallenge.difficulty === 'Intermediate'
                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                : 'bg-purple-950 text-purple-300 border border-purple-800'
            }`}>
              {currentChallenge.difficulty}
            </span>
          </div>
          <span className="font-mono text-amber-400 font-bold text-xs">
            +{currentChallenge.points} Points
          </span>
        </div>

        {/* Question */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-400">
            Mission #{activeChallengeIndex + 1} of {filteredChallenges.length}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {currentChallenge.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentChallenge.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentChallenge.correctIndex;

            let btnStyle = 'w-full p-3.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ';
            if (!isAnswered) {
              btnStyle += 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500 hover:bg-slate-850';
            } else if (isCorrect) {
              btnStyle += 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
            } else if (isSelected && !isCorrect) {
              btnStyle += 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              btnStyle += 'bg-slate-900/40 border-slate-850 text-slate-500 opacity-60';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={btnStyle}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Hint Trigger */}
        {!isAnswered && currentChallenge.hint && (
          <div className="pt-2">
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-mono"
              >
                <HelpCircle className="w-3.5 h-3.5" /> Need a hint?
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono">
                💡 <strong>Hint:</strong> {currentChallenge.hint}
              </div>
            )}
          </div>
        )}

        {/* Explanation Deck on Answer */}
        {isAnswered && (
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className={`font-mono uppercase font-bold text-xs ${
                selectedOption === currentChallenge.correctIndex ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {selectedOption === currentChallenge.correctIndex ? '✓ Correct Reasoning!' : 'Incorrect Choice'}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-slate-100">Scientific Explanation: </strong>
              {currentChallenge.explanation}
            </p>
          </div>
        )}

        {/* Action Controls */}
        {isAnswered && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={handleRetry}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry Question
            </button>
            <button
              onClick={handleNextChallenge}
              className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <span>Next Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
