import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LEVELS, modulesOf } from '../src/content';
import { ficheStats } from '../src/state/progress';
import { useProgress } from '../src/state/ProgressContext';
import { Card, ProgressBar, SectionTitle } from '../src/components/UI';
import { C, S } from '../src/components/theme';

export default function Learn() {
  const router = useRouter();
  const { progress } = useProgress();
  const level = progress.level;
  const info = LEVELS.find((l) => l.id === level);

  return (
    <ScrollView style={S.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={S.title}>{info?.label}</Text>
      <Text style={S.muted}>{info?.subtitle}</Text>
      <Text style={[S.muted, { marginTop: 6 }]}>Change de niveau depuis l’accueil.</Text>

      {modulesOf(level).map((m) => {
        const stats = m.fiches.map((f) => ficheStats(progress, f));
        const mastered = stats.reduce((n, s) => n + s.mastered, 0);
        const total = stats.reduce((n, s) => n + s.total, 0);
        const pct = total === 0 ? 0 : Math.round((mastered / total) * 100);
        return (
          <View key={m.id}>
            <SectionTitle title={`${m.code} · ${m.title}`} meta={`${pct} %`} />
            <ProgressBar value={pct} />
            <View style={{ marginTop: 10, gap: 8 }}>
              {m.fiches.map((f, i) => {
                const s = stats[i];
                const best = progress.fiches[f.id]?.best;
                return (
                  <Card key={f.id} onPress={() => router.push({ pathname: '/fiche/[id]', params: { id: f.id } })}>
                    <View style={[S.row, { justifyContent: 'space-between' }]}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: C.text, fontWeight: '800', fontSize: 15 }}>
                          Fiche {f.number} · {f.title}
                        </Text>
                        <Text style={[S.muted, { marginTop: 2 }]}>
                          {f.questions.length} questions · {s.mastered} maîtrisée{s.mastered > 1 ? 's' : ''}
                          {best !== undefined ? ` · meilleur ${best} %` : ''}
                        </Text>
                      </View>
                      <Text style={{ color: s.percent >= 80 ? C.green : C.muted2, fontSize: 18 }}>{s.percent >= 80 ? '✓' : '›'}</Text>
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
