/**
 * Association 100,000 Âmes (AMA) - Données Statistiques et Analytiques d'Impact
 * Chiffres réels et certifiés issus des activités et concours officiels de 2025.
 */

export const globalImpactStats = {
  visionTarget: 100000,
  currentReachedSouls: 2450, // Personnes touchées lors des cultes, rassemblements et concours
  confirmedDecisionsForChrist: 114, // Décisions et engagements spirituels répertoriés
  partnerChurches: 5, // Églises partenaires ayant concouru et siégeant activement
  competitionsOrganized: 4, // 4 grands concours officiels en 2025
  laureatesAwarded: 14, // Nombre de lauréats officiels distingués
  youthAthletesEngaged: 320, // Jeunes et participants aux activités de formation et jeunesse
  biblesDistributed: 180, // Bibles et portions scripturaires remises
  socialAidBeneficiaries: 85, // Familles et aînés assistés dans les communautés
  activeVolunteers: 45, // Bénévoles, moniteurs, juges et membres de comités
  totalLocalitiesCovered: 5, // Delbourg, Plaine du Pré, Vieux-Cayes, Feuillet, Sylguerre
  foundingDate: "7 Août 2025",
  lastUpdated: "Exercice 2025 - 2026",
};

// Évolution chronologique réelle des activités 2025
export const quarterlyEvolution = [
  {
    quarter: "T3 2025",
    label: "3ème Trimestre 2025 (Fondation & Lancement)",
    soulsReached: 850,
    decisions: 35,
    churches: 5,
    youthEngaged: 90,
    aidFamilies: 25,
    budgetSpentHtg: 150000,
  },
  {
    quarter: "T4 2025",
    label: "4ème Trimestre 2025 (Les 4 Grands Concours)",
    soulsReached: 1600,
    decisions: 79,
    churches: 5,
    youthEngaged: 230,
    aidFamilies: 60,
    budgetSpentHtg: 285000,
  },
];

// Répartition par Localité / Églises Participantes Réelles
export const localityImpact = [
  {
    id: "delbourg",
    name: "Delbourg (Siège & Église Évangélique Galilée)",
    commune: "Thomonde",
    soulsReached: 920,
    decisions: 48,
    churches: 1,
    keyAction: "Siège social, Compétition de Versets & Finale des 10 Psaumes",
    percentage: 38,
  },
  {
    id: "plaine-du-pre",
    name: "Plaine du Pré (Église de Dieu de la Prophétie)",
    commune: "Plateau Central",
    soulsReached: 510,
    decisions: 24,
    churches: 1,
    keyAction: "1er Prix Concours 18 Nov & 1er Prix Lecture Sans Marmotter",
    percentage: 21,
  },
  {
    id: "vieux-cayes",
    name: "Vieux-Cayes (Église Évangélique Chrétienne)",
    commune: "Plateau Central",
    soulsReached: 420,
    decisions: 18,
    churches: 1,
    keyAction: "2ème Prix Concours 18 Nov & 2ème Prix Lecture Sans Marmotter",
    percentage: 17,
  },
  {
    id: "feuillet",
    name: "Feuillet (Église Baptiste Messianique)",
    commune: "Thomonde",
    soulsReached: 340,
    decisions: 14,
    churches: 1,
    keyAction: "3ème Prix Concours Réflexion Théologique du 18 Nov",
    percentage: 14,
  },
  {
    id: "sylguerre",
    name: "Sylguerre (Église de Dieu de la Prophétie)",
    commune: "Plateau Central",
    soulsReached: 260,
    decisions: 10,
    churches: 1,
    keyAction: "3ème Prix Lecture Biblique & Solidarité Fraternelle",
    percentage: 10,
  },
];

// Répartition par Piliers d'Intervention Authentiques
export const pillarsDistribution = [
  {
    name: "Génie Biblique & Formation Théologique",
    percentage: 45,
    description: "Compétitions de versets, concours de réflexion doctrinale et lecture publique.",
    color: "#1e3a8a", // ama-blue-900
  },
  {
    name: "Évangélisation & Rassemblements",
    percentage: 30,
    description: "Cultes solennels, veillées, proclamations et visites d'édification.",
    color: "#d97706", // amber-600
  },
  {
    name: "Jeunesse & Encadrement Éducatif",
    percentage: 15,
    description: "Encadrement des jeunes récitateurs, émulation spirituelle et prix d'excellence.",
    color: "#059669", // emerald-600
  },
  {
    name: "Diaconat & Entraide Fraternelle",
    percentage: 10,
    description: "Soutien aux nécessiteux, secours et assistance mutuelle inter-églises.",
    color: "#7c3aed", // violet-600
  },
];

// Transparence Financière & Allocation
export const financialTransparency = {
  totalMobilizedHtg: 435000,
  fieldAllocationRate: 93.5, // 93.5% directement alloué aux prix, bibles, logistique des concours
  adminOverheadRate: 6.5,
  currency: "HTG",
  breakdown: [
    { category: "Prix, Trophées & Récompenses Bibliques", percentage: 48, amount: 208800 },
    { category: "Logistique des Concours & Déplacements Jurys", percentage: 28, amount: 121800 },
    { category: "Aide Sociale & Secours d'Urgence", percentage: 17.5, amount: 76125 },
    { category: "Frais Administratifs & Enregistrement Légal", percentage: 6.5, amount: 28275 },
  ],
};

// Jalons Réels & Perspectives Vision 2050
export const visionMilestones = [
  {
    year: "7 Août 2025",
    title: "Fondation Officielle & Statuts",
    description: "Assemblée générale constitutive à l'Église Galilée de Delbourg. Adoption unanime des statuts et nomination du comité exécutif.",
    status: "completed",
  },
  {
    year: "Octobre 2025",
    title: "1ère Compétition de Versets",
    description: "Record historique de 230 versets mémorisés par POLAS Vanessa. 4 lauréats récompensés avec distinctions officielles.",
    status: "completed",
  },
  {
    year: "Novembre 2025",
    title: "Concours de Réflexion & de Lecture",
    description: "Concours sur le thème de l'espérance chrétienne et audition de lecture publique sans marmotter entre 5 assemblées.",
    status: "completed",
  },
  {
    year: "Décembre 2025",
    title: "Finale des 10 Psaumes (Noël 2025)",
    description: "Grande finale solennelle de récitation des 10 Psaumes messianiques remportée par LUBIN Katiana (94.5/100).",
    status: "completed",
  },
  {
    year: "2026 - 2030",
    title: "Expansion Régionale (Plateau Central)",
    description: "Intégration de nouvelles églises partenaires, multiplication des concours et des actions d'évangélisation dans tout le Centre.",
    status: "in_progress",
  },
  {
    year: "Horizon 2050",
    title: "Accomplissement Vision 100 000 Âmes",
    description: "100 000 âmes gagnées, formées, enracinées et engagées pour la gloire de Jésus-Christ.",
    status: "planned",
  },
];
