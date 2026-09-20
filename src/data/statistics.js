/**
 * Association 100,000 Âmes (AMA) - Données Statistiques et Analytiques d'Impact
 * Chiffres réels et certifiés issus des 4 concours officiels et de la fondation 2025.
 */

export const globalImpactStats = {
  visionTarget: 100000,
  competitionsOrganized: 4, // 4 grands concours officiels réalisés en 2025
  laureatesAwarded: 14, // 14 lauréats et lauréates officiellement distingués
  partnerChurches: 5, // 5 églises partenaires fondatrices engagées
  totalVersesRecited: 723, // 723 versets récités par les lauréats de la compétition de mémorisation
  totalLocalitiesCovered: 5, // Delbourg, Plaine du Pré, Vieux-Cayes, Feuillet, Sylguerre
  foundingDate: "7 Août 2025",
  lastUpdated: "Exercice 2025 - 2026",
};

// Palmarès Exhaustif Certifié des 4 Concours 2025
export const officialCompetitionsList = [
  {
    id: "concours-versets-2025",
    title: "Compétition de Versets Bibliques",
    date: "17 Octobre 2025",
    location: "Église Évangélique Galilée de Delbourg",
    category: "Récitation Mémorielle",
    totalLaureates: 4,
    statHighlight: "723 versets récités au total",
    laureates: [
      { rank: 1, name: "POLAS Vanessa", church: "Église Évangélique Galilée de Delbourg", score: "230 versets", distinction: "1ère Lauréate & Trophée d'Excellence" },
      { rank: 2, name: "JEAN-MARY Sadrackson", church: "Église Évangélique Galilée de Delbourg", score: "229 versets", distinction: "2ème Lauréat" },
      { rank: 3, name: "ANNILUS Emmania", church: "Église Évangélique Galilée de Delbourg", score: "148 versets", distinction: "3ème Lauréate" },
      { rank: 4, name: "JEAN-MARY Robenson", church: "Église Évangélique Galilée de Delbourg", score: "116 versets", distinction: "4ème Lauréat" },
    ],
  },
  {
    id: "concours-reflexion-2025",
    title: "Concours de Réflexion Théologique",
    date: "18 Novembre 2025",
    location: "Plateau Central (Inter-Églises)",
    category: "Théologie & Éthique Chrétienne",
    theme: "« Si vous êtes averti que vous serez mort dans trois (3) jours en tant que chrétien, que ferez-vous ? »",
    totalLaureates: 3,
    statHighlight: "Moyenne lauréats : 91.7 / 100",
    laureates: [
      { rank: 1, name: "Jean Rémy GRACIA", church: "Église de Dieu de la Prophétie de Plaine du Pré", score: "93 / 100", distinction: "1er Prix Théologique" },
      { rank: 2, name: "Enock JASMIN", church: "Église Évangélique Chrétienne de Vieux-Cayes", score: "92 / 100", distinction: "2ème Prix" },
      { rank: 3, name: "Mackendy BOSQUET", church: "Église Baptiste Messianique de Feuillet", score: "90 / 100", distinction: "3ème Prix" },
    ],
  },
  {
    id: "concours-lecture-2025",
    title: "Concours de Lecture de la Bible Sans Marmotter",
    date: "18 Novembre 2025 (Jury : 2 Nov. 2025)",
    location: "Delbourg & Vieux-Cayes",
    category: "Élocution & Proclamation Scripturaire",
    totalLaureates: 3,
    statHighlight: "Moyenne lauréats : 86.4 / 100",
    laureates: [
      { rank: 1, name: "SAINSURIN Fedeline", church: "Église de Dieu de la Prophétie de Plaine du Pré", score: "88 / 100", distinction: "1ère Lauréate" },
      { rank: 2, name: "LAFALAISE Darline", church: "Église Évangélique Chrétienne de Vieux-Cayes", score: "86 / 100", distinction: "2ème Lauréate" },
      { rank: 3, name: "JEAN-MARY Sadracson", church: "Église de Dieu de la Prophétie de Sylguerre", score: "85.25 / 100", distinction: "3ème Lauréat" },
    ],
  },
  {
    id: "concours-10-psaumes-2025",
    title: "Compétition de Récitation des 10 Psaumes",
    date: "24 Décembre 2025 (Veillée de Noël)",
    location: "Église Évangélique Galilée de Delbourg",
    category: "Récitation Mémorielle Complète",
    totalLaureates: 4,
    statHighlight: "Finale Veillée de Noël",
    laureates: [
      { rank: 1, name: "LUBIN Katiana", church: "Église Évangélique Galilée de Delbourg", score: "94.5 / 100", distinction: "1ère Lauréate & Grande Coupe de Noël" },
      { rank: 2, name: "POLAS Vanessa", church: "Église Évangélique Galilée de Delbourg", score: "94.0 / 100", distinction: "2ème Lauréate" },
      { rank: 3, name: "SAINSURIN Fedeline", church: "Église de Dieu de la Prophétie de Plaine du Pré", score: "91.25 / 100", distinction: "3ème Lauréate" },
      { rank: 4, name: "JEAN-MARY Robenson", church: "Église Évangélique Galilée de Delbourg", score: "83.0 / 100", distinction: "4ème Lauréat" },
    ],
  },
];

