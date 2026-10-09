import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LEVELS, ALL_FICHES, modulesOf, questionsOfLevel } from '../src/content';
import type { Level } from '../src/content/types';
import { dayString, dueQuestionIds, levelOfXp, xpIntoLevel, XP_PER_LEVEL, ficheStats } from '../src/state/progress';
import { useProgress } from '../src/state/ProgressContext';
import { Button, Card, ProgressBar, SectionTitle, Stat } from '../src/components/UI';
import { C, S } from '../src/components/theme';

export default function Home() {
  const router = useRouter();
  const { progress, chooseLevel } = useProgress();
  const level = progress.level;
  const today = dayString();
  const dueCount = dueQuestionIds(progress, today).length;
  const todayCount = progress.today.day === today ? progress.today.count : 0;
  const goalPct = Math.min(100, (todayCount / progress.dailyGoal) * 100);

  const fiches = ALL_FICHES.filter((f) => f.level === level);
  const stats = fiches.map((f) => ficheStats(progress, f));
  const mastered = stats.reduce((n, s) => n + s.mastered, 0);
  const total = stats.reduce((n, s) => n + s.total, 0);
  const levelPct = total === 0 ? 0 : Math.round((mastered / total) * 100);

  // prochaine fiche à travailler : la première pas encore terminée
  const next = fiches.find((f) => (progress.fiches[f.id]?.runs ?? 0) === 0) ?? fiches[0];
  const module = modulesOf(level).find((m) => m.fiches.some((f) => f.id === next?.id));

  return (
    <ScrollView style={S.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={S.title}>Plongée · révision N2 / N3</Text>
      <Text style={[S.muted, { marginTop: 2 }]}>Manuels Plongée Plaisir, hors ligne</Text>

      <View style={[S.row, { marginTop: 14 }]}>
        {LEVELS.map((l) => {
          const active = l.id === level;
          return (
            <Pressable
              key={l.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => chooseLevel(l.id as Level)}
              style={{ flex: 1, padding: 12, borderRadius: 12, backgroundColor: active ? C.accent : C.surface, borderWidth: 1, borderColor: active ? C.accent : C.line }}
            >
              <Text style={{ color: active ? C.bg : C.text, fontWeight: '800', fontSize: 16 }}>{l.label}</Text>
              <Text style={{ color: active ? C.bg : C.muted, fontSize: 11, marginTop: 2 }}>{l.subtitle}</Text>
            </Pressable>
          );
        })}
      </View>

      <Card style={{ marginTop: 14 }}>
        <View style={S.row}>
          <Stat value={`${progress.streak}`} label="JOURS DE SUITE" />
          <Stat value={`${levelOfXp(progress.xp)}`} label="NIVEAU" />
          <Stat value={`${questionsOfLevel(level).length}`} label="QUESTIONS" />
        </View>
        <Text style={[S.muted, { marginTop: 12 }]}>Points : {xpIntoLevel(progress.xp)} / {XP_PER_LEVEL} avant le niveau suivant</Text>
        <ProgressBar value={(xpIntoLevel(progress.xp) / XP_PER_LEVEL) * 100} color={C.gold} />
      </Card>

      <SectionTitle title="Objectif du jour" meta={`${todayCount} / ${progress.dailyGoal} questions`} />
      <ProgressBar value={goalPct} color={goalPct >= 100 ? C.green : C.accent} />

      <SectionTitle title="Où j’en suis" meta={`${levelPct} % maîtrisé`} />
      <ProgressBar value={levelPct} />

      <SectionTitle title="Continuer" />
      {next ? (
        <Card onPress={() => router.push({ pathname: '/fiche/[id]', params: { id: next.id } })}>
          <Text style={S.muted}>{module?.code} · {module?.title}</Text>
          <Text style={[S.h2, { marginTop: 4 }]}>Fiche {next.number} · {next.title}</Text>
          <Text style={[S.muted, { marginTop: 4 }]}>{next.questions.length} questions · {next.points.length} points clefs</Text>
        </Card>
      ) : null}

      <View style={{ marginTop: 14, gap: 10 }}>
        <Button
          label={dueCount > 0 ? `Réviser maintenant (${dueCount} à revoir)` : 'Rien à revoir aujourd’hui'}
          tone={dueCount > 0 ? 'primary' : 'neutral'}
          disabled={dueCount === 0}
          onPress={() => router.push({ pathname: '/quiz', params: { kind: 'due' } })}
        />
        <Button label="Examen blanc" tone="neutral" onPress={() => router.push({ pathname: '/quiz', params: { kind: 'exam', level } })} />
      </View>
    </ScrollView>
  );
}
