import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  Pause, 
  Play, 
  Send,
  EyeOff,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import { Question, HAEMATOLOGY_QUESTIONS } from '../data/questions';
import { UserState, ExamAttempt } from '../types';

interface ExamModeProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  onFinishExam: (attempt: ExamAttempt) => void;
  setInExamInProgress: (inProgress: boolean) => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({
  userState,
  setUserState,
  onFinishExam,
  setInExamInProgress,
}) => {
  // Exam Setup state
  const [examStarted, setExamStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(70);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(70);
  const [isTimed, setIsTimed] = useState<boolean>(true);

  // Active Exam state
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(new Set());
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, Set<'A' | 'B' | 'C' | 'D'>>>({});
  
  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(70 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Restore active draft or start fresh
  const startExam = (count: number, minutes: number, timed: boolean) => {
    let qList = [...HAEMATOLOGY_QUESTIONS];
    if (count < 70) {
      // Shuffle or slice
      qList = qList.slice(0, count);
    }
    setExamQuestions(qList);
    setAnswers({});
    setFlaggedIds(new Set());
    setEliminatedOptions({});
    setCurrentIndex(0);
    setSecondsRemaining(minutes * 60);
    setIsTimed(timed);
    setIsPaused(false);
    setExamStarted(true);
    setInExamInProgress(true);
  };

  // Timer tick
  useEffect(() => {
    if (!examStarted || !isTimed || isPaused) return;

    if (secondsRemaining <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, isTimed, isPaused, secondsRemaining]);

  const currentQ = examQuestions[currentIndex];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: key
    }));
  };

  const toggleFlag = (id: number) => {
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleEliminate = (qId: number, key: 'A' | 'B' | 'C' | 'D', e: React.MouseEvent) => {
    e.stopPropagation();
    setEliminatedOptions(prev => {
      const currentSet = new Set(prev[qId] || []);
      if (currentSet.has(key)) {
        currentSet.delete(key);
      } else {
        currentSet.add(key);
      }
      return {
        ...prev,
        [qId]: currentSet
      };
    });
  };

  const toggleBookmark = (id: number) => {
    setUserState(prev => {
      const isBookmarked = prev.bookmarks.includes(id);
      const bookmarks = isBookmarked
        ? prev.bookmarks.filter(b => b !== id)
        : [...prev.bookmarks, id];
      return { ...prev, bookmarks };
    });
  };

  const handleFinalSubmit = useCallback(() => {
    setInExamInProgress(false);
    setExamStarted(false);

    // Compute metrics
    let score = 0;
    const categoryScores: ExamAttempt['categoryScores'] = {
      'RBC Physiology & Metabolism': { correct: 0, total: 0 },
      'Anaemia & Nutritional Disorders': { correct: 0, total: 0 },
      'Haemoglobinopathies & Thalassaemia': { correct: 0, total: 0 },
      'Leukaemia & Myeloproliferative Disorders': { correct: 0, total: 0 },
      'Leukocytes & Immunology': { correct: 0, total: 0 },
      'Haemostasis, Platelets & Coagulation': { correct: 0, total: 0 },
      'Laboratory Medicine & Diagnostics': { correct: 0, total: 0 },
    };

    examQuestions.forEach(q => {
      const cat = q.category;
      if (!categoryScores[cat]) {
        categoryScores[cat] = { correct: 0, total: 0 };
      }
      categoryScores[cat].total += 1;
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
        categoryScores[cat].correct += 1;
      }
    });

    const totalQuestions = examQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const timeSpent = (timeLimitMinutes * 60) - secondsRemaining;

    const attempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      timestamp: Date.now(),
      totalQuestions,
      score,
      percentage,
      timeSpentSeconds: isTimed ? Math.max(timeSpent, 10) : 0,
      userAnswers: answers,
      categoryScores,
    };

    onFinishExam(attempt);
  }, [examQuestions, answers, timeLimitMinutes, secondsRemaining, isTimed, onFinishExam, setInExamInProgress]);

  // Keyboard navigation
  useEffect(() => {
    if (!examStarted || showSubmitModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectOption(key as 'A' | 'B' | 'C' | 'D');
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const keyMap: Record<string, 'A' | 'B' | 'C' | 'D'> = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelectOption(keyMap[e.key]);
      } else if (e.key === 'ArrowRight' || e.key === 'j') {
        if (currentIndex < examQuestions.length - 1) setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        if (currentQ) toggleFlag(currentQ.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [examStarted, showSubmitModal, currentIndex, examQuestions, currentQ]);

  // Statistics
  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const flaggedCount = flaggedIds.size;
  const unansweredCount = examQuestions.length - answeredCount;

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  // Font size class mapping
  const textSizeClass = userState.fontSize === 'xlarge' ? 'text-xl' : userState.fontSize === 'large' ? 'text-lg' : 'text-base';
  const optionTextSizeClass = userState.fontSize === 'xlarge' ? 'text-lg' : userState.fontSize === 'large' ? 'text-base' : 'text-sm';

  // --- PRE-EXAM CONFIGURATION VIEW ---
  if (!examStarted) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Haematology Board Simulation Exam
              </h2>
              <p className="text-sm text-slate-400">
                Official 70 MCQ format with timed pacing, flag review, and comprehensive scorecard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 py-6 border-y border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Standard Set</span>
              <span className="text-2xl font-bold text-white">70 Questions</span>
              <span className="text-xs text-slate-500 block mt-1">Full haematology curriculum</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Standard Time</span>
              <span className="text-2xl font-bold text-white">70 Minutes</span>
              <span className="text-xs text-slate-500 block mt-1">60 seconds per question</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Pass Benchmark</span>
              <span className="text-2xl font-bold text-emerald-400">70% (49/70)</span>
              <span className="text-xs text-slate-500 block mt-1">Clinical competency threshold</span>
            </div>
          </div>

          {/* Exam Configuration Options */}
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Select Question Length
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { count: 70, label: 'Full 70 MCQs', time: 70 },
                  { count: 35, label: 'Half Test (35)', time: 35 },
                  { count: 20, label: 'Rapid (20)', time: 20 },
                  { count: 10, label: 'Quick (10)', time: 10 }
                ].map(item => (
                  <button
                    key={item.count}
                    onClick={() => {
                      setQuestionCount(item.count);
                      setTimeLimitMinutes(item.time);
                    }}
                    className={`p-3 rounded-lg text-left border transition-all ${
                      questionCount === item.count
                        ? 'bg-rose-500/15 border-rose-500 text-rose-300 shadow-sm'
                        : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm">{item.count} Questions</div>
                    <div className="text-xs text-slate-500">{item.time} min</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800">
              <div>
                <span className="text-sm font-semibold text-slate-200 block">Timed Exam Mode</span>
                <span className="text-xs text-slate-400 block">
                  Simulate real board pressure with a countdown clock
                </span>
              </div>
              <button
                onClick={() => setIsTimed(!isTimed)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isTimed ? 'bg-rose-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isTimed ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Instruction Checklist */}
            <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-300 mb-1">Exam Instructions:</div>
              <p>• Immediate explanations are hidden until you submit to simulate board conditions.</p>
              <p>• Click the cross icon or use right-click on any option to strike through distractors.</p>
              <p>• Use keyboard keys <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">A</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">B</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">C</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">D</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">1-4</kbd> to choose answers.</p>
              <p>• Flag questions with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">F</kbd> to easily return to them before finalizing.</p>
            </div>

            <button
              onClick={() => startExam(questionCount, timeLimitMinutes, isTimed)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-base shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Examination ({questionCount} Questions)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ACTIVE EXAM VIEW ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Exam Status Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Question</span>
            <span className="text-lg font-bold text-white font-mono">
              {currentIndex + 1}
              <span className="text-slate-500 text-sm font-normal"> / {examQuestions.length}</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 border-l border-slate-800 pl-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{answeredCount} Answered</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{flaggedCount} Flagged</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span>{unansweredCount} Left</span>
            </span>
          </div>
        </div>

        {/* Center Timer */}
        {isTimed && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">
            <Clock className={`w-4 h-4 ${secondsRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-rose-400'}`} />
            <span className={`font-mono font-bold text-base ${secondsRemaining < 300 ? 'text-red-400' : 'text-slate-200'}`}>
              {formatTime(secondsRemaining)}
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume Timer' : 'Pause Timer'}
              className="ml-1 text-slate-400 hover:text-slate-200"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Actions: Flag, Bookmark, Submit */}
        <div className="flex items-center gap-2">
          {currentQ && (
            <>
              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  flaggedIds.has(currentQ.id)
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flaggedIds.has(currentQ.id) ? 'fill-amber-400' : ''}`} />
                <span>{flaggedIds.has(currentQ.id) ? 'Flagged' : 'Flag'}</span>
              </button>

              <button
                onClick={() => toggleBookmark(currentQ.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  userState.bookmarks.includes(currentQ.id)
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${userState.bookmarks.includes(currentQ.id) ? 'fill-rose-400' : ''}`} />
              </button>
            </>
          )}

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finish & Submit</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {currentQ && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              {/* Category & Metadata header */}
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-rose-400 uppercase tracking-wider">{currentQ.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Question {currentQ.id} of 70</span>
                </div>
                {flaggedIds.has(currentQ.id) && (
                  <span className="text-amber-400 font-medium flex items-center gap-1">
                    <Flag className="w-3 h-3 fill-amber-400" /> Marked for Review
                  </span>
                )}
              </div>

              {/* Question Text in English */}
              <div className="mb-6">
                <h3 className={`font-semibold text-white leading-relaxed ${textSizeClass}`}>
                  {currentQ.question}
                </h3>

                {/* Arabic Translation if active */}
                {userState.showArabic && (
                  <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-slate-300 text-sm font-sans" dir="rtl">
                    <span className="text-rose-400 font-bold text-xs ml-2">[الترجمة]:</span>
                    {currentQ.questionAr}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.key;
                  const isEliminated = (eliminatedOptions[currentQ.id] || new Set()).has(opt.key);

                  return (
                    <div
                      key={opt.key}
                      onClick={() => !isEliminated && handleSelectOption(opt.key)}
                      className={`group relative flex items-start justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                        isEliminated
                          ? 'opacity-40 bg-slate-900/20 border-slate-900 line-through text-slate-600'
                          : isSelected
                          ? 'bg-rose-500/15 border-rose-500/60 text-white shadow-md'
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1 pr-4">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          {opt.key}
                        </div>
                        <div className="pt-0.5">
                          <p className={`font-medium ${optionTextSizeClass}`}>
                            {opt.text}
                          </p>
                          {userState.showArabic && (
                            <p className="text-xs text-slate-400 mt-1" dir="rtl">
                              {opt.textAr}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Distractor Strike-through Eliminator button */}
                      <button
                        type="button"
                        onClick={(e) => toggleEliminate(currentQ.id, opt.key, e)}
                        title={isEliminated ? 'Unstrike option' : 'Strike through (eliminate option)'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isEliminated
                            ? 'text-rose-400 hover:text-white bg-slate-800'
                            : 'text-slate-500 hover:text-slate-300 opacity-60 group-hover:opacity-100 hover:bg-slate-800'
                        }`}
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Nav: Prev / Next */}
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-800/80">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-slate-500 font-mono hidden sm:block">
                  Press 1-4 to choose · Arrows to navigate
                </div>

                {currentIndex < examQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Review & Submit</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Question Palette Grid (1 col) */}
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Question Grid
              </h4>
              <span className="text-xs font-mono text-slate-400">
                {answeredCount}/{examQuestions.length}
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 border border-slate-700" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm ring-2 ring-rose-400 bg-slate-800" />
                <span>Current</span>
              </div>
            </div>

            {/* Palette Buttons */}
            <div className="grid grid-cols-7 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
              {examQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flaggedIds.has(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    title={`Question ${q.id}: ${isAnswered ? 'Answered' : 'Unanswered'}${isFlagged ? ' (Flagged)' : ''}`}
                    className={`h-8 rounded-lg font-mono text-xs font-bold transition-all relative ${
                      isCurrent
                        ? 'ring-2 ring-rose-400 font-extrabold text-white z-10'
                        : ''
                    } ${
                      isFlagged
                        ? 'bg-amber-500/80 text-black'
                        : isAnswered
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && !isCurrent && (
                      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick jump actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  const firstUnanswered = examQuestions.findIndex(q => answers[q.id] === undefined);
                  if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
                }}
                className="text-rose-400 hover:text-rose-300 font-medium"
              >
                Jump to unanswered
              </button>
              {flaggedIds.size > 0 && (
                <button
                  onClick={() => {
                    const firstFlagged = examQuestions.findIndex(q => flaggedIds.has(q.id));
                    if (firstFlagged !== -1) setCurrentIndex(firstFlagged);
                  }}
                  className="text-amber-400 hover:text-amber-300 font-medium"
                >
                  Jump to flagged
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Ready to submit your examination?
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Once submitted, your final score will be calculated and you can review detailed clinical rationales for all questions.
            </p>

            <div className="space-y-2 mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Questions:</span>
                <span className="font-mono font-bold text-white">{examQuestions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Answered:</span>
                <span className="font-mono font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Unanswered:</span>
                <span className="font-mono font-bold">{unansweredCount}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Marked for Review:</span>
                <span className="font-mono font-bold">{flaggedCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-rose-400/90 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20 mb-6">
                Warning: You have {unansweredCount} unanswered questions which will be graded as incorrect.
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Back to Exam
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30 transition-colors cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