// Répartition par Localité et Église Partenaire Réelle
export const partnerChurchesStats = [
  {
    id: "delbourg",
    name: "Église Évangélique Galilée de Delbourg",
    pastor: "Pasteur Yvon BATHOL (Président AMA)",
    locality: "Delbourg (#1), Thomonde",
    laureatesCount: 7,
    awards: "1ère & 2ème place Versets, 1ère place 10 Psaumes",
    percentage: 50,
  },
  {
    id: "plaine-du-pre",
    name: "Église de Dieu de la Prophétie de Plaine du Pré",
    pastor: "Corps Pastoral de Plaine du Pré",
    locality: "Plaine du Pré, Plateau Central",
    laureatesCount: 3,
    awards: "1er Prix Réflexion (93/100), 1ère Place Lecture (88/100), 3ème 10 Psaumes",
    percentage: 21.4,
  },
  {
    id: "vieux-cayes",
    name: "Église Évangélique Chrétienne de Vieux-Cayes",
    pastor: "Corps Pastoral de Vieux-Cayes",
    locality: "Vieux-Cayes, Plateau Central",
    laureatesCount: 2,
    awards: "2ème Prix Réflexion (92/100), 2ème Place Lecture (86/100)",
    percentage: 14.3,
  },
  {
    id: "feuillet",
    name: "Église Baptiste Messianique de Feuillet",
    pastor: "Corps Pastoral de Feuillet",
    locality: "Feuillet, Thomonde",
    laureatesCount: 1,
    awards: "3ème Prix Réflexion Théologique (90/100)",
    percentage: 7.1,
  },
  {
    id: "sylguerre",
    name: "Église de Dieu de la Prophétie de Sylguerre",
    pastor: "Corps Pastoral de Sylguerre",
    locality: "Sylguerre, Plateau Central",
    laureatesCount: 1,
    awards: "3ème Place Lecture Biblique (85.25/100)",
    percentage: 7.1,
  },
];

// Piliers Ministériels d'Action
export const pillarsDistribution = [
  {
    name: "Génie Biblique & Mémorisation des Écritures",
    percentage: 45,
    description: "Compétitions de versets mémorisés, récitation intégrale de psaumes et concours de réflexion scripturaire.",
    color: "#1e3a8a",
  },
  {
    name: "Proclamation de l'Évangile & Cultes Solennels",
    percentage: 30,
    description: "Célébrations de culte, veillées spirituelles et rassemblements fraternels dans le Plateau Central.",
    color: "#d97706",
  },
  {
    name: "Jeunesse & Émulation Spirituelle",
    percentage: 15,
    description: "Encadrement pédagogique des jeunes récitateurs, remise de prix et bourses d'encouragement.",
    color: "#059669",
  },
  {
    name: "Diaconat & Entraide Communautaire",
    percentage: 10,
    description: "Soutien et assistance fraternelle aux familles et aînés des assemblées membres.",
    color: "#7c3aed",
  },
];

// Jalons Réels & Trajectoire Vision 2050
export const visionMilestones = [
  {
    year: "7 Août 2025",
    title: "Fondation Officielle & Statuts",
    description: "Assemblée générale constitutive à l'Église Galilée de Delbourg. Adoption des statuts et nomination du Pasteur Yvon BATHOL à la présidence.",
    status: "Accompli",
  },
  {
    year: "17 Octobre 2025",
    title: "1ère Compétition de Versets",
    description: "Record de 230 versets mémorisés par POLAS Vanessa. 4 lauréats distingués avec mention d'excellence.",
    status: "Accompli",
  },
  {
    year: "18 Novembre 2025",
    title: "Concours de Réflexion & Lecture",
    description: "Double épreuve théologique (dissertation sur l'espérance chrétienne et lecture publique sans marmotter).",
    status: "Accompli",
  },
  {
    year: "24 Décembre 2025",
    title: "Finale des 10 Psaumes (Noël 2025)",
    description: "Récitation mémorielle de dix Psaumes complets remportée par Katiana LUBIN (94.5/100) à Delbourg.",
    status: "Accompli",
  },
  {
    year: "2026 - 2030",
    title: "Déploiement Régional & Nouvelles Églises",
    description: "Extension des concours bibliques et des rassemblements fraternels dans l'ensemble des communes du Centre.",
    status: "En cours",
  },
  {
    year: "Horizon 2050",
    title: "Accomplissement Vision 100 000 Âmes",
    description: "100 000 âmes gagnées pour Christ, édifiées dans la saine doctrine et enracinées dans la foi.",
    status: "Objectif Suprême",
  },
];
