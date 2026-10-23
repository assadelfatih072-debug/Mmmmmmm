import { Question, Category } from '../data/questions';

export type AppMode = 'exam' | 'practice' | 'flashcards' | 'bank' | 'analytics' | 'print';

export interface ExamAttempt {
  id: string;
  timestamp: number;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  categoryScores: Record<Category, { correct: number; total: number }>;
}

export interface UserState {
  bookmarks: number[];
  flaggedExamIds: number[];
  notes: Record<number, string>;
  practiceAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  examAttempts: ExamAttempt[];
  flashcardMastery: Record<number, 'mastered' | 'reviewing' | 'unseen'>;
  showArabic: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
}
