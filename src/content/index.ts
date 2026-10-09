import { n2Ul1 } from './n2/ul1';
import { n2Ul2 } from './n2/ul2';
import { n2Ul3 } from './n2/ul3';
import { n2Ul4 } from './n2/ul4';
import { n2Ul5 } from './n2/ul5';
import { n2Ul6 } from './n2/ul6';
import { n2Nitrox } from './n2/nitrox';
import { n2Monde } from './n2/monde';
import { n3Ul1 } from './n3/ul1';
import { n3Ul2 } from './n3/ul2';
import { n3Ul3 } from './n3/ul3';
import { n3Ul4 } from './n3/ul4';
import { n3Ul5 } from './n3/ul5';
import { n3Ul6 } from './n3/ul6';
import { n3Orga } from './n3/orga';
import type { Fiche, Level, Module, Question } from './types';

export type { Fiche, Level, Module, Question } from './types';

/** Tous les modules, dans l'ordre des manuels. */
export const MODULES: Module[] = [
  n2Ul1, n2Ul2, n2Ul3, n2Ul4, n2Ul5, n2Ul6, n2Nitrox, n2Monde,
  n3Ul1, n3Ul2, n3Ul3, n3Ul4, n3Ul5, n3Ul6, n3Orga,
];

export const LEVELS: { id: Level; label: string; subtitle: string }[] = [
  { id: 'N2', label: 'Niveau 2', subtitle: 'Plongeur autonome 20 m · encadré 40 m' },
  { id: 'N3', label: 'Niveau 3', subtitle: 'Plongeur autonome 60 m · encadré 60 m' },
];

export const modulesOf = (level: Level): Module[] => MODULES.filter((m) => m.level === level);

export const ALL_FICHES: Fiche[] = MODULES.flatMap((m) => m.fiches);

export const ALL_QUESTIONS: Question[] = ALL_FICHES.flatMap((f) => f.questions);

const QUESTION_BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q] as const));
const FICHE_BY_ID = new Map(ALL_FICHES.map((f) => [f.id, f] as const));
const MODULE_OF_FICHE = new Map(MODULES.flatMap((m) => m.fiches.map((f) => [f.id, m] as const)));

export const getQuestion = (id: string): Question | undefined => QUESTION_BY_ID.get(id);
export const getFiche = (id: string): Fiche | undefined => FICHE_BY_ID.get(id);
export const getModuleOfFiche = (ficheId: string): Module | undefined => MODULE_OF_FICHE.get(ficheId);

export const ficheOfQuestion = (questionId: string): Fiche | undefined =>
  FICHE_BY_ID.get(questionId.replace(/-q\d+$/, ''));

export const questionsOfLevel = (level: Level): Question[] =>
  ALL_FICHES.filter((f) => f.level === level).flatMap((f) => f.questions);
