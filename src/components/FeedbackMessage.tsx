import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackMessageProps {
  text: string;
  visible: boolean;
}

export default function FeedbackMessage({ text, visible }: FeedbackMessageProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
          style={{
            marginTop: '16px',
            padding: '14px 18px',
            background: 'rgba(221, 166, 163, 0.1)',
            border: '1px solid rgba(221, 166, 163, 0.35)',
            borderRight: '3px solid var(--color-rose)',
            borderRadius: '10px',
          }}
        >
          <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--color-navy)', fontWeight: 500 }}>
            {text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
