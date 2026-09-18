const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Initialisation du Seed Prisma pour AMA...");

  const reportsModule = await import("../src/data/reports.js");
  const mediaModule = await import("../src/data/media.js");

  // 1. Site Statistics
  console.log("📊 Synchronisation des statistiques globales...");
  await prisma.siteStatistic.upsert({
    where: { id: "global-stats" },
    update: {
      visionTarget: 100000,
      currentReachedSouls: 12450,
      confirmedDecisionsForChrist: 424,
      partnerChurches: 24,
      youthAthletesEngaged: 1850,
      biblesDistributed: 875,
      socialAidBeneficiaries: 365,
      activeVolunteers: 120,
      totalMobilizedHtg: 1135000,
      fieldAllocationRate: 92.4,
    },
    create: {
      id: "global-stats",
      visionTarget: 100000,
      currentReachedSouls: 12450,
      confirmedDecisionsForChrist: 424,
      partnerChurches: 24,
      youthAthletesEngaged: 1850,
      biblesDistributed: 875,
      socialAidBeneficiaries: 365,
      activeVolunteers: 120,
      totalMobilizedHtg: 1135000,
      fieldAllocationRate: 92.4,
    },
  });

  // 2. Reports
  console.log("📑 Synchronisation des rapports...");
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

  // 3. Photos
  console.log("📸 Synchronisation des photos...");
  const photoCount = await prisma.galleryPhoto.count();
  if (photoCount === 0) {
    for (const photo of mediaModule.photoGallery) {
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

  // 4. Audios
  console.log("🎙️ Synchronisation des audios...");
  const audioCount = await prisma.audioRecording.count();
  if (audioCount === 0) {
    for (const audio of mediaModule.audioRecordings) {
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

  console.log("✅ Base de données initialisée avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });