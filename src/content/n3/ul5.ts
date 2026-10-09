import { fiche, qcm, vf } from '../build';
import type { Module } from '../types';

/** N3 — UL 5 : les acteurs de la plongée (fiches 25 à 31 du manuel). */
export const n3Ul5: Module = {
  id: 'n3-ul5',
  level: 'N3',
  code: 'UL 5',
  title: 'Les acteurs de la plongée',
  fiches: [
    fiche('N3', 25, 'La plongée de loisir en France', [
      'Acteurs : ministère chargé des Sports, fédérations (FFESSM, FSGT), syndicats professionnels (ANMP, SNMP, SNEPL, SMPS) et UCPA.',
      'Le ministère assure le développement de la plongée, propose des lois, promulgue décrets et arrêtés, apporte une aide humaine, technique et financière, organise les examens de moniteurs.',
      'Il a délégué une partie de ses missions à la FFESSM (fédération délégataire).',
      'Le CNOSF a créé en 2009 le Conseil interfédéral des activités à environnement spécifique (plongée, ski, alpinisme, canoë-kayak…).',
    ], [
      qcm('Qui exerce la tutelle de la plongée de loisir en France ?', ['Le ministère chargé des Sports', 'La Marine nationale', 'La CMAS', 'Les syndicats'], 0,
        'Il a délégué une partie de ses missions à la FFESSM.'),
      qcm('En quelle année le CNOSF a-t-il créé le Conseil interfédéral des activités à environnement spécifique ?', ['1948', '1982', '2009', '2018'], 2,
        'Pour institutionnaliser une collaboration entre fédérations (plongée, ski, alpinisme, canoë-kayak…).'),
      vf('Le ministère chargé des Sports organise les examens des moniteurs.', true,
        'En plus de proposer des lois et de veiller aux garanties de sécurité offertes aux pratiquants.'),
    ]),

    fiche('N3', 26, 'Les fédérations', [
      'Siège national et organes déconcentrés (régionaux, interrégionaux, départementaux) ; commissions spécialisées par domaine d’activité.',
      'Elles regroupent des clubs associatifs affiliés et des structures commerciales agréées qui délivrent licences et diplômes fédéraux.',
      'Club associatif : une voix par membre pour élire le comité directeur (président, trésorier, secrétaire au minimum). Structure commerciale : le dirigeant est le représentant légal.',
      'Les votes fédéraux sont proportionnels au nombre de licences, avec une prépondérance aux membres associatifs.',
      'Deux fédérations délivrent des diplômes de plongée : FFESSM et FSGT.',
    ], [
      qcm('Qui élit le comité directeur d’un club associatif ?', ['Le président seul', 'Chaque membre, à raison d’une voix', 'Le ministère', 'La fédération'], 1,
        'Dans les structures commerciales, ce vote n’existe pas puisque le représentant légal est le dirigeant.'),
      qcm('Quelles sont les deux fédérations françaises délivrant des diplômes de plongée ?', ['FFESSM et FSGT', 'PADI et NAUI', 'ANMP et SNMP', 'CMAS et SSI'], 0,
        'La FFESSM est l’interlocuteur privilégié du ministère ; la FSGT n’est pas spécialisée en plongée.'),
      qcm('Qui a une prépondérance dans les votes fédéraux ?', ['Les structures commerciales', 'Les membres associatifs', 'Les syndicats', 'Les assureurs'], 1,
        'Le vote est proportionnel au nombre de licences, mais avec prépondérance aux membres associatifs.'),
    ]),

    fiche('N3', 27, 'La FFESSM : fédération délégataire', [
      'Créée en 1948, nom actuel en 1955, membre fondateur de la CMAS en 1959, siège à Marseille.',
      'Plus de 150 000 licenciés, environ 6 000 moniteurs, plus de 2 200 clubs et 400 structures commerciales agréées.',
      'Mission de service public déléguée par le ministère ; seule habilitée à délivrer les titres de champion. L’État lui apporte subventions, CTS et DTN.',
      'Assemblée générale au moins une fois par an ; président, Comité directeur national et bureau ; élections tous les 4 ans après les Jeux olympiques d’été.',
      'Structures commerciales agréées : limitées à 10 % des voix.',
      'Licence : valable un peu plus de 15 mois (15 septembre au 31 décembre de l’année suivante) ; certificat médical de moins d’un an ; une seule licence par année sportive ; assurance valable dans le monde entier.',
      'Les commissions (archéologie, audiovisuelle, biologie, juridique, médicale et de prévention, technique…) sont consultatives et sans personnalité juridique.',
    ], [
      qcm('Que permet la licence FFESSM ?', [
        'Seulement de plonger',
        'Suivre les formations, passer des brevets, participer aux activités fédérales et bénéficier d’un contrat d’assurance',
        'D’être directeur de plongée',
        'D’acheter du matériel moins cher',
      ], 1, 'Elle donne accès à un contrat d’assurance valable dans le monde entier (RC, protection juridique, individuelle, rapatriement).'),
      qcm('Quel pourcentage des voix est attribué aux structures commerciales agréées ?', ['10 % au plus', '50 %', '75 %', '100 %'], 0,
        'Les clubs associatifs gardent la prépondérance.'),
      vf('On peut avoir deux licences FFESSM la même année sportive.', false,
        'On peut adhérer à plusieurs clubs, mais un seul délivre la licence.'),
      qcm('Les commissions de la FFESSM ont un rôle…', ['Décisionnaire', 'Consultatif', 'Juridique', 'Financier'], 1,
        'Elles préparent les décisions mais seul le Comité directeur peut les rendre exécutoires.'),
    ]),

    fiche('N3', 28, 'La FSGT', [
      'Créée en 1934 par la fusion d’organisations sportives du monde du travail, à partir du sport ouvrier fondé en 1908.',
      'Plongée : premier club en 1948 à Marseille, premier stage de cadres en 1968, brevets reconnus en 1982.',
      '260 000 pratiquants, 4 600 clubs, 70 comités départementaux, environ 75 activités sportives.',
      'Licence annuelle omnisports (12 mois) et cartes « Accueil et découverte ». Elle délivre des cartes double face FSGT et CMAS.',
      'Formation fondée sur la formation continue, la valorisation de l’expérience et la mise en situation réelle.',
    ], [
      qcm('Depuis quand les brevets de plongée FSGT sont-ils reconnus ?', ['1934', '1948', '1982', '2009'], 2,
        'Reconnaissance officielle des brevets en 1982.'),
      qcm('La licence FSGT est…', ['Spécifique à la plongée', 'Omnisports', 'Réservée aux moniteurs', 'Gratuite'], 1,
        'La FSGT est une fédération multisports.'),
    ]),

    fiche('N3', 29, 'Les syndicats professionnels (ANMP, SNMP)', [
      'Organismes à but non lucratif : ils représentent la profession, défendent les intérêts de leurs membres et la promeuvent.',
      'ANMP (créée en 1972) : syndicat et agence de certification depuis 1991 (approche modulaire) ; environ 700 moniteurs titulaires du brevet d’État ; titre de « Guide de la Mer ».',
      'SNMP (créé à Paris en 1963, avec le BEMP) : syndicat et agence de certification depuis 1986.',
      'SNEPL (1998, devenu FNEAPL) : syndicat d’employeurs. SMPS-CGT (2008) : moniteurs salariés.',
      'Cinq organismes français sont habilités à délivrer leurs propres brevets de plongeur.',
    ], [
      qcm('Quel syndicat est aussi une agence de certification depuis 1991 ?', ['SMPS', 'SNEPL', 'ANMP', 'UCPA'], 2,
        'Reconnue dans le code du sport, l’ANMP délivre des brevets selon une approche modulaire.'),
      qcm('Quel syndicat regroupe des moniteurs salariés ?', ['SMPS-CGT', 'ANMP', 'SNEPL', 'SNMP'], 0,
        'Créé en 2008 ; le SNEPL regroupe des employeurs.'),
      vf('Les syndicats professionnels ont un but lucratif.', false,
        'Ce sont des organismes à but non lucratif.'),
    ]),

    fiche('N3', 30, 'La CMAS : agence internationale de certification', [
      'Confédération Mondiale des Activités Subaquatiques : fondée à Monaco par 15 pays, dont la France, le 10 janvier 1959.',
      'La CMAS ne délivre aucun diplôme : elle permet aux fédérations membres de délivrer des brevets à son label.',
      'Environ 3 millions de plongeurs actifs, 300 000 certifications par an (5 à 10 % des brevets mondiaux), reconnaissance mutuelle dans plus de 100 pays.',
      'Fédérations francophones membres : FFESSM, LIFRAS (Belgique), CMAS.CH (Suisse), FMAS (Monaco), etc.',
      'Équivalences : niveau 1 = 1 étoile, niveau 2 = 2 étoiles, niveau 3 = 3 étoiles CMAS.',
    ], [
      qcm('La CMAS délivre-t-elle elle-même des diplômes de plongée ?', ['Oui, tous', 'Non : elle permet aux fédérations de délivrer des brevets portant son label', 'Seulement les niveaux 1', 'Seulement les moniteurs'], 1,
        'Cela assure une reconnaissance mutuelle des niveaux de plongeur et de moniteur dans plus de 100 pays.'),
      qcm('Quelle est l’équivalence CMAS d’un niveau 3 ?', ['1 étoile', '2 étoiles', '3 étoiles', '4 étoiles'], 2,
        'Niveau 1 = CMAS 1*, niveau 2 = CMAS 2*, niveau 3 = CMAS 3*.'),
      qcm('En quelle année la CMAS a-t-elle été fondée ?', ['1948', '1959', '1982', '2009'], 1,
        '15 pays fondateurs, dont la France (FFESSM).'),
    ]),

    fiche('N3', 31, 'Autres agences internationales de certification', [
      'PADI : leader mondial, enseignement standardisé.',
      'SSI : école nord-américaine, supports diffusés par des revendeurs agréés.',
      'NAUI : organisation américaine, ancienne membre de la CMAS, qui a ses propres brevets.',
      'Ces brevets ne sont pas directement reconnus en France ; la réglementation permet de reconnaître des aptitudes (qualifications).',
    ], [
      qcm('Quelle agence est le leader mondial ?', ['PADI', 'NAUI', 'SSI', 'ANMP'], 0,
        'PADI standardise l’ensemble de ses cours et méthodes d’évaluation.'),
      qcm('Quelle agence américaine s’est retirée de la CMAS ?', ['NAUI', 'PADI', 'SSI', 'FSGT'], 0,
        'NAUI a mis en place ses propres brevets.'),
      vf('Les brevets étrangers permettent de reconnaître des aptitudes en France via des qualifications.', true,
        'La réglementation française permet la reconnaissance des aptitudes acquises avec des brevets non directement reconnus.'),
    ]),
  ],
};
