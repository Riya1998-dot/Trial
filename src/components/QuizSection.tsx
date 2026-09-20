import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Lightbulb, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { QuizQuestion } from '../types';
import { sounds } from '../utils/sound';

interface QuizSectionProps {
  questions: QuizQuestion[];
  topicTitle: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions, topicTitle }) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = questions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (questionId: number, optionIdx: number, correctIdx: number) => {
    if (userAnswers[questionId] !== undefined) return; // Already answered

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));

    if (optionIdx === correctIdx) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }

    // If this was the last question, automatically calculate score and celebrate if >= 4
    if (answeredCount + 1 === totalQuestions) {
      const willScore = correctCount + (optionIdx === correctIdx ? 1 : 0);
      if (willScore >= 4) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setUserAnswers({});
    setShowResults(false);
  };

  return (
    <div id="5-mcq-quiz-section" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
      {/* Quiz Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" /> NCVT / CTS Exam Assessment
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            5 MCQ Knowledge Check: {topicTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Questions modelled after All India Trade Test (AITT) COPA examination patterns.
          </p>
        </div>

        {/* Score Pill & Reset */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
            <span className="text-xs text-slate-500">Score:</span>
            <span className="font-mono text-base font-bold text-emerald-600">
              {correctCount} / {totalQuestions}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {answeredCount === totalQuestions && (
        <div className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          correctCount >= 4 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 shrink-0" />
            <div>
              <span className="font-bold text-sm block">
                {correctCount === 5 ? 'Outstanding Performance! 5/5 Grade A' :
                 correctCount === 4 ? 'Great Job! 4/5 Passed with Distinction' :
                 `You scored ${correctCount}/${totalQuestions}. Review the explanations below.`}
              </span>
              <span className="text-xs opacity-80">
                {correctCount >= 4 ? 'Trainees have mastered this core COPA concept.' : 'Use the Trainer Notes below to re-explain the concept.'}
              </span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-white text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50"
          >
            Retake Quiz
          </button>
        </div>
      )}

      {/* 5 MCQ Questions List */}
      <div className="mt-6 space-y-6">
        {questions.map((q, qIndex) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const selectedOption = userAnswers[q.id];
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              {/* Question text */}
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  Q{qIndex + 1}
                </span>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* 4 Options Grid */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((optionText, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                    } else if (isThisSelected && !isThisCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                    } else {
                      btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                    >
                      <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-normal">{optionText}</span>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Exam Tip box once answered */}
              {isAnswered && (
                <div className="mt-3.5 p-3.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-slate-900 shrink-0">Explanation:</span>
                    <span>{q.explanation}</span>
                  </div>
                  {q.examTip && (
                    <div className="flex items-start gap-2 text-amber-800 bg-amber-50 p-2 rounded border border-amber-200/60">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-900">NCVT Exam Tip: </span>
                        <span>{q.examTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
