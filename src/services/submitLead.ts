import type { Submission } from '../types/quiz';

// =====================================================
// הכנס כאן את ה-URL של ה-Webhook שלך (Make, Zapier, רב-מסר וכו')
// Insert your webhook URL here:
// =====================================================
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzDTzLgi4tMELDnkc6DPnQrJoxpATKaJulovbmlD18kZ-O5hY8-_67htODAkBJGrELFyw/exec';
// =====================================================

const STORAGE_KEY = 'quiz_submissions_v2';

export async function submitLead(submission: Submission): Promise<void> {
  // Save to localStorage
  try {
    const existing: Submission[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    console.error('Failed to save to localStorage');
  }

  // Log for debugging
  console.log('Quiz Submission:', submission);

  // Send to Google Apps Script (no-cors required to avoid CORS errors)
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.error('Webhook submission failed:', err);
    }
  }
}

export function getStoredSubmissions(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
