import type { Question } from '../content/types';

/** Générateur pseudo-aléatoire reproductible (mulberry32). */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mélange de Fisher-Yates, sans modifier le tableau d'origine. */
export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Une question prête à l'affichage : choix mélangés, bonne réponse retrouvée. */
export interface PreparedQuestion {
  question: Question;
  /** Choix dans l'ordre d'affichage. */
  choices: string[];
  /** Indice de la bonne réponse dans `choices`. */
  answer: number;
}

/**
 * Prépare une question. Les vrai/faux gardent leur ordre « Vrai, Faux » ;
 * les QCM sont mélangés, pour que la bonne réponse ne soit pas toujours à la
 * même place.
 */
export function prepareQuestion(question: Question, rng: () => number = Math.random): PreparedQuestion {
  if (question.kind === 'vf') {
    return { question, choices: question.choices.slice(), answer: question.answer };
  }
  const order = shuffle(question.choices.map((_, i) => i), rng);
  return {
    question,
    choices: order.map((i) => question.choices[i]),
    answer: order.indexOf(question.answer),
  };
}

/** Tire `count` questions distinctes, sans doublon, dans un ordre mélangé. */
export function pickQuestions(pool: readonly Question[], count: number, rng: () => number = Math.random): Question[] {
  return shuffle(pool, rng).slice(0, Math.max(0, count));
}

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
}

export interface SessionResult {
  total: number;
  correct: number;
  /** Pourcentage de bonnes réponses, arrondi. */
  percent: number;
  wrongIds: string[];
}

export function scoreSession(records: readonly AnswerRecord[]): SessionResult {
  const correct = records.filter((r) => r.correct).length;
  return {
    total: records.length,
    correct,
    percent: records.length === 0 ? 0 : Math.round((correct / records.length) * 100),
    wrongIds: records.filter((r) => !r.correct).map((r) => r.questionId),
  };
}

/** Mention affichée à la fin d'une série. */
export function verdict(percent: number): string {
  if (percent >= 90) return 'Excellent !';
  if (percent >= 75) return 'Très bien';
  if (percent >= 60) return 'Bien, continue';
  if (percent >= 40) return 'À retravailler';
  return 'Reprends la fiche';
}
