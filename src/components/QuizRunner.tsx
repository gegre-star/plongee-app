import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { ficheOfQuestion } from '../content';
import type { Question } from '../content/types';
import { prepareQuestion, scoreSession, verdict, type AnswerRecord } from '../lib/quiz';
import { Button, Card, ProgressBar } from './UI';
import { C, S } from './theme';

interface Props {
  title: string;
  questions: Question[];
  /** « exam » : pas de correction pendant la série, tout est donné à la fin. */
  mode: 'practice' | 'exam';
  onAnswer: (questionId: string, correct: boolean) => void;
  onFinish: (percent: number, total: number) => void;
  onExit: () => void;
}

export function QuizRunner({ title, questions, mode, onAnswer, onFinish, onExit }: Props) {
  const prepared = useMemo(() => questions.map((q) => prepareQuestion(q)), [questions]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);

  if (prepared.length === 0) {
    return (
      <View style={[S.screen, S.center, { padding: 24 }]}>
        <Text style={S.h2}>Rien à travailler ici pour l’instant</Text>
        <Text style={[S.muted, { marginVertical: 12, textAlign: 'center' }]}>Reviens après avoir répondu à quelques questions.</Text>
        <Button label="Retour" onPress={onExit} />
      </View>
    );
  }

  if (finished) {
    const result = scoreSession(records);
    return (
      <ScrollView style={S.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Text style={{ color: C.muted, fontSize: 13 }}>{title}</Text>
          <Text style={{ color: C.accent, fontSize: 54, fontWeight: '800' }}>{result.percent} %</Text>
          <Text style={S.h2}>{verdict(result.percent)}</Text>
          <Text style={[S.muted, { marginTop: 4 }]}>
            {result.correct} bonne{result.correct > 1 ? 's' : ''} réponse{result.correct > 1 ? 's' : ''} sur {result.total}
          </Text>
        </Card>
        {result.wrongIds.length > 0 ? (
          <View>
            <Text style={[S.h2, { marginTop: 18, marginBottom: 8 }]}>À revoir</Text>
            {result.wrongIds.map((id) => {
              const p = prepared.find((x) => x.question.id === id);
              if (!p) return null;
              const fiche = ficheOfQuestion(id);
              return (
                <Card key={id} style={{ marginBottom: 10 }}>
                  <Text style={[S.body, { fontWeight: '700' }]}>{p.question.text}</Text>
                  <Text style={{ color: C.green, marginTop: 6 }}>✓ {p.choices[p.answer]}</Text>
                  <Text style={[S.muted, { marginTop: 4 }]}>{p.question.explain}</Text>
                  {fiche ? <Text style={[S.muted, { marginTop: 6, color: C.muted2 }]}>Fiche {fiche.number} · {fiche.title}</Text> : null}
                </Card>
              );
            })}
          </View>
        ) : null}
        <Button label="Terminer" onPress={onExit} style={{ marginTop: 16 }} />
      </ScrollView>
    );
  }

  const current = prepared[index];
  const answered = picked !== null;
  const showFeedback = answered && mode === 'practice';
  const isLast = index === prepared.length - 1;

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    const correct = i === current.answer;
    onAnswer(current.question.id, correct);
    setRecords((r) => [...r, { questionId: current.question.id, correct }]);
  };

  const next = () => {
    if (isLast) {
      const result = scoreSession(records);
      onFinish(result.percent, result.total);
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setPicked(null);
  };

  return (
    <ScrollView style={S.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <View style={[S.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
        <Text style={S.muted}>{title}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Quitter" onPress={onExit}>
          <Text style={{ color: C.muted, fontSize: 14 }}>✕ Quitter</Text>
        </Pressable>
      </View>
      <ProgressBar value={(index / prepared.length) * 100} />
      <Text style={[S.muted, { marginTop: 6 }]}>Question {index + 1} sur {prepared.length}</Text>

      <Text style={[S.title, { fontSize: 19, marginVertical: 18, lineHeight: 26 }]}>{current.question.text}</Text>

      {current.choices.map((choice, i) => {
        const isRight = i === current.answer;
        const isPicked = i === picked;
        let bg: string = C.surface;
        let border: string = C.line;
        if (showFeedback && isRight) {
          bg = '#173d34';
          border = C.green;
        } else if (showFeedback && isPicked) {
          bg = '#432628';
          border = C.red;
        } else if (answered && isPicked) {
          bg = C.surface2;
          border = C.accent;
        }
        return (
          <Pressable
            key={`${current.question.id}-${i}`}
            accessibilityRole="button"
            accessibilityLabel={choice}
            disabled={answered}
            onPress={() => choose(i)}
            style={{ backgroundColor: bg, borderColor: border, borderWidth: 2, borderRadius: 12, padding: 14, marginBottom: 10 }}
          >
            <Text style={{ color: C.text, fontSize: 15, lineHeight: 21 }}>{choice}</Text>
          </Pressable>
        );
      })}

      {showFeedback ? (
        <Card style={{ marginTop: 6 }}>
          <Text style={{ color: picked === current.answer ? C.green : C.red, fontWeight: '800', marginBottom: 4 }}>
            {picked === current.answer ? 'Bonne réponse !' : 'Pas tout à fait'}
          </Text>
          <Text style={S.body}>{current.question.explain}</Text>
        </Card>
      ) : null}

      {answered ? (
        <Button label={isLast ? 'Voir le résultat' : 'Question suivante'} onPress={next} style={{ marginTop: 16 }} />
      ) : null}
    </ScrollView>
  );
}
