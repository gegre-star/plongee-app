import { ALL_FICHES } from '../content';
import type { Level } from '../content/types';
import { levelOfXp, type Progress } from './progress';

export interface Badge {
  id: string;
  icon: string;
  name: string;
  desc: string;
}

export const BADGES: Badge[] = [
  { id: 'first', icon: '🤿', name: 'Première bulle', desc: 'Réponds correctement à une première question.' },
  { id: 'cards100', icon: '📚', name: 'Studieux', desc: 'Travaille 100 questions différentes.' },
  { id: 'streak3', icon: '🔥', name: 'Régulier', desc: 'Révise 3 jours de suite.' },
  { id: 'streak7', icon: '⚓', name: 'Marin au long cours', desc: 'Révise 7 jours de suite.' },
  { id: 'perfect', icon: '💯', name: 'Sans faute', desc: 'Obtiens 100 % sur une fiche.' },
  { id: 'fiche10', icon: '🏅', name: 'Dix fiches maîtrisées', desc: 'Atteins 80 % sur 10 fiches.' },
  { id: 'exam70', icon: '🎓', name: 'Examen réussi', desc: 'Obtiens 70 % à un examen blanc.' },
  { id: 'lvl5', icon: '🐠', name: 'Niveau 5', desc: 'Atteins le niveau 5 de points.' },
  { id: 'n2done', icon: '🥈', name: 'Tour du N2', desc: 'Termine au moins une fois chaque fiche du N2.' },
  { id: 'n3done', icon: '🥇', name: 'Tour du N3', desc: 'Termine au moins une fois chaque fiche du N3.' },
];

const allDone = (p: Progress, level: Level): boolean =>
  ALL_FICHES.filter((f) => f.level === level).every((f) => (p.fiches[f.id]?.runs ?? 0) >= 1);

/** Identifiants des badges mérités par cet état. */
export function earnedBadges(p: Progress): string[] {
  const cards = Object.values(p.cards);
  const fichesAt80 = Object.values(p.fiches).filter((f) => f.best >= 80).length;
  const checks: Record<string, boolean> = {
    first: cards.some((c) => c.right >= 1),
    cards100: cards.length >= 100,
    streak3: p.bestStreak >= 3,
    streak7: p.bestStreak >= 7,
    perfect: Object.values(p.fiches).some((f) => f.best >= 100),
    fiche10: fichesAt80 >= 10,
    exam70: p.exams.some((e) => e.percent >= 70),
    lvl5: levelOfXp(p.xp) >= 5,
    n2done: allDone(p, 'N2'),
    n3done: allDone(p, 'N3'),
  };
  return Object.keys(checks).filter((id) => checks[id]);
}

export interface Awarded {
  progress: Progress;
  /** Badges débloqués par cette mise à jour. */
  unlocked: string[];
}

/** Ajoute les badges nouvellement mérités et indique lesquels. */
export function withBadges(p: Progress): Awarded {
  const unlocked = earnedBadges(p).filter((id) => !p.badges[id]);
  if (unlocked.length === 0) return { progress: p, unlocked };
  const badges = { ...p.badges };
  unlocked.forEach((id) => {
    badges[id] = true;
  });
  return { progress: { ...p, badges }, unlocked };
}
