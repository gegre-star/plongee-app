import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LEVELS, modulesOf, questionsOfLevel } from '../src/content';
import { dayString, dueQuestionIds, wrongQuestionIds } from '../src/state/progress';
import { useProgress } from '../src/state/ProgressContext';
import { Button, Card, SectionTitle } from '../src/components/UI';
import { S } from '../src/components/theme';

export default function Review() {
  const router = useRouter();
  const { progress } = useProgress();
  const level = progress.level;
  const due = dueQuestionIds(progress, dayString()).length;
  const wrong = wrongQuestionIds(progress).length;
  const info = LEVELS.find((l) => l.id === level);
  const exams = progress.exams.filter((e) => e.level === level);
  const bestExam = exams.reduce((m, e) => Math.max(m, e.percent), 0);

  return (
    <ScrollView style={S.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={S.title}>Réviser · {info?.label}</Text>
      <Text style={[S.muted, { marginTop: 4 }]}>
        Les questions ratées reviennent plus souvent : 1 jour, puis 2, 4, 8 et 16 jours quand tu les réussis.
      </Text>

      <SectionTitle title="Aujourd’hui" />
      <View style={{ gap: 10 }}>
        <Button
          label={`À revoir aujourd’hui (${due})`}
          disabled={due === 0}
          onPress={() => router.push({ pathname: '/quiz', params: { kind: 'due' } })}
        />
        <Button
          label={`Mes erreurs (${wrong})`}
          tone="neutral"
          disabled={wrong === 0}
          onPress={() => router.push({ pathname: '/quiz', params: { kind: 'wrong' } })}
        />
        <Button
          label="Entraînement libre (15 questions)"
          tone="neutral"
          onPress={() => router.push({ pathname: '/quiz', params: { kind: 'random' } })}
        />
      </View>

      <SectionTitle title="Examen blanc" meta={exams.length > 0 ? `meilleur ${bestExam} %` : undefined} />
      <Card>
        <Text style={S.body}>
          40 questions tirées au hasard dans tout le niveau, sans correction pendant l’épreuve. Les réponses fausses sont expliquées à la fin.
        </Text>
        <Text style={[S.muted, { marginTop: 6 }]}>
          Banque : {questionsOfLevel(level).length} questions · {modulesOf(level).length} modules
        </Text>
        <Button
          label={`Lancer l’examen ${level}`}
          onPress={() => router.push({ pathname: '/quiz', params: { kind: 'exam', level } })}
          style={{ marginTop: 12 }}
        />
      </Card>

      {exams.length > 0 ? (
        <View>
          <SectionTitle title="Derniers examens" />
          {exams
            .slice(-5)
            .reverse()
            .map((e, i) => (
              <Card key={`${e.day}-${i}`} style={{ marginBottom: 8 }}>
                <View style={[S.row, { justifyContent: 'space-between' }]}>
                  <Text style={S.body}>{e.day}</Text>
                  <Text style={[S.body, { fontWeight: '800' }]}>{e.percent} %</Text>
                </View>
              </Card>
            ))}
        </View>
      ) : null}
    </ScrollView>
  );
}
