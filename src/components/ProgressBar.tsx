import { motion } from 'framer-motion';
import { TOTAL_QUESTIONS } from '../data/questions';

interface ProgressBarProps {
  current: number;
}

export default function ProgressBar({ current }: ProgressBarProps) {
  const percent = (current / TOTAL_QUESTIONS) * 100;

  return (
    <div
      className="w-full mb-6"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={TOTAL_QUESTIONS}
      aria-label={`שאלה ${current} מתוך ${TOTAL_QUESTIONS}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: 'var(--color-text-sub)', fontSize: '13px', fontWeight: 500 }}>
          שאלה {current} מתוך {TOTAL_QUESTIONS}
        </span>
        <span style={{ color: 'var(--color-primary)', fontSize: '13px', fontWeight: 700 }}>
          {Math.round(percent)}%
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: '7px',
          background: 'rgba(239,200,208,0.45)',
          borderRadius: '99px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="progress-fill"
          style={{ height: '100%', borderRadius: '99px' }}
        />
      </div>
    </div>
  );
}
