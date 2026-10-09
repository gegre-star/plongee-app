import { fiche, qcm, vf } from '../build';
import type { Module } from '../types';

/** N2 — UL 6 : organismes de certification (fiches 38 à 44 du manuel). */
export const n2Ul6: Module = {
  id: 'n2-ul6',
  level: 'N2',
  code: 'UL 6',
  title: 'Organismes de certification',
  fiches: [
    fiche('N2', 38, 'La plongée de loisir en France', [
      'Acteurs principaux : le ministère chargé des Sports, les fédérations (FFESSM, FSGT), les syndicats professionnels (ANMP, SNMP, FNEAPL, SMPS) et l’UCPA.',
      'Le ministère propose des lois, promulgue décrets et arrêtés, apporte une aide humaine, technique et financière, organise les examens de moniteurs.',
      'Il a délégué une partie de ses missions à la FFESSM : c’est une fédération délégataire.',
      'Le Conseil interfédéral des activités à environnement spécifique a été créé en 2009 par le CNOSF.',
    ], [
      qcm('Quelle autorité exerce la tutelle de la plongée de loisir en France ?', ['Le ministère chargé des Sports', 'Le ministère de la Mer', 'La Marine nationale', 'La CMAS'], 0,
        'La plongée est placée sous la tutelle du ministère chargé des Sports, qui a délégué une partie de ses missions à la FFESSM.'),
      qcm('Lesquelles de ces organisations sont des fédérations délivrant des diplômes de plongée ?', ['FFESSM et FSGT', 'ANMP et SNMP', 'PADI et SSI', 'CMAS et NAUI'], 0,
        'Deux fédérations délivrent des diplômes de plongée : la FFESSM et la FSGT.'),
      vf('Le ministère chargé des Sports organise des examens pour les moniteurs.', true,
        'C’est l’une de ses missions, en plus de proposer des lois et de garantir la sécurité des pratiquants.'),
    ]),

    fiche('N2', 39, 'Les fédérations', [
      'Toutes les fédérations ont un siège national et des organes déconcentrés (OD) régionaux, interrégionaux ou départementaux.',
      'Elles regroupent des clubs associatifs affiliés et des structures commerciales agréées, qui délivrent licences et diplômes.',
      'Dans un club associatif chaque membre a une voix pour élire un comité directeur (au minimum président, trésorier, secrétaire).',
      'Les votes sont proportionnels au nombre de licences, avec une prépondérance donnée aux membres associatifs.',
      'Les commissions spécialisées étudient un domaine d’activité (techniques, biologie, etc.).',
    ], [
      qcm('Quelle structure relaie localement les décisions nationales d’une fédération ?', ['Les organes déconcentrés', 'Les syndicats', 'La CMAS', 'Les assureurs'], 0,
        'Les organes déconcentrés relaient les décisions, remontent les besoins des clubs et représentent la fédération localement.'),
      qcm('Qui détient la prépondérance dans les votes fédéraux ?', ['Les structures commerciales', 'Les membres associatifs', 'Les moniteurs d’État', 'Les assureurs'], 1,
        'Le représentant de chaque structure vote proportionnellement au nombre de licences, avec une prépondérance accordée aux membres associatifs.'),
      qcm('Comment appelle-t-on les structures commerciales de plongée au sein de la FFESSM ?', ['Clubs associatifs', 'Structures commerciales agréées (SCA)', 'Comités départementaux', 'Commissions'], 1,
        'Les structures commerciales agréées proposent des prestations de plongée contre rémunération.'),
    ]),

    fiche('N2', 40, 'La FFESSM : fédération délégataire', [
      'Fédération Française d’Études et de Sports Sous-Marins : créée en 1948, nom actuel en 1955, siège à Marseille.',
      'Environ 150 000 licenciés, 6 000 moniteurs, 2 200 clubs et 400 structures commerciales agréées.',
      'Seule habilitée à délivrer les titres de champion dans les disciplines dont elle a la charge.',
      'Élections tous les 4 ans, dans les mois qui suivent les Jeux olympiques d’été ; l’Assemblée générale se réunit au moins une fois par an.',
      'Les structures commerciales agréées sont limitées à 10 % des voix.',
      'Licence : valable 15 mois environ (du 15 septembre au 31 décembre de l’année suivante), certificat médical de moins d’un an, autorisation parentale pour les mineurs, une seule licence par année sportive.',
      'Les commissions sont consultatives : seul le comité directeur rend leurs décisions exécutoires.',
    ], [
      qcm('En quelle année la FFESSM a-t-elle été créée ?', ['1934', '1948', '1959', '1982'], 1,
        'La FFESSM est créée en 1948 et prend son nom actuel en 1955.'),
      qcm('Quelle est la durée de validité d’une licence FFESSM ?', ['12 mois exactement', 'Un peu plus de 15 mois', '3 ans', '5 ans'], 1,
        'Du 15 septembre de l’année au 31 décembre de l’année suivante.'),
      qcm('Que faut-il fournir pour obtenir une licence FFESSM ?', [
        'Un certificat médical de non-contre-indication de moins d’un an',
        'Un brevet de niveau 2',
        'Une assurance vie',
        'Un livret de plongée',
      ], 0, 'Certificat médical de moins d’un an, paiement de la licence, et autorisation parentale pour les mineurs.'),
      vf('On peut détenir plusieurs licences FFESSM la même année sportive.', false,
        'Une seule licence FFESSM par année sportive est possible, même si l’on adhère à plusieurs clubs.'),
      qcm('Quel est le statut des commissions de la FFESSM ?', ['Elles décident seules', 'Ce sont des organes consultatifs', 'Ce sont des associations indépendantes', 'Elles votent le budget'], 1,
        'Elles préparent les programmes et les décisions, mais seul le comité directeur les rend exécutoires.'),
    ]),

    fiche('N2', 41, 'La FSGT', [
      'Fédération sportive et gymnique du travail : créée en 1934, fédération multisports (environ 75 activités).',
      'Ses brevets de plongée sont officiellement reconnus depuis 1982 ; premier club de plongée FSGT en 1948 à Marseille.',
      'Elle délivre une licence omnisports annuelle (12 mois) et des cartes « Accueil et découverte ».',
      'Elle délivre des cartes double face FSGT et CMAS.',
      'Sa politique de formation s’appuie sur la formation continue, la valorisation de l’expérience et la mise en situation réelle.',
    ], [
      qcm('En quelle année les brevets de plongée de la FSGT ont-ils été reconnus officiellement ?', ['1934', '1948', '1982', '2009'], 2,
        'Trois dates marquent la plongée à la FSGT : 1948 (premier club), 1968 (premier stage de cadres), 1982 (reconnaissance des brevets).'),
      qcm('Quelle est la particularité de la FSGT par rapport à la FFESSM ?', ['Elle ne délivre aucun brevet', 'Elle n’est pas spécialisée en plongée : c’est une fédération multisports', 'Elle est une agence américaine', 'Elle est un syndicat'], 1,
        'La FSGT propose de nombreux sports et délivre une licence omnisports.'),
      vf('La FSGT délivre des cartes double face FSGT et CMAS.', true,
        'Ces cartes permettent la reconnaissance internationale des brevets.'),
    ]),

    fiche('N2', 42, 'Les syndicats professionnels', [
      'Les syndicats professionnels sont à but non lucratif : ils représentent la profession, défendent les intérêts des membres et la promeuvent.',
      'En France : ANMP, SNMP, FNEAPL (syndicat d’employeurs) et SMPS (moniteurs salariés).',
      'L’ANMP (créée en 1972) est à la fois un syndicat et une agence de certification depuis 1991 ; ses moniteurs sont titulaires du brevet d’État ou d’un titre équivalent.',
      'Le SNMP (créé en 1963) est aussi une agence de certification, depuis 1986.',
      'Cinq organismes français sont habilités à délivrer leurs propres brevets de plongeur.',
    ], [
      qcm('Quel syndicat est aussi une agence de certification depuis 1991 ?', ['SMPS', 'FNEAPL', 'ANMP', 'CNOSF'], 2,
        'L’ANMP défend les moniteurs et délivre des brevets selon une approche modulaire.'),
      qcm('Quel syndicat regroupe des entrepreneurs de plongée, c’est-à-dire des employeurs ?', ['FNEAPL', 'SMPS', 'ANMP', 'UCPA'], 0,
        'La FNEAPL, section plongée, est un syndicat d’employeurs. Le SMPS regroupe des moniteurs salariés.'),
      vf('Les syndicats professionnels ont un but lucratif.', false,
        'Ce sont des organismes à but non lucratif.'),
    ]),

    fiche('N2', 43, 'La CMAS', [
      'Confédération Mondiale des Activités Subaquatiques : fondée à Monaco en janvier 1959 par 15 pays, première présidence Jacques-Yves Cousteau.',
      'Langues officielles : français, anglais, espagnol. Représentée dans plus de 100 pays.',
      'Elle comporte un Comité sportif, un Comité technique (codification de l’enseignement et des brevets) et un Comité scientifique.',
      'Elle a codifié les signes de communication : congrès de Barcelone (1960), actualisés à Singapour (1999).',
      'La carte FFESSM/CMAS permet la reconnaissance des brevets dans le monde entier.',
    ], [
      qcm('Qui présidait la CMAS à sa création en 1959 ?', ['Albert Falco', 'Jacques-Yves Cousteau', 'Elie Ferrat', 'Jacques Dumas'], 1,
        'La CMAS est créée en janvier 1959 par les délégués de 15 pays, sous la présidence du Commandant Cousteau.'),
      qcm('Dans quelles langues officielles travaille la CMAS ?', ['Français, anglais, espagnol', 'Anglais seulement', 'Français et allemand', 'Italien et grec'], 0,
        'Ses trois langues officielles sont le français, l’anglais et l’espagnol.'),
      qcm('Quelle est la partie visible la plus importante des travaux de la CMAS pour tous les plongeurs ?', [
        'Les compétitions de pêche',
        'La carte FFESSM/CMAS et la codification des signes de communication',
        'Les tables de plongée',
        'Les prix des licences',
      ], 1, 'La carte permet la reconnaissance des brevets dans le monde entier ; les signes ont été adoptés à Barcelone en 1960 puis actualisés à Singapour en 1999.'),
    ]),

    fiche('N2', 44, 'Des agences de certification internationales', [
      'PADI (Professional Association of Diving Instructors) : leader mondial, enseignement standardisé.',
      'SSI (Scuba Schools International) : école nord-américaine, supports diffusés par des revendeurs agréés.',
      'NAUI (National Association of Underwater Instructors) : organisation américaine, initialement membre de la CMAS, qui s’en est retirée.',
      'Il existe bien d’autres agences ; ces trois sont les principales.',
    ], [
      qcm('Quelle agence est le leader mondial de l’enseignement de la plongée ?', ['PADI', 'NAUI', 'ANMP', 'FSGT'], 0,
        'PADI est présent dans la plupart des pays et standardise tous ses cours et méthodes d’évaluation.'),
      qcm('Quelle organisation américaine s’est retirée de la CMAS ?', ['PADI', 'SSI', 'NAUI', 'FFESSM'], 2,
        'NAUI était initialement membre de la CMAS ; elle a mis en place ses propres brevets.'),
      vf('SSI diffuse ses supports pédagogiques par des revendeurs agréés.', true,
        'Magasins, centres de plongée, organismes de formation : la formation est assurée par des instructeurs SSI.'),
    ]),
  ],
};
