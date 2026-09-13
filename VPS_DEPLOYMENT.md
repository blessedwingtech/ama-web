# Guide Complet de Déploiement sur VPS — Association 100,000 Âmes (AMA)

Ce guide détaille la mise en production du site **Association 100,000 Âmes (AMA)** sur votre propre serveur VPS (Ubuntu 22.04 / 24.04 LTS ou Debian).

---

## 📋 Prérequis Serveur (VPS)

- **Serveur** : VPS avec Ubuntu 22.04 LTS ou Debian 12
- **Ressources recommandées** : 1 vCPU, 1 à 2 Go de RAM, 20 Go SSD
- **Nom de domaine** : `association100000ames.org` (ou `ama-peligre.org`) pointant vers l'adresse IP publique de votre VPS (enregistrement DNS de type `A`).

---

## 🚀 OPTION A : Déploiement avec Docker & Docker Compose (Recommandé)

Cette méthode est la plus simple et isole complètement l'application Next.js et la base de données PostgreSQL.

### 1. Installer Docker et Docker Compose sur le VPS
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx certbot python3-certbot-nginx

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```
*(Déconnectez-vous et reconnectez-vous au VPS pour appliquer les permissions Docker).*

### 2. Cloner le projet sur le VPS
```bash
cd /var/www
git clone https://github.com/votre-repo/ama.git
cd ama
```

### 3. Configurer les variables d'environnement
Créez le fichier `.env` :
```bash
cp .env.example .env
nano .env
```
Renseignez les valeurs sécurisées :
```env
POSTGRES_DB=ama_db
POSTGRES_USER=ama_user
POSTGRES_PASSWORD=VotreMotDePasseTresSecurise2025!
DATABASE_URL=postgresql://ama_user:VotreMotDePasseTresSecurise2025!@db:5432/ama_db?schema=public
NEXT_PUBLIC_SITE_URL=https://association100000ames.org
ADMIN_SECRET_KEY=VotreCleSecreteAdmin2025!
```

### 4. Lancer le déploiement automatique
```bash
chmod +x deploy.sh scripts/backup-db.sh
./deploy.sh docker
```
Le script va :
1. Construire l'image Docker optimisée Next.js standalone.
2. Démarrer le conteneur PostgreSQL et le conteneur Next.js.
3. Appliquer automatiquement le schéma de base de données Prisma (`prisma db push`).

---

## ⚡ OPTION B : Déploiement avec Node.js, PM2 & PostgreSQL Natif

Si vous préférez exécuter l'application directement sans Docker :

### 1. Installer Node.js 20, PM2 et PostgreSQL
```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs postgresql postgresql-contrib nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

### 2. Configurer la base PostgreSQL
```bash
sudo -u postgres psql
```
Dans l'invite PostgreSQL :
```sql
CREATE DATABASE ama_db;
CREATE USER ama_user WITH ENCRYPTED PASSWORD 'VotreMotDePasseSecurise2025!';
GRANT ALL PRIVILEGES ON DATABASE ama_db TO ama_user;
\q
```

### 3. Déployer l'application avec PM2
```bash
cd /var/www/ama
cp .env.example .env
# Renseigner DATABASE_URL="postgresql://ama_user:VotreMotDePasseSecurise2025!@localhost:5432/ama_db?schema=public"

chmod +x deploy.sh
./deploy.sh pm2
```

Pour que PM2 redémarre automatiquement en cas de redémarrage du VPS :
```bash
pm2 startup
# Exécutez la commande sudo affichée par PM2
pm2 save
```

---

## 🔒 5. Configuration Nginx & Certificat SSL Gratuit (HTTPS)

### 1. Activer le site dans Nginx
Copiez la configuration Nginx fournie :
```bash
sudo cp nginx.conf /etc/nginx/sites-available/association100000ames.org
sudo ln -s /etc/nginx/sites-available/association100000ames.org /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```

### 2. Obtenir le certificat SSL gratuit (Let's Encrypt)
```bash
sudo certbot --nginx -d association100000ames.org -d www.association100000ames.org
```

### 3. Tester et recharger Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🛡️ 6. Sécurité du VPS & Sauvegardes Automatiques

### 1. Pare-feu UFW
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 2. Planifier la sauvegarde quotidienne de la base de données
Ouvrez le crontab du VPS :
```bash
crontab -e
```
Ajoutez cette ligne pour une sauvegarde automatique chaque nuit à 2h00 :
```cron
0 2 * * * /var/www/ama/scripts/backup-db.sh >> /var/log/ama_backup.log 2>&1
```

---

## 🔄 7. Mises à Jour Futures du Site

Chaque fois que **Bentzky Louis** ou l'équipe technique apporte des modifications :
```bash
cd /var/www/ama
git pull
./deploy.sh
```
Le script met à jour le site **sans coupure de service**.
