import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_FICHES } from '../../content';
import { earnedBadges, withBadges } from '../badges';
import {
  STORAGE_KEY,
  addDays,
  dayString,
  dueQuestionIds,
  emptyProgress,
  finishExam,
  finishFiche,
  ficheStats,
  levelOfXp,
  recordAnswer,
  wrongQuestionIds,
  xpIntoLevel,
} from '../progress';
import { loadProgress, normalize, resetProgress, saveProgress } from '../storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const D1 = '2026-03-10';

describe('dates', () => {
  it("ajoute des jours en franchissant fin de mois et d'année", () => {
    expect(addDays('2026-01-31', 1)).toBe('2026-02-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
    expect(dayString(new Date(2026, 4, 9))).toBe('2026-05-09');
  });
});

describe('répétition espacée', () => {
  it('fait monter la boîte à chaque bonne réponse, avec un délai croissant', () => {
    let p = emptyProgress();
    p = recordAnswer(p, 'q1', true, D1);
    expect(p.cards.q1.box).toBe(1);
    expect(p.cards.q1.due).toBe(addDays(D1, 1));
    p = recordAnswer(p, 'q1', true, D1);
    expect(p.cards.q1.box).toBe(2);
    expect(p.cards.q1.due).toBe(addDays(D1, 2));
    for (let i = 0; i < 10; i++) p = recordAnswer(p, 'q1', true, D1);
    expect(p.cards.q1.box).toBe(5);
    expect(p.cards.q1.due).toBe(addDays(D1, 16));
  });

  it('ramène la carte en boîte 1 après une erreur, à revoir le jour même', () => {
    let p = recordAnswer(emptyProgress(), 'q1', true, D1);
    p = recordAnswer(p, 'q1', true, D1);
    p = recordAnswer(p, 'q1', false, D1);
    expect(p.cards.q1.box).toBe(1);
    expect(p.cards.q1.due).toBe(D1);
    expect(p.cards.q1.wrong).toBe(1);
    expect(wrongQuestionIds(p)).toEqual(['q1']);
  });

  it("liste les questions à réviser, les plus fragiles d'abord", () => {
    let p = emptyProgress();
    p = recordAnswer(p, 'bien', true, D1);
    p = recordAnswer(p, 'bien', true, D1);
    p = recordAnswer(p, 'rate', false, D1);
    p = recordAnswer(p, 'futur', true, D1);
    expect(dueQuestionIds(p, D1)).toEqual(['rate']);
    expect(dueQuestionIds(p, addDays(D1, 1))).toEqual(['rate', 'futur']);
    expect(dueQuestionIds(p, addDays(D1, 2))).toEqual(['rate', 'futur', 'bien']);
  });
});

describe('points, série et compteur du jour', () => {
  it('donne 10 points par bonne réponse et 2 par erreur', () => {
    let p = recordAnswer(emptyProgress(), 'a', true, D1);
    p = recordAnswer(p, 'b', false, D1);
    expect(p.xp).toBe(12);
    expect(p.today).toEqual({ day: D1, count: 2 });
  });

  it('compte la série de jours consécutifs et la remet à 1 après une pause', () => {
    let p = recordAnswer(emptyProgress(), 'a', true, '2026-03-10');
    p = recordAnswer(p, 'a', true, '2026-03-11');
    p = recordAnswer(p, 'a', true, '2026-03-11');
    expect(p.streak).toBe(2);
    p = recordAnswer(p, 'a', true, '2026-03-14');
    expect(p.streak).toBe(1);
    expect(p.bestStreak).toBe(2);
  });

  it('calcule le niveau de points', () => {
    expect(levelOfXp(0)).toBe(1);
    expect(levelOfXp(199)).toBe(1);
    expect(levelOfXp(200)).toBe(2);
    expect(xpIntoLevel(250)).toBe(50);
  });
});

describe('fiches et examens', () => {
  it("mesure la maîtrise d'une fiche (boîte 3 et plus)", () => {
    const fiche = ALL_FICHES[0];
    let p = emptyProgress();
    const first = fiche.questions[0].id;
    for (let i = 0; i < 3; i++) p = recordAnswer(p, first, true, D1);
    const s = ficheStats(p, fiche);
    expect(s.total).toBe(fiche.questions.length);
    expect(s.seen).toBe(1);
    expect(s.mastered).toBe(1);
    expect(s.percent).toBe(Math.round((1 / fiche.questions.length) * 100));
  });

  it("garde le meilleur score d'une fiche et ne donne le bonus qu'une fois", () => {
    let p = finishFiche(emptyProgress(), 'n2-f01', 90);
    expect(p.xp).toBe(20);
    p = finishFiche(p, 'n2-f01', 60);
    expect(p.fiches['n2-f01']).toEqual({ best: 90, runs: 2 });
    p = finishFiche(p, 'n2-f01', 100);
    expect(p.xp).toBe(20);
    expect(p.fiches['n2-f01'].best).toBe(100);
  });

  it('enregistre les examens blancs, limités aux 20 derniers', () => {
    let p = emptyProgress();
    for (let i = 0; i < 25; i++) p = finishExam(p, 'N2', 50 + i, 40, D1);
    expect(p.exams).toHaveLength(20);
    expect(p.exams[19].percent).toBe(74);
  });
});

describe('badges', () => {
  it('ne donne rien à un état vierge', () => {
    expect(earnedBadges(emptyProgress())).toEqual([]);
  });

  it('débloque un badge une seule fois', () => {
    const p = recordAnswer(emptyProgress(), 'q1', true, D1);
    const a = withBadges(p);
    expect(a.unlocked).toContain('first');
    expect(a.progress.badges.first).toBe(true);
    expect(withBadges(a.progress).unlocked).toEqual([]);
  });

  it("débloque « Tour du N2 » quand toutes les fiches du N2 ont été terminées", () => {
    let p = emptyProgress();
    for (const f of ALL_FICHES.filter((x) => x.level === 'N2')) p = finishFiche(p, f.id, 50);
    expect(earnedBadges(p)).toContain('n2done');
    expect(earnedBadges(p)).not.toContain('n3done');
  });
});

describe('sauvegarde', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("relit ce qu'elle a sauvegardé", async () => {
    const p = recordAnswer(emptyProgress(), 'q1', true, D1);
    await saveProgress(p);
    expect(await loadProgress()).toEqual(p);
  });

  it("repart d'un état neuf si la sauvegarde est abîmée", async () => {
    await AsyncStorage.setItem(STORAGE_KEY, '{pas du json');
    expect(await loadProgress()).toEqual(emptyProgress());
  });

  it('complète une ancienne sauvegarde incomplète', () => {
    const p = normalize({ xp: 40, level: 'N3' });
    expect(p.xp).toBe(40);
    expect(p.level).toBe('N3');
    expect(p.cards).toEqual({});
    expect(p.dailyGoal).toBe(20);
    expect(normalize(null)).toEqual(emptyProgress());
  });

  it('efface la progression', async () => {
    await saveProgress(recordAnswer(emptyProgress(), 'q1', true, D1));
    expect(await resetProgress()).toEqual(emptyProgress());
    expect(await loadProgress()).toEqual(emptyProgress());
  });
});
