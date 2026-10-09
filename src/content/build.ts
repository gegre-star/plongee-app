import type { Fiche, Level, Question } from './types';

/** Brouillon de question : l'identifiant est ajouté par `fiche()`. */
export type QuestionDraft = Omit<Question, 'id'>;

/** QCM : `answer` est l'indice (à partir de 0) de la bonne réponse. */
export const qcm = (text: string, choices: string[], answer: number, explain: string): QuestionDraft => ({
  kind: 'qcm',
  text,
  choices,
  answer,
  explain,
});

/** Vrai / faux : `truth` est la valeur de l'affirmation. */
export const vf = (text: string, truth: boolean, explain: string): QuestionDraft => ({
  kind: 'vf',
  text,
  choices: ['Vrai', 'Faux'],
  answer: truth ? 0 : 1,
  explain,
});

const pad = (n: number): string => String(n).padStart(2, '0');

/** Construit une fiche et numérote ses questions (n2-f04-q1, n2-f04-q2…). */
export function fiche(
  level: Level,
  number: number,
  title: string,
  points: string[],
  drafts: QuestionDraft[],
): Fiche {
  const prefix = `${level.toLowerCase()}-f${pad(number)}`;
  return {
    id: prefix,
    level,
    number,
    title,
    points,
    questions: drafts.map((d, i) => ({ ...d, id: `${prefix}-q${i + 1}` })),
  };
}
