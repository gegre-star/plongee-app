# État du projet — plongee-app (Plongée N2/N3)

_Mis à jour par Claude en fin de session de travail._

## But
Appli mobile hors-ligne (Expo Go, comme Lotus Chess) pour réviser le N2 et le N3 de plongée.
Contenu UNIQUEMENT tiré des deux manuels `sources/n2.md` et `sources/n3.md` (Plongée Plaisir, texte OCR sur une seule ligne).
Modèle technique : `C:/Users/gouin/lotus-chess` (Expo SDK 54, expo-router, AsyncStorage, jest-expo). Pas de Firebase.
Consigne utilisateur : "tu apprends de l'appli anglais et lotus mais tu développes avec ta memory" = s'inspirer, ne pas copier l'appli anglaise.

## Où on en est
- Squelette créé, `npm install` fait.
- `src/content/types.ts`, `src/content/build.ts` (helpers `fiche`, `qcm`, `vf`).
- Contenu écrit : N2 UL1 (fiches 1-6) dans `src/content/n2/ul1.ts`.
- Lecture du manuel N2 faite jusqu au caractère ~137500 (fin UL2). n2/ul2.ts écrit (fiches 7-22).

## Prochaines étapes
1. Lire n2.md par tranches de ~25000 caractères (python -I, t[a:b]) et écrire un fichier par UL : n2/ul2.ts … ul6.ts (+ nitrox), puis n3/ul1..ul6.ts.
2. `src/content/index.ts` (assemble MODULES), tests de contenu (ids uniques, answer valide, >=4 questions/fiche).
3. Logique de progression (répétition espacée type Leitner, XP, séries) + tests.
4. Écrans : Accueil, Apprendre (modules > fiches > quiz), Réviser (erreurs + examen blanc), Profil.
5. Vérifier `npm test` et `npm run typecheck`, committer par petites étapes (messages en anglais).

## Pièges
- Le garde-fou (hook) demande de justifier chaque nouveau fichier créé avec l'outil Write.
- Une grosse commande shell avec heredoc a échoué une fois : utiliser l'outil Write pour les gros fichiers.
- Vérifier chaque chiffre/question contre le texte du manuel (calculs inclus).
