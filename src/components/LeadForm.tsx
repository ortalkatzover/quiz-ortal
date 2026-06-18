import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LeadData } from '../types/quiz';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
  isSubmitting: boolean;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

function validateIsraeliPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-]/g, '');
  return /^(05\d{8}|0[2-9]\d{7})$/.test(cleaned);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '2px solid var(--color-border)',
  background: '#fff',
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
  fontWeight: 600,
  color: 'var(--color-text-main)',
  marginBottom: '6px',
};

const errorStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#D94F68',
  marginTop: '4px',
};

export default function LeadForm({ onSubmit, isSubmitting }: LeadFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!fullName.trim()) e.fullName = 'שם מלא הוא שדה חובה';
    if (!phone.trim()) {
      e.phone = 'טלפון הוא שדה חובה';
    } else if (!validateIsraeliPhone(phone)) {
      e.phone = 'נא להזין מספר טלפון ישראלי תקין (למשל: 0501234567)';
    }
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
    const allTouched = { fullName: true, phone: true, email: true };
    setTouched(allTouched);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ fullName: fullName.trim(), phone: phone.trim(), email: email.trim(), marketingConsent });
    }
  }

  const focusStyle = {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 3px rgba(192, 122, 142, 0.12)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path d="M13 2C7 2 2 7 2 13s5 11 11 11 11-5 11-11S19 2 13 2z" stroke="white" strokeWidth="1.8" fill="none"/>
            <path d="M9 13l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: 'var(--color-text-main)',
            marginBottom: '8px',
          }}
        >
          התוצאה שלך מוכנה
        </h2>
        <p style={{ color: 'var(--color-text-sub)', fontSize: '15px', lineHeight: 1.6 }}>
          השאירי פרטים כדי לראות עד כמה התוכנית מתאימה לך.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label htmlFor="fullName" style={labelStyle}>
              שם מלא <span style={{ color: '#D94F68' }}>*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
              style={{
                ...inputStyle,
                borderColor: touched.fullName && errors.fullName ? '#D94F68' : 'var(--color-border)',
              }}
              placeholder="השם שלך"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              autoComplete="name"
            />
            {touched.fullName && errors.fullName && (
              <p id="fullName-error" style={errorStyle} role="alert">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" style={labelStyle}>
              טלפון <span style={{ color: '#D94F68' }}>*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur('phone')}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
              style={{
                ...inputStyle,
                borderColor: touched.phone && errors.phone ? '#D94F68' : 'var(--color-border)',
                direction: 'ltr',
                textAlign: 'right',
              }}
              placeholder="0501234567"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
              inputMode="tel"
            />
            {touched.phone && errors.phone && (
              <p id="phone-error" style={errorStyle} role="alert">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>
              כתובת מייל <span style={{ color: '#D94F68' }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
              style={{
                ...inputStyle,
                borderColor: touched.email && errors.email ? '#D94F68' : 'var(--color-border)',
                direction: 'ltr',
                textAlign: 'right',
              }}
              placeholder="your@email.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
              inputMode="email"
            />
            {touched.email && errors.email && (
              <p id="email-error" style={errorStyle} role="alert">{errors.email}</p>
            )}
          </div>

          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer',
              padding: '14px 16px',
              background: 'var(--color-primary-xlight)',
              borderRadius: '12px',
              border: `1px solid ${marketingConsent ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
              <input
                type="checkbox"
                id="marketingConsent"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                style={{ position: 'absolute', opacity: 0, width: '20px', height: '20px', cursor: 'pointer' }}
                aria-label="אני מאשרת קבלת תוכן שיווקי"
              />
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  border: `2px solid ${marketingConsent ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: marketingConsent ? 'var(--color-primary)' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  pointerEvents: 'none',
                }}
              >
                {marketingConsent && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span style={{ fontSize: '14px', color: 'var(--color-text-sub)', lineHeight: 1.5 }}>
              אני מאשרת קבלת עדכונים, תוכן שיווקי ומידע על תוכניות נוספות
            </span>
          </label>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '17px',
              borderRadius: '14px',
              border: 'none',
              background: isSubmitting
                ? 'var(--color-primary-light)'
                : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: '#fff',
              fontSize: '17px',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: isSubmitting ? 'none' : '0 4px 16px rgba(192, 122, 142, 0.35)',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
          >
            {isSubmitting ? 'שנייה...' : 'הציגי לי את התוצאה ←'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
