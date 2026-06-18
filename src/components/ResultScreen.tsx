import { motion } from 'framer-motion';
import type { QuizResult } from '../types/quiz';

interface ResultConfig {
  title: string;
  description: string;
  subText: string;
  primaryButton: string;
  primaryButtonHref?: string;
  secondaryButton?: string;
  secondaryButtonHref?: string;
  emoji: string;
  tagColor: string;
  tagBg: string;
  tagLabel: string;
}

const RESULTS: Record<QuizResult, ResultConfig> = {
  high_match: {
    emoji: '🌟',
    tagLabel: 'התאמה גבוהה',
    tagColor: '#7B4F5E',
    tagBg: '#FDE8EE',
    title: 'נראה שאת מתאימה מאוד לתוכנית',
    description:
      'יש לך חיבור לעיצוב, נכונות להתקדם ובסיס מצוין להפוך את הכישרון שלך לעסק.',
    subText:
      'בתוכנית תקבלי ממני את המפה, הכלים והליווי שיעזרו לך להפוך את היכולת שלך להצעה שאפשר למכור.',
    primaryButton: 'אני רוצה להצטרף לתוכנית',
    secondaryButton: 'דברי איתי בוואטסאפ',
  },
  potential: {
    emoji: '✨',
    tagLabel: 'פוטנציאל מצוין',
    tagColor: '#6B5B8E',
    tagBg: '#EEE8F5',
    title: 'יש לך פוטנציאל מצוין',
    description:
      'יש לך בסיס טוב, ומה שחסר לך עכשיו הוא סדר, ביטחון וליווי.',
    subText:
      'את לא צריכה להיות מוכנה במאה אחוז — את צריכה מסגרת שתעזור לך להתקדם צעד אחר צעד.',
    primaryButton: 'אני רוצה לבדוק התאמה עם אורטל',
    secondaryButton: 'דברי איתי בוואטסאפ',
  },
  not_ready: {
    emoji: '💡',
    tagLabel: 'בשלב הזה',
    tagColor: '#7A6856',
    tagBg: '#F5EDE8',
    title: 'יכול להיות שזה עדיין לא הזמן הנכון',
    description:
      'כדאי לצבור עוד ניסיון ולוודא שיש לך זמן ונכונות ליישם לפני ההצטרפות.',
    subText:
      'זה לא אומר שאין לך פוטנציאל, אלא שכדאי לחזק קודם את הבסיס.',
    primaryButton: 'אני רוצה להמשיך לעקוב וללמוד',
  },
};

interface ResultScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

export default function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const cfg = RESULTS[result];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ textAlign: 'center' }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        style={{ fontSize: '56px', lineHeight: 1, marginBottom: '16px' }}
        aria-hidden="true"
      >
        {cfg.emoji}
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'inline-block',
          padding: '4px 14px',
          borderRadius: '99px',
          background: cfg.tagBg,
          color: cfg.tagColor,
          fontSize: '13px',
          fontWeight: 700,
          marginBottom: '18px',
          letterSpacing: '0.3px',
        }}
      >
        {cfg.tagLabel}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{
          fontSize: 'clamp(20px, 4.5vw, 26px)',
          fontWeight: 800,
          color: 'var(--color-text-main)',
          lineHeight: 1.35,
          marginBottom: '14px',
        }}
      >
        {cfg.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '16px',
          color: 'var(--color-text-sub)',
          lineHeight: 1.7,
          marginBottom: '10px',
          maxWidth: '420px',
          marginInline: 'auto',
        }}
      >
        {cfg.description}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{
          fontSize: '15px',
          color: 'var(--color-primary-dark)',
          lineHeight: 1.7,
          marginBottom: '32px',
          maxWidth: '420px',
          marginInline: 'auto',
          fontWeight: 500,
        }}
      >
        {cfg.subText}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px', marginInline: 'auto' }}
      >
        <button
          onClick={() => {
            if (cfg.primaryButtonHref) window.open(cfg.primaryButtonHref, '_blank');
          }}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '14px',
            border: 'none',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(192, 122, 142, 0.35)',
            fontFamily: 'inherit',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(192, 122, 142, 0.45)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = '';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(192, 122, 142, 0.35)';
          }}
        >
          {cfg.primaryButton}
        </button>

        {cfg.secondaryButton && (
          <button
            onClick={() => {
              if (cfg.secondaryButtonHref) window.open(cfg.secondaryButtonHref, '_blank');
            }}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '14px',
              border: '2px solid var(--color-primary-light)',
              background: 'transparent',
              color: 'var(--color-primary-dark)',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-xlight)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary-light)';
            }}
          >
            {cfg.secondaryButton}
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}
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
            transition: 'color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)';
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-xlight)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-sub)';
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
          }}
        >
          ↺ התחילי את השאלון מחדש
        </button>
      </motion.div>
    </motion.div>
  );
}
