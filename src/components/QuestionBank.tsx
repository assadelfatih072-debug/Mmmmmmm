import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  PenLine, 
  Lightbulb, 
  CheckCircle2, 
  Layers, 
  Database,
  ArrowUpDown
} from 'lucide-react';
import { HAEMATOLOGY_QUESTIONS, Category, CATEGORIES, Question } from '../data/questions';
import { UserState } from '../types';

interface QuestionBankProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  onPracticeQuestion?: (qId: number) => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({
  userState,
  setUserState,
  onPracticeQuestion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);
  const [filterWithNotesOnly, setFilterWithNotesOnly] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const filteredQuestions = useMemo(() => {
    return HAEMATOLOGY_QUESTIONS.filter(q => {
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
      if (filterBookmarkedOnly && !userState.bookmarks.includes(q.id)) return false;
      if (filterWithNotesOnly && !userState.notes[q.id]) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesEn = q.question.toLowerCase().includes(query) || q.explanation.toLowerCase().includes(query) || q.pearl.toLowerCase().includes(query);
        const matchesAr = q.questionAr.includes(query) || q.explanationAr.includes(query);
        const matchesOptions = q.options.some(o => o.text.toLowerCase().includes(query) || o.textAr.includes(query));
        if (!matchesEn && !matchesAr && !matchesOptions) return false;
      }

      return true;
    });
  }, [selectedCategory, filterBookmarkedOnly, filterWithNotesOnly, searchQuery, userState.bookmarks, userState.notes]);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredQuestions.map(q => q.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
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

  const startEditNote = (q: Question) => {
    setEditingNoteId(q.id);
    setNoteDraft(userState.notes[q.id] || '');
  };

  const saveNoteDraft = () => {
    if (editingNoteId === null) return;
    setUserState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [editingNoteId]: noteDraft
      }
    }));
    setEditingNoteId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-rose-500" />
              <span>Full 70 MCQ Question Bank & Syllabus</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Browse, search, and study all 70 questions with official answer keys, rationale breakdowns, and personal notes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search across questions, options & explanations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            >
              <option value="All">All Categories (70 MCQs)</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterBookmarkedOnly(!filterBookmarkedOnly)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                filterBookmarkedOnly
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarks ({userState.bookmarks.length})</span>
            </button>

            <button
              onClick={() => setFilterWithNotesOnly(!filterWithNotesOnly)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                filterWithNotesOnly
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>With Notes ({Object.keys(userState.notes).filter(k => !!userState.notes[Number(k)]).length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="text-xs text-slate-400 flex items-center justify-between px-1">
          <span>Showing {filteredQuestions.length} of 70 questions</span>
          {userState.showArabic && (
            <span className="text-rose-400">العرض ثنائي اللغة (EN / AR) مفعّل</span>
          )}
        </div>

        {filteredQuestions.map((q) => {
          const isExpanded = expandedIds.has(q.id);
          const isBookmarked = userState.bookmarks.includes(q.id);
          const hasNotes = !!userState.notes[q.id];

          return (
            <div
              key={q.id}
              className={`bg-slate-950 border rounded-2xl transition-all shadow-md ${
                isExpanded ? 'border-rose-500/40' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Row Header */}
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-slate-300 flex items-center justify-center shrink-0">
                    {q.id}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-rose-400 uppercase tracking-wider">{q.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400 font-semibold font-mono">Answer: {q.correctAnswer}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {q.question}
                    </h4>

                    {userState.showArabic && (
                      <p className="text-xs text-slate-400 mt-1 font-sans" dir="rtl">
                        {q.questionAr}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1" onClick={(e) => e.stopPropagation()}>
                  {hasNotes && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400" title="Has personal note" />
                  )}

                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isBookmarked
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-4 animate-in fade-in">
                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                    {q.options.map(opt => {
                      const isCorrect = opt.key === q.correctAnswer;
                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                            isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200'
                              : 'bg-slate-900/40 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {opt.key}
                          </span>
                          <div>
                            <span className="font-medium">{opt.text}</span>
                            {userState.showArabic && (
                              <p className="text-[11px] text-slate-400 mt-0.5" dir="rtl">{opt.textAr}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Medical Rationale */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                      Clinical Explanation & Diagnostic Key:
                    </span>
                    <p className="leading-relaxed">{q.explanation}</p>
                    {userState.showArabic && (
                      <p className="pt-2 border-t border-slate-800/80 text-slate-400 font-sans" dir="rtl">
                        {q.explanationAr}
                      </p>
                    )}
                  </div>

                  {/* High Yield Pearl */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-2.5 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-400 block text-[10px] uppercase tracking-wider">
                        High-Yield Takeaway:
                      </span>
                      <span>{q.pearl}</span>
                    </div>
                  </div>

                  {/* Personal Notes Section */}
                  <div className="pt-2">
                    {editingNoteId === q.id ? (
                      <div className="bg-slate-900 p-3 rounded-xl border border-indigo-500/30 space-y-2">
                        <textarea
                          rows={2}
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Write personal revision notes..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveNoteDraft}
                            className="text-xs font-semibold px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <PenLine className="w-3.5 h-3.5 text-slate-500" />
                          <span>{userState.notes[q.id] ? userState.notes[q.id] : 'No personal note added.'}</span>
                        </div>
                        <button
                          onClick={() => startEditNote(q)}
                          className="text-indigo-400 hover:text-indigo-300 font-semibold text-[11px]"
                        >
                          {userState.notes[q.id] ? 'Edit' : '+ Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
