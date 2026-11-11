/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QUIZZES } from '../data/senaData';
import { Quiz, QuizQuestion } from '../types/induction';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';

interface InteractiveQuizzesProps {
  quizScores: Record<string, number>;
  onQuizComplete: (quizId: string, score: number) => void;
}

export const InteractiveQuizzes: React.FC<InteractiveQuizzesProps> = ({
  quizScores,
  onQuizComplete
}) => {
  const [selectedQuizId, setSelectedQuizId] = useState<string>('quiz-mod-1');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedCurrent, setSubmittedCurrent] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const activeQuiz = QUIZZES.find(q => q.id === selectedQuizId) || QUIZZES[0];
  const currentQuestion: QuizQuestion = activeQuiz.questions[currentQuestionIdx];

  const handleSelectAnswer = (optionIdx: number) => {
    if (submittedCurrent) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestionIdx]: optionIdx }));
    setSubmittedCurrent(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSubmittedCurrent(userAnswers[currentQuestionIdx + 1] !== undefined);
    } else {
      // Calculate final score
      let correctCount = 0;
      activeQuiz.questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / activeQuiz.questions.length) * 100);
      setQuizFinished(true);
      onQuizComplete(activeQuiz.id, finalScore);
    }
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setSubmittedCurrent(false);
    setQuizFinished(false);
  };

  const handleSwitchQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setSubmittedCurrent(false);
    setQuizFinished(false);
  };

  // Score calculation for finish screen
  let correctCount = 0;
  activeQuiz.questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });
  const currentQuizScore = Math.round((correctCount / activeQuiz.questions.length) * 100);
  const isPassed = currentQuizScore >= activeQuiz.passingScore;

  return (
    <div className="space-y-8">
      {/* Module Quiz Selector Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <span className="text-[#39A900] font-semibold">Evaluaciones de Inducción</span>
              <span aria-hidden="true">·</span>
              <span>4 Módulos Obligatorios</span>
              <span aria-hidden="true">·</span>
              <span>Mínimo Aprobatorio: 80%</span>
            </div>
            <h2 className="text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              Cuestionarios Interactivos del Aprendiz
            </h2>
          </div>
        </div>

        {/* Quizzes Grid Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUIZZES.map((q, idx) => {
            const isCurrent = q.id === selectedQuizId;
            const savedScore = quizScores[q.id];
            const hasCompleted = savedScore !== undefined;
            const passed = hasCompleted && savedScore >= q.passingScore;

            return (
              <button
                key={q.id}
                onClick={() => handleSwitchQuiz(q.id)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  isCurrent
                    ? 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-[#39A900] shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Módulo {idx + 1}</span>
                  {hasCompleted && (
                    <span className={`font-mono text-[11px] font-bold ${passed ? 'text-[#39A900]' : 'text-amber-600 dark:text-amber-400'}`}>
                      {savedScore}% {passed ? '✓' : ''}
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{q.title.replace('Evaluación: ', '')}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{q.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Quiz Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
        {!quizFinished ? (
          <div>
            {/* Question Progress Header */}
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                  {activeQuiz.title}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Pregunta {currentQuestionIdx + 1} de {activeQuiz.questions.length}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-32 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#39A900] h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Question Stem */}
            <div className="mt-6 mb-8">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                const isCorrectOption = optIdx === currentQuestion.correctIndex;

                let optionStyles = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200';

                if (submittedCurrent) {
                  if (isCorrectOption) {
                    optionStyles = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyles = 'border-rose-400 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 ring-1 ring-rose-400';
                  } else {
                    optionStyles = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(optIdx)}
                    disabled={submittedCurrent}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${optionStyles}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? 'bg-[#00324D] dark:bg-[#39A900] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-xs md:text-sm font-medium leading-relaxed flex-1">
                      {optionText}
                    </span>
                    {submittedCurrent && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {submittedCurrent && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Normative Feedback Box */}
            {submittedCurrent && (
              <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  <HelpCircle className="w-4 h-4 text-[#39A900]" />
                  <span>Sustento Normativo y Pedagógico:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                  Referencia oficial: {currentQuestion.normReference}
                </p>
              </div>
            )}

            {/* Navigation / Next Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={!submittedCurrent}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg transition-all ${
                  submittedCurrent
                    ? 'bg-[#39A900] text-white hover:bg-[#2e8302] shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <span>
                  {currentQuestionIdx < activeQuiz.questions.length - 1
                    ? 'Siguiente Pregunta'
                    : 'Finalizar Evaluación'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-8 max-w-lg mx-auto">
            <div
              className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
                isPassed ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900]' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
              }`}
            >
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#00324D] dark:text-white font-heading">
              {isPassed ? '¡Evaluación Aprobada!' : 'Evaluación Pendiente de Aprobación'}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              {isPassed
                ? 'Felicitaciones. Has demostrado un sólido dominio de este módulo temático de la inducción.'
                : 'No alcanzaste el puntaje mínimo aprobatorio del 80%. Te sugerimos repasar los contenidos y reintentar.'}
            </p>

            {/* Score Ring / Metric */}
            <div className="my-6 p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 inline-block min-w-[220px]">
              <span className="text-4xl font-extrabold font-mono text-[#00324D] dark:text-emerald-400">
                {currentQuizScore}%
              </span>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                {correctCount} de {activeQuiz.questions.length} respuestas correctas
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRestartQuiz}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar</span>
              </button>
              {isPassed && (
                <button
                  onClick={() => {
                    const currentIndex = QUIZZES.findIndex(q => q.id === selectedQuizId);
                    const nextQuiz = QUIZZES[(currentIndex + 1) % QUIZZES.length];
                    handleSwitchQuiz(nextQuiz.id);
                  }}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2e8302] rounded-lg transition-colors"
                >
                  <span>Siguiente Módulo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
