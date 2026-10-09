import React, { type ReactNode } from 'react';
import { Modal, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { C, S } from './theme';

type Tone = 'primary' | 'neutral' | 'danger';

export function Button({
  label,
  onPress,
  tone = 'primary',
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  tone?: Tone;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const bg = tone === 'primary' ? C.accent : tone === 'danger' ? C.red : C.surface2;
  const edge = tone === 'primary' ? C.accentDark : tone === 'danger' ? '#a8453a' : C.line;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: bg,
          borderBottomWidth: 3,
          borderBottomColor: edge,
          borderRadius: 12,
          paddingVertical: 13,
          paddingHorizontal: 18,
          alignItems: 'center',
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={{ color: tone === 'primary' ? C.bg : C.text, fontSize: 15, fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
}

export function ProgressBar({ value, color }: { value: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={S.track} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}>
      <View style={[S.fill, { width: `${pct}%`, backgroundColor: color ?? C.accent }]} />
    </View>
  );
}

export function Card({ children, style, onPress }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  if (onPress) {
    return (
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [S.card, style, { opacity: pressed ? 0.85 : 1 }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[S.card, style]}>{children}</View>;
}

export function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={S.statValue}>{value}</Text>
      <Text style={S.statLabel}>{label}</Text>
    </View>
  );
}

export function SectionTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingTop: 18, paddingBottom: 8 }}>
      <Text style={S.h2}>{title}</Text>
      {meta ? <Text style={S.muted}>{meta}</Text> : null}
    </View>
  );
}

export function Dialog({ visible, title, onClose, children }: { visible: boolean; title: string; onClose: () => void; children: ReactNode }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 }}>
        <View style={{ backgroundColor: C.surface, borderRadius: 16, padding: 20 }}>
          <Text style={[S.h2, { textAlign: 'center', marginBottom: 12 }]}>{title}</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
}
