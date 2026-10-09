import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Tabs } from 'expo-router';
import { ProgressProvider, useProgress } from '../src/state/ProgressContext';
import { Button, Dialog } from '../src/components/UI';
import { C, S } from '../src/components/theme';

/** Fenêtre de félicitations, affichée dès qu’un badge est débloqué. */
function BadgeCelebration() {
  const { celebrating, dismissCelebration } = useProgress();
  return (
    <Dialog visible={celebrating !== null} title="Badge débloqué !" onClose={dismissCelebration}>
      {celebrating ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 52 }}>{celebrating.icon}</Text>
          <Text style={{ color: C.text, fontSize: 18, fontWeight: '800', marginTop: 8 }}>{celebrating.name}</Text>
          <Text style={[S.muted, { textAlign: 'center', marginTop: 4, marginBottom: 16 }]}>{celebrating.desc}</Text>
          <Button label="Super !" onPress={dismissCelebration} style={{ alignSelf: 'stretch' }} />
        </View>
      ) : null}
    </Dialog>
  );
}

const icon = (glyph: string) => ({ color }: { color: string }) => <Text style={{ color, fontSize: 18 }}>{glyph}</Text>;

export default function RootLayout() {
  return (
    <ProgressProvider>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: C.app },
          headerTitleStyle: { color: C.text, fontWeight: '800' },
          headerTintColor: C.text,
          sceneStyle: { backgroundColor: C.app },
          tabBarStyle: { backgroundColor: C.surface, borderTopColor: C.line },
          tabBarActiveTintColor: C.accent,
          tabBarInactiveTintColor: C.muted2,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '800' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Accueil', tabBarIcon: icon('🌊') }} />
        <Tabs.Screen name="learn" options={{ title: 'Apprendre', tabBarIcon: icon('📖') }} />
        <Tabs.Screen name="review" options={{ title: 'Réviser', tabBarIcon: icon('🎯') }} />
        <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: icon('🏅') }} />
        <Tabs.Screen name="fiche/[id]" options={{ href: null, title: 'Fiche' }} />
        <Tabs.Screen name="quiz" options={{ href: null, headerShown: false, tabBarStyle: { display: 'none' } }} />
      </Tabs>
      <BadgeCelebration />
    </ProgressProvider>
  );
}
