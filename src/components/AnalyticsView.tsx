import React from 'react';
import { 
  BarChart3, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  Layers, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { UserState } from '../types';
import { CATEGORIES, HAEMATOLOGY_QUESTIONS, Category } from '../data/questions';

interface AnalyticsViewProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  onStartExam: () => void;
  onPracticeCategory: (category: Category) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  userState,
  setUserState,
  onStartExam,
  onPracticeCategory,
}) => {
  // Practice stats
  const totalPracticeAnswered = Object.keys(userState.practiceAnswers).length;
  const totalPracticeCorrect = HAEMATOLOGY_QUESTIONS.filter(q => userState.practiceAnswers[q.id] === q.correctAnswer).length;
  const practiceAccuracy = totalPracticeAnswered > 0 ? Math.round((totalPracticeCorrect / totalPracticeAnswered) * 100) : 0;

  // Flashcards stats
  const masteredCount = Object.values(userState.flashcardMastery).filter(v => v === 'mastered').length;
  const reviewingCount = Object.values(userState.flashcardMastery).filter(v => v === 'reviewing').length;

  // Category accuracy computed from practice answers
  const categoryStats = CATEGORIES.map(cat => {
    const questionsInCat = HAEMATOLOGY_QUESTIONS.filter(q => q.category === cat);
    const answeredInCat = questionsInCat.filter(q => userState.practiceAnswers[q.id] !== undefined);
    const correctInCat = questionsInCat.filter(q => userState.practiceAnswers[q.id] === q.correctAnswer);
    const accuracy = answeredInCat.length > 0 ? Math.round((correctInCat.length / answeredInCat.length) * 100) : 0;
    
    return {
      category: cat,
      total: questionsInCat.length,
      answered: answeredInCat.length,
      correct: correctInCat.length,
      accuracy,
    };
  });

  // Sort weakest to strongest
  const sortedByWeakest = [...categoryStats].sort((a, b) => {
    if (a.answered === 0) return 1;
    if (b.answered === 0) return -1;
    return a.accuracy - b.accuracy;
  });

  const clearHistory = () => {
    if (window.confirm('Clear all exam history logs? (Your bookmarks and notes will remain intact)')) {
      setUserState(prev => ({ ...prev, examAttempts: [] }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-rose-500" />
              <span>Haematology Mastery & Performance Analytics</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time diagnosis of knowledge gaps, flashcard retention, and historical exam attempts.
            </p>
          </div>
        </div>

        {/* Global KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Study Practice Accuracy</span>
            <span className="text-2xl font-bold font-mono text-emerald-400">{practiceAccuracy}%</span>
            <span className="text-xs text-slate-500 block mt-1">{totalPracticeAnswered} of 70 answered</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Flashcards Mastered</span>
            <span className="text-2xl font-bold font-mono text-white">{masteredCount}</span>
            <span className="text-xs text-slate-500 block mt-1">{reviewingCount} marked for review</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Exam Attempts</span>
            <span className="text-2xl font-bold font-mono text-rose-400">{userState.examAttempts.length}</span>
            <span className="text-xs text-slate-500 block mt-1">
              {userState.examAttempts.length > 0 
                ? `Best: ${Math.max(...userState.examAttempts.map(a => a.percentage))}%`
                : 'No full exam taken yet'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Bookmarked High-Yield</span>
            <span className="text-2xl font-bold font-mono text-amber-400">{userState.bookmarks.length}</span>
            <span className="text-xs text-slate-500 block mt-1">Saved for final review</span>
          </div>
        </div>
      </div>

      {/* Grid: Weak areas & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span>Domain Accuracy Breakdown</span>
            <span className="text-xs font-normal text-slate-400">Click to practice</span>
          </h3>

          <div className="space-y-4 pt-2">
            {categoryStats.map(stat => (
              <div
                key={stat.category}
                onClick={() => onPracticeCategory(stat.category)}
                className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-rose-500/40 hover:bg-slate-900 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200 group-hover:text-rose-400 transition-colors">
                    {stat.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">
                      {stat.correct}/{stat.answered} correct
                    </span>
                    <span className={`font-mono font-bold text-xs ${
                      stat.accuracy >= 70 ? 'text-emerald-400' : stat.answered === 0 ? 'text-slate-500' : 'text-rose-400'
                    }`}>
                      {stat.answered > 0 ? `${stat.accuracy}%` : 'Not attempted'}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stat.accuracy >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${stat.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Focus & Recommendations (1 col) */}
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-500" />
              <span>Recommended Focus</span>
            </h3>

            <p className="text-xs text-slate-400">
              Based on your answers, these clinical topics will yield the highest board score improvement:
            </p>

            <div className="space-y-3 pt-2">
              {sortedByWeakest.slice(0, 3).map((item, idx) => (
                <div key={item.category} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-rose-400">#{idx + 1} {item.category}</span>
                    <span className="text-slate-500 font-mono">{item.accuracy}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    {item.answered === 0
                      ? 'No practice attempted yet. High-yield core topic.'
                      : `You answered ${item.correct} of ${item.answered} correctly.`}
                  </p>
                  <button
                    onClick={() => onPracticeCategory(item.category)}
                    className="w-full py-1.5 px-3 rounded-lg bg-rose-600/15 border border-rose-500/30 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors text-center font-semibold"
                  >
                    Practice This Domain
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exam Attempts History Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white">Exam Simulation History</h3>
          {userState.examAttempts.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
            >
              Clear Logs
            </button>
          )}
        </div>

        {userState.examAttempts.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No timed exams completed yet. Take an exam simulation to log your score history.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Questions</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Percentage</th>
                  <th className="py-3 px-4">Result</th>
                  <th className="py-3 px-4">Time Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                {userState.examAttempts.map(attempt => {
                  const pass = attempt.percentage >= 70;
                  const dateStr = new Date(attempt.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr key={attempt.id} className="hover:bg-slate-900/50">
                      <td className="py-3 px-4 text-slate-300">{dateStr}</td>
                      <td className="py-3 px-4">{attempt.totalQuestions} MCQs</td>
                      <td className="py-3 px-4 font-bold text-white">{attempt.score} / {attempt.totalQuestions}</td>
                      <td className="py-3 px-4 font-bold text-white">{attempt.percentage}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pass ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {pass ? 'PASSED' : 'FAILED'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
