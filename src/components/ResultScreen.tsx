import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { QuizResult } from '../types/quiz';
import { RESULTS } from '../data/results';

function fireConfetti() {
  const colors = ['#dda6a3', '#0f3569', '#f0c8c6', '#ffffff', '#c0d0e8'];
  confetti({ particleCount: 80, spread: 70, origin: { x: 0.25, y: 0.55 }, colors, scalar: 0.9 });
  setTimeout(() => {
    confetti({ particleCount: 80, spread: 70, origin: { x: 0.75, y: 0.55 }, colors, scalar: 0.9 });
  }, 150);
  setTimeout(() => {
    confetti({ particleCount: 40, spread: 50, origin: { x: 0.5, y: 0.4 }, colors, scalar: 0.8 });
  }, 300);
}

const TAG_STYLES: Record<QuizResult, { label: string; color: string; bg: string }> = {
  high_match: { label: 'התאמה גבוהה', color: '#0f3569', bg: 'rgba(15,53,105,0.08)' },
  potential:  { label: 'פוטנציאל מצוין', color: '#7a5c00', bg: 'rgba(221,180,80,0.12)' },
  not_ready:  { label: 'בשלב הזה', color: '#6b4040', bg: 'rgba(221,166,163,0.2)' },
};

interface ResultScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

export default function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const cfg = RESULTS[result];
  const tag = TAG_STYLES[result];

  useEffect(() => {
    if (result === 'high_match') {
      const t = setTimeout(fireConfetti, 500);
      return () => clearTimeout(t);
    }
  }, [result]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ textAlign: 'center' }}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
        style={{
          width: '72px', height: '72px',
          background: result === 'high_match'
            ? 'linear-gradient(135deg, var(--color-navy), var(--color-navy-dark))'
            : result === 'potential'
            ? 'linear-gradient(135deg, var(--color-rose), var(--color-rose-dark))'
            : 'linear-gradient(135deg, #c0b0a0, #9a8878)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 18px',
          boxShadow: result === 'high_match'
            ? '0 8px 28px rgba(15,53,105,0.35)'
            : '0 8px 28px rgba(221,166,163,0.35)',
        }}
        aria-hidden="true"
      >
        {result === 'high_match' ? (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M7 15l6 6 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : result === 'potential' ? (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="10" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M15 10v6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="15" cy="20" r="1.2" fill="white"/>
          </svg>
        ) : (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M15 8l1.5 8h-3L15 8z" fill="white"/>
            <circle cx="15" cy="20" r="1.5" fill="white"/>
          </svg>
        )}
      </motion.div>

      {/* Tag */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{
          display: 'inline-block',
          padding: '5px 16px',
          borderRadius: '99px',
          background: tag.bg,
          color: tag.color,
          fontSize: '13px',
          fontWeight: 700,
          marginBottom: '20px',
          letterSpacing: '0.3px',
        }}
      >
        {tag.label}
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        style={{
          fontSize: 'clamp(20px, 4.5vw, 26px)',
          fontWeight: 700,
          color: 'var(--color-navy)',
          lineHeight: 1.35,
          marginBottom: '16px',
          fontFamily: "'Playfair Display', 'Assistant', serif",
        }}
      >
        {cfg.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        style={{ fontSize: '16px', color: 'var(--color-text-sub)', lineHeight: 1.75, marginBottom: '12px', maxWidth: '440px', marginInline: 'auto' }}
      >
        {cfg.description}
      </motion.p>

      {/* Sub text */}
      {cfg.subText && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          style={{ fontSize: '15px', color: 'var(--color-text-sub)', lineHeight: 1.75, marginBottom: cfg.contactNote ? '12px' : '32px', maxWidth: '440px', marginInline: 'auto' }}
        >
          {cfg.subText}
        </motion.p>
      )}

      {/* Contact note (potential only) */}
      {cfg.contactNote && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
          style={{ fontSize: '15px', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '32px' }}
        >
          {cfg.contactNote}
        </motion.p>
      )}

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px', marginInline: 'auto' }}
      >
        {cfg.primaryButton && cfg.primaryButtonHref && (
          <>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(cfg.primaryButtonHref, '_blank')}
              style={{
                width: '100%',
                padding: '17px',
                borderRadius: '13px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--color-navy), var(--color-navy-dark))',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(15,53,105,0.35)',
                fontFamily: 'inherit',
              }}
            >
              {cfg.primaryButton}
            </motion.button>
            {cfg.footerNote && (
              <p style={{ fontSize: '12px', color: 'var(--color-text-sub)', margin: '-4px 0 4px', lineHeight: 1.5 }}>
                {cfg.footerNote}
              </p>
            )}
          </>
        )}

        {cfg.secondaryButton && (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => cfg.secondaryButtonHref && window.open(cfg.secondaryButtonHref, '_blank')}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '13px',
              border: '2px solid var(--color-rose-light)',
              background: 'rgba(255,255,255,0.6)',
              color: 'var(--color-navy)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = 'rgba(221,166,163,0.12)';
              el.style.borderColor = 'var(--color-rose)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = 'rgba(255,255,255,0.6)';
              el.style.borderColor = 'var(--color-rose-light)';
            }}
          >
            {cfg.secondaryButton}
          </motion.button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.58 }}
        style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(228,208,207,0.5)' }}
      >
        <button
          onClick={onRestart}
          style={{
            background: 'none', border: 'none',
            color: 'var(--color-text-sub)', fontSize: '14px',
            cursor: 'pointer', fontFamily: 'inherit',
            padding: '8px 16px', borderRadius: '8px',
            opacity: 0.6, transition: 'opacity 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.opacity = '1'; el.style.color = 'var(--color-navy)'; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.opacity = '0.6'; el.style.color = 'var(--color-text-sub)'; }}
        >
          התחילי מחדש
        </button>
      </motion.div>
    </motion.div>
  );
}
