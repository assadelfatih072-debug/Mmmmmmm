import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  BookOpen, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle,
  Lightbulb,
  Share2
} from 'lucide-react';
import { ExamAttempt, UserState } from '../types';
import { HAEMATOLOGY_QUESTIONS, Category, CATEGORIES } from '../data/questions';

interface ExamResultsProps {
  attempt: ExamAttempt;
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  onRetakeExam: () => void;
  onPracticeMissed: (missedIds: number[]) => void;
  onViewPrint: () => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  attempt,
  userState,
  setUserState,
  onRetakeExam,
  onPracticeMissed,
  onViewPrint,
}) => {
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const isPassed = attempt.percentage >= 70;

  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPassed]);

  const missedQuestionIds = Object.keys(attempt.userAnswers)
    .map(Number)
    .filter(id => {
      const q = HAEMATOLOGY_QUESTIONS.find(item => item.id === id);
      return q && attempt.userAnswers[id] !== q.correctAnswer;
    });

  // Include unanswered questions in missed
  HAEMATOLOGY_QUESTIONS.forEach(q => {
    if (attempt.userAnswers[q.id] === undefined && !missedQuestionIds.includes(q.id)) {
      missedQuestionIds.push(q.id);
    }
  });

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  const avgTimePerQuestion = attempt.totalQuestions > 0 && attempt.timeSpentSeconds > 0
    ? Math.round(attempt.timeSpentSeconds / attempt.totalQuestions)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Score Banner */}
      <div className={`p-8 rounded-3xl border text-center relative overflow-hidden shadow-2xl ${
        isPassed 
          ? 'bg-gradient-to-b from-emerald-950/60 to-slate-950 border-emerald-500/40' 
          : 'bg-gradient-to-b from-rose-950/60 to-slate-950 border-rose-500/40'
      }`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-slate-900/80 border border-slate-800 shadow-inner">
          {isPassed ? (
            <Trophy className="w-8 h-8 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-rose-400" />
          )}
        </div>

        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
          Haematology Examination Report
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {isPassed ? 'Examination Passed' : 'Did Not Meet Passing Standard'}
        </h2>

        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          {isPassed
            ? 'Congratulations! You demonstrated solid mastery of clinical haematology principles.'
            : 'You scored below the 70% passing threshold. Review high-yield rationales below to target weak concepts.'}
        </p>

        {/* High-level Scorecard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Overall Score</span>
            <span className="text-2xl font-bold font-mono text-white">
              {attempt.score} <span className="text-sm font-normal text-slate-500">/ {attempt.totalQuestions}</span>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Percentage</span>
            <span className={`text-2xl font-bold font-mono ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
              {attempt.percentage}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Time</span>
            <span className="text-2xl font-bold font-mono text-white">
              {formatSeconds(attempt.timeSpentSeconds)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Pace / Question</span>
            <span className="text-2xl font-bold font-mono text-slate-300">
              {avgTimePerQuestion}s
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            onClick={onRetakeExam}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam</span>
          </button>

          {missedQuestionIds.length > 0 && (
            <button
              onClick={() => onPracticeMissed(missedQuestionIds)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Study {missedQuestionIds.length} Missed Questions</span>
            </button>
          )}

          <button
            onClick={onViewPrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Category Breakdown Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center justify-between">
          <span>Performance by Clinical Domain</span>
          <span className="text-xs font-normal text-slate-400">7 Core Categories</span>
        </h3>

        <div className="space-y-3 pt-2">
          {CATEGORIES.map(cat => {
            const catStat = attempt.categoryScores[cat] || { correct: 0, total: 0 };
            const catPercent = catStat.total > 0 ? Math.round((catStat.correct / catStat.total) * 100) : 0;
            const isCatGood = catPercent >= 70;

            return (
              <div key={cat} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{cat}</span>
                  <span className="font-mono text-slate-400">
                    <span className={isCatGood ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {catStat.correct}
                    </span>
                    <span className="text-slate-600"> / {catStat.total}</span>
                    <span className="text-slate-500 ml-2">({catPercent}%)</span>
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCatGood ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question-by-Question Review Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Question Review</h3>
            <p className="text-xs text-slate-400">Examine correct choices, your answers, and clinical rationales.</p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                reviewFilter === 'all' ? 'bg-rose-600/20 text-rose-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({attempt.totalQuestions})
            </button>
            <button
              onClick={() => setReviewFilter('incorrect')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                reviewFilter === 'incorrect' ? 'bg-rose-600/20 text-rose-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Missed ({missedQuestionIds.length})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                reviewFilter === 'correct' ? 'bg-emerald-600/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Correct ({attempt.score})
            </button>
          </div>
        </div>

        {/* Review list */}
        <div className="space-y-4">
          {HAEMATOLOGY_QUESTIONS.filter(q => {
            const userAns = attempt.userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            if (reviewFilter === 'correct' && !isCorrect) return false;
            if (reviewFilter === 'incorrect' && isCorrect) return false;
            return true;
          }).map(q => {
            const userAns = attempt.userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isExpanded = expandedIds.has(q.id);

            return (
              <div
                key={q.id}
                className={`border rounded-2xl transition-all ${
                  isCorrect
                    ? 'border-slate-800 bg-slate-900/30'
                    : 'border-rose-900/40 bg-rose-950/10'
                }`}
              >
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-4 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-slate-300 flex items-center justify-center shrink-0">
                      {q.id}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className="text-slate-400">{q.category}</span>
                        <span aria-hidden="true">·</span>
                        {isCorrect ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-400 font-semibold flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Incorrect (Your pick: {userAns || 'None'})
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-white">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                      Key: {q.correctAnswer}
                    </span>
                    <button className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3 text-xs animate-in fade-in">
                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map(opt => {
                        const isCorrectOption = opt.key === q.correctAnswer;
                        const isUserChoice = userAns === opt.key;

                        let style = 'bg-slate-900/40 border-slate-800 text-slate-400';
                        if (isCorrectOption) style = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-semibold';
                        else if (isUserChoice && !isCorrectOption) style = 'bg-rose-500/15 border-rose-500/50 text-rose-200 line-through';

                        return (
                          <div key={opt.key} className={`p-2.5 rounded-lg border flex items-center justify-between ${style}`}>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{opt.key}:</span>
                              <span>{opt.text}</span>
                            </div>
                            {isCorrectOption && <span className="text-[10px] text-emerald-400 font-bold">CORRECT</span>}
                            {isUserChoice && !isCorrectOption && <span className="text-[10px] text-rose-400 font-bold">YOU CHOSE</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Clinical Explanation */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
                      <span className="font-bold text-rose-400 uppercase tracking-wider block text-[10px]">
                        Clinical Rationale:
                      </span>
                      <p>{q.explanation}</p>
                      {userState.showArabic && (
                        <p className="pt-2 border-t border-slate-800 text-slate-400 font-sans" dir="rtl">
                          {q.explanationAr}
                        </p>
                      )}
                    </div>

                    {/* Board Pearl */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">Takeaway:</span>
                        <span>{q.pearl}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
