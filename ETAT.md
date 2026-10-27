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
- Projet passé en SDK Expo 58 (react 19.3.0, react-native 0.88.0) : l’Expo Go de l’App Store ne suit que le SDK le plus récent, et se fermait aussitôt avec le SDK 54.

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

- Piège installation : `npm install --legacy-peer-deps` saute les dépendances de expo-router (expo-constants, expo-linking) ; vérifier avec `npx expo export --platform ios`.

## Installation comme application (préparée le 2026-10-27, rien n'est publié)
- Icônes générées (`npm run icons`), nom et identifiants dans `app.json` (`fr.gouin.plongeen2n3`), `app.config.js` pour l'adresse de base du site.
- Version web installable : `npm run build:web` ; service worker qui met 33 fichiers en mémoire dès la première visite ; hors ligne vérifié dans Chrome (serveur coupé, accueil affiché).
- Publication automatique prévue : `.github/workflows/deploy-web.yml` (GitHub Pages) + `ci.yml` copié de Lotus Chess. Branche renommée `main`.
- `eas.json` prêt pour une vraie application (compte Apple Developer payant nécessaire pour iPhone).
- Reste à faire par l'utilisateur : créer le dépôt GitHub, autoriser l'envoi (push), activer Pages (Source : GitHub Actions), puis ajouter à l'écran d'accueil depuis Safari.
- Le navigateur intégré à l'appli Claude bloque les service workers : tester le hors ligne dans un vrai Chrome.

## Dépôt GitHub (2026-10-27)
- Dépôt privé `gegre-star/plongee-app` ; les manuels `sources/` ne sont PAS envoyés (droit d'auteur) : retirés de l'historique, dossier ignoré par git. Copies des manuels : `Documents/plongee/n2.md` et `n3.md`.
- Sauvegarde de l'ancien historique (avec manuels) : `GIT/plongee-app-sauvegarde-avant-github.bundle` (ne jamais l'envoyer sur GitHub).
- GitHub Pages inutilisable en privé : `deploy-web.yml` est en lancement manuel ; héberger `dist/` sur Netlify ou Cloudflare Pages, ou passer le dépôt en public.
