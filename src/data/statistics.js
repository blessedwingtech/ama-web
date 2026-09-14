/**
 * Association 100,000 Âmes (AMA) - Données Statistiques et Analytiques d'Impact
 * Trajectoire Vision 2050, séries temporelles trimestrielles, ventilation géographique et financière.
 */

export const globalImpactStats = {
  visionTarget: 100000,
  currentReachedSouls: 12450, // Total person-contacts across crusades, markets, tournaments
  confirmedDecisionsForChrist: 424, // Total tracked professions of faith
  partnerChurches: 24, // Active local assemblies
  youthAthletesEngaged: 1850, // Registered tournament participants
  biblesDistributed: 875, // Bibles and NT portions
  socialAidBeneficiaries: 365, // Vulnerable families / elderly helped
  activeVolunteers: 120, // Field workers, intercessors, referees
  totalLocalitiesCovered: 7, // Thomonde, Delbourg, Péligre, Feuillet, Sylguerre, Mirebalais, Vieux-Cayes
  foundingDate: "7 Août 2025",
  lastUpdated: "Avril 2026",
};

// Evolution chronologique trimestrielle (Août 2025 -> 2026)
export const quarterlyEvolution = [
  {
    quarter: "T3 2025",
    label: "3ème Trimestre 2025 (Lancement)",
    soulsReached: 2800,
    decisions: 60,
    churches: 8,
    youthEngaged: 650,
    aidFamilies: 45,
    budgetSpentHtg: 280000,
  },
  {
    quarter: "Été 2025",
    label: "Saison Estivale (Août 2025)",
    soulsReached: 5000,
    decisions: 140,
    churches: 14,
    youthEngaged: 850,
    aidFamilies: 60,
    budgetSpentHtg: 320000,
  },
  {
    quarter: "T4 2025",
    label: "4ème Trimestre 2025 (Automne)",
    soulsReached: 4600,
    decisions: 112,
    churches: 20,
    youthEngaged: 350,
    aidFamilies: 145,
    budgetSpentHtg: 245000,
  },
  {
    quarter: "T1 2026",
    label: "1er Trimestre 2026 (Missions Nautiques)",
    soulsReached: 3850,
    decisions: 112,
    churches: 24,
    youthEngaged: 420,
    aidFamilies: 115,
    budgetSpentHtg: 290000,
  },
];

// Répartition par Localité / Territoire
export const localityImpact = [
  {
    id: "thomonde-centre",
    name: "Thomonde Centre & Marché",
    commune: "Thomonde",
    soulsReached: 4600,
    decisions: 165,
    churches: 7,
    keyAction: "Croisades de marché & Championnats communaux",
    percentage: 37,
  },
  {
    id: "delbourg",
    name: "Delbourg (Siège & Église Galilée)",
    commune: "Thomonde",
    soulsReached: 2400,
    decisions: 82,
    churches: 4,
    keyAction: "Formations doctrinales, génie biblique & prière",
    percentage: 19,
  },
  {
    id: "peligre",
    name: "Bassin du Lac de Péligre",
    commune: "Péligre / Centre",
    soulsReached: 2150,
    decisions: 74,
    churches: 4,
    keyAction: "Évangélisation nautique & aides aux pêcheurs",
    percentage: 17,
  },
  {
    id: "sylguerre",
    name: "Sylguerre & Environs",
    commune: "Plateau Central",
    soulsReached: 1200,
    decisions: 41,
    churches: 3,
    keyAction: "Programme Lessive & Secours aux anciens",
    percentage: 10,
  },
  {
    id: "feuillet",
    name: "Feuillet & Collines",
    commune: "Thomonde",
    soulsReached: 950,
    decisions: 28,
    churches: 2,
    keyAction: "Porte-à-porte rural & colportage biblique",
    percentage: 8,
  },
  {
    id: "mirebalais",
    name: "Secteur Mirebalais",
    commune: "Mirebalais",
    soulsReached: 750,
    decisions: 22,
    churches: 3,
    keyAction: "Ligue de football des jeunes chrétiens (AJPM)",
    percentage: 6,
  },
  {
    id: "vieux-cayes",
    name: "Vieux-Cayes",
    commune: "Péligre / Centre",
    soulsReached: 400,
    decisions: 12,
    churches: 1,
    keyAction: "Visites pastorales fraternelles",
    percentage: 3,
  },
];

// Répartition par Pilier d'Intervention
export const pillarsDistribution = [
  {
    name: "Évangélisation & Croisades",
    percentage: 42,
    description: "Proclamation plein air, traversées en pirogues, colportage de traités.",
    color: "#1e3a8a", // ama-blue-900
  },
  {
    name: "Sports, Jeunesse & Génie Biblique",
    percentage: 28,
    description: "Tournois de football d'été, concours bibliques inter-églises, bourses d'encouragement.",
    color: "#d97706", // amber-600
  },
  {
    name: "Diaconat & Secours Social",
    percentage: 20,
    description: "Aide aux veuves, personnes âgées, programme de lessive fraternelle et vivres.",
    color: "#059669", // emerald-600
  },
  {
    name: "Formation & Forums Théologiques",
    percentage: 10,
    description: "Colloques pastoraux, modules d'édification des disciples et matériel scripturaire.",
    color: "#7c3aed", // violet-600
  },
];

// Transparence Financière & Allocation des Dépenses (Audit 2025-2026)
export const financialTransparency = {
  totalMobilizedHtg: 1135000,
  fieldAllocationRate: 92.4, // % directly spent on mission
  adminOverheadRate: 7.6, // % administrative / operational costs
  breakdown: [
    { label: "Logistique Évangélisation, Sonorisation & Transports", percentage: 44, amountHtg: 499400 },
    { label: "Équipements Sportifs, Trophées & Bourses Jeunesse", percentage: 26, amountHtg: 295100 },
    { label: "Aides d'Urgence Diaconales & Kits Alimentaires", percentage: 21, amountHtg: 238350 },
    { label: "Impression Traités, Bibles & Administration", percentage: 9, amountHtg: 102150 },
  ],
};

// Jalons Vision 2050 (Feuille de route 25 ans)
export const visionMilestones = [
  {
    year: "2025 - 2027",
    phase: "Phase 1 : Enracinement & Structuration",
    target: "10 000 Âmes & 30 Églises",
    status: "EN COURS (Avancement rapide)",
    description: "Implantation solide dans les 7 localités pilotes de Thomonde et du Lac de Péligre.",
  },
  {
    year: "2028 - 2035",
    phase: "Phase 2 : Expansion Départementale",
    target: "35 000 Âmes & 80 Églises",
    status: "PLANIFIÉ",
    description: "Extension vers Hinche, Lascahobas, Belladère, Boucan-Carré et tout le Plateau Central.",
  },
  {
    year: "2036 - 2045",
    phase: "Phase 3 : Rayonnement National & Instituts",
    target: "70 000 Âmes & 150 Églises",
    status: "OBJECTIF",
    description: "Fondation de centres de formation théologique et développement de cliniques mobiles chrétiennes.",
  },
  {
    year: "2046 - 2050",
    phase: "Phase 4 : Accomplissement de la Vision",
    target: "100 000+ Âmes enracinées",
    status: "VISION SUPRÊME",
    description: "Un réveil spirituel et social durable ancré dans les Saintes Écritures pour la gloire de Jésus-Christ.",
  },
];
