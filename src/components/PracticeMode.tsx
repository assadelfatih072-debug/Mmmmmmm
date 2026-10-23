import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Bookmark, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Search,
  Languages,
  PenLine,
  Check,
  Sparkles
} from 'lucide-react';
import { HAEMATOLOGY_QUESTIONS, Category, CATEGORIES } from '../data/questions';
import { UserState } from '../types';

interface PracticeModeProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  userState,
  setUserState,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unanswered' | 'incorrect' | 'correct' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return HAEMATOLOGY_QUESTIONS.filter(q => {
      // Category filter
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }

      // Status filter
      const userAns = userState.practiceAnswers[q.id];
      if (statusFilter === 'unanswered' && userAns !== undefined) return false;
      if (statusFilter === 'correct' && userAns !== q.correctAnswer) return false;
      if (statusFilter === 'incorrect' && (userAns === undefined || userAns === q.correctAnswer)) return false;
      if (statusFilter === 'bookmarked' && !userState.bookmarks.includes(q.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesEn = q.question.toLowerCase().includes(query) || q.explanation.toLowerCase().includes(query);
        const matchesAr = q.questionAr.includes(query) || q.explanationAr.includes(query);
        const matchesOptions = q.options.some(o => o.text.toLowerCase().includes(query) || o.textAr.includes(query));
        if (!matchesEn && !matchesAr && !matchesOptions) return false;
      }

      return true;
    });
  }, [selectedCategory, statusFilter, searchQuery, userState.practiceAnswers, userState.bookmarks]);

  // Ensure current index is within bounds
  const safeIdx = Math.min(Math.max(0, currentIdx), Math.max(0, filteredQuestions.length - 1));
  const currentQ = filteredQuestions[safeIdx];

  // Sync note text when question changes
  React.useEffect(() => {
    if (currentQ) {
      setNoteText(userState.notes[currentQ.id] || '');
    }
  }, [currentQ?.id, userState.notes]);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQ) return;
    setUserState(prev => ({
      ...prev,
      practiceAnswers: {
        ...prev.practiceAnswers,
        [currentQ.id]: key
      }
    }));
  };

  const handleClearAnswer = (qId: number) => {
    setUserState(prev => {
      const nextAnswers = { ...prev.practiceAnswers };
      delete nextAnswers[qId];
      return { ...prev, practiceAnswers: nextAnswers };
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

  const saveNote = () => {
    if (!currentQ) return;
    setUserState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [currentQ.id]: noteText
      }
    }));
    setShowNotes(false);
  };

  const handleResetPractice = () => {
    if (window.confirm('Reset all practice answers? Your notes and bookmarks will remain intact.')) {
      setUserState(prev => ({ ...prev, practiceAnswers: {} }));
    }
  };

  // Stats across all 70 questions
  const totalAnswered = Object.keys(userState.practiceAnswers).length;
  const totalCorrect = HAEMATOLOGY_QUESTIONS.filter(q => userState.practiceAnswers[q.id] === q.correctAnswer).length;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const currentAnswer = currentQ ? userState.practiceAnswers[currentQ.id] : undefined;
  const isAnswered = currentAnswer !== undefined;

  // Font size classes
  const textSizeClass = userState.fontSize === 'xlarge' ? 'text-xl' : userState.fontSize === 'large' ? 'text-lg' : 'text-base';
  const optionTextSizeClass = userState.fontSize === 'xlarge' ? 'text-lg' : userState.fontSize === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Controls & Category Filters */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-6 shadow-xl space-y-4">
        {/* Practice Overview Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Interactive Study & Practice</span>
              <span className="text-xs font-normal text-slate-400">· Instant clinical feedback & high-yield rationales</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-500">Progress:</span>
              <span className="font-mono text-rose-400 font-bold">{totalAnswered} / 70</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500">Accuracy:</span>
              <span className="font-mono text-emerald-400 font-bold">{overallAccuracy}%</span>
            </div>

            {totalAnswered > 0 && (
              <button
                onClick={handleResetPractice}
                className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
                title="Reset answers"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentIdx(0);
              }}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 w-full max-w-xs"
            >
              <option value="All">All Categories (70 MCQs)</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts, terms..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIdx(0);
              }}
              className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500 w-full"
            />
          </div>

          {/* Segmented Status Filters */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'unanswered', label: 'Unanswered' },
              { id: 'incorrect', label: 'Incorrect' },
              { id: 'correct', label: 'Correct' },
              { id: 'bookmarked', label: 'Bookmarked' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setStatusFilter(tab.id as any);
                  setCurrentIdx(0);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-rose-600/20 text-rose-300 font-semibold border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 max-w-lg mx-auto">
          <p className="text-base font-semibold text-slate-300 mb-2">No questions match your current filters</p>
          <p className="text-xs text-slate-500 mb-4">Try clearing your search query or choosing "All" in the status filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Card (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-rose-400 uppercase tracking-wider">{currentQ.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Question #{currentQ.id} of 70</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 font-mono">Index {safeIdx + 1}/{filteredQuestions.length}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Note button */}
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      userState.notes[currentQ.id]
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>{userState.notes[currentQ.id] ? 'Edit Note' : 'Add Note'}</span>
                  </button>

                  {/* Bookmark button */}
                  <button
                    onClick={() => toggleBookmark(currentQ.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      userState.bookmarks.includes(currentQ.id)
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${userState.bookmarks.includes(currentQ.id) ? 'fill-amber-400' : ''}`} />
                  </button>

                  {isAnswered && (
                    <button
                      onClick={() => handleClearAnswer(currentQ.id)}
                      className="text-xs text-slate-500 hover:text-slate-300 underline pl-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Note Drawer */}
              {showNotes && (
                <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-indigo-500/30">
                  <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                    Personal Clinical Notes for Q#{currentQ.id}
                  </label>
                  <textarea
                    rows={3}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write your study notes, memory triggers, or mnemonics here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setShowNotes(false)}
                      className="px-3 py-1 rounded text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveNote}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {/* Question Text */}
              <div className="mb-6">
                <h3 className={`font-semibold text-white leading-relaxed ${textSizeClass}`}>
                  {currentQ.question}
                </h3>

                {/* Arabic Translation if active */}
                {userState.showArabic && (
                  <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-slate-300 text-sm font-sans" dir="rtl">
                    <span className="text-rose-400 font-bold text-xs ml-2">[السؤال بالعربية]:</span>
                    {currentQ.questionAr}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = currentAnswer === opt.key;
                  const isCorrect = opt.key === currentQ.correctAnswer;
                  
                  // Visual state after answered
                  let borderStyle = 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900 text-slate-200';
                  let badgeStyle = 'bg-slate-800 text-slate-400';

                  if (isAnswered) {
                    if (isCorrect) {
                      borderStyle = 'bg-emerald-500/10 border-emerald-500/60 text-emerald-200';
                      badgeStyle = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isCorrect) {
                      borderStyle = 'bg-rose-500/15 border-rose-500/60 text-rose-200';
                      badgeStyle = 'bg-rose-600 text-white';
                    } else {
                      borderStyle = 'opacity-50 border-slate-900 bg-slate-900/30 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${borderStyle}`}
                    >
                      <div className="flex items-start gap-3.5 flex-1 pr-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeStyle}`}>
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

                      {isAnswered && (
                        <div className="shrink-0 pt-0.5">
                          {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                          {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Rationale & Explanation Section (Shown immediately when answered) */}
              {isAnswered && (
                <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-300">
                  {/* Status Banner */}
                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                    currentAnswer === currentQ.correctAnswer
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    {currentAnswer === currentQ.correctAnswer ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                    )}
                    <div>
                      <div className="font-bold text-sm">
                        {currentAnswer === currentQ.correctAnswer
                          ? `Correct! Answer is (${currentQ.correctAnswer})`
                          : `Incorrect. Correct Answer is (${currentQ.correctAnswer})`}
                      </div>
                      <div className="text-xs opacity-90">
                        {currentQ.options.find(o => o.key === currentQ.correctAnswer)?.text}
                      </div>
                    </div>
                  </div>

                  {/* Clinical Explanation */}
                  <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Clinical Rationale & Mechanism</span>
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {currentQ.explanation}
                    </p>

                    {/* Arabic Explanation */}
                    {userState.showArabic && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 text-sm leading-relaxed text-slate-300 font-sans" dir="rtl">
                        <span className="text-rose-400 font-bold text-xs ml-2">[التوضيح الطبي بالعربية]:</span>
                        {currentQ.explanationAr}
                      </div>
                    )}
                  </div>

                  {/* High Yield Pearl */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                        High-Yield Board Pearl
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed text-amber-100/90">
                        {currentQ.pearl}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-800/80">
                <button
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  disabled={safeIdx === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-slate-400 font-mono">
                  {safeIdx + 1} of {filteredQuestions.length}
                </div>

                <button
                  onClick={() => setCurrentIdx(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                  disabled={safeIdx === filteredQuestions.length - 1}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Navigator Sidebar (1 col) */}
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Question Navigator
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  {filteredQuestions.length} Items
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                  <span>Correct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" />
                  <span>Incorrect</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 border border-slate-700" />
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm ring-2 ring-rose-400 bg-slate-800" />
                  <span>Active</span>
                </div>
              </div>

              {/* Grid of buttons */}
              <div className="grid grid-cols-7 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === safeIdx;
                  const userAns = userState.practiceAnswers[q.id];
                  const hasAnswered = userAns !== undefined;
                  const isCorrect = userAns === q.correctAnswer;
                  const isBookmarked = userState.bookmarks.includes(q.id);

                  let btnBg = 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800';
                  if (hasAnswered) {
                    btnBg = isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      title={`Q#${q.id} (${q.category})`}
                      className={`h-8 rounded-lg font-mono text-xs font-bold transition-all relative ${
                        isCurrent ? 'ring-2 ring-rose-400 font-extrabold z-10' : ''
                      } ${btnBg}`}
                    >
                      {q.id}
                      {isBookmarked && !isCurrent && (
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Category stats mini-list */}
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300 block mb-1">Active Set Summary:</span>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="font-mono text-slate-200">
                    {filteredQuestions.filter(q => userState.practiceAnswers[q.id] !== undefined).length} / {filteredQuestions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-mono text-emerald-400">
                    {(() => {
                      const completed = filteredQuestions.filter(q => userState.practiceAnswers[q.id] !== undefined);
                      if (completed.length === 0) return '0%';
                      const corr = completed.filter(q => userState.practiceAnswers[q.id] === q.correctAnswer).length;
                      return `${Math.round((corr / completed.length) * 100)}%`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
