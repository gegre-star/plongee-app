import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { getFiche, getModuleOfFiche } from '../../src/content';
import { ficheStats } from '../../src/state/progress';
import { useProgress } from '../../src/state/ProgressContext';
import { Button, Card, ProgressBar } from '../../src/components/UI';
import { C, S } from '../../src/components/theme';

export default function FicheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { progress } = useProgress();
  const fiche = getFiche(String(id));
  const module = fiche ? getModuleOfFiche(fiche.id) : undefined;

  if (!fiche) {
    return (
      <View style={[S.screen, S.center, { padding: 24 }]}>
        <Text style={S.h2}>Fiche introuvable</Text>
        <Button label="Retour" onPress={() => router.back()} style={{ marginTop: 12 }} />
      </View>
    );
  }

  const stats = ficheStats(progress, fiche);

  return (
    <ScrollView style={S.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Stack.Screen options={{ title: `Fiche ${fiche.number}` }} />
      <Text style={S.muted}>
        {module?.code} · {module?.title}
      </Text>
      <Text style={[S.title, { marginTop: 4 }]}>{fiche.title}</Text>

      <Card style={{ marginTop: 14 }}>
        <Text style={[S.muted, { marginBottom: 6 }]}>
          Maîtrise : {stats.mastered} / {stats.total} questions
        </Text>
        <ProgressBar value={stats.percent} color={C.green} />
      </Card>

      <Text style={[S.h2, { marginTop: 20, marginBottom: 8 }]}>À retenir</Text>
      {fiche.points.map((point, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ color: C.accent, fontSize: 16, marginRight: 8 }}>•</Text>
          <Text style={[S.body, { flex: 1 }]}>{point}</Text>
        </View>
      ))}

      <Button
        label={`S’entraîner (${fiche.questions.length} questions)`}
        onPress={() => router.push({ pathname: '/quiz', params: { kind: 'fiche', id: fiche.id } })}
        style={{ marginTop: 16 }}
      />
      <Text style={[S.muted, { marginTop: 12, textAlign: 'center' }]}>
        Contenu issu du manuel Plongée Plaisir, niveau {fiche.level === 'N2' ? '2' : '3'}.
      </Text>
    </ScrollView>
  );
}
