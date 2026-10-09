/**
 * Progression de l'élève : cartes de révision (répétition espacée), points,
 * série de jours, badges. Tout est pur et testable : les fonctions renvoient
 * un nouvel état, seules load/save touchent au stockage du téléphone.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Fiche, Level } from '../content/types';

export const STORAGE_KEY = 'plongee-n2-n3:progress:v1';
export const XP_PER_LEVEL = 200;
export const MAX_BOX = 5;
/** Délai de révision, en jours, selon la boîte (1 à 5). */
export const BOX_DAYS = [0, 1, 2, 4, 8, 16] as const;

export interface Card {
  /** Boîte de Leitner, de 1 (mal connu) à 5 (acquis). */
  box: number;
  /** Jour (AAAA-MM-JJ) à partir duquel la question est à revoir. */
  due: string;
  right: number;
  wrong: number;
  lastCorrect: boolean;
}

export interface ExamRecord {
  level: Level;
  day: string;
  percent: number;
  total: number;
}

export interface Progress {
  xp: number;
  streak: number;
  bestStreak: number;
  lastDay: string | null;
  cards: Record<string, Card>;
  /** Meilleur score (en %) et nombre de passages par fiche. */
  fiches: Record<string, { best: number; runs: number }>;
  exams: ExamRecord[];
  badges: Record<string, boolean>;
  level: Level;
  /** Nombre de questions répondues par jour. */
  today: { day: string; count: number };
  dailyGoal: number;
}

export const emptyProgress = (): Progress => ({
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastDay: null,
  cards: {},
  fiches: {},
  exams: [],
  badges: {},
  level: 'N2',
  today: { day: '', count: 0 },
  dailyGoal: 20,
});

const pad = (n: number): string => String(n).padStart(2, '0');

/** Jour local au format AAAA-MM-JJ. */
export const dayString = (d: Date = new Date()): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const toDate = (day: string): Date => {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
};

export const addDays = (day: string, n: number): string => {
  const d = toDate(day);
  d.setDate(d.getDate() + n);
  return dayString(d);
};

export const levelOfXp = (xp: number): number => Math.floor(xp / XP_PER_LEVEL) + 1;
export const xpIntoLevel = (xp: number): number => xp % XP_PER_LEVEL;

/** Met à jour la série de jours consécutifs d'activité. */
export function touchDay(p: Progress, day: string): Progress {
  if (p.lastDay === day) return p;
  const streak = p.lastDay === addDays(day, -1) ? p.streak + 1 : 1;
  return { ...p, streak, bestStreak: Math.max(p.bestStreak, streak), lastDay: day };
}

/** Enregistre une réponse : fait avancer ou reculer la carte de la question. */
export function recordAnswer(p: Progress, questionId: string, correct: boolean, day: string): Progress {
  const prev = p.cards[questionId];
  const box = correct ? Math.min(MAX_BOX, (prev?.box ?? 0) + 1) : 1;
  const card: Card = {
    box,
    due: addDays(day, correct ? BOX_DAYS[box] : 0),
    right: (prev?.right ?? 0) + (correct ? 1 : 0),
    wrong: (prev?.wrong ?? 0) + (correct ? 0 : 1),
    lastCorrect: correct,
  };
  const count = p.today.day === day ? p.today.count + 1 : 1;
  return touchDay(
    {
      ...p,
      xp: p.xp + (correct ? 10 : 2),
      cards: { ...p.cards, [questionId]: card },
      today: { day, count },
    },
    day,
  );
}

/** Questions à réviser aujourd'hui : les plus fragiles d'abord. */
export function dueQuestionIds(p: Progress, day: string): string[] {
  return Object.entries(p.cards)
    .filter(([, c]) => c.due <= day)
    .sort((a, b) => a[1].box - b[1].box || (a[1].due < b[1].due ? -1 : 1))
    .map(([id]) => id);
}

/** Questions ratées : dernière réponse fausse. */
export const wrongQuestionIds = (p: Progress): string[] =>
  Object.entries(p.cards)
    .filter(([, c]) => !c.lastCorrect)
    .map(([id]) => id);

export interface FicheStats {
  total: number;
  seen: number;
  mastered: number;
  /** Pourcentage de questions maîtrisées (boîte 3 et plus). */
  percent: number;
}

export function ficheStats(p: Progress, fiche: Pick<Fiche, 'questions'>): FicheStats {
  const total = fiche.questions.length;
  let seen = 0;
  let mastered = 0;
  for (const q of fiche.questions) {
    const c = p.cards[q.id];
    if (c) seen++;
    if (c && c.box >= 3) mastered++;
  }
  return { total, seen, mastered, percent: total === 0 ? 0 : Math.round((mastered / total) * 100) };
}

/** Termine une série sur une fiche : garde le meilleur score. */
export function finishFiche(p: Progress, ficheId: string, percent: number): Progress {
  const prev = p.fiches[ficheId];
  const bonus = percent >= 80 && (prev?.best ?? 0) < 80 ? 20 : 0;
  return {
    ...p,
    xp: p.xp + bonus,
    fiches: { ...p.fiches, [ficheId]: { best: Math.max(prev?.best ?? 0, percent), runs: (prev?.runs ?? 0) + 1 } },
  };
}

export function finishExam(p: Progress, level: Level, percent: number, total: number, day: string): Progress {
  const exam: ExamRecord = { level, day, percent, total };
  return { ...p, xp: p.xp + Math.round(percent / 2), exams: [...p.exams, exam].slice(-20) };
}

export const setLevel = (p: Progress, level: Level): Progress => ({ ...p, level });
