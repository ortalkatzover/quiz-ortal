import { motion } from 'framer-motion';
import { TOTAL_QUESTIONS } from '../data/questions';

interface ProgressBarProps {
  current: number; // 1-based
}

export default function ProgressBar({ current }: ProgressBarProps) {
  const percent = (current / TOTAL_QUESTIONS) * 100;

  return (
    <div className="w-full mb-6" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={TOTAL_QUESTIONS} aria-label={`שאלה ${current} מתוך ${TOTAL_QUESTIONS}`}>
      <div className="flex justify-between items-center mb-2">
        <span style={{ color: 'var(--color-text-sub)', fontSize: '13px', fontWeight: 500 }}>
          שאלה {current} מתוך {TOTAL_QUESTIONS}
        </span>
        <span style={{ color: 'var(--color-primary)', fontSize: '13px', fontWeight: 600 }}>
          {Math.round(percent)}%
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: '6px',
          background: 'var(--color-primary-light)',
          borderRadius: '99px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-primary-dark), var(--color-primary))',
            borderRadius: '99px',
          }}
        />
      </div>
    </div>
  );
}
