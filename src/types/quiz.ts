export interface Answer {
  text: string;
  feedback: string;
  score: number;
  warning?: boolean;
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
  warning: boolean;
}

export interface Submission {
  fullName: string;
  phone: string;
  email: string;
  marketingConsent: boolean;
  answers: QuizAnswerRecord[];
  totalScore: number;
  warningCount: number;
  result: QuizResult;
  createdAt: string;
}

export type QuizPhase = 'intro' | 'question' | 'form' | 'result';

export interface QuizStateData {
  phase: QuizPhase;
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  showFeedback: boolean;
  leadData: LeadData | null;
  result: QuizResult | null;
}
