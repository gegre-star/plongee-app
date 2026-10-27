// Lit app.json et, pour la version web publiée sur GitHub Pages, ajoute le
// sous-dossier du site (EXPO_BASE_URL, ex. « /plongee-app »). En local, rien ne change.
const base = require('./app.json');

module.exports = () => {
  const baseUrl = process.env.EXPO_BASE_URL;
  if (!baseUrl) return base.expo;
  return { ...base.expo, experiments: { ...(base.expo.experiments ?? {}), baseUrl } };
};
