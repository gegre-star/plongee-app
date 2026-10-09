import React, { useState } from 'react';
import { Alert, ScrollView, Text, View, Pressable } from 'react-native';
import { ALL_QUESTIONS } from '../src/content';
import { BADGES } from '../src/state/badges';
import { levelOfXp } from '../src/state/progress';
import { useProgress } from '../src/state/ProgressContext';
import { Button, Card, SectionTitle, Stat } from '../src/components/UI';
import { C, S } from '../src/components/theme';

const GOALS = [10, 20, 40];

export default function Profile() {
  const { progress, setDailyGoal, reset } = useProgress();
  const [confirm, setConfirm] = useState(false);
  const worked = Object.keys(progress.cards).length;
  const right = Object.values(progress.cards).reduce((n, c) => n + c.right, 0);
  const wrong = Object.values(progress.cards).reduce((n, c) => n + c.wrong, 0);
  const rate = right + wrong === 0 ? 0 : Math.round((right / (right + wrong)) * 100);
  const earned = BADGES.filter((b) => progress.badges[b.id]).length;

  const askReset = () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    reset();
    setConfirm(false);
    Alert.alert('Progression effacée', 'Tout est remis à zéro.');
  };

  return (
    <ScrollView style={S.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={S.title}>Profil</Text>

      <Card style={{ marginTop: 14 }}>
        <View style={S.row}>
          <Stat value={levelOfXp(progress.xp)} label="NIVEAU" />
          <Stat value={progress.xp} label="POINTS" />
          <Stat value={progress.bestStreak} label="MEILLEURE SÉRIE" />
        </View>
        <View style={[S.row, { marginTop: 14 }]}>
          <Stat value={`${worked}/${ALL_QUESTIONS.length}`} label="QUESTIONS VUES" />
          <Stat value={`${rate} %`} label="RÉUSSITE" />
        </View>
      </Card>

      <SectionTitle title="Badges" meta={`${earned} / ${BADGES.length}`} />
      <View style={{ gap: 8 }}>
        {BADGES.map((b) => {
          const got = progress.badges[b.id];
          return (
            <Card key={b.id} style={{ opacity: got ? 1 : 0.5 }}>
              <View style={S.row}>
                <Text style={{ fontSize: 28 }}>{got ? b.icon : '🔒'}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: C.text, fontWeight: '800' }}>{b.name}</Text>
                  <Text style={S.muted}>{b.desc}</Text>
                </View>
              </View>
            </Card>
          );
        })}
      </View>

      <SectionTitle title="Objectif quotidien" meta="questions par jour" />
      <View style={S.row}>
        {GOALS.map((g) => {
          const active = progress.dailyGoal === g;
          return (
            <Pressable
              key={g}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setDailyGoal(g)}
              style={{ flex: 1, padding: 12, borderRadius: 12, alignItems: 'center', backgroundColor: active ? C.accent : C.surface }}
            >
              <Text style={{ color: active ? C.bg : C.text, fontWeight: '800' }}>{g}</Text>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title="Données" />
      <Text style={[S.muted, { marginBottom: 10 }]}>
        Tout est enregistré sur ce téléphone, sans compte ni connexion. Les questions viennent uniquement des manuels Plongée Plaisir N2 et N3.
      </Text>
      <Button label={confirm ? 'Confirmer : tout effacer' : 'Effacer ma progression'} tone="danger" onPress={askReset} />
    </ScrollView>
  );
}
