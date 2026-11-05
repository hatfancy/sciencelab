import React, { useState } from 'react';
import { Search, Bot, BookOpen, Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
  onOpenAITutor: () => void;
  onOpenLabNotebook: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenAITutor,
  onOpenLabNotebook,
  isDarkTheme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'volcano-lab', label: '🌋 Volcano Lab' },
    { id: 'physics-lab', label: 'Physics Lab' },
    { id: 'space-explorer', label: 'Space Explorer' },
    { id: 'rocket-lab', label: 'Rocket Lab' },
    { id: 'energy-lab', label: 'Energy Lab' },
    { id: 'challenges', label: 'Science Challenges' },
    { id: 'my-learning', label: 'My Learning' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-md transition-colors dark:bg-[#07090e]/90 light:bg-white/95 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark with animated atom logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
          aria-label="SciVerse Home"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Animated Orbiting Ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-spin" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-1 rounded-full border border-violet-500/50 rotate-45"></div>
            {/* Central Nucleus Star */}
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
              SciVerse
            </span>
          </div>
        </button>

        {/* Zone 2: Single-line clean navigation links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded text-xs tracking-wide uppercase ${
                  isActive
                    ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                    : 'text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Modals */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            title="Search topics, elements, formulas (Ctrl+K)"
            aria-label="Open global science search"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline text-[10px] bg-slate-800 text-slate-400 px-1 py-0.2 rounded font-mono">⌘K</kbd>
          </button>

          {/* AI Science Tutor */}
          <button
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 whitespace-nowrap"
            aria-label="Open AI Science Tutor"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Lab Notebook Drawer */}
          <button
            onClick={onOpenLabNotebook}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-800/60 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap"
            aria-label="Open Virtual Lab Notebook"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Notebook</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label="Toggle visual theme"
          >
            {isDarkTheme ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-[#07090e]/95 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-cyan-950/40 text-cyan-400 font-semibold border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
