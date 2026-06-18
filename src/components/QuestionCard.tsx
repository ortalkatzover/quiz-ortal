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
    <div>
      <h2
        style={{
          fontSize: 'clamp(18px, 3.5vw, 22px)',
          fontWeight: 800,
          color: 'var(--color-text-main)',
          marginBottom: '24px',
          lineHeight: 1.4,
          fontFamily: "'Playfair Display', 'Assistant', serif",
        }}
      >
        {question.text}
      </h2>

      <div role="group" aria-label={question.text} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.answers.map((answer, index) => {
          const isSelected = selectedIndex === index;
          const dimmed = selectedIndex !== null && !isSelected;

          return (
            <motion.button
              key={`${questionNumber}-${index}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: dimmed ? 0.45 : 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.07, ease: 'easeOut' }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(index)}
              role="radio"
              aria-checked={isSelected}
              aria-label={answer.text}
              style={{
                width: '100%',
                textAlign: 'right',
                padding: '15px 18px',
                borderRadius: '14px',
                border: `2px solid ${isSelected ? 'var(--color-primary)' : 'rgba(232, 205, 210, 0.6)'}`,
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(239,200,208,0.4), rgba(196,128,140,0.12))'
                  : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: isSelected
                  ? '0 0 0 3px rgba(196,128,140,0.15), 0 4px 16px rgba(196,128,140,0.15)'
                  : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s, opacity 0.25s',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'var(--color-primary-light)';
                  el.style.boxShadow = '0 4px 14px rgba(196,128,140,0.14)';
                  el.style.background = 'rgba(255,255,255,0.95)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'rgba(232,205,210,0.6)';
                  el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                  el.style.background = 'rgba(255,255,255,0.7)';
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
                  boxShadow: isSelected ? '0 2px 8px rgba(196,128,140,0.4)' : 'none',
                }}
              >
                {isSelected && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    width="10" height="8" viewBox="0 0 10 8" fill="none"
                  >
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
              </span>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                  lineHeight: 1.45,
                  flex: 1,
                  transition: 'font-weight 0.15s, color 0.15s',
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

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <AnimatePresence>
          {showFeedback && selectedIndex !== null && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                color: '#fff',
                fontSize: '17px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(160,96,112,0.35)',
                fontFamily: 'inherit',
                letterSpacing: '0.2px',
              }}
            >
              לשאלה הבאה
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
              opacity: 0.7,
              transition: 'opacity 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.7';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-sub)';
            }}
          >
            חזרה לשאלה הקודמת
          </button>
        )}
      </div>
    </div>
  );
}
