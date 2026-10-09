import { ALL_QUESTIONS } from '../../content';
import { makeRng, pickQuestions, prepareQuestion, scoreSession, shuffle, verdict } from '../quiz';

describe('quiz', () => {
  it('mélange sans perdre ni dupliquer d\'éléments, et de façon reproductible', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    const a = shuffle(items, makeRng(42));
    const b = shuffle(items, makeRng(42));
    expect(a).toEqual(b);
    expect([...a].sort()).toEqual(items);
    expect(items).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('garde la bonne réponse au bon endroit après mélange, pour toutes les questions', () => {
    for (const q of ALL_QUESTIONS) {
      for (const seed of [1, 7, 99]) {
        const p = prepareQuestion(q, makeRng(seed));
        expect(p.choices).toHaveLength(q.choices.length);
        expect(p.choices[p.answer]).toBe(q.choices[q.answer]);
        expect([...p.choices].sort()).toEqual([...q.choices].sort());
      }
    }
  });

  it('ne mélange pas les vrai/faux', () => {
    const vf = ALL_QUESTIONS.find((q) => q.kind === 'vf');
    expect(vf).toBeDefined();
    const p = prepareQuestion(vf!, makeRng(3));
    expect(p.choices).toEqual(['Vrai', 'Faux']);
    expect(p.answer).toBe(vf!.answer);
  });

  it('répartit la bonne réponse sur plusieurs positions après mélange', () => {
    const qcm = ALL_QUESTIONS.filter((q) => q.kind === 'qcm');
    const rng = makeRng(2024);
    const positions = new Set(qcm.map((q) => prepareQuestion(q, rng).answer));
    expect(positions.size).toBeGreaterThanOrEqual(3);
  });

  it('tire des questions distinctes', () => {
    const picked = pickQuestions(ALL_QUESTIONS, 40, makeRng(5));
    expect(picked).toHaveLength(40);
    expect(new Set(picked.map((q) => q.id)).size).toBe(40);
    expect(pickQuestions(ALL_QUESTIONS, 0)).toEqual([]);
    expect(pickQuestions(ALL_QUESTIONS.slice(0, 3), 10)).toHaveLength(3);
  });

  it('calcule le score d\'une série', () => {
    const r = scoreSession([
      { questionId: 'a', correct: true },
      { questionId: 'b', correct: false },
      { questionId: 'c', correct: true },
      { questionId: 'd', correct: true },
    ]);
    expect(r).toEqual({ total: 4, correct: 3, percent: 75, wrongIds: ['b'] });
    expect(scoreSession([]).percent).toBe(0);
  });

  it('donne une mention croissante', () => {
    expect(verdict(95)).toBe('Excellent !');
    expect(verdict(80)).toBe('Très bien');
    expect(verdict(65)).toBe('Bien, continue');
    expect(verdict(45)).toBe('À retravailler');
    expect(verdict(10)).toBe('Reprends la fiche');
  });
});
