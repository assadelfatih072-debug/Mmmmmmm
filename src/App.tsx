import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ExamMode } from './components/ExamMode';
import { PracticeMode } from './components/PracticeMode';
import { FlashcardsMode } from './components/FlashcardsMode';
import { QuestionBank } from './components/QuestionBank';
import { ExamResults } from './components/ExamResults';
import { AnalyticsView } from './components/AnalyticsView';
import { PrintableView } from './components/PrintableView';
import { AppMode, UserState, ExamAttempt } from './types';
import { Category, HAEMATOLOGY_QUESTIONS } from './data/questions';

const LOCAL_STORAGE_KEY = 'haemaquest_v1_state';

const defaultState: UserState = {
  bookmarks: [],
  flaggedExamIds: [],
  notes: {},
  practiceAnswers: {},
  examAttempts: [],
  flashcardMastery: {},
  showArabic: true, // Default to true since the user requested in Arabic!
  fontSize: 'normal',
};

export default function App() {
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return { ...defaultState, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load stored state:', e);
    }
    return defaultState;
  });

  const [currentMode, setCurrentMode] = useState<AppMode>('practice');
  const [activeAttempt, setActiveAttempt] = useState<ExamAttempt | null>(null);
  const [inExamInProgress, setInExamInProgress] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userState));
    } catch (e) {
      console.error('Failed to persist state:', e);
    }
  }, [userState]);

  const handleFinishExam = (attempt: ExamAttempt) => {
    setActiveAttempt(attempt);
    setUserState(prev => ({
      ...prev,
      examAttempts: [attempt, ...prev.examAttempts]
    }));
    setInExamInProgress(false);
  };

  const handleRetakeExam = () => {
    setActiveAttempt(null);
    setCurrentMode('exam');
  };

  const handlePracticeMissed = (missedIds: number[]) => {
    setActiveAttempt(null);
    // Switch to practice mode
    setCurrentMode('practice');
  };

  const handlePracticeCategory = (category: Category) => {
    setCurrentMode('practice');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-rose-500/25 selection:text-rose-200">
      {/* Top Header */}
      <Header
        currentMode={currentMode}
        setMode={(mode) => {
          setActiveAttempt(null);
          setCurrentMode(mode);
        }}
        userState={userState}
        setUserState={setUserState}
        totalBookmarksCount={userState.bookmarks.length}
        inExamInProgress={inExamInProgress}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16">
        {activeAttempt ? (
          <ExamResults
            attempt={activeAttempt}
            userState={userState}
            setUserState={setUserState}
            onRetakeExam={handleRetakeExam}
            onPracticeMissed={handlePracticeMissed}
            onViewPrint={() => setCurrentMode('print')}
          />
        ) : (
          <>
            {currentMode === 'practice' && (
              <PracticeMode
                userState={userState}
                setUserState={setUserState}
              />
            )}

            {currentMode === 'exam' && (
              <ExamMode
                userState={userState}
                setUserState={setUserState}
                onFinishExam={handleFinishExam}
                setInExamInProgress={setInExamInProgress}
              />
            )}

            {currentMode === 'flashcards' && (
              <FlashcardsMode
                userState={userState}
                setUserState={setUserState}
              />
            )}

            {currentMode === 'bank' && (
              <QuestionBank
                userState={userState}
                setUserState={setUserState}
              />
            )}

            {currentMode === 'analytics' && (
              <AnalyticsView
                userState={userState}
                setUserState={setUserState}
                onStartExam={() => setCurrentMode('exam')}
                onPracticeCategory={handlePracticeCategory}
              />
            )}

            {currentMode === 'print' && (
              <PrintableView />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">HaemaQuest</span>
            <span>·</span>
            <span>70 MCQ Haematology Examination System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>All 70 Questions & Official Answer Keys Integrated</span>
            <span>·</span>
            <span className="text-rose-400/90 font-medium">Bilingual English / العربية</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
