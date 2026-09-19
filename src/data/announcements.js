/**
 * Association 100,000 Âmes (AMA) - Annonces & Publications Officielles
 * Données réelles administrables dynamiquement par le Secrétariat Général.
 */

export const announcementCategories = [
  { id: "all", label: "Toutes les annonces" },
  { id: "CONCOURS", label: "Concours & Palmarès" },
  { id: "COMMUNIQUE", label: "Communiqués Officiels" },
  { id: "EVENEMENT", label: "Événements & Cultes" },
  { id: "SPIRITUEL", label: "Édification & Prière" },
];

export const initialAnnouncements = [
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
