import { fiche, qcm, vf } from '../build';
import type { Module } from '../types';

/** N2 — 2e partie : le monde subaquatique (extraits : fiches 45, 46, 53 et 54). */
export const n2Monde: Module = {
  id: 'n2-monde',
  level: 'N2',
  code: 'Monde',
  title: 'Le monde subaquatique',
  fiches: [
    fiche('N2', 45, 'Les océans', [
      'Les océans recouvrent plus de 70 % de la surface de la planète, sur une profondeur moyenne de près de 4 000 m ; ils hébergent plus de 250 000 espèces animales.',
      'Ce sont les océans, et non les forêts, qui renouvellent l’oxygène de l’atmosphère, grâce surtout au microphytoplancton ; l’atmosphère reste à environ 21 % d’oxygène.',
      'Zones de profondeur : plateau continental (0 à 200 m), talus continental (200 à 3 000 m), plaines abyssales (3 000 à 6 000 m), fosses (6 000 à 11 000 m).',
      'Le plateau continental reçoit le plus de lumière : c’est la zone la plus riche en vie. La fosse des Mariannes est le point le plus profond (−11 033 m).',
      'Domaine pélagique : la pleine eau (barracuda, méduse). Domaine benthique : le fond (rascasse, anémone).',
      'La lumière, absorbée par l’eau, explique le foisonnement de vie entre la surface et 20 à 30 m (photosynthèse).',
      'Températures : en Méditerranée 10 à 26 °C ; eaux polaires environ −1 °C ; eaux tropicales 24 à 28 °C ; au-delà de 1 000 m, environ 4 °C.',
      'La thermocline est la zone intermédiaire où l’eau chaude côtoie l’eau froide.',
    ], [
      qcm('Qui assure principalement le renouvellement de l’oxygène de l’atmosphère ?', ['Les forêts tropicales', 'Les océans, grâce surtout aux algues microscopiques', 'Les volcans', 'Les glaciers'], 1,
        'Les forêts consomment à peu près autant d’oxygène qu’elles en produisent ; les océans, par le microphytoplancton, sont de véritables usines à oxygène.'),
      qcm('Quelle est la profondeur du plateau continental ?', ['0 à 200 m', '200 à 3 000 m', '3 000 à 6 000 m', '6 000 à 11 000 m'], 0,
        'Le plateau continental, ou littoral, est la zone la plus éclairée donc la plus riche en vie.'),
      qcm('Qu’est-ce que le domaine pélagique ?', ['Le fond des océans', 'La pleine eau', 'Le rivage', 'Les récifs'], 1,
        'Le domaine benthique désigne le fond ; le pélagique, la pleine eau.'),
      qcm('Qu’appelle-t-on thermocline ?', ['Un courant chaud', 'La zone intermédiaire entre eaux chaudes et eaux froides', 'Une marée', 'Un récif'], 1,
        'Les eaux de température différente se mélangent difficilement : on peut sentir une variation brusque de plusieurs degrés en plongée.'),
      vf('Plus de 70 % de la surface de la planète est recouverte par les océans.', true,
        'La planète « Terre » porte bien mal son nom : l’eau de mer en couvre plus de 70 %.'),
    ]),

    fiche('N2', 46, 'La planète Eau', [
      'Les vagues sont créées par le vent ; leur influence s’estompe dès la zone des 3 à 5 m, d’où l’intérêt de s’immerger vite par mer agitée.',
      'La houle est un mouvement ondulatoire qui persiste quand le vent a disparu ; elle peut se faire sentir à plus de 40 m.',
      'Courants océaniques : vents et rotation de la Terre. Courants de marée : près des côtes et dans les détroits.',
      'L’étale est la période où le niveau de la mer reste stable : peu ou pas de courant, moment généralement choisi pour plonger.',
      'Le sel des océans vient de l’eau douce des fleuves, qui en contient toujours un peu.',
      'Les poissons osseux flottent grâce à la vessie natatoire ; le requin grâce à son foie rempli d’huile.',
      'Les poissons sont à sang froid : leur température suit celle du milieu, d’où des espèces différentes selon les mers.',
      'Les branchies captent l’oxygène de l’eau ; elles servent aussi à éliminer une partie du sel.',
    ], [
      qcm('Comment se créent les vagues ?', ['Par la marée', 'Par le vent', 'Par la rotation de la Terre', 'Par les séismes'], 1,
        'Leur importance dépend de la force du vent, de la distance et de la durée pendant laquelle il s’applique.'),
      qcm('Quand le courant de marée est-il généralement le plus faible ?', ['À la renverse', 'À l’étale', 'À marée haute uniquement', 'La nuit'], 1,
        'L’étale est le moment où le niveau de la mer reste stable : c’est généralement le moment choisi pour plonger.'),
      qcm('Comment un poisson osseux se maintient-il entre deux eaux ?', ['Avec une vessie natatoire', 'Avec ses nageoires uniquement', 'Avec du lest', 'Il ne se maintient pas'], 0,
        'Chez le requin, c’est un foie de grande taille, rempli d’huile, qui joue ce rôle.'),
      vf('Les poissons sont des animaux à sang chaud.', false,
        'Ils ont le sang froid : la température de leur corps est celle de leur environnement, ce qui explique la distribution des espèces.'),
      qcm('Pourquoi les poissons-clowns vivent-ils entre les tentacules des anémones ?', ['Pour se nourrir de leur venin', 'Pour se protéger des prédateurs, étant insensibles à leur venin', 'Pour pondre uniquement', 'Par hasard'], 1,
        'C’est un mutualisme : le poisson-clown est protégé par l’anémone.'),
    ]),

    fiche('N2', 53, 'Approche des espèces subaquatiques', [
      'Règle 1 : ni bruit ni mouvement brusque. Rester immobile, faire de courtes apnées, ne jamais aller vers les poissons : laisser leur curiosité les amener.',
      'Règle 2 : ne pas s’interposer entre le poisson et le courant — la ligne latérale détecte aussitôt l’intrusion. Si possible, faire face au courant.',
      'Règle 3 : ne pas s’interposer entre la lumière et le poisson — son ombre l’effraie. Éteindre sa lampe pendant les phases d’approche.',
      'Pour les poissons qui vivent en bancs (barracudas, carangues, lutjans, platax), approcher progressivement, avec des apnées répétées.',
      'Certaines espèces suivent toujours le même parcours : on peut les observer en repérant leur trajectoire.',
    ], [
      qcm('Comment approcher les poissons ?', [
        'Les poursuivre aux palmes',
        'Rester immobile, limiter le bruit de la respiration et laisser leur curiosité les amener',
        'Les nourrir',
        'Les entourer à plusieurs plongeurs',
      ], 1, 'Bruits et mouvements brusques font fuir les poissons ; tenter de les rattraper accélère leur fuite.'),
      qcm('Pourquoi faut-il éviter de s’interposer entre le courant et un poisson ?', ['À cause de sa ligne latérale, très sensible, qui détecte l’intrusion', 'Parce qu’il est aveugle', 'Parce qu’il dort', 'Parce qu’il mord'], 0,
        'La ligne latérale permet une détection immédiate de cette intrusion.'),
      vf('Nager avec une lampe allumée alerte les poissons avant même de les voir.', true,
        'Il faut penser à éteindre sa lampe dans les phases d’approche : les poissons sont sensibles aux variations de luminosité.'),
      qcm('Comment approcher un banc de poissons en pleine eau ?', ['En fonçant dedans', 'De manière très progressive, avec une respiration faite d’apnées répétées', 'Avec une lampe', 'En produisant du bruit'], 1,
        'On peut aussi profiter du mouvement naturel de la houle, ou approcher par-dessous avec une parfaite maîtrise de son équilibre.'),
    ]),

    fiche('N2', 54, 'Protéger la nature', [
      'Une seule eau sur la planète : l’eau douce représente moins de 3 % du total, et tout finit à la mer ; chacun a un impact sur le milieu marin.',
      'Causes de dégradation : destruction mécanique des habitats, prélèvements excessifs, introduction d’espèces étrangères (Caulerpa taxifolia), rejets (plastiques, produits chimiques).',
      'Les plastiques mettent 100 à 1 000 ans à se dégrader ; certains forment des microplastiques qui piègent des produits toxiques remontant la chaîne alimentaire.',
      'Jean-Michel Cousteau cite trois problèmes : l’océan traité en poubelle, la destruction des habitats côtiers, la surpêche.',
      'Les animaux marins sont des sentinelles : ce qui leur arrive nous arrivera. Protéger les océans, c’est nous protéger nous-mêmes.',
    ], [
      qcm('Quelle part de l’eau de la planète représente l’eau douce ?', ['Moins de 3 %', 'Environ 25 %', 'Environ 50 %', 'Plus de 70 %'], 0,
        'Il n’y a qu’une seule eau sur la planète : de la neige aux fleuves, tout finit dans l’océan.'),
      qcm('Qu’est-ce que Caulerpa taxifolia en Méditerranée ?', ['Une espèce protégée', 'Une espèce étrangère introduite', 'Un coquillage', 'Un type de plastique'], 1,
        'L’introduction d’espèces étrangères figure parmi les principales causes de dégradation de la nature.'),
      qcm('Pourquoi les microplastiques sont-ils préoccupants ?', [
        'Ils sont visibles de loin',
        'Ils ont l’apparence de plancton et concentrent des produits chimiques qui remontent la chaîne alimentaire',
        'Ils se dégradent en quelques jours',
        'Ils sont comestibles',
      ], 1, 'Les animaux ingérant ces substances absorbent des concentrés de produits toxiques.'),
      vf('Quand on vit loin des côtes, on n’a aucun impact sur le milieu marin.', false,
        'Que nous vivions à l’intérieur des terres ou au bord des côtes, nous avons tous un impact sur le milieu marin.'),
    ]),
  ],
};
