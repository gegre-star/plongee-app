/**
 * Modèle de contenu : un niveau (N2 / N3) contient des modules (les « UL » des
 * manuels Plongée Plaisir), qui contiennent des fiches. Chaque fiche a ses
 * « points clefs » et ses questions d'entraînement.
 */
export type Level = 'N2' | 'N3';

export interface Question {
  /** Identifiant stable, utilisé pour la progression (ex. « n2-f04-q3 »). */
  id: string;
  /** « qcm » : une seule bonne réponse ; « vf » : vrai ou faux. */
  kind: 'qcm' | 'vf';
  text: string;
  choices: string[];
  /** Indice de la bonne réponse dans `choices`. */
  answer: number;
  /** Explication affichée après la réponse. */
  explain: string;
}

export interface Fiche {
  id: string;
  level: Level;
  /** Numéro de la fiche dans le manuel. */
  number: number;
  title: string;
  /** Points clefs à retenir, une phrase chacun. */
  points: string[];
  questions: Question[];
}

export interface Module {
  id: string;
  level: Level;
  /** Ex. « UL 1 ». */
  code: string;
  title: string;
  fiches: Fiche[];
}
