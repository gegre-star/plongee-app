import { fiche, qcm, vf } from '../build';
import type { Module } from '../types';

/** N3 — 2e partie, UL 6 : connaissance du monde subaquatique (fiches 32 à 41). */
export const n3Ul6: Module = {
  id: 'n3-ul6',
  level: 'N3',
  code: 'UL 6',
  title: 'La vie sous l’eau',
  fiches: [
    fiche('N3', 32, 'L’eau et l’air', [
      'L’eau est un bon solvant : la vie y est apparue. Elle contient environ 30 fois moins d’oxygène dissous que l’air (0,7 % contre 21 %).',
      'Plus l’eau est froide, plus elle contient d’oxygène : les eaux froides sont plus riches que les eaux chaudes.',
      'L’eau est environ 50 fois plus visqueuse que l’air : les animaux ont adapté leur respiration.',
      'Filtreurs passifs (gorgones, coraux, vers) : vivent là où il y a du courant. Filtreurs actifs (éponges, ascidies, rose de mer, dentelle de Neptune) : ils créent eux-mêmes un courant d’eau.',
    ], [
      qcm('Combien l’eau contient-elle d’oxygène dissous par rapport à l’air ?', ['À peu près autant', 'Environ 30 fois moins', 'Environ 30 fois plus', '2 fois plus'], 1,
        'L’eau n’en contient que 0,7 % contre environ 21 % dans l’air.'),
      qcm('Quelles eaux contiennent le plus d’oxygène dissous ?', ['Les eaux chaudes', 'Les eaux froides', 'Toutes pareilles', 'Les eaux douces uniquement'], 1,
        'Contrairement à une idée reçue : les eaux froides sont beaucoup plus riches que les eaux chaudes.'),
      qcm('Les gorgones sont…', ['Des filtreurs passifs, rencontrés dans le courant', 'Des prédateurs', 'Des filtreurs actifs', 'Des brouteurs'], 0,
        'Les éponges contiennent des flagelles qui assurent la circulation de l’eau : ce sont des filtreurs actifs.'),
    ]),

    fiche('N3', 33, 'Respirer sous l’eau', [
      'Sans organes respiratoires, on respire par diffusion de l’oxygène à travers les membranes : méduses, coraux, éponges, gorgones, vers plats (petits animaux ou faibles besoins).',
      'Avec organes respiratoires (branchies) : poissons, mollusques, crustacés, tuniciers.',
      'Thons et maquereaux nagent bouche ouverte pour faire passer l’eau en continu sur les branchies ; la plupart des poissons osseux pompent l’eau par la bouche et la rejettent par les opercules.',
    ], [
      qcm('Comment respirent les méduses et les coraux ?', ['Par des poumons', 'Par diffusion', 'Par des branchies', 'Par des opercules'], 1,
        'La diffusion ne s’avère efficace que pour de petits animaux ou des animaux à faibles besoins énergétiques.'),
      qcm('Pourquoi le thon nage-t-il en permanence la bouche ouverte ?', ['Pour chasser', 'Pour faire passer l’eau en flux continu sur ses branchies', 'Pour dormir', 'Par habitude'], 1,
        'Certaines espèces passent du pompage au flux continu quand elles accélèrent.'),
    ]),

    fiche('N3', 34, 'Se nourrir', [
      'La nourriture conditionne la localisation des espèces : trouver le plancton, c’est trouver les raies manta et les requins-baleines.',
      'Trois types d’alimentation : symbiose avec des algues microscopiques (éponges, coraux), absorption de petites particules (plancton), absorption de grosses particules ou de proies.',
      'Blanchiment du corail : le corail expulse ses algues nourricières (hausse de température, maladie, salinité) ; s’il ne les retrouve pas vite, il meurt.',
      'Le phytoplancton assure 90 % de la production primaire des océans ; le zooplancton est composé à 70 % de copépodes.',
      'Les plus belles plongées concentrent beaucoup d’espèces sur une surface réduite : roches isolées, épaves.',
    ], [
      qcm('Qu’est-ce que le blanchiment du corail ?', ['Un vieillissement normal', 'L’expulsion des algues symbiotiques qui le nourrissent et lui donnent ses couleurs', 'Une maladie des plongeurs', 'Un excès de lumière uniquement'], 1,
        'Hausse de température, maladie ou changement brusque de salinité peuvent le provoquer.'),
      qcm('Où trouver une grande diversité d’espèces sur une surface réduite ?', ['Sur une longue côte rocheuse', 'Sur une roche isolée ou une épave', 'Au-dessus du sable', 'En pleine eau'], 1,
        'Toute la faune alentour s’y concentre, et ne peut pas fuir avant d’être aperçue.'),
      vf('Le phytoplancton représente 90 % de la production primaire des océans.', true,
        'Le zooplancton se nourrit de phytoplancton ; il est composé à 70 % de petits crustacés, les copépodes.'),
    ]),

    fiche('N3', 35, 'Flotter', [
      'Pour se maintenir en pleine eau sans nager, il faut une densité proche de celle de l’eau. Quatre moyens : réduire les substances lourdes, modifier la composition ionique, utiliser huiles ou graisses, disposer de flotteurs à gaz.',
      'Squelette peu dense : chitine du calmar, squelette cartilagineux des requins et des raies.',
      'Les requins ont un foie de grande taille rempli d’huile (squalène, hydrocarbure de faible densité).',
      'Flotteurs à gaz : vessie natatoire des poissons ; ballon des physalies ; os de seiche, rempli d’azote à 0,8 bar (limite d’environ 200 m).',
    ], [
      qcm('Comment un requin assure-t-il sa flottabilité ?', ['Avec une vessie natatoire', 'Avec un foie volumineux rempli d’huile (squalène)', 'Avec un os rempli d’azote', 'En nageant à l’envers'], 1,
        'Le squalène est un hydrocarbure de densité faible qui assure une bien plus grande flottabilité que les autres huiles.'),
      qcm('Où se trouve le flotteur d’une seiche ?', ['Dans le foie', 'Dans l’os de seiche, rempli d’azote', 'Dans la peau', 'Dans les tentacules'], 1,
        'Rigide, il doit résister à la pression : d’où une limite d’évolution des seiches à environ 200 m.'),
      vf('Les poissons vivant sur le fond ont généralement besoin d’une vessie natatoire.', false,
        'Ceux qui vivent sur le fond n’ont pas besoin d’un tel dispositif (exemple : la rascasse).'),
    ]),

    fiche('N3', 36, 'La classification des espèces', [
      'Carl von Linné (naturaliste suédois) établit en 1758 une classification globale pour donner un nom unique à chaque organisme.',
      'Sept catégories, de la plus petite à la plus grande : espèce, genre, famille, ordre, classe, embranchement, règne.',
      'Nom scientifique en latin, en italique, en deux parties : genre (majuscule) puis espèce (minuscule) ; exemple : Sparus aurata (dorade royale).',
      'Un nom vernaculaire est un nom commun ; la taxinomie est la science qui décrit, nomme et classe les organismes.',
    ], [
      qcm('Qui a posé les bases de la classification moderne en 1758 ?', ['Cousteau', 'Linné', 'Haldane', 'Archimède'], 1,
        'Son objectif : attribuer un nom unique à chaque organisme vivant.'),
      qcm('Dans le nom Sparus aurata, que représente « Sparus » ?', ['L’espèce', 'Le genre', 'La famille', 'Le règne'], 1,
        'Le genre prend une majuscule, l’espèce une minuscule ; le nom s’écrit en italique.'),
      qcm('Quelle catégorie est la plus large ?', ['L’espèce', 'La famille', 'Le règne', 'Le genre'], 2,
        'Espèce → genre → famille → ordre → classe → embranchement → règne.'),
    ]),

    fiche('N3', 37, 'Règne végétal', [
      'Environ 40 000 espèces d’algues et quelques plantes sous-marines. Algues et plantes font la photosynthèse.',
      'Les algues n’ont ni tige, ni feuille, ni fleur, ni racine : le « stipe » ressemble à une tige, le « crampon » sert seulement à s’accrocher.',
      'Elles absorbent eau et nutriments par tous leurs tissus. Les laminaires peuvent mesurer plusieurs mètres.',
      'Le phytoplancton est un « puits de carbone » ; on distingue les algues rouges, vertes et brunes.',
    ], [
      qcm('À quoi sert le crampon d’une algue ?', ['À absorber les nutriments', 'À s’agripper au rocher', 'À faire la photosynthèse', 'À se reproduire'], 1,
        'Contrairement à une racine, il ne sert pas à l’alimentation.'),
      qcm('Combien d’espèces d’algues environ ?', ['4 000', '40 000', '400 000', '4 millions'], 1,
        'Plus quelques plantes à fleurs sous-marines.'),
    ]),

    fiche('N3', 38, 'Règne animal : les invertébrés', [
      'Environ 200 000 espèces d’invertébrés. Éponges : êtres rudimentaires, enveloppe percée de trous qui filtrent l’eau.',
      'Cnidaires (« animaux-orties ») : hydraires, méduses, gorgones, pennatules, anémones, alcyonaires (coraux mous), coraux durs (madréporaires).',
      'Crustacés : environ 30 000 espèces, corps recouvert d’une croûte (homards, crabes, crevettes).',
      'Mollusques : 75 000 espèces dont plus de 60 000 gastéropodes, 14 000 bivalves et 600 céphalopodes (poulpes, seiches, calmars).',
      'Les nudibranches sont des limaces de mer (« branchies à nu ») aux couleurs éclatantes.',
    ], [
      qcm('Que signifie « cnidaires » en langage courant ?', ['Animaux-orties', 'Animaux-pierres', 'Animaux à coquille', 'Animaux cartilagineux'], 0,
        'Méduses, anémones, gorgones, coraux… possèdent des cellules urticantes.'),
      qcm('Quel groupe de mollusques est le plus nombreux ?', ['Les gastéropodes', 'Les bivalves', 'Les céphalopodes', 'Les crustacés'], 0,
        'Plus de 60 000 gastéropodes sur 75 000 espèces de mollusques.'),
      qcm('Les poulpes, seiches et calmars sont des…', ['Bivalves', 'Gastéropodes', 'Céphalopodes', 'Crustacés'], 2,
        'Environ 600 espèces de céphalopodes.'),
    ]),

    fiche('N3', 39, 'Règne animal : les vertébrés', [
      'Poissons cartilagineux (requins, raies) : 5 à 7 fentes branchiales, sur les côtés (requins) ou sous le ventre (raies). Environ 375 espèces de requins, 450 de raies.',
      'Beaucoup de requins sont menacés par la surpêche, notamment pour le commerce des ailerons.',
      'Poissons osseux : très grand nombre d’espèces, tempérées (sars, dorades, mérous…) et tropicales (poissons-perroquets, chirurgiens, papillons…).',
      'Cétacés : environ 78 espèces, mammifères vivant toute leur vie dans l’eau, température interne d’environ 36 °C.',
    ], [
      qcm('Où s’ouvrent les fentes branchiales des raies ?', ['Sur les côtés', 'Sur la face ventrale', 'Sur le dos', 'Elles n’en ont pas'], 1,
        'Chez les requins, les fentes sont sur les côtés.'),
      qcm('Quelle est la principale menace pour de nombreuses espèces de requins ?', ['Le froid', 'La surpêche, notamment pour le commerce des ailerons', 'Les plongeurs', 'La pollution lumineuse'], 1,
        'Environ 375 espèces de requins, dont beaucoup menacées de disparition.'),
      vf('Les cétacés sont des poissons.', false,
        'Ce sont des mammifères, vivant toute leur vie dans l’eau, à température interne constante.'),
    ]),

    fiche('N3', 40, 'Approche des espèces sous-marines', [
      'Les poissons perçoivent par la ligne latérale : on évite de s’interposer entre le poisson et le courant.',
      'Silence et immobilité : respiration réduite par de courtes apnées ; laisser la curiosité des poissons les amener.',
      'Ne pas « couper » la lumière : l’ombre effraie ; éteindre la lampe pendant l’approche.',
      'Bancs : approche très progressive ; certaines espèces suivent des trajectoires qu’on peut repérer.',
    ], [
      qcm('Pourquoi ne faut-il pas s’interposer entre le poisson et le courant ?', ['Il se sent bloqué', 'Sa ligne latérale détecte aussitôt l’intrusion', 'Il est aveugle', 'Il a peur du bruit'], 1,
        'Faire face au courant permet d’être détecté plus difficilement.'),
      qcm('Comment approcher un poisson ?', ['Rapidement', 'En restant immobile et silencieux, en le laissant venir', 'Avec une lampe allumée', 'En le poursuivant'], 1,
        'Bruits et gestes brusques font fuir les poissons.'),
    ]),

    fiche('N3', 41, 'Protéger la nature', [
      'Il n’y a qu’une seule eau sur la planète ; tout finit à la mer : chacun a un impact sur le milieu marin.',
      'Causes de dégradation : destruction des habitats, prélèvements excessifs, espèces introduites, rejets (plastiques, produits chimiques).',
      'Plastiques : 100 à 1 000 ans pour se dégrader ; les microplastiques concentrent des produits toxiques qui remontent la chaîne alimentaire.',
      'Les animaux marins sont des sentinelles : protéger les océans, c’est se protéger soi-même.',
      'Charte internationale du plongeur responsable (Longitude 181 Nature).',
    ], [
      qcm('Combien de temps mettent les plastiques à se dégrader ?', ['Quelques jours', 'Quelques mois', '100 à 1 000 ans', 'Ils ne se dégradent jamais'], 2,
        'Certains forment des microplastiques ayant l’apparence de plancton.'),
      vf('Un plongeur vivant loin de la côte n’a aucun impact sur l’océan.', false,
        'Il n’y a qu’une seule eau sur la planète : tout finit dans l’océan.'),
    ]),
  ],
};
