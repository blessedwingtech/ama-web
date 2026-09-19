export const siteConfig = {
  name: "Association 100,000 Âmes",
  shortName: "AMA",
  tagline: "Évangélisation, Discipulat et Solidarité dans le Plateau Central",
  headquarters: {
    address: "#1, Église Évangélique Galilée de Delbourg",
    city: "Thomonde",
    department: "Centre",
    country: "Haïti",
    region: "Région du lac de Péligre",
    fullAddress: "#1, Église Évangélique Galilée de Delbourg, Thomonde (Centre, Haïti)",
  },
  foundationDate: "7 août 2025",
  phones: [
    { number: "+509 3651-2047", raw: "50936512047", type: "MonCash / Appel / WhatsApp" },
    { number: "+509 3252-9060", raw: "50932529060", type: "Natcash / Appel / WhatsApp" },
  ],
  primaryPhone: "+509 3651-2047",
  secondaryPhone: "+509 3252-9060",
  email: "association100000ames@gmail.com",
  domains: {
    primary: "association100000ames.org",
    alternative: "ama-peligre.org",
  },
  legalStatus: {
    nature: "Organisation chrétienne protestante, sans but lucratif et apolitique",
    duration: "Durée indéterminée",
    compliance: "Conforme à la législation haïtienne régissant les associations",
    renewals: "En cours de renouvellement légal auprès de la Mairie, du Ministère des Affaires Sociales et du Travail (MAST) et du Ministère des Cultes.",
    fullStatement: "L'Association 100,000 Âmes est une organisation chrétienne protestante, sans but lucratif et apolitique. Établie pour une durée indéterminée, elle fonctionne en conformité avec la législation haïtienne régissant les associations, avec renouvellement légal auprès de la Mairie, du Ministère des Affaires Sociales et du Travail (MAST) et du Ministère des Cultes.",
  },
  vision: "Voir plus de 100 000 âmes se tourner vers Jésus-Christ, être restaurées, fortifiées dans la foi et formées au discipulat d'ici l'horizon 2050.",
  mission: "Constituer la première coalition d'églises chrétiennes engagées autour du lac de Péligre (Thomonde, Centre) plaçant l'évangélisation holistique et le réveil spirituel au cœur de leur action.",
  goal: "Promouvoir activement le salut en Jésus-Christ, l'édification fraternelle et l'accompagnement social des populations vulnérables dans le Plateau Central haïtien.",
  
  impactStats: [
    { id: "souls", value: "100 000", label: "Âmes visées d'ici 2050", suffix: "" },
    { id: "competitions", value: "4", label: "Grands Concours Organisés (2025)", suffix: "" },
    { id: "laureates", value: "14", label: "Lauréats & Récitateurs Distingués", suffix: "" },
    { id: "churches", value: "5", label: "Églises Partenaires Fondatrices", suffix: "" },
    { id: "localities", value: "5", label: "Localités & Secteurs Couverts", suffix: "" },
  ],

  paymentMethods: {
    moncash: {
      name: "MonCash (Digicel)",
      number: "+509 3651-2047",
      accountName: "Association 100,000 Âmes (AMA)",
      instructionSteps: [
        "Composez le *202# sur votre téléphone Digicel ou ouvrez l'application MonCash.",
        "Sélectionnez l'option 'Transférer de l'argent' ou 'Payer marchand'.",
        "Entrez le numéro du compte AMA : 3651-2047.",
        "Saisissez le montant en Gourdes (HTG).",
        "Confirmez avec votre code secret MonCash et notez le numéro de transaction.",
      ],
    },
    natcash: {
      name: "Natcash (Natcom)",
      number: "+509 3252-9060",
      accountName: "Association 100,000 Âmes (AMA)",
      instructionSteps: [
        "Composez le *202# ou ouvrez l'application Natcash sur votre mobile Natcom.",
        "Choisissez 'Transfert d'argent' vers un utilisateur Natcash.",
        "Entrez le numéro officiel AMA : 3252-9060.",
        "Entrez le montant souhaité en Gourdes (HTG).",
        "Validez avec votre code PIN personnel et conservez le SMS de confirmation.",
      ],
    },
    paypal: {
      name: "PayPal & Carte Bancaire (International / Diaspora)",
      email: "association100000ames@gmail.com",
      link: "https://www.paypal.com/donate?hosted_button_id=AMA_THOMONDE",
      description: "Pour nos frères et sœurs de la diaspora (USA, Canada, France, Chili, République Dominicaine, etc.). Reçu de confirmation émis par email.",
    },
    bankTransfer: {
      name: "Virement Bancaire (Églises & Partenaires)",
      note: "Pour tout soutien institutionnel ou don d'assemblée par virement direct (UNIBANK / SOGEBANK / BNC), veuillez contacter le secrétariat général ou la direction financière pour les coordonnées bancaires officielles.",
      contactEmail: "association100000ames@gmail.com",
      contactPhone: "+509 3651-2047",
    },
  },

  socialLinks: {
    facebook: "https://facebook.com/association100000ames",
    youtube: "https://youtube.com/@association100000ames",
    whatsapp: "https://wa.me/50932529060",
    instagram: "https://instagram.com/association100000ames",
  },
};
