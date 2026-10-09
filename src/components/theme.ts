import { StyleSheet } from 'react-native';

/** Palette « profondeurs » : bleus marins sombres, accent turquoise. */
export const C = {
  bg: '#07192a',
  app: '#0b2233',
  surface: '#12324a',
  surface2: '#1a4260',
  line: '#27597a',
  text: '#f2f8fc',
  muted: '#9db8cc',
  muted2: '#6f8da3',
  accent: '#2ec4b6',
  accentDark: '#1f8f84',
  gold: '#f2b84b',
  red: '#ef6a5b',
  green: '#59c27a',
  blue: '#5aa9e6',
} as const;

export const S = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.app },
  pad: { paddingHorizontal: 16 },
  title: { color: C.text, fontSize: 22, fontWeight: '800' },
  h2: { color: C.text, fontSize: 17, fontWeight: '800' },
  body: { color: C.text, fontSize: 15, lineHeight: 22 },
  muted: { color: C.muted, fontSize: 13 },
  card: { backgroundColor: C.surface, borderRadius: 14, padding: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  center: { alignItems: 'center', justifyContent: 'center' },
  track: { height: 8, borderRadius: 4, backgroundColor: C.bg, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4, backgroundColor: C.accent },
  statValue: { color: C.text, fontSize: 24, fontWeight: '800' },
  statLabel: { color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
});
