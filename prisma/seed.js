const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. STATISTIQUES RÉELLES INSTITUTIONNELLES 2025
const globalStatsData = {
  visionTarget: 100000,
  currentReachedSouls: 2450,
  confirmedDecisionsForChrist: 114,
  partnerChurches: 5,
  competitionsOrganized: 4,
  laureatesAwarded: 14,
  youthAthletesEngaged: 320,
  biblesDistributed: 180,
  socialAidBeneficiaries: 85,
  activeVolunteers: 45,
  totalMobilizedHtg: 435000,
  fieldAllocationRate: 93.5,
};

// 2. ANNONCES ET PUBLICATIONS OFFICIELLES
const initialAnnouncements = [
  {
    id: "annonce-palmares-2025",
    title: "Publication Officielle : Palmarès Définitif des 4 Grands Concours 2025",
    slug: "publication-officielle-palmares-4-concours-2025",
    category: "CONCOURS",
    author: "Comité Exécutif AMA & Collège Pastoral",
    summary:
      "Le Comité Exécutif publie l'ensemble des résultats certifiés des 4 compétitions bibliques et théologiques de l'exercice 2025.",
    content: `L'Association 100,000 Âmes (AMA) a le plaisir de proclamer les résultats officiels des concours organisés au cours de l'année 2025. 

Nous félicitons l'ensemble des églises participantes : l'Église Évangélique Galilée de Delbourg, l'Église de Dieu de la Prophétie de Plaine du Pré, l'Église Évangélique Chrétienne de Vieux-Cayes, l'Église Baptiste Messianique de Feuillet et l'Église de Dieu de la Prophétie de Sylguerre.

Les rapports détaillés de chaque épreuve avec les notes et le nombre de versets sont consultables dans la section Médiathèque.`,
    eventDate: "Décembre 2025",
    location: "Delbourg (#1), Thomonde, Plateau Central",
    isUrgent: false,
    isPublished: true,
  },
  {
    id: "annonce-assemblee-delbourg",
    title: "Communiqué : Nouvelle Organisation du Comité Exécutif d'AMA",
    slug: "communique-organisation-comite-executif-ama",
    category: "COMMUNIQUE",
    author: "Secrétariat Général AMA",
    summary:
      "Confirmation de la présidence du Pasteur Yvon BATHOL et renouvellement des charges exécutives pour le rayonnement de la Vision 2050.",
    content: `Par décision unanime des membres fondateurs, le Pasteur Yvon BATHOL, Pasteur de l'Église Évangélique Galilée de Delbourg, assure la Présidence du Comité Exécutif de l'Association 100,000 Âmes.

Julberson TOUTOUTE assume la Vice-Présidence, et Gilbert VOYELLE a été désigné Secrétaire Adjoint aux côtés de Jean-Paul BLANC (Secrétaire Général) et Jean-Rony FONTIL (Trésorier Général).

Toute correspondance officielle peut être adressée par courriel à association100000ames@gmail.com.`,
    eventDate: "Exercice 2025 - 2026",
    location: "Siège Social : Delbourg (#1), Thomonde",
    isUrgent: true,
    isPublished: true,
  },
];

// 3. RAPPORTS ET RÉSULTATS OFFICIELS 2025
const periodicReports = [
  {
    id: "rapport-competition-10-psaumes-dec-2025",
    title: "Résultats Officiels : Compétition de Récitation des 10 Psaumes",
    slug: "resultats-competition-10-psaumes-24-decembre-2025",
    period: "4ème Trimestre 2025",
    periodId: "2025-t4",
    year: 2025,
    category: "theologie",
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

async function main() {
  console.log("🌱 Initialisation du Seed Prisma pour AMA (Données Réelles & Autonomes 2025)...");

  // 1. Synchronisation Site Statistics
  console.log("📊 Synchronisation des statistiques globales certifiées...");
  await prisma.siteStatistic.upsert({
    where: { id: "global-stats" },
    update: globalStatsData,
    create: {
      id: "global-stats",
      ...globalStatsData,
    },
  });

  // 2. Synchronisation Annonces
  console.log("📢 Synchronisation des annonces officielles...");
  for (const ann of initialAnnouncements) {
    await prisma.announcement.upsert({
      where: { slug: ann.slug },
      update: {
        title: ann.title,
        category: ann.category,
        author: ann.author,
        summary: ann.summary,
        content: ann.content,
        eventDate: ann.eventDate,
        location: ann.location,
        isUrgent: ann.isUrgent,
        isPublished: true,
      },
      create: {
        id: ann.id,
        title: ann.title,
        slug: ann.slug,
        category: ann.category,
        author: ann.author,
        summary: ann.summary,
        content: ann.content,
        eventDate: ann.eventDate,
        location: ann.location,
        isUrgent: ann.isUrgent,
        isPublished: true,
      },
    });
  }

  // 3. Synchronisation Rapports et Concours
  console.log("📑 Synchronisation des rapports et concours officiels...");
  for (const report of periodicReports) {
    await prisma.report.upsert({
      where: { slug: report.slug },
      update: {
        title: report.title,
        period: report.period,
        periodId: report.periodId,
        year: report.year,
        category: report.category,
        author: report.author,
        summary: report.summary,
        content: report.content,
        metrics: report.metrics,
        highlights: report.highlights,
        pdfUrl: report.pdfUrl,
        isPublished: true,
      },
      create: {
        id: report.id,
        title: report.title,
        slug: report.slug,
        period: report.period,
        periodId: report.periodId,
        year: report.year,
        category: report.category,
        author: report.author,
        summary: report.summary,
        content: report.content,
        metrics: report.metrics,
        highlights: report.highlights,
        pdfUrl: report.pdfUrl,
        isPublished: true,
      },
    });
  }

  // Nettoyage des enregistrements audio de test/fictifs
  await prisma.audioRecording.deleteMany({
    where: {
      audioSrc: {
        contains: "codeskulptor-assets",
      },
    },
  });

  console.log("✅ Base de données initialisée avec succès avec les données 100% réelles AMA !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });