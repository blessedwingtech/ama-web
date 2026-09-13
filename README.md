# Site Web Officiel — Association 100,000 Âmes (AMA)

Plateforme web institutionnelle, moderne, sobre et ultra-légère développée pour l'**Association 100,000 Âmes (AMA)**, basée à Thomonde (Centre, Haïti), dans la région du lac de Péligre.

---

## 🚀 Stack Technique

- **Frontend & Backend** : [Next.js 14+ (App Router)](https://nextjs.org/)
- **Base de Données** : PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Styles & UI** : [Tailwind CSS](https://tailwindcss.com/) avec palette personnalisée (Bleu Royal `#1E3A8A`, Or/Ambre `#D97706`, Terre du Plateau Central `#78350F`)
- **Icônes** : [Lucide React](https://lucide.dev/) (SVG légers)
- **API Multilingue** : Route API dynamique `/api/translations?lang=[fr|ht|en]` avec dictionnaire réactif
- **Cartographie** : Intégration interactive Leaflet / OpenStreetMap centrée sur le Lac de Péligre et Thomonde
- **SEO & Accessibilité** : Balises OpenGraph complètes, robots.txt, sitemap.xml et données structurées `Schema.org` de type `NGO`.

---

## 📂 Structure du Projet

```text
ama/
├── prisma/
│   └── schema.prisma         # Modèles PostgreSQL (Contact, Prières, Adhésions, Dons)
├── public/
│   ├── favicon.svg           # Logo SVG optimisé
│   ├── sitemap.xml           # Plan du site pour les moteurs de recherche
│   └── robots.txt
├── src/
│   ├── app/                  # Routes Next.js App Router
│   │   ├── layout.jsx        # Layout racine avec Header, Footer, StickyBar & Providers
│   │   ├── page.jsx          # Page d'Accueil (Hero, Compteur d'impact, Mot du Président, etc.)
│   │   ├── a-propos/page.jsx # Page À Propos (Historique, Vision, Mission, But, Statuts, Carte)
│   │   ├── equipe/page.jsx   # Page Notre Équipe (Comité Exécutif & Collège Pastoral)
│   │   ├── ministeres/page.jsx # Nos 5 Ministères & 4 Championnats d'été
│   │   ├── mediatheque/page.jsx # Galerie photos avec Lightbox, Audios & Tournois
│   │   ├── faire-un-don/page.jsx # Page Dons (MonCash, Natcash, PayPal, Parrainages)
│   │   ├── contact/page.jsx  # Formulaires Contact, Prière Confidentielle, Adhésion
│   │   └── api/              # Routes API backend
│   │       ├── translations/route.js # API de traduction multilingue
│   │       ├── contact/route.js      # Enregistrement des messages de contact
│   │       ├── prayer-request/route.js # Enregistrement des demandes de prière
│   │       ├── membership/route.js   # Enregistrement des adhésions
│   │       └── donations/route.js    # Enregistrement des intentions de dons
│   ├── components/
│   │   ├── layout/           # Header, Footer, StickyDonationBar
│   │   ├── common/           # PeligreMap, AudioPlayer, Lightbox
│   │   ├── cards/            # TeamMemberCard, MinistryCard, MediaCard
│   │   ├── donation/         # PaymentGuide, DonationForm
│   │   └── forms/            # ContactForm, PrayerRequestForm, MembershipForm
│   ├── context/
│   │   └── LanguageContext.jsx # Contexte multilingue (Français, Kreyòl, English)
│   ├── data/                 # Fichiers de données modulaires
│   │   ├── siteConfig.js     # Données institutionnelles, statuts, coordonnées
│   │   ├── team.js           # Comité exécutif et Collège pastoral
│   │   ├── ministries.js     # 5 piliers d'intervention et 4 tournois
│   │   ├── media.js          # Photos, enregistrements audios et résumés
│   │   ├── mapLocations.js   # Coordonnées des points clés (Thomonde, Péligre, etc.)
│   │   └── dictionaries/     # Dictionnaires FR / HT / EN
│   └── lib/
│       └── prisma.js         # Client Prisma singleton
├── package.json
└── tailwind.config.js
```

---

## 🛠️ Installation & Démarrage en Local

### 1. Cloner et installer les dépendances
```bash
cd ama
npm install
```

### 2. Configurer la base de données PostgreSQL
Créez un fichier `.env` à la racine :
```env
DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/ama_db?schema=public"
```
*(Vous pouvez utiliser une base PostgreSQL locale, ou un service gratuit dans le cloud comme Supabase ou Neon).*

Générez le client Prisma et synchronisez le schéma :
```bash
npm run prisma:generate
npm run prisma:push
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🌐 Déploiement en Production (Vercel / Netlify)

1. Connectez votre dépôt Git à [Vercel](https://vercel.com) ou [Netlify](https://netlify.com).
2. Ajoutez la variable d'environnement `DATABASE_URL` (ex. chaîne de connexion Neon / Supabase).
3. La commande de build par défaut est `npm run build`.
4. Le site sera automatiquement déployé avec rendu SSR ultra-rapide et optimisations mobiles.

---

## ✍️ Guide de Mise à Jour (Pour la Direction Technique - Bentzky Louis)

Tous les contenus éditoriaux sont centralisés dans le dossier `src/data/` pour des modifications rapides sans toucher aux composants :
- **Membres de l'équipe** : modifier `src/data/team.js`
- **Nouveaux ministères / tournois** : modifier `src/data/ministries.js`
- **Photos et audios** : modifier `src/data/media.js`
- **Coordonnées / MonCash / Natcash** : modifier `src/data/siteConfig.js`
- **Traductions** : modifier les fichiers JSON dans `src/data/dictionaries/`

---

## 📞 Coordonnées Officielles

- **Siège** : #1, Église Évangélique Galilée de Delbourg, Thomonde (Centre, Haïti)
- **Téléphones** : +509 3252-9060 (MonCash) / +509 3651-2047 (Natcash)
- **Email** : contact@association100000ames.org
- **Domaines** : `association100000ames.org` / `ama-peligre.org`
