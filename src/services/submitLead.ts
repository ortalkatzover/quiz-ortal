import type { Submission } from '../types/quiz';

// =====================================================
// הכנס כאן את ה-URL של ה-Webhook שלך (Make, Zapier, רב-מסר וכו')
// Insert your webhook URL here:
// =====================================================
const WEBHOOK_URL = '';
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

  // Send to webhook if URL is configured
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
