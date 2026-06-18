import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizPhase, QuizResult } from './types/quiz';
import { QUESTIONS, TOTAL_QUESTIONS } from './data/questions';
import { calculateScore, determineResult, buildAnswerRecords } from './utils/calculateResult';
import { submitLead } from './services/submitLead';
import QuizIntro from './components/QuizIntro';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
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
  } catch {}
}

function clearState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
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
      const { totalScore, warningCount } = calculateScore(selectedAnswers, QUESTIONS);
      const quizResult = determineResult(totalScore, warningCount);
      const answerRecords = buildAnswerRecords(selectedAnswers, QUESTIONS);
      submitLead({
        fullName: '',
        phone: '',
        email: '',
        marketingConsent: false,
        answers: answerRecords,
        totalScore,
        warningCount,
        result: quizResult,
        createdAt: new Date().toISOString(),
      });
      setResult(quizResult);
      setPhase('result');
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
    <div style={{ minHeight: '100dvh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '24px 16px 48px', position: 'relative', overflow: 'hidden' }}>

      {/* Animated blobs */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: '720px', textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}
      >
        <p style={{ margin: 0, fontSize: '13px', color: '#fff', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
          מעצבות מבוקשות בעידן AI
        </p>
      </motion.header>

      <main
        style={{
          width: '100%',
          maxWidth: '720px',
          background: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '28px',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 8px 60px rgba(160, 80, 100, 0.18), 0 2px 12px rgba(0,0,0,0.06)',
          padding: 'clamp(28px, 6vw, 56px)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
        role="main"
        aria-label="שאלון התאמה"
      >
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}>
              <QuizIntro onStart={handleStart} />
            </motion.div>
          )}

          {phase === 'question' && question && (
            <motion.div key={`q-${currentQuestion}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16, transition: { duration: 0.15 } }}>
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

          {phase === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.4, ease: 'easeOut' }}>
              <ResultScreen result={result} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ marginTop: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px', position: 'relative', zIndex: 1 }}>
        © אורטל {new Date().getFullYear()} · כל הזכויות שמורות
      </footer>
    </div>
  );
}
