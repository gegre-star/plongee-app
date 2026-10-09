import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY, emptyProgress, type Progress } from './progress';

/** Fusionne un état lu sur le disque avec les valeurs par défaut (montées de version). */
export function normalize(raw: unknown): Progress {
  const base = emptyProgress();
  if (!raw || typeof raw !== 'object') return base;
  const d = raw as Partial<Progress>;
  return {
    ...base,
    ...d,
    cards: d.cards && typeof d.cards === 'object' ? d.cards : {},
    fiches: d.fiches && typeof d.fiches === 'object' ? d.fiches : {},
    badges: d.badges && typeof d.badges === 'object' ? d.badges : {},
    exams: Array.isArray(d.exams) ? d.exams : [],
    level: d.level === 'N3' ? 'N3' : 'N2',
    today: d.today && typeof d.today.count === 'number' ? d.today : base.today,
  };
}

export async function loadProgress(): Promise<Progress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return normalize(raw ? JSON.parse(raw) : null);
  } catch {
    // stockage indisponible ou fichier abîmé : on repart d'un état neuf
    return emptyProgress();
  }
}

export async function saveProgress(p: Progress): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // rien à faire : la séance en cours reste utilisable
  }
}

export async function resetProgress(): Promise<Progress> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignoré
  }
  return emptyProgress();
}
