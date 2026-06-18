import { motion } from 'framer-motion';

interface QuizIntroProps {
  onStart: () => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ textAlign: 'center' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          width: '72px',
          height: '72px',
          background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 8px 24px rgba(192, 122, 142, 0.3)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
          <path d="M17 3C9.268 3 3 9.268 3 17s6.268 14 14 14 14-6.268 14-14S24.732 3 17 3z" stroke="white" strokeWidth="2" fill="none"/>
          <path d="M17 11v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="17" cy="17" r="2" fill="white"/>
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{
          fontSize: 'clamp(22px, 5vw, 30px)',
          fontWeight: 800,
          color: 'var(--color-text-main)',
          lineHeight: 1.35,
          marginBottom: '16px',
        }}
      >
        יש לך את מה שצריך כדי להפוך את הכישרון שלך לעסק?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{
          fontSize: '17px',
          color: 'var(--color-text-sub)',
          lineHeight: 1.65,
          marginBottom: '10px',
          maxWidth: '480px',
          marginInline: 'auto',
        }}
      >
        עני על 8 שאלות קצרות וגלי עד כמה התוכנית מתאימה לשלב שבו את נמצאת.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          fontSize: '13px',
          color: 'var(--color-primary)',
          fontWeight: 500,
          marginBottom: '36px',
          letterSpacing: '0.2px',
        }}
      >
        ⏱ זה לוקח פחות משתי דקות.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        style={{
          padding: '18px 52px',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
          color: '#fff',
          border: 'none',
          borderRadius: '14px',
          fontSize: '18px',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(192, 122, 142, 0.4)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          fontFamily: 'inherit',
          letterSpacing: '0.3px',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 28px rgba(192, 122, 142, 0.5)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = '';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(192, 122, 142, 0.4)';
        }}
        aria-label="התחל את השאלון"
      >
        מתחילות ✨
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          marginTop: '20px',
          fontSize: '13px',
          color: 'var(--color-text-sub)',
        }}
      >
        ללא התחייבות · ללא כרטיס אשראי
      </motion.p>
    </motion.div>
  );
}
