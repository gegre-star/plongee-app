# Plongée N2 / N3

Application mobile de révision pour les niveaux 2 et 3 de plongée, entièrement hors ligne.
Tout le contenu vient des deux manuels Plongée Plaisir (N2 et N3). Ces livres sont protégés : ils restent sur l’ordinateur dans `sources/` (dossier ignoré par git, jamais envoyé sur GitHub).

## Lancer sur un téléphone

Il faut Node.js 22 ou plus sur l’ordinateur et l’application Expo Go sur le téléphone, tous deux sur le même Wi‑Fi.

```bash
npm install
npx expo start
```

Scanner le QR code avec l’appareil photo (iPhone) ou avec Expo Go (Android).
Si le QR code ne fonctionne pas : `npx expo start --tunnel`.

## Installer comme une application (iPhone / Android)

Deux voies. La première est gratuite et suffit pour réviser ; la seconde donne une vraie application mais demande un compte payant.

### Voie 1 : application web installable (gratuite, recommandée)

L’application est publiée comme un site web que l’on « installe » sur l’écran d’accueil. Après la première visite, elle s’ouvre sans connexion.

1. Le dépôt GitHub est `gegre-star/plongee-app` (public). À chaque envoi sur `main`, GitHub vérifie le code (`ci.yml`) puis publie le site (`deploy-web.yml`) sur GitHub Pages.
2. Adresse du site : **https://gegre-star.github.io/plongee-app/**
3. Réglage unique déjà fait : **Settings → Pages → Source : GitHub Actions**.
4. Sur l’iPhone, ouvrir cette adresse dans **Safari** → bouton **Partager** → **Sur l’écran d’accueil** → **Ajouter**.
5. Ouvrir une fois l’application avec du réseau (le temps du chargement), puis elle fonctionne hors ligne.

Pour tester la version web en local : `npm run build:web`, puis servir le dossier `dist/`.

### Voie 2 : vraie application iOS / Android (EAS Build)

Il faut un compte Expo (gratuit) et, pour l’iPhone, l’Apple Developer Program (99 € par an). La configuration est prête (`eas.json`, identifiants dans `app.json`).

```bash
npm install -g eas-cli
eas login
eas build --platform ios --profile production
eas submit --platform ios
```

Pour Android, `eas build --platform android --profile preview` produit un fichier `.apk` à installer directement.

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
| `assets/` | Icônes et écran de démarrage (générés par `npm run icons`) |
| `public/` | Version web : page, manifeste, service worker (mode hors ligne) |
| `scripts/` | Construction de la version web et des icônes |
| `.github/workflows/` | Vérification automatique et publication sur GitHub Pages |

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
