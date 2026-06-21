export type WarningLevel = 'strong' | 'light' | 'none';

export interface Answer {
  text: string;
  feedback: string;
  score: number;
  warning: WarningLevel;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export type QuizResult = 'high_match' | 'potential' | 'not_ready';

export interface LeadData {
  fullName: string;
  phone: string;
  email: string;
  marketingConsent: boolean;
}

export interface QuizAnswerRecord {
  questionId: number;
  answerIndex: number;
  score: number;
  warning: WarningLevel;
}

export interface Submission {
  fullName: string;
  phone: string;
  email: string;
  marketingConsent: boolean;
  answers: QuizAnswerRecord[];
  totalScore: number;
  strongWarningCount: number;
  lightWarningCount: number;
  result: QuizResult;
  createdAt: string;
}

export type QuizPhase = 'intro' | 'question' | 'form' | 'result';

export interface ResultContent {
  title: string;
  description: string;
  subText?: string;
  contactNote?: string;
  primaryButton?: string;
  primaryButtonHref?: string;
  secondaryButton?: string;
  secondaryButtonHref?: string;
  footerNote?: string;
}
