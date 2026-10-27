// Construit la version web installable (dossier dist/).
//   npm run build:web                      -> à la racine d’un site
//   EXPO_BASE_URL=/plongee-app npm run build:web   -> dans un sous-dossier (GitHub Pages)
import { execSync } from 'node:child_process';
import { copyFileSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const base = (process.env.EXPO_BASE_URL ?? '').replace(/\/$/, '');

rmSync('dist', { recursive: true, force: true });
execSync('npx expo export --platform web --output-dir dist', {
  stdio: 'inherit',
  env: { ...process.env, EXPO_BASE_URL: base },
});

// Expo ne remplit pas le marqueur de l’adresse dans le modèle : on le fait ici.
const file = 'dist/index.html';
const html = readFileSync(file, 'utf8').replaceAll('%EXPO_BASE_URL%', base);
writeFileSync(file, html);

// Liste de tous les fichiers de l’application, pour que le service worker les mette
// en mémoire dès la première visite (sinon le hors ligne ne marche qu’à la deuxième).
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
const skip = new Set(['sw.js', '404.html', 'index.html', 'metadata.json']);
const files = walk('dist')
  .map((f) => relative('dist', f).replaceAll(sep, '/'))
  .filter((f) => !skip.has(f))
  .map((f) => './' + f);
const build = Date.now().toString(36);
const sw = readFileSync('dist/sw.js', 'utf8')
  .replace('__BUILD__', build)
  .replace('__PRECACHE__', JSON.stringify(files));
writeFileSync('dist/sw.js', sw);
console.log(`Service worker : ${files.length} fichiers mis en mémoire (version ${build})`);

// GitHub Pages sert 404.html pour une adresse inconnue : même page, l’application prend le relais.
copyFileSync(file, 'dist/404.html');
console.log(`Version web prête dans dist/ (adresse de base : "${base || '/'}")`);
