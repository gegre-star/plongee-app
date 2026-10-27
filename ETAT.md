# État du projet — plongee-app (Plongée N2/N3)

_Mis à jour par Claude le 2026-10-27._

## But
Appli mobile hors-ligne (Expo Go, même socle technique que Lotus Chess) pour réviser le N2 et le N3 de plongée.
Contenu UNIQUEMENT tiré des deux manuels `sources/n2.md` et `sources/n3.md` (Plongée Plaisir, texte OCR).
Consigne de départ : s’inspirer de l’appli anglais et de Lotus Chess, mais développer à partir de zéro.

## Où on en est
- Contenu complet écrit : N2 = 8 modules (UL1-UL6, nitrox, monde subaquatique en extraits), N3 = 7 modules (UL1-UL6, organisation des plongées).
- Logique : mélange des choix, tirage, score, répétition espacée (5 boîtes), points, série de jours, 10 badges, sauvegarde AsyncStorage.
- Écrans : accueil, apprendre, fiche, quiz, réviser (dont examen blanc), profil.
- Vérifié : `npm test` (32 tests OK), `npm run typecheck` OK, parcours vérifié dans le navigateur (version web).
- Versions alignées sur Expo Go SDK 54 (react 19.1.0, react-native 0.81.5).

## Reste à faire / à tester par l’utilisateur
1. Tester sur le téléphone avec Expo Go (voir README) : rien n’a été essayé sur un vrai téléphone.
2. Relecture par un moniteur : les questions ont été écrites à partir du texte OCR, un contrôle humain du contenu est conseillé avant un examen.
3. Parties non couvertes : faune et flore en détail (N2 fiches 47-52, N3 fiches 37-39 résumées), tables MN90 détaillées (lecture de tableaux), annexes (recycleurs, lacs d’altitude, photo, dictionnaire).
4. Idées : mode sombre/clair, sons, rappel quotidien, export de la progression.

## Décisions
- Pas de Firebase ni de compte : tout reste sur le téléphone.
- Les choix QCM sont mélangés à l’affichage, pas dans les données.
- Le garde-fou du poste (hook) impose une seconde tentative à la première création de chaque fichier avec l’outil d’écriture.
- Un fichier long écrit via le shell peut échouer à cause des apostrophes droites : utiliser l’outil d’écriture ou des apostrophes typographiques.

## Test sur téléphone (2026-10-09/27)
- Le mode réseau local échoue sur l’iPhone (« Could not connect to the server ») : pare-feu Windows ou réseau Wi-Fi.
- Solution : mode tunnel (`npx expo start --tunnel --port 8082`), outil `@expo/ngrok` ajouté aux dépendances de développement.
- Résultat du test dans Expo Go : pas encore confirmé par l’utilisateur.
