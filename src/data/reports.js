/**
 * Association 100,000 Âmes (AMA) - Rapports Périodiques d'Activité et de Gestion
 * Données réelles et certifiées : Fondation et Palmarès Officiels des Concours 2025.
 */

export const reportCategories = [
  { id: "all", label: "Toutes les catégories" },
  { id: "theologie", label: "Génie Biblique & Concours" },
  { id: "evangelisation", label: "Évangélisation & Croisades" },
  { id: "social", label: "Diaconat & Action Sociale" },
  { id: "finances", label: "Trésorerie & Transparence" },
  { id: "annuel", label: "Bilans Annuels Consolidés" },
];

export const reportPeriods = [
  { id: "all", label: "Toutes les périodes" },
  { id: "2025-t4", label: "4ème Trimestre 2025 (Octobre - Décembre)" },
  { id: "2025-t3", label: "3ème Trimestre 2025 (Août - Septembre)" },
];

export const periodicReports = [
  {
    id: "rapport-competition-10-psaumes-dec-2025",
    title: "Résultats Officiels : Compétition de Récitation des 10 Psaumes",
    slug: "resultats-competition-10-psaumes-24-decembre-2025",
    period: "4ème Trimestre 2025",
    periodId: "2025-t4",
    year: 2025,
    category: "theologie",
    date: "24 Décembre 2025",
    author: "Collège Pastoral & Commission du Génie Biblique",
    summary:
      "Grande finale de récitation mémorielle de 10 Psaumes complets proclamée lors de la veillée de Noël 2025 à Delbourg.",
    metrics: [
      { label: "1ère Lauréate", value: "94.5 / 100" },
      { label: "2ème Lauréate", value: "94.0 / 100" },
      { label: "3ème Lauréate", value: "91.25 / 100" },
      { label: "4ème Lauréat", value: "83.0 / 100" },
    ],
    highlights: [
      "1ère Place (94.5/100) : LUBIN Katiana (Église Évangélique Galilée de Delbourg).",
      "2ème Place (94/100) : POLAS Vanessa (Église Évangélique Galilée de Delbourg).",
      "3ème Place (91.25/100) : SAINSURIN Fedeline (Église de Dieu de la Prophétie de Plaine du Pré).",
      "4ème Place (83/100) : JEAN-MARY Robenson (Église Évangélique Galilée de Delbourg).",
    ],
    content: `RÉSULTATS DES CONCOURS 2025 — IV. COMPÉTITION DE 10 PSAUMES
Date de la grande finale : 24 décembre 2025

Lors de la veillée solennelle de Noël à l'Église Galilée de Delbourg, les finalistes ont déclamé de mémoire dix Psaumes complets devant une assemblée recueillie.

Voici le palmarès officiel certifié par le Collège Pastoral :
1- LUBIN Katiana, Église Évangélique Galilée de Delbourg — 94.5/100 (1ère Lauréate & Grande Coupe de Noël) ;
2- POLAS Vanessa, Église Évangélique Galilée de Delbourg — 94/100 (2ème Lauréate) ;
3- SAINSURIN Fedeline, Église de Dieu de la Prophétie de Plaine du Pré — 91.25/100 (3ème Lauréate) ;
4- JEAN-MARY Robenson, Église Évangélique Galilée de Delbourg — 83/100 (4ème Lauréat).

Que le Nom du Très-Haut soit exalté pour la consécration de la jeunesse du Plateau Central !`,
    pdfUrl: "/documents/resultats-competition-10-psaumes-dec-2025.pdf",
    isPublished: true,
  },
  {
    id: "rapport-concours-reflexion-nov-2025",
    title: "Résultats Officiels : Grand Concours de Réflexion Théologique & Éthique",
    slug: "resultats-concours-reflexion-18-novembre-2025",
    period: "4ème Trimestre 2025",
    periodId: "2025-t4",
    year: 2025,
    category: "theologie",
    date: "18 Novembre 2025",
    author: "Comité Théologique & Jury d'Évaluation AMA",
    summary:
      "Évaluation et classement sur le sujet théologique : 'Si vous êtes averti que vous serez mort dans trois (3) jours en tant que chrétien, que ferez-vous ?'",
    metrics: [
      { label: "1er Lauréat (Note)", value: "93 / 100" },
      { label: "2ème Lauréat (Note)", value: "92 / 100" },
      { label: "3ème Lauréat (Note)", value: "90 / 100" },
      { label: "Églises Partenaires", value: "3 Assemblées" },
    ],
    highlights: [
      "1er Prix (93/100) : Jean Rémy GRACIA (Église de Dieu de la Prophétie de Plaine du Pré).",
      "2ème Prix (92/100) : Enock JASMIN (Église Évangélique Chrétienne de Vieux-Cayes).",
      "3ème Prix (90/100) : Mackendy BOSQUET (Église Baptiste Messianique de Feuillet).",
    ],
    content: `RÉSULTATS DES CONCOURS 2025 — II. CONCOURS DU 18 NOVEMBRE 2025
Thème officiel : « Si vous êtes averti que vous serez mort dans trois (3) jours en tant que chrétien, que ferez-vous ? »

Ce concours d'écriture et de réflexion éthique chrétienne a suscité des rédactions d'une profonde maturité scripturaire et pastorale.

Voici la liste officielle des gagnants :
1- Jean Rémy GRACIA, Église de Dieu de la Prophétie de Plaine du Pré — Note : 93/100 (1er Prix d'Excellence Théologique) ;
2- Enock JASMIN, Église Évangélique Chrétienne de Vieux-Cayes — Note : 92/100 (2ème Prix) ;
3- Mackendy BOSQUET, Église Baptiste Messianique de Feuillet — Note : 90/100 (3ème Prix).

Les lauréats ont reçu leurs distinctions lors du rassemblement fraternel de Thomonde.`,
    pdfUrl: "/documents/resultats-concours-reflexion-nov-2025.pdf",
    isPublished: true,
  },
  {
    id: "rapport-concours-lecture-bible-nov-2025",
    title: "Résultats Officiels : Concours de Lecture de la Bible Sans Marmotter",
    slug: "resultats-concours-lecture-bible-18-novembre-2025",
    period: "4ème Trimestre 2025",
    periodId: "2025-t4",
    year: 2025,
    category: "theologie",
    date: "18 Novembre 2025",
    author: "Commission d'Élocution & Jury de Lecture AMA",
    summary:
      "Compétition d'élocution et de lecture publique fluide et intelligible de la Bible (Auditions : 2 nov. 2025 — Proclamation : 18 nov. 2025).",
    metrics: [
      { label: "1ère Lauréate", value: "88 / 100" },
      { label: "2ème Lauréate", value: "86 / 100" },
      { label: "3ème Lauréat", value: "85.25 / 100" },
      { label: "Audition Jury", value: "2 Nov. 2025" },
    ],
    highlights: [
      "1ère Place (88/100) : SAINSURIN Fedeline (Église de Dieu de la Prophétie de Plaine du Pré).",
      "2ème Place (86/100) : LAFALAISE Darline (Église Évangélique Chrétienne de Vieux-Cayes).",
      "3ème Place (85.25/100) : JEAN-MARY Sadracson (Église de Dieu de la Prophétie de Sylguerre).",
    ],
    content: `RÉSULTATS DES CONCOURS 2025 — III. CONCOURS DE LECTURE DE LA BIBLE SANS MARMOTTER
Date des auditions du jury : 2 novembre 2025
Proclamation officielle des résultats : 18 novembre 2025

Ce concours a mis en valeur l'art de la proclamation solennelle, claire et articulée des textes bibliques lors des services d'adoration.

Liste officielle des gagnants :
1- SAINSURIN Fedeline, Église de Dieu de la Prophétie de Plaine du Pré — 88/100 (1ère Lauréate) ;
2- LAFALAISE Darline, Église Évangélique Chrétienne de Vieux-Cayes — 86/100 (2ème Lauréate) ;
3- JEAN-MARY Sadracson, Église de Dieu de la Prophétie de Sylguerre — 85,25/100 (3ème Lauréat).

L'Association félicite ces jeunes orateurs pour leur diction claire et leur déférence envers la Parole de Dieu.`,
    pdfUrl: "/documents/resultats-concours-lecture-bible-nov-2025.pdf",
    isPublished: true,
  },
  {
    id: "rapport-concours-versets-oct-2025",
    title: "Résultats Officiels : Compétition Régionale de Versets Bibliques",
    slug: "resultats-competition-versets-17-octobre-2025",
    period: "4ème Trimestre 2025",
    periodId: "2025-t4",
    year: 2025,
    category: "theologie",
    date: "17 Octobre 2025",
    author: "Jury Central & Commission Pédagogique AMA",
    summary:
      "Palmarès officiel et classement de la grande compétition de récitation mémorielle de versets bibliques tenue le 17 octobre 2025 à Delbourg (Thomonde).",
    metrics: [
      { label: "1ère Place (Versets)", value: "230 versets" },
      { label: "2ème Place (Versets)", value: "229 versets" },
      { label: "3ème Place (Versets)", value: "148 versets" },
      { label: "4ème Place (Versets)", value: "116 versets" },
    ],
    highlights: [
      "1ère Place : POLAS Vanessa (Église Évangélique Galilée de Delbourg) — 230 versets récités sans faute.",
      "2ème Place : JEAN-MARY Sadrackson (Église Évangélique Galilée de Delbourg) — 229 versets récités.",
      "3ème Place : ANNILUS Emmania (Église Évangélique Galilée de Delbourg) — 148 versets récités.",
      "4ème Place : JEAN-MARY Robenson (Église Évangélique Galilée de Delbourg) — 116 versets récités.",
    ],
    content: `RÉSULTATS DES CONCOURS 2025 — I. COMPÉTITION DE VERSETS
Date : 17 octobre 2025

Sous la supervision du Jury Central de l'Association 100,000 Âmes (AMA), la compétition de mémorisation des Écritures Saintes a réuni les délégations de jeunesse.

Voici la liste officielle des gagnants certifiée par le jury :
1- POLAS Vanessa, Église Évangélique Galilée de Delbourg — 230 versets récités (1ère Lauréate & Trophée d'Excellence) ;
2- JEAN-MARY Sadrackson, Église Évangélique Galilée de Delbourg — 229 versets récités (2ème Lauréat) ;
3- ANNILUS Emmania, Église Évangélique Galilée de Delbourg — 148 versets récités (3ème Lauréate) ;
4- JEAN-MARY Robenson, Église Évangélique Galilée de Delbourg — 116 versets récités (4ème Lauréat).

L'Association adresse ses vives félicitations aux lauréats, à leurs familles et à l'équipe pastorale encadrante pour ce témoignage remarquable d'ancrage biblique.`,
    pdfUrl: "/documents/resultats-competition-versets-oct-2025.pdf",
    isPublished: true,
  },
  {
    id: "rapport-fondation-aout-2025",
    title: "Procès-Verbal & Rapport de Fondation : Première Assemblée Générale Constitutive",
    slug: "fondation-assemblee-constitutive-7-aout-2025",
    period: "3ème Trimestre 2025",
    periodId: "2025-t3",
    year: 2025,
    category: "evangelisation",
    date: "7 Août 2025",
    author: "Comité Exécutif d'Administration AMA",
    summary:
      "Procès-verbal de fondation, assemblée générale constitutive, déclaration de foi, nomination du comité exécutif et lancement officiel de la Vision 2050 à Delbourg (Thomonde).",
    metrics: [
      { label: "Date de Fondation", value: "7 Août 2025" },
      { label: "Siège Initial", value: "Delbourg (#1)" },
      { label: "Objectif Vision 2050", value: "100 000 Âmes" },
      { label: "Églises Fondatrices", value: "5 Assemblées" },
    ],
    highlights: [
      "Adoption unanime des Statuts et du Règlement Intérieur le 7 août 2025 à l'Église Évangélique Galilée de Delbourg.",
      "Désignation du Collège Pastoral et du Comité Exécutif sous la présidence du Pasteur Yvon BATHOL.",
      "Formalisation des 4 piliers d'action : Évangélisation, Génie Biblique, Jeunesse & Sports, Diaconat & Entraide.",
    ],
    content: `Le 7 août 2025 restera gravé comme le point de départ de l'Association 100,000 Âmes. Réunis sous l'autorité des Saintes Écritures à Delbourg (Thomonde), les membres fondateurs ont formalisé la mission : conquérir 100 000 âmes pour Christ à l'horizon 2050.

Les assemblées partenaires engagées ont ratifié la déclaration de foi commune, affirmant l'inerrance biblique, le salut par la grâce en Jésus-Christ et l'impératif de la Grande Commission dans tout le Plateau Central.`,
    pdfUrl: "/documents/rapport-fondation-ama-7-aout-2025.pdf",
    isPublished: true,
  },
];
