import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '../types/quiz';
import FeedbackMessage from './FeedbackMessage';

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
  showBack: boolean;
  showFeedback: boolean;
  questionNumber: number;
}

export default function QuestionCard({
  question,
  selectedIndex,
  onSelect,
  onNext,
  onBack,
  showBack,
  showFeedback,
  questionNumber,
}: QuestionCardProps) {
  const selectedAnswer = selectedIndex !== null ? question.answers[selectedIndex] : null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionNumber}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            marginBottom: '24px',
            lineHeight: 1.4,
          }}
        >
          {question.text}
        </h2>

        <div
          role="group"
          aria-label={question.text}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {question.answers.map((answer, index) => {
            const isSelected = selectedIndex === index;
            return (
              <motion.button
                key={index}
                onClick={() => onSelect(index)}
                whileTap={{ scale: 0.98 }}
                role="radio"
                aria-checked={isSelected}
                aria-label={answer.text}
                style={{
                  width: '100%',
                  textAlign: 'right',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: isSelected ? 'var(--color-primary-xlight)' : 'var(--color-white)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: isSelected
                    ? '0 0 0 3px rgba(192, 122, 142, 0.12)'
                    : '0 1px 4px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary-light)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                  }
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    background: isSelected ? 'var(--color-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                    lineHeight: 1.45,
                    flex: 1,
                  }}
                >
                  {answer.text}
                </span>
              </motion.button>
            );
          })}
        </div>

        <FeedbackMessage
          text={selectedAnswer?.feedback ?? ''}
          visible={showFeedback && selectedIndex !== null}
        />

        <div
          style={{
            marginTop: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <AnimatePresence>
            {showFeedback && selectedIndex !== null && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onNext}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(192, 122, 142, 0.35)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(192, 122, 142, 0.45)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = '';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(192, 122, 142, 0.35)';
                }}
              >
                לשאלה הבאה ←
              </motion.button>
            )}
          </AnimatePresence>

          {showBack && (
            <button
              onClick={onBack}
              aria-label="חזרה לשאלה הקודמת"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-sub)',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px',
                fontFamily: 'inherit',
                textDecoration: 'underline',
                textDecorationColor: 'transparent',
                transition: 'color 0.2s, text-decoration-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)';
                (e.currentTarget as HTMLButtonElement).style.textDecorationColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-sub)';
                (e.currentTarget as HTMLButtonElement).style.textDecorationColor = 'transparent';
              }}
            >
              ← חזרה לשאלה הקודמת
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
