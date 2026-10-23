import React from 'react';
import { 
  FileText, 
  BookOpen, 
  Layers, 
  Database, 
  BarChart3, 
  Printer, 
  Languages, 
  Bookmark, 
  Type
} from 'lucide-react';
import { AppMode, UserState } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  totalBookmarksCount: number;
  onOpenBookmarks?: () => void;
  inExamInProgress?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  setMode,
  userState,
  setUserState,
  totalBookmarksCount,
  inExamInProgress = false,
}) => {
  const toggleArabic = () => {
    setUserState(prev => ({ ...prev, showArabic: !prev.showArabic }));
  };

  const cycleFontSize = () => {
    setUserState(prev => {
      const nextSize = prev.fontSize === 'normal' ? 'large' : prev.fontSize === 'large' ? 'xlarge' : 'normal';
      return { ...prev, fontSize: nextSize };
    });
  };

  const navItems = [
    { mode: 'practice' as AppMode, label: 'Study & Practice', icon: BookOpen, sublabel: 'Instant Rationale' },
    { mode: 'exam' as AppMode, label: 'Timed Exam', icon: FileText, sublabel: 'Board Simulation' },
    { mode: 'flashcards' as AppMode, label: 'Flashcards', icon: Layers, sublabel: 'Active Recall' },
    { mode: 'bank' as AppMode, label: 'Question Bank', icon: Database, sublabel: '70 MCQs' },
    { mode: 'analytics' as AppMode, label: 'Analytics', icon: BarChart3, sublabel: 'Performance' },
    { mode: 'print' as AppMode, label: 'Export / Print', icon: Printer, sublabel: 'PDF Ready' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold text-lg shadow-inner">
              <span className="text-xl">🩸</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">HaemaQuest</span>
                <span className="text-xs text-rose-400 font-semibold border-l border-slate-700 pl-2">70 MCQs</span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Comprehensive Haematology Examination & Study Suite
              </p>
            </div>
          </div>

          {/* Quick utility actions */}
          <div className="flex items-center gap-2">
            {/* Bilingual toggle */}
            <button
              onClick={toggleArabic}
              title="Toggle Arabic Support (عرض الترجمة والشرح العربي)"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                userState.showArabic 
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{userState.showArabic ? 'عربي + EN' : 'EN Only'}</span>
            </button>

            {/* Font size adjuster */}
            <button
              onClick={cycleFontSize}
              title={`Current font: ${userState.fontSize}. Click to adjust size.`}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="uppercase text-[10px] font-mono">{userState.fontSize[0]}</span>
            </button>

            {/* Bookmarks Counter */}
            <button
              onClick={() => setMode('bank')}
              title={`${totalBookmarksCount} questions bookmarked`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
            >
              <Bookmark className={`w-3.5 h-3.5 ${totalBookmarksCount > 0 ? 'text-amber-400 fill-amber-400/20' : ''}`} />
              <span className="font-mono text-slate-300">{totalBookmarksCount}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1.5 -mb-px scrollbar-none text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => {
                  if (inExamInProgress && currentMode === 'exam' && item.mode !== 'exam') {
                    if (window.confirm('You have an exam in progress! Are you sure you want to leave the exam view? Your answers are saved.')) {
                      setMode(item.mode);
                    }
                  } else {
                    setMode(item.mode);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-rose-600/15 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
