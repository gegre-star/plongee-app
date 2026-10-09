import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Level } from '../content/types';
import { BADGES, withBadges, type Badge } from './badges';
import {
  dayString,
  emptyProgress,
  finishExam,
  finishFiche,
  recordAnswer,
  setLevel,
  type Progress,
} from './progress';
import { loadProgress, resetProgress, saveProgress } from './storage';

interface ProgressContextValue {
  progress: Progress;
  /** Vrai tant que la sauvegarde n’a pas été relue au démarrage. */
  loading: boolean;
  answer: (questionId: string, correct: boolean) => void;
  completeFiche: (ficheId: string, percent: number) => void;
  completeExam: (level: Level, percent: number, total: number) => void;
  chooseLevel: (level: Level) => void;
  setDailyGoal: (goal: number) => void;
  reset: () => void;
  /** Badge à célébrer, ou null. */
  celebrating: Badge | null;
  dismissCelebration: () => void;
}

const noop = () => {};

const ProgressContext = createContext<ProgressContextValue>({
  progress: emptyProgress(),
  loading: true,
  answer: noop,
  completeFiche: noop,
  completeExam: noop,
  chooseLevel: noop,
  setDailyGoal: noop,
  reset: noop,
  celebrating: null,
  dismissCelebration: noop,
});

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<string[]>([]);
  const latest = useRef<Progress>(progress);

  useEffect(() => {
    let alive = true;
    loadProgress().then((saved) => {
      if (!alive) return;
      latest.current = saved;
      setProgress(saved);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  /** Applique une transformation, attribue les badges, sauvegarde. */
  const apply = useCallback((fn: (p: Progress) => Progress) => {
    const awarded = withBadges(fn(latest.current));
    latest.current = awarded.progress;
    setProgress(awarded.progress);
    void saveProgress(awarded.progress);
    if (awarded.unlocked.length > 0) setQueue((q) => [...q, ...awarded.unlocked]);
  }, []);

  const answer = useCallback(
    (questionId: string, correct: boolean) => apply((p) => recordAnswer(p, questionId, correct, dayString())),
    [apply],
  );
  const completeFiche = useCallback(
    (ficheId: string, percent: number) => apply((p) => finishFiche(p, ficheId, percent)),
    [apply],
  );
  const completeExam = useCallback(
    (level: Level, percent: number, total: number) => apply((p) => finishExam(p, level, percent, total, dayString())),
    [apply],
  );
  const chooseLevel = useCallback((level: Level) => apply((p) => setLevel(p, level)), [apply]);
  const setDailyGoal = useCallback((goal: number) => apply((p) => ({ ...p, dailyGoal: goal })), [apply]);

  const reset = useCallback(() => {
    void resetProgress().then((fresh) => {
      latest.current = fresh;
      setProgress(fresh);
    });
    setQueue([]);
  }, []);

  const dismissCelebration = useCallback(() => setQueue((q) => q.slice(1)), []);
  const celebrating = useMemo(() => BADGES.find((b) => b.id === queue[0]) ?? null, [queue]);

  const value = useMemo(
    () => ({ progress, loading, answer, completeFiche, completeExam, chooseLevel, setDailyGoal, reset, celebrating, dismissCelebration }),
    [progress, loading, answer, completeFiche, completeExam, chooseLevel, setDailyGoal, reset, celebrating, dismissCelebration],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  return useContext(ProgressContext);
}
