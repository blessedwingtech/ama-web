/**
 * Association 100,000 Âmes (AMA) - Rapports Périodiques d'Activité et de Gestion
 * Données réelles & structurées segmentées par Période, Année, Trimestre et Pilier.
 */

export const reportCategories = [
  { id: "all", label: "Toutes les catégories" },
  { id: "evangelisation", label: "Évangélisation & Croisades" },
  { id: "sport", label: "Sports & Championnats d'Été" },
  { id: "social", label: "Diaconat & Action Sociale" },
  { id: "theologie", label: "Formation & Génie Biblique" },
  { id: "finances", label: "Trésorerie & Transparence" },
  { id: "annuel", label: "Bilans Annuels Consolidés" },
];

export const reportPeriods = [
  { id: "all", label: "Toutes les périodes" },
  { id: "2026-t1", label: "1er Trimestre 2026 (T1)" },
  { id: "2025-annuel", label: "Bilan Annuel 2025" },
  { id: "2025-t4", label: "4ème Trimestre 2025 (T4)" },
  { id: "2025-ete", label: "Saison Estivale 2025 (Août)" },
  { id: "2025-t3", label: "3ème Trimestre 2025 (T3)" },
];

export const periodicReports = [
  {
    id: "rapport-t1-2026",
    title: "Rapport d'Activité T1 2026 : Déploiement Nautique & Réveil du Lac de Péligre",
    slug: "rapport-t1-2026-nautique-peligre",
    period: "1er Trimestre 2026",
    periodId: "2026-t1",
    year: 2026,
    category: "evangelisation",
    date: "31 Mars 2026",
    author: "Julberson TOUTOUTE (Président) & Bentzky LOUIS (Dir. Opérations)",
    summary:
      "Intensification des missions d'évangélisation nautique sur les berges du lac de Péligre, organisation des cellules de prière décentralisées et consolidation de 24 églises partenaires.",
    metrics: [
      { label: "Âmes touchées", value: "3 850" },
      { label: "Engagements de foi", value: "112" },
      { label: "Églises associées", value: "24" },
      { label: "Bibles distribuées", value: "195" },
    ],
    highlights: [
      "3 grandes traversées missionnaires par canots pneumatiques desservant les îlots et hameaux isolés de Péligre.",
      "Rencontres pastorales de concertation inter-dénominationnelle à l'Église Galilée de Delbourg.",
      "Mise en place de 8 nouvelles cellules d'étude biblique hebdomadaires animées par des leaders de jeunesse.",
      "Distribution de lampes solaires et de portions du Nouveau Testament en Kreyòl aux familles de pêcheurs.",
    ],
    content: `Ce premier trimestre 2026 a été marqué par un accomplissement spirituel déterminant pour la Vision 2050. L'Association a concentré ses efforts logistiques sur les zones les plus enclavées du bassin du Lac de Péligre.

Grâce aux équipes de colporteurs et d'évangélistes bénévoles, plus de 3 800 personnes ont entendu la prédication de l'Évangile. 112 personnes ont formellement confessé leur foi en Jésus-Christ et sont actuellement suivies dans le cadre du parcours de discipulat au sein des assemblées évangéliques locales.

Sur le plan organisationnel, le réseau pastoral s'est élargi avec l'intégration formelle de 4 nouvelles assemblées de la région de Mirebalais et de Saut-d'Eau, portant à 24 le nombre d'églises partenaires actives.`,
    pdfUrl: "/documents/rapport-ama-t1-2026.pdf",
    isPublished: true,
  },
  {
    id: "rapport-annuel-2025",
    title: "Bilan Annuel Consolidé 2025 : Genèse, Impact & Redevabilité Financière",
    slug: "bilan-annuel-consolide-2025",
    period: "Bilan Annuel 2025",
    periodId: "2025-annuel",
    year: 2025,
    category: "annuel",
    date: "31 Décembre 2025",
    author: "Comité Exécutif & Trésorerie Générale AMA",
    summary:
      "Rapport institutionnel complet couvrant les 5 premiers mois d'exercice officiel d'AMA (Août - Déc. 2025). Synthèse des 4 piliers, gouvernance, statistiques d'impact et reddition des comptes.",
    metrics: [
      { label: "Âmes atteintes au total", value: "12 400+" },
      { label: "Décisions pour Christ", value: "312" },
      { label: "Budget Exécuté", value: "845 000 HTG" },
      { label: "Taux d'affectation terrain", value: "91.5%" },
    ],
    highlights: [
      "Enregistrement légal et reconnaissance officielle auprès de la Mairie de Thomonde et du Ministère des Cultes.",
      "Organisation avec succès de 4 championnats d'été majeurs rassemblant plus de 5 000 spectateurs.",
      "Distribution de 680 Bibles et Nouveaux Testaments dans 7 localités du Plateau Central.",
      "Audition et vérification comptable : 100% des dons MonCash/Natcash/PayPal justifiés avec reçus.",
    ],
    content: `Fondée le 7 août 2025 à Thomonde, l'Association 100,000 Âmes a clôturé son premier exercice avec des résultats encourageants qui attestent de la fidélité de Dieu et de la mobilisation des chrétiens du Centre.

1. Évangélisation de masse & proximité :
Deux grandes croisades en plein air à Thomonde et Feuillet, combinées aux actions de marché hebdomadaires, ont permis de toucher plus de 12 400 auditeurs. 312 conversions authentiques ont été répertoriées avec orientation vers les églises membres.

2. Rapport Financier & Transparence :
Sur un total de 845 000 HTG mobilisés (dons locaux et diaspora), 45% ont été alloués à la logistique d'évangélisation et sonorisation, 26% aux compétitions sportives et trophées pour la jeunesse, 20.5% aux aides d'urgence diaconales, et 8.5% aux charges administratives et supports d'études.`,
    pdfUrl: "/documents/rapport-annuel-ama-2025.pdf",
    isPublished: true,
  },
  {
    id: "rapport-t4-2025",
    title: "Rapport d'Activité T4 2025 : Diaconat, Secours aux Anciens & Génie Biblique",
    slug: "rapport-t4-2025-diaconat-genie-biblique",
    period: "4ème Trimestre 2025",
    periodId: "2025-t4",
    year: 2025,
    category: "social",
    date: "15 Décembre 2025",
    author: "Jean-Paul BLANC (Secrétaire Général) & Département Diaconat",
    summary:
      "Bilan des opérations de solidarité évangélique à Sylguerre et Bassin Péligre, première édition du tournoi de Génie Biblique et séminaires doctrinaux d'automne.",
    metrics: [
      { label: "Familles secourues", value: "145" },
      { label: "Kits de lessive & vivres", value: "220" },
      { label: "Jeunes en concours", value: "96" },
      { label: "Visites pastorales", value: "58" },
    ],
    highlights: [
      "Programme 'Lessive & Fraternité' : 35 personnes âgées et veuves assistées à domicile dans leurs corvées de linge et soins de base.",
      "Finale du concours de Génie Biblique remportée par la jeunesse de l'Église Évangélique Galilée de Delbourg.",
      "Session théologique sur 'La grâce souveraine et le zèle missionnaire' dispensée par le Pasteur Yvon BATHOL.",
    ],
    content: `L'action sociale d'AMA n'est pas un simple humanisme : elle est l'incarnation vivante de l'amour du Christ auprès des plus vulnérables. Durant le dernier trimestre 2025, notre corps de diacres et de bénévoles féminines s'est rendu dans les hameaux de Sylguerre et Feuillet.

145 familles isolées ont reçu des kits alimentaires de première nécessité, du savon et des fournitures d'hygiène. Parallèlement, 35 aînés vivant seuls ont bénéficié de journées complètes d'aide domestique et de lessive, suivies de moments de prière et de lecture biblique.`,
    pdfUrl: "/documents/rapport-t4-2025-diaconat.pdf",
    isPublished: true,
  },
  {
    id: "rapport-ete-2025",
    title: "Rapport Spécial Championnats d'Été 2025 : Le Sport au Service de l'Évangile",
    slug: "rapport-special-championnats-ete-2025",
    period: "Saison Estivale 2025",
    periodId: "2025-ete",
    year: 2025,
    category: "sport",
    date: "30 Août 2025",
    author: "Bentzky LOUIS (Directeur Technique & Jeunesse)",
    summary:
      "Rapport exhaustif sur les 4 tournois de football organisés sur le terrain communal de Thomonde. Plus de 5 000 spectateurs, 28 équipes et 140 décisions de foi.",
    metrics: [
      { label: "Spectateurs cumulés", value: "5 000+" },
      { label: "Équipes engagées", value: "28" },
      { label: "Matchs disputés", value: "32" },
      { label: "Engagements pour Christ", value: "140" },
    ],
    highlights: [
      "Organisation sans aucun incident de discipline : prière commune et sermon de 7 minutes à la mi-temps de chaque rencontre.",
      "Victoire de l'équipe de Mirebalais au Tournoi Inter-Églises dans un climat de grande ferveur fraternelle.",
      "Tournoi féminin réunissant 8 équipes locales, salué par les autorités civiles de Thomonde.",
      "Remise de 28 ballons neufs, 4 trophées et des médailles gravées aux participants.",
    ],
    content: `La première édition des championnats d'été d'AMA a transformé le terrain communal de Thomonde en un pôle d'attraction sain et porteur d'espoir pour la jeunesse du Plateau Central.

Chaque match a été l'occasion d'une prédication ciblée à la mi-temps. Au total, 140 jeunes garçons et filles se sont avancés spontanément pour recevoir la prière du salut et intégrer les cellules de jeunes de leur commune respective.`,
    pdfUrl: "/documents/rapport-ete-2025-sport.pdf",
    isPublished: true,
  },
  {
    id: "rapport-t3-2025",
    title: "Rapport Trimestriel T3 2025 : Lancement Officiel & Croisade Fondatrice",
    slug: "rapport-t3-2025-fondation-croisade",
    period: "3ème Trimestre 2025",
    periodId: "2025-t3",
    year: 2025,
    category: "evangelisation",
    date: "30 Septembre 2025",
    author: "Comité Exécutif d'Administration AMA",
    summary:
      "Procès-verbal de fondation, première assemblée générale constitutive, déclaration de foi et lancement de la première croisade évangélique au Marché de Thomonde.",
    metrics: [
      { label: "Membres fondateurs", value: "18" },
      { label: "Participants croisade", value: "2 200" },
      { label: "Conversions initiales", value: "60" },
      { label: "Traités distribués", value: "1 500" },
    ],
    highlights: [
      "Adoption unanime des Statuts et du Règlement Intérieur le 7 août 2025 à Delbourg.",
      "Mise en place des départements : Évangélisation, Jeunesse, Diaconat, Trésorerie et Communication.",
      "Première grande croisade sur la place du marché sous la présidence des pasteurs du comité.",
    ],
    content: `Le 7 août 2025 restera gravé comme le point de départ de l'Association 100,000 Âmes. Réunis sous l'autorité des Saintes Écritures, les membres fondateurs ont formalisé la mission : conquérir 100 000 âmes pour Christ à l'horizon 2050.

La première croisade organisée dès la fin août a rassemblé plus de 2 200 personnes venues de Thomonde et des collines avoisinantes, avec 60 premières conversions enregistrées et confiées aux assemblées locales.`,
    pdfUrl: "/documents/rapport-t3-2025-fondation.pdf",
    isPublished: true,
  },
];
