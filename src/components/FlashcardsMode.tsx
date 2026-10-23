import React, { useState, useEffect, useMemo } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle, 
  HelpCircle, 
  Lightbulb, 
  Bookmark, 
  Sparkles,
  Layers,
  RotateCcw
} from 'lucide-react';
import { HAEMATOLOGY_QUESTIONS, Question, Category, CATEGORIES } from '../data/questions';
import { UserState } from '../types';

interface FlashcardsModeProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

export const FlashcardsMode: React.FC<FlashcardsModeProps> = ({
  userState,
  setUserState,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'unseen' | 'reviewing' | 'mastered'>('all');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deck, setDeck] = useState<Question[]>(HAEMATOLOGY_QUESTIONS);

  // Filter deck based on category and mastery
  const filteredDeck = useMemo(() => {
    return deck.filter(q => {
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
      const status = userState.flashcardMastery[q.id] || 'unseen';
      if (masteryFilter !== 'all' && status !== masteryFilter) return false;
      return true;
    });
  }, [deck, selectedCategory, masteryFilter, userState.flashcardMastery]);

  const safeIdx = Math.min(Math.max(0, currentIndex), Math.max(0, filteredDeck.length - 1));
  const currentQ = filteredDeck[safeIdx];

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [safeIdx, filteredDeck]);

  const shuffleDeck = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const markMastery = (status: 'mastered' | 'reviewing') => {
    if (!currentQ) return;
    setUserState(prev => ({
      ...prev,
      flashcardMastery: {
        ...prev.flashcardMastery,
        [currentQ.id]: status
      }
    }));
    // Auto advance to next card
    if (safeIdx < filteredDeck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        if (safeIdx < filteredDeck.length - 1) setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        if (safeIdx > 0) setCurrentIndex(prev => prev - 1);
      } else if (e.key === '1') {
        markMastery('reviewing');
      } else if (e.key === '2') {
        markMastery('mastered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIdx, filteredDeck, currentQ]);

  // Total counts
  const totalMastered = Object.values(userState.flashcardMastery).filter(v => v === 'mastered').length;
  const totalReviewing = Object.values(userState.flashcardMastery).filter(v => v === 'reviewing').length;
  const totalUnseen = 70 - totalMastered - totalReviewing;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Deck Stats & Controls */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-500" />
              <span>Haematology Rapid Recall Flashcards</span>
            </h2>
            <p className="text-xs text-slate-400">
              Active recall deck for high-yield hematology concepts, markers, and pathognomonic findings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={shuffleDeck}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset all flashcard mastery tags to Unseen?')) {
                  setUserState(prev => ({ ...prev, flashcardMastery: {} }));
                }
              }}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Reset Deck
            </button>
          </div>
        </div>

        {/* Filters & Mastery Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            >
              <option value="All">All Categories (70 Flashcards)</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => { setMasteryFilter('all'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                masteryFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({filteredDeck.length})
            </button>
            <button
              onClick={() => { setMasteryFilter('unseen'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                masteryFilter === 'unseen' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Unseen ({totalUnseen})
            </button>
            <button
              onClick={() => { setMasteryFilter('reviewing'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                masteryFilter === 'reviewing' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Needs Review ({totalReviewing})
            </button>
            <button
              onClick={() => { setMasteryFilter('mastered'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                masteryFilter === 'mastered' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mastered ({totalMastered})
            </button>
          </div>
        </div>
      </div>

      {/* Main Flashcard */}
      {filteredDeck.length === 0 ? (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <p className="text-base font-semibold text-slate-300 mb-2">No flashcards in this filter</p>
          <button
            onClick={() => { setMasteryFilter('all'); setSelectedCategory('All'); }}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold"
          >
            Show All Flashcards
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[380px] bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl relative cursor-pointer flex flex-col justify-between transition-all group select-none"
          >
            {/* Top Card Kicker */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-rose-400 uppercase tracking-wider">{currentQ.category}</span>
                <span aria-hidden="true">·</span>
                <span>Card {safeIdx + 1} of {filteredDeck.length}</span>
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <span className="text-[11px] font-mono text-slate-500">
                  {userState.flashcardMastery[currentQ.id] === 'mastered' ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Mastered
                    </span>
                  ) : userState.flashcardMastery[currentQ.id] === 'reviewing' ? (
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" /> Reviewing
                    </span>
                  ) : (
                    <span className="text-slate-500">Unseen</span>
                  )}
                </span>

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
              </div>
            </div>

            {/* Card Body */}
            <div className="py-8 flex-1 flex flex-col justify-center">
              {!isFlipped ? (
                /* FRONT OF CARD */
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-xs uppercase font-bold tracking-widest text-slate-500">
                    Question #{currentQ.id}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h3>

                  {userState.showArabic && (
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 text-sm font-sans" dir="rtl">
                      {currentQ.questionAr}
                    </div>
                  )}

                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                    {currentQ.options.map(opt => (
                      <div key={opt.key} className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
                        <span className="font-bold text-slate-300 mr-2">{opt.key}:</span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* BACK OF CARD */
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                      {currentQ.correctAnswer}
                    </span>
                    <div>
                      <span className="text-xs text-slate-400 block">Correct Answer:</span>
                      <span className="text-lg font-bold text-emerald-400">
                        {currentQ.options.find(o => o.key === currentQ.correctAnswer)?.text}
                      </span>
                    </div>
                  </div>

                  {userState.showArabic && (
                    <div className="p-2.5 bg-slate-900/60 rounded-lg text-xs text-slate-300 font-sans" dir="rtl">
                      <span className="font-bold text-rose-400 ml-1">الخيار الصحيح:</span>
                      {currentQ.options.find(o => o.key === currentQ.correctAnswer)?.textAr}
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                    <span className="font-bold text-rose-400 uppercase tracking-wider block text-[11px]">
                      Clinical Rationale:
                    </span>
                    <p>{currentQ.explanation}</p>
                    {userState.showArabic && (
                      <p className="pt-2 border-t border-slate-800 text-slate-400 font-sans" dir="rtl">
                        {currentQ.explanationAr}
                      </p>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-2.5 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">
                        Board Takeaway:
                      </span>
                      <span>{currentQ.pearl}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card Footer Hint */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 group-hover:text-slate-300 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click card or press [Space] to flip</span>
              </span>
              <span className="font-mono">
                Card {safeIdx + 1} of {filteredDeck.length}
              </span>
            </div>
          </div>

          {/* Action Mastery & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={safeIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Spaced Repetition Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => markMastery('reviewing')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
                title="Mark as Still Learning (Press 1)"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Needs Review [1]</span>
              </button>

              <button
                onClick={() => markMastery('mastered')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors cursor-pointer"
                title="Mark as Mastered (Press 2)"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mastered [2]</span>
              </button>
            </div>

            <button
              onClick={() => setCurrentIndex(prev => Math.min(filteredDeck.length - 1, prev + 1))}
              disabled={safeIdx === filteredDeck.length - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
