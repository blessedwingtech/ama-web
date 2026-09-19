const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Initialisation du Seed Prisma pour AMA (Données Réelles & Authentiques 2025)...");

  const reportsModule = await import("../src/data/reports.js");
  const announcementsModule = await import("../src/data/announcements.js");
  const mediaModule = await import("../src/data/media.js");
  const statisticsModule = await import("../src/data/statistics.js");

  // 1. Site Statistics Authentiques
  console.log("📊 Synchronisation des statistiques globales certifiées...");
  const s = statisticsModule.globalImpactStats;
  await prisma.siteStatistic.upsert({
    where: { id: "global-stats" },
    update: {
      visionTarget: s.visionTarget,
      currentReachedSouls: s.currentReachedSouls,
      confirmedDecisionsForChrist: s.confirmedDecisionsForChrist,
      partnerChurches: s.partnerChurches,
      competitionsOrganized: s.competitionsOrganized || 4,
      laureatesAwarded: s.laureatesAwarded || 14,
      youthAthletesEngaged: s.youthAthletesEngaged,
      biblesDistributed: s.biblesDistributed,
      socialAidBeneficiaries: s.socialAidBeneficiaries,
      activeVolunteers: s.activeVolunteers,
      totalMobilizedHtg: statisticsModule.financialTransparency.totalMobilizedHtg,
      fieldAllocationRate: statisticsModule.financialTransparency.fieldAllocationRate,
    },
    create: {
      id: "global-stats",
      visionTarget: s.visionTarget,
      currentReachedSouls: s.currentReachedSouls,
      confirmedDecisionsForChrist: s.confirmedDecisionsForChrist,
      partnerChurches: s.partnerChurches,
      competitionsOrganized: s.competitionsOrganized || 4,
      laureatesAwarded: s.laureatesAwarded || 14,
      youthAthletesEngaged: s.youthAthletesEngaged,
      biblesDistributed: s.biblesDistributed,
      socialAidBeneficiaries: s.socialAidBeneficiaries,
      activeVolunteers: s.activeVolunteers,
      totalMobilizedHtg: statisticsModule.financialTransparency.totalMobilizedHtg,
      fieldAllocationRate: statisticsModule.financialTransparency.fieldAllocationRate,
    },
  });

  // 2. Annonces & Publications
  console.log("📢 Synchronisation des annonces officielles...");
  for (const ann of announcementsModule.initialAnnouncements) {
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

  // 3. Rapports Périodiques et Concours 2025
  console.log("📑 Synchronisation des rapports et concours officiels...");
  for (const report of reportsModule.periodicReports) {
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

  // 4. Photos de la Galerie
  console.log("📸 Synchronisation de la galerie photos...");
  for (const photo of mediaModule.photoGallery) {
    const existing = await prisma.galleryPhoto.findFirst({
      where: { title: photo.title },
    });
    if (!existing) {
      await prisma.galleryPhoto.create({
        data: {
          title: photo.title,
          category: photo.category,
          date: photo.date,
          location: photo.location,
          image: photo.image,
          caption: photo.caption,
          isPublished: true,
        },
      });
    }
  }

  // 5. Enregistrements Audio
  console.log("🎙️ Synchronisation des messages audio...");
  for (const audio of mediaModule.audioRecordings) {
    const existing = await prisma.audioRecording.findFirst({
      where: { title: audio.title },
    });
    if (!existing) {
      await prisma.audioRecording.create({
        data: {
          title: audio.title,
          speaker: audio.speaker,
          event: audio.event,
          duration: audio.duration,
          category: audio.category,
          date: audio.date,
          audioSrc: audio.audioSrc,
          description: audio.description,
          isPublished: true,
        },
      });
    }
  }

  console.log("✅ Base de données initialisée avec succès avec les données réelles AMA !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });