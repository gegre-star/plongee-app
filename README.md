# Plongée N2 / N3

Application mobile de révision pour les niveaux 2 et 3 de plongée, entièrement hors ligne.
Tout le contenu vient des deux manuels Plongée Plaisir (N2 et N3), copiés dans `sources/`.

## Lancer sur un téléphone

Il faut Node.js 20 sur l’ordinateur et l’application Expo Go sur le téléphone, tous deux sur le même Wi‑Fi.

```bash
npm install
npx expo start
```

Scanner le QR code avec l’appareil photo (iPhone) ou avec Expo Go (Android).
Si le QR code ne fonctionne pas : `npx expo start --tunnel`.

## Contenu

| | Niveau 2 | Niveau 3 |
| --- | --- | --- |
| Modules | 8 | 7 |
| Fiches | 49 | 45 |
| Questions | 260 | 213 |

Chaque fiche a ses points clefs (résumé du manuel) et ses questions d’entraînement, avec explication de la bonne réponse.
Les calculs (lestage, autonomie en air, caps, tables MN90, nitrox) sont recalculés dans les explications.

## Fonctions

- Apprendre : lire une fiche puis s’entraîner dessus.
- Réviser : répétition espacée (les erreurs reviennent après 1, 2, 4, 8, 16 jours), mes erreurs, entraînement libre.
- Examen blanc : 40 questions tirées au hasard dans le niveau, correction à la fin.
- Points, série de jours, objectif quotidien, 10 badges.
- Les choix de réponse sont mélangés à chaque fois.

## Organisation

| Dossier | Rôle |
| --- | --- |
| `sources/` | Les deux manuels (texte OCR) |
| `src/content/` | Modules, fiches et questions (un fichier par unité du manuel) |
| `src/lib/quiz.ts` | Mélange, tirage et score |
| `src/state/` | Progression, badges, sauvegarde sur le téléphone |
| `src/components/` | Thème et composants |
| `app/` | Les écrans (accueil, apprendre, fiche, quiz, réviser, profil) |

## Vérification

```bash
npm test
npm run typecheck
```

Les tests contrôlent chaque question : bonne réponse valide, choix distincts, pas de texte provisoire,
et que le mélange des choix garde la bonne réponse au bon endroit.

## Choix de conception

Pas de compte, pas de serveur : la progression reste sur le téléphone (AsyncStorage).
Le contenu est séparé de l’interface : ajouter une fiche = ajouter un fichier dans `src/content/`.
