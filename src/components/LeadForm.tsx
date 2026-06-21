import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LeadData } from '../types/quiz';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
  isSubmitting: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '2px solid rgba(228, 208, 207, 0.8)',
  background: 'rgba(255,255,255,0.85)',
  fontSize: '16px',
  color: 'var(--color-text-main)',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  direction: 'rtl',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 700,
  color: 'var(--color-navy)',
  marginBottom: '6px',
};

export default function LeadForm({ onSubmit, isSubmitting }: LeadFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!fullName.trim()) e.fullName = 'שם מלא הוא שדה חובה';
    if (!email.trim()) {
      e.email = 'כתובת מייל היא שדה חובה';
    } else if (!validateEmail(email)) {
      e.email = 'נא להזין כתובת מייל תקינה';
    }
    return e;
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ fullName: true, email: true });
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ fullName: fullName.trim(), phone: '', email: email.trim(), marketingConsent: false });
    }
  }

  const focusBorderStyle = { borderColor: 'var(--color-navy)', boxShadow: '0 0 0 3px rgba(15,53,105,0.1)' };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, var(--color-rose-light), var(--color-rose))',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 6px 20px rgba(221,166,163,0.35)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" fill="none"/>
          </svg>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '8px', fontFamily: "'Playfair Display', 'Assistant', serif" }}>
          התוצאה שלך מוכנה
        </h2>
        <p style={{ color: 'var(--color-text-sub)', fontSize: '15px', lineHeight: 1.65 }}>
          השאירי פרטים כדי לראות את רמת ההתאמה שלך לתוכנית.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          <div>
            <label htmlFor="fullName" style={labelStyle}>
              שם מלא <span style={{ color: '#c0392b' }}>*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusBorderStyle)}
              style={{ ...inputStyle, borderColor: touched.fullName && errors.fullName ? '#c0392b' : 'rgba(228,208,207,0.8)' }}
              placeholder="השם שלך"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              autoComplete="name"
            />
            {touched.fullName && errors.fullName && (
              <p style={{ fontSize: '13px', color: '#c0392b', marginTop: '4px' }} role="alert">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>
              כתובת מייל <span style={{ color: '#c0392b' }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusBorderStyle)}
              style={{ ...inputStyle, direction: 'ltr', textAlign: 'right', borderColor: touched.email && errors.email ? '#c0392b' : 'rgba(228,208,207,0.8)' }}
              placeholder="your@email.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              autoComplete="email"
              inputMode="email"
            />
            {touched.email && errors.email && (
              <p style={{ fontSize: '13px', color: '#c0392b', marginTop: '4px' }} role="alert">{errors.email}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.01, y: isSubmitting ? 0 : -1 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '17px',
              borderRadius: '13px',
              border: 'none',
              background: isSubmitting
                ? 'rgba(15,53,105,0.4)'
                : 'linear-gradient(135deg, var(--color-navy), var(--color-navy-dark))',
              color: '#fff',
              fontSize: '17px',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: isSubmitting ? 'none' : '0 6px 20px rgba(15,53,105,0.3)',
              fontFamily: 'inherit',
            }}
          >
            {isSubmitting ? 'שנייה...' : 'הציגי לי את התוצאה'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
