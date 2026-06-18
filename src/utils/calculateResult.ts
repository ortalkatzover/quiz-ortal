import type { Question, QuizAnswerRecord, QuizResult } from '../types/quiz';

export function calculateScore(
  answers: (number | null)[],
  questions: Question[]
): { totalScore: number; warningCount: number } {
  let totalScore = 0;
  let warningCount = 0;

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null) return;
    const question = questions[questionIndex];
    if (!question) return;
    const answer = question.answers[answerIndex];
    if (!answer) return;
    totalScore += answer.score;
    if (answer.warning) warningCount++;
  });

  return { totalScore, warningCount };
}

export function determineResult(totalScore: number, warningCount: number): QuizResult {
  if (warningCount >= 2) return 'not_ready';
  if (totalScore >= 18) return warningCount > 0 ? 'potential' : 'high_match';
  if (totalScore >= 11) return 'potential';
  return 'not_ready';
}

export function buildAnswerRecords(
  answers: (number | null)[],
  questions: Question[]
): QuizAnswerRecord[] {
  return answers
    .map((answerIndex, questionIndex) => {
      if (answerIndex === null) return null;
      const question = questions[questionIndex];
      if (!question) return null;
      const answer = question.answers[answerIndex];
      if (!answer) return null;
      return {
        questionId: question.id,
        answerIndex,
        score: answer.score,
        warning: !!answer.warning,
      };
    })
    .filter((r): r is QuizAnswerRecord => r !== null);
}
