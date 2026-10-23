import React, { useState } from 'react';
import { Printer, CheckSquare, Eye, FileText, Download } from 'lucide-react';
import { HAEMATOLOGY_QUESTIONS } from '../data/questions';

export const PrintableView: React.FC = () => {
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [includeArabic, setIncludeArabic] = useState(false);
  const [includeBubbleSheet, setIncludeBubbleSheet] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Print Controls Card (Hidden when printing via print:hidden) */}
      <div className="print:hidden bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Printer className="w-5 h-5 text-rose-500" />
              <span>Printable Exam & Study Sheet Generator</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Export an official 70 MCQ medical examination paper or study guide formatted for print and PDF saving.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/30 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* Configuration toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
            />
            <div>
              <span className="font-semibold block">Include Answer Key & Explanations</span>
              <span className="text-[11px] text-slate-500">Generates faculty / study guide copy</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={includeArabic}
              onChange={(e) => setIncludeArabic(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
            />
            <div>
              <span className="font-semibold block">Include Arabic Translations</span>
              <span className="text-[11px] text-slate-500">Bilingual questions and answers</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={includeBubbleSheet}
              onChange={(e) => setIncludeBubbleSheet(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
            />
            <div>
              <span className="font-semibold block">Include 70-Question Bubble Sheet</span>
              <span className="text-[11px] text-slate-500">For mock written test administration</span>
            </div>
          </label>
        </div>
      </div>

      {/* PRINTABLE DOCUMENT CANVAS */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl print:shadow-none print:p-0 print:m-0 print:border-none print:rounded-none">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900">
                HAEMATOLOGY COMPREHENSIVE EXAMINATION
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                70 Multiple Choice Questions (MCQs) · Standard Duration: 70 Minutes
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span className="font-bold text-slate-800">
                {includeAnswers ? 'OFFICIAL INSTRUCTOR KEY' : 'CANDIDATE PAPER'}
              </span>
            </div>
          </div>

          {!includeAnswers && (
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-300 text-xs">
              <div>
                <span className="font-bold text-slate-700">Candidate Name: </span>
                <span className="border-b border-dotted border-slate-400 inline-block w-40">&nbsp;</span>
              </div>
              <div>
                <span className="font-bold text-slate-700">Candidate ID: </span>
                <span className="border-b border-dotted border-slate-400 inline-block w-32">&nbsp;</span>
              </div>
              <div>
                <span className="font-bold text-slate-700">Date: </span>
                <span className="border-b border-dotted border-slate-400 inline-block w-28">&nbsp;</span>
              </div>
            </div>
          )}
        </div>

        {/* Candidate Bubble Sheet if requested */}
        {includeBubbleSheet && !includeAnswers && (
          <div className="mb-8 p-4 border border-slate-300 rounded-lg bg-slate-50 text-xs page-break-after">
            <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-3 text-center">
              Official 70-Question Answer Grid (Darken one circle per question)
            </h3>
            <div className="grid grid-cols-7 sm:grid-cols-10 gap-x-3 gap-y-1.5 font-mono text-[11px]">
              {HAEMATOLOGY_QUESTIONS.map(q => (
                <div key={q.id} className="flex items-center justify-between border-b border-slate-200 pb-0.5">
                  <span className="font-bold text-slate-700 w-5">{q.id}.</span>
                  <div className="flex gap-1 text-[9px] text-slate-600">
                    <span>(A)</span>
                    <span>(B)</span>
                    <span>(C)</span>
                    <span>(D)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6 text-xs sm:text-sm">
          {HAEMATOLOGY_QUESTIONS.map((q) => {
            return (
              <div key={q.id} className="break-inside-avoid border-b border-slate-200 pb-4">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0 font-mono">
                    {q.id}.
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 leading-snug">
                      {q.question}
                    </p>

                    {includeArabic && (
                      <p className="text-slate-600 text-xs mt-1 font-sans" dir="rtl">
                        {q.questionAr}
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-2.5 pl-2 text-slate-800">
                      {q.options.map((opt) => {
                        const isCorrect = opt.key === q.correctAnswer;
                        return (
                          <div
                            key={opt.key}
                            className={`flex items-start gap-2 ${
                              includeAnswers && isCorrect
                                ? 'font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded'
                                : ''
                            }`}
                          >
                            <span className="font-mono font-bold shrink-0">
                              {opt.key})
                            </span>
                            <span>{opt.text}</span>
                            {includeArabic && (
                              <span className="text-[11px] text-slate-500 font-sans ml-1" dir="rtl">
                                ({opt.textAr})
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {includeAnswers && (
                      <div className="mt-3 p-2.5 bg-slate-50 border-l-2 border-rose-600 rounded-r text-xs text-slate-700 space-y-1">
                        <div>
                          <strong className="text-rose-700">Correct Answer: </strong>
                          <span className="font-bold">({q.correctAnswer})</span> — {q.options.find(o => o.key === q.correctAnswer)?.text}
                        </div>
                        <p className="leading-relaxed text-slate-600">
                          {q.explanation}
                        </p>
                        {includeArabic && (
                          <p className="text-slate-500 pt-1 border-t border-slate-200 text-[11px]" dir="rtl">
                            {q.explanationAr}
                          </p>
                        )}
                        <p className="text-amber-800 text-[11px] font-semibold">
                          Pearl: {q.pearl}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Answer Key Table at bottom (if not already expanded in questions) */}
        {!includeAnswers && (
          <div className="mt-12 pt-6 border-t-2 border-slate-900 break-inside-avoid">
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 mb-3 text-center">
              APPENDIX: MASTER ANSWER KEY (مفتاح الإجابات المعتمد)
            </h3>
            <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 font-mono text-xs text-center border p-3 rounded-lg bg-slate-50">
              {HAEMATOLOGY_QUESTIONS.map(q => (
                <div key={q.id} className="p-1 border border-slate-200 rounded bg-white">
                  <span className="text-slate-500 text-[10px] block">{q.id}</span>
                  <span className="font-bold text-rose-600">{q.correctAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
