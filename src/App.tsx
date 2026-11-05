import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AITutorModal } from './components/AITutorModal';
import { LabNotebookModal } from './components/LabNotebookModal';

import { HomeView } from './views/HomeView';
import { PhysicsLabView } from './views/PhysicsLabView';
import { SpaceExplorerView } from './views/SpaceExplorerView';
import { RocketLabView } from './views/RocketLabView';
import { WaterFluidLabView } from './views/WaterFluidLabView';
import { WindWeatherLabView } from './views/WindWeatherLabView';
import { EnergyLabView } from './views/EnergyLabView';
import { ElectricityLabView } from './views/ElectricityLabView';
import { BiologyEarthLabView } from './views/BiologyEarthLabView';
import { ChallengesView } from './views/ChallengesView';
import { DiscoverView } from './views/DiscoverView';
import { MyLearningView } from './views/MyLearningView';
import { VolcanoLabView } from './views/VolcanoLabView';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [isLabNotebookOpen, setIsLabNotebookOpen] = useState<boolean>(false);

  // Theme state: dark default, supports light
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isDarkTheme ? 'bg-[#07090e] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenLabNotebook={() => setIsLabNotebookOpen(true)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAITutor={() => setIsAITutorOpen(true)}
          />
        )}

        {currentView === 'physics-lab' && (
          <PhysicsLabView />
        )}

        {currentView === 'volcano-lab' && (
          <VolcanoLabView />
        )}

        {currentView === 'space-explorer' && (
          <SpaceExplorerView initialPlanetId={viewParam} />
        )}

        {currentView === 'rocket-lab' && (
          <RocketLabView />
        )}

        {currentView === 'water-lab' && (
          <WaterFluidLabView />
        )}

        {currentView === 'wind-lab' && (
          <WindWeatherLabView />
        )}

        {currentView === 'energy-lab' && (
          <EnergyLabView />
        )}

        {currentView === 'electricity-lab' && (
          <ElectricityLabView />
        )}

        {currentView === 'biology-earth-lab' && (
          <BiologyEarthLabView />
        )}

        {currentView === 'challenges' && (
          <ChallengesView />
        )}

        {currentView === 'discover' && (
          <DiscoverView
            initialTopicId={viewParam}
            onNavigateLab={(labView) => handleNavigate(labView)}
          />
        )}

        {currentView === 'my-learning' && (
          <MyLearningView
            onNavigate={handleNavigate}
            onOpenNotebook={() => setIsLabNotebookOpen(true)}
          />
        )}
      </main>

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />

      <LabNotebookModal
        isOpen={isLabNotebookOpen}
        onClose={() => setIsLabNotebookOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </div>
  );
}
