import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { QuizResult } from '../types/quiz';

interface ResultConfig {
  title: string;
  description: string;
  subText: string;
  primaryButton: string;
  primaryButtonHref?: string;
  secondaryButton?: string;
  secondaryButtonHref?: string;
  tagColor: string;
  tagBg: string;
  tagLabel: string;
  accentColor: string;
}

const RESULTS: Record<QuizResult, ResultConfig> = {
  high_match: {
    tagLabel: 'התאמה גבוהה',
    tagColor: '#7B4F5E',
    tagBg: '#FDE8EE',
    accentColor: '#C4808C',
    title: 'נראה שאת מתאימה מאוד לתוכנית',
    description: 'יש לך חיבור לעיצוב, נכונות להתקדם ובסיס מצוין להפוך את הכישרון שלך לעסק.',
    subText: 'בתוכנית תקבלי ממני את המפה, הכלים והליווי שיעזרו לך להפוך את היכולת שלך להצעה שאפשר למכור.',
    primaryButton: 'אני רוצה להצטרף לתוכנית',
    secondaryButton: 'דברי איתי בוואטסאפ',
  },
  potential: {
    tagLabel: 'פוטנציאל מצוין',
    tagColor: '#6B5B8E',
    tagBg: '#EEE8F5',
    accentColor: '#8B7BAE',
    title: 'יש לך פוטנציאל מצוין',
    description: 'יש לך בסיס טוב, ומה שחסר לך עכשיו הוא סדר, ביטחון וליווי.',
    subText: 'את לא צריכה להיות מוכנה במאה אחוז - את צריכה מסגרת שתעזור לך להתקדם צעד אחר צעד.',
    primaryButton: 'אני רוצה לבדוק התאמה עם אורטל',
    secondaryButton: 'דברי איתי בוואטסאפ',
  },
  not_ready: {
    tagLabel: 'בשלב הזה',
    tagColor: '#7A6856',
    tagBg: '#F5EDE8',
    accentColor: '#A08868',
    title: 'יכול להיות שזה עדיין לא הזמן הנכון',
    description: 'כדאי לצבור עוד ניסיון ולוודא שיש לך זמן ונכונות ליישם לפני ההצטרפות.',
    subText: 'זה לא אומר שאין לך פוטנציאל, אלא שכדאי לחזק קודם את הבסיס.',
    primaryButton: 'אני רוצה להמשיך לעקוב וללמוד',
  },
};

function fireConfetti() {
  const colors = ['#C4808C', '#F0A0B4', '#EFC8D0', '#ffffff', '#A06070'];

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.25, y: 0.55 },
    colors,
    scalar: 0.9,
  });
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.75, y: 0.55 },
      colors,
      scalar: 0.9,
    });
  }, 150);
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { x: 0.5, y: 0.4 },
      colors,
      scalar: 0.8,
    });
  }, 300);
}

interface ResultScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

export default function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const cfg = RESULTS[result];

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
      {/* Icon circle */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
        style={{
          width: '72px',
          height: '72px',
          background: `linear-gradient(135deg, ${cfg.accentColor}cc, ${cfg.accentColor})`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 18px',
          boxShadow: `0 8px 28px ${cfg.accentColor}55`,
        }}
        aria-hidden="true"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M7 15l6 6 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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
          background: cfg.tagBg,
          color: cfg.tagColor,
          fontSize: '13px',
          fontWeight: 700,
          marginBottom: '20px',
          letterSpacing: '0.4px',
          border: `1px solid ${cfg.tagColor}33`,
        }}
      >
        {cfg.tagLabel}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        style={{
          fontSize: 'clamp(20px, 4.5vw, 28px)',
          fontWeight: 700,
          color: 'var(--color-text-main)',
          lineHeight: 1.35,
          marginBottom: '14px',
          fontFamily: "'Playfair Display', 'Assistant', serif",
        }}
      >
        {cfg.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        style={{
          fontSize: '16px',
          color: 'var(--color-text-sub)',
          lineHeight: 1.75,
          marginBottom: '10px',
          maxWidth: '430px',
          marginInline: 'auto',
        }}
      >
        {cfg.description}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          fontSize: '15px',
          color: 'var(--color-primary-dark)',
          lineHeight: 1.75,
          marginBottom: '36px',
          maxWidth: '430px',
          marginInline: 'auto',
          fontWeight: 500,
        }}
      >
        {cfg.subText}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px', marginInline: 'auto' }}
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { if (cfg.primaryButtonHref) window.open(cfg.primaryButtonHref, '_blank'); }}
          style={{
            width: '100%',
            padding: '17px',
            borderRadius: '14px',
            border: 'none',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(160,96,112,0.38)',
            fontFamily: 'inherit',
          }}
        >
          {cfg.primaryButton}
        </motion.button>

        {cfg.secondaryButton && (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { if (cfg.secondaryButtonHref) window.open(cfg.secondaryButtonHref, '_blank'); }}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '14px',
              border: '2px solid var(--color-primary-light)',
              background: 'rgba(255,255,255,0.6)',
              color: 'var(--color-primary-dark)',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = 'rgba(239,200,208,0.4)';
              el.style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = 'rgba(255,255,255,0.6)';
              el.style.borderColor = 'var(--color-primary-light)';
            }}
          >
            {cfg.secondaryButton}
          </motion.button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(232,205,210,0.5)' }}
      >
        <button
          onClick={onRestart}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-text-sub)',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            padding: '8px 16px',
            borderRadius: '8px',
            opacity: 0.65,
            transition: 'opacity 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.opacity = '1';
            el.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.opacity = '0.65';
            el.style.color = 'var(--color-text-sub)';
          }}
        >
          התחילי מחדש
        </button>
      </motion.div>
    </motion.div>
  );
}
