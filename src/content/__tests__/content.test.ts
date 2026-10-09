import { ALL_FICHES, ALL_QUESTIONS, LEVELS, MODULES, ficheOfQuestion, getQuestion, questionsOfLevel } from '..';

describe('contenu des manuels', () => {
  it('contient des modules pour les deux niveaux', () => {
    for (const level of LEVELS) {
      expect(MODULES.filter((m) => m.level === level.id).length).toBeGreaterThan(5);
    }
  });

  it('a des identifiants uniques (modules, fiches, questions)', () => {
    const unique = (ids: string[]) => new Set(ids).size === ids.length;
    expect(unique(MODULES.map((m) => m.id))).toBe(true);
    expect(unique(ALL_FICHES.map((f) => f.id))).toBe(true);
    expect(unique(ALL_QUESTIONS.map((q) => q.id))).toBe(true);
  });

  it('donne à chaque fiche un titre, des points clefs et au moins 2 questions', () => {
    for (const f of ALL_FICHES) {
      expect(f.title.length).toBeGreaterThan(3);
      expect(f.points.length).toBeGreaterThanOrEqual(3);
      expect(f.questions.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('range chaque fiche dans le niveau de son module', () => {
    for (const m of MODULES) {
      for (const f of m.fiches) expect(f.level).toBe(m.level);
    }
  });

  it('a des questions bien formées : réponse valide, choix distincts et non vides', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.text.trim().length).toBeGreaterThan(5);
      expect(q.explain.trim().length).toBeGreaterThan(5);
      expect(q.choices.length).toBeGreaterThanOrEqual(2);
      expect(q.choices.length).toBeLessThanOrEqual(5);
      expect(Number.isInteger(q.answer)).toBe(true);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.choices.length);
      expect(new Set(q.choices).size).toBe(q.choices.length);
      for (const c of q.choices) expect(c.trim().length).toBeGreaterThan(0);
      if (q.kind === 'vf') expect(q.choices).toEqual(['Vrai', 'Faux']);
    }
  });

  it('ne laisse pas de texte provisoire dans le contenu', () => {
    for (const q of ALL_QUESTIONS) {
      expect(`${q.text} ${q.explain} ${q.choices.join(' ')}`).not.toMatch(/TODO|XXX|lorem/i);
    }
  });

  it('retrouve une question et sa fiche à partir de son identifiant', () => {
    const q = ALL_QUESTIONS[0];
    expect(getQuestion(q.id)).toBe(q);
    expect(ficheOfQuestion(q.id)?.questions).toContain(q);
    expect(getQuestion('inexistant')).toBeUndefined();
  });

  it('propose assez de questions pour un examen blanc par niveau', () => {
    expect(questionsOfLevel('N2').length).toBeGreaterThanOrEqual(150);
    expect(questionsOfLevel('N3').length).toBeGreaterThanOrEqual(100);
  });
});
