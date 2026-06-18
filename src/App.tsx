import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizPhase, LeadData, QuizResult } from './types/quiz';
import { QUESTIONS, TOTAL_QUESTIONS } from './data/questions';
import { calculateScore, determineResult, buildAnswerRecords } from './utils/calculateResult';
import { submitLead } from './services/submitLead';
import QuizIntro from './components/QuizIntro';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import LeadForm from './components/LeadForm';
import ResultScreen from './components/ResultScreen';

const STORAGE_KEY = 'quiz_state_v1';

interface PersistedState {
  phase: QuizPhase;
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  showFeedback: boolean;
  result: QuizResult | null;
}

function loadState(): PersistedState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function clearState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export default function App() {
  const saved = loadState();

  const [phase, setPhase] = useState<QuizPhase>(saved?.phase ?? 'intro');
  const [currentQuestion, setCurrentQuestion] = useState(saved?.currentQuestion ?? 0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    saved?.selectedAnswers ?? Array(TOTAL_QUESTIONS).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(saved?.showFeedback ?? false);
  const [result, setResult] = useState<QuizResult | null>(saved?.result ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (phase === 'intro') return;
    saveState({ phase, currentQuestion, selectedAnswers, showFeedback, result });
  }, [phase, currentQuestion, selectedAnswers, showFeedback, result]);

  const handleStart = useCallback(() => {
    setPhase('question');
    setCurrentQuestion(0);
    setSelectedAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setShowFeedback(false);
    setResult(null);
  }, []);

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = index;
      return next;
    });
    setShowFeedback(true);
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    const isLast = currentQuestion === TOTAL_QUESTIONS - 1;
    if (isLast) {
      setPhase('form');
      setShowFeedback(false);
    } else {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      setShowFeedback(selectedAnswers[nextQ] !== null);
    }
  }, [currentQuestion, selectedAnswers]);

  const handleBack = useCallback(() => {
    if (currentQuestion === 0) return;
    const prevQ = currentQuestion - 1;
    setCurrentQuestion(prevQ);
    setShowFeedback(selectedAnswers[prevQ] !== null);
  }, [currentQuestion, selectedAnswers]);

  const handleFormSubmit = useCallback(async (leadData: LeadData) => {
    setIsSubmitting(true);
    const { totalScore, warningCount } = calculateScore(selectedAnswers, QUESTIONS);
    const quizResult = determineResult(totalScore, warningCount);
    const answerRecords = buildAnswerRecords(selectedAnswers, QUESTIONS);

    await submitLead({
      ...leadData,
      answers: answerRecords,
      totalScore,
      warningCount,
      result: quizResult,
      createdAt: new Date().toISOString(),
    });

    setResult(quizResult);
    setPhase('result');
    setIsSubmitting(false);
  }, [selectedAnswers]);

  const handleRestart = useCallback(() => {
    clearState();
    setPhase('intro');
    setCurrentQuestion(0);
    setSelectedAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setShowFeedback(false);
    setResult(null);
  }, []);

  const question = QUESTIONS[currentQuestion];

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '24px 16px 48px',
        background: 'var(--color-primary-xlight)',
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '720px',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-primary-dark)', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', opacity: 0.8 }}>
          מעצבות מבוקשות בעידן AI
        </p>
      </motion.header>

      <main
        style={{
          width: '100%',
          maxWidth: '720px',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 4px 40px rgba(192, 122, 142, 0.1), 0 1px 8px rgba(0,0,0,0.06)',
          padding: 'clamp(28px, 6vw, 56px)',
          overflow: 'hidden',
        }}
        role="main"
        aria-label="שאלון התאמה"
      >
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <QuizIntro onStart={handleStart} />
            </motion.div>
          )}

          {phase === 'question' && question && (
            <motion.div key={`q-${currentQuestion}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <ProgressBar current={currentQuestion + 1} />
              <QuestionCard
                question={question}
                selectedIndex={selectedAnswers[currentQuestion]}
                onSelect={handleSelectAnswer}
                onNext={handleNext}
                onBack={handleBack}
                showBack={currentQuestion > 0}
                showFeedback={showFeedback}
                questionNumber={currentQuestion}
              />
            </motion.div>
          )}

          {phase === 'form' && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <LeadForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
            </motion.div>
          )}

          {phase === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <ResultScreen result={result} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer
        style={{
          marginTop: '24px',
          textAlign: 'center',
          color: 'var(--color-text-sub)',
          fontSize: '12px',
          opacity: 0.6,
        }}
      >
        © אורטל {new Date().getFullYear()} · כל הזכויות שמורות
      </footer>
    </div>
  );
}
