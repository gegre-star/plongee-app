import React, { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getFiche, getQuestion, questionsOfLevel } from '../src/content';
import type { Level, Question } from '../src/content/types';
import { pickQuestions } from '../src/lib/quiz';
import { dayString, dueQuestionIds, wrongQuestionIds } from '../src/state/progress';
import { useProgress } from '../src/state/ProgressContext';
import { QuizRunner } from '../src/components/QuizRunner';

const EXAM_SIZE = 40;
const SESSION_SIZE = 15;

const fromIds = (ids: string[]): Question[] =>
  ids.map((id) => getQuestion(id)).filter((q): q is Question => q !== undefined);

export default function QuizScreen() {
  const params = useLocalSearchParams<{ kind?: string; id?: string; level?: string }>();
  const router = useRouter();
  const { progress, answer, completeFiche, completeExam } = useProgress();
  const kind = String(params.kind ?? 'fiche');
  const level: Level = params.level === 'N3' ? 'N3' : 'N2';

  // La liste de questions est figée au lancement : elle ne change pas en cours de série.
  const setup = useMemo(() => {
    const today = dayString();
    if (kind === 'fiche') {
      const fiche = getFiche(String(params.id));
      return { title: fiche ? `Fiche ${fiche.number}` : 'Fiche', questions: fiche ? fiche.questions : [], mode: 'practice' as const };
    }
    if (kind === 'exam') {
      return {
        title: `Examen blanc ${level}`,
        questions: pickQuestions(questionsOfLevel(level), EXAM_SIZE),
        mode: 'exam' as const,
      };
    }
    if (kind === 'wrong') {
      return { title: 'Mes erreurs', questions: pickQuestions(fromIds(wrongQuestionIds(progress)), SESSION_SIZE), mode: 'practice' as const };
    }
    if (kind === 'due') {
      return { title: 'À revoir', questions: pickQuestions(fromIds(dueQuestionIds(progress, today)), SESSION_SIZE), mode: 'practice' as const };
    }
    return { title: 'Entraînement libre', questions: pickQuestions(questionsOfLevel(progress.level), SESSION_SIZE), mode: 'practice' as const };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, params.id, params.level]);

  return (
    <QuizRunner
      title={setup.title}
      questions={setup.questions}
      mode={setup.mode}
      onAnswer={answer}
      onFinish={(percent, total) => {
        if (kind === 'fiche' && params.id) completeFiche(String(params.id), percent);
        if (kind === 'exam') completeExam(level, percent, total);
      }}
      onExit={() => router.back()}
    />
  );
}
