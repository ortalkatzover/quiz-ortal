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
          fontWeight: 700,
          color: 'var(--color-navy)',
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
              animate={{ opacity: dimmed ? 0.42 : 1, y: 0 }}
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
                borderRadius: '13px',
                border: `2px solid ${isSelected ? 'var(--color-navy)' : 'rgba(228, 208, 207, 0.7)'}`,
                background: isSelected
                  ? 'rgba(15, 53, 105, 0.05)'
                  : 'rgba(255, 255, 255, 0.75)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: isSelected
                  ? '0 0 0 3px rgba(15,53,105,0.1), 0 4px 16px rgba(15,53,105,0.08)'
                  : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s, opacity 0.25s',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'var(--color-rose)';
                  el.style.boxShadow = '0 4px 14px rgba(221,166,163,0.2)';
                  el.style.background = 'rgba(255,255,255,0.95)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'rgba(228,208,207,0.7)';
                  el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                  el.style.background = 'rgba(255,255,255,0.75)';
                }
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--color-navy)' : 'var(--color-border)'}`,
                  background: isSelected ? 'var(--color-navy)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(15,53,105,0.3)' : 'none',
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
                  color: isSelected ? 'var(--color-navy)' : 'var(--color-text-main)',
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

      <FeedbackMessage text={selectedAnswer?.feedback ?? ''} visible={showFeedback && selectedIndex !== null} />

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
                borderRadius: '13px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--color-navy), var(--color-navy-dark))',
                color: '#fff',
                fontSize: '17px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(15,53,105,0.3)',
                fontFamily: 'inherit',
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
              opacity: 0.65,
              transition: 'opacity 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.opacity = '1';
              el.style.color = 'var(--color-navy)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.opacity = '0.65';
              el.style.color = 'var(--color-text-sub)';
            }}
          >
            חזרה לשאלה הקודמת
          </button>
        )}
      </div>
    </div>
  );
}
