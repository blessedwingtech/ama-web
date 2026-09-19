#!/bin/bash
# Script de déploiement automatique pour l'Association 100,000 Âmes (AMA)
# Utilisation : ./deploy.sh [docker|pm2]

set -e

MODE=${1:-docker}
echo "======================================================="
echo " 🚀 Déploiement de l'Association 100,000 Âmes (AMA)"
echo " Mode sélectionné : $MODE"
echo " Date : $(date)"
echo "======================================================="

# 1. Mise à jour du code depuis Git si le dossier .git existe
if [ -d .git ]; then
    echo "📥 Récupération des dernières mises à jour Git..."
    git pull || echo "⚠️ Avertissement : git pull n'a pas pu être complété, continuation..."
fi

# 2. Vérification du fichier .env
if [ ! -f .env ]; then
    echo "⚠️ Le fichier .env est manquant. Création à partir de .env.example..."
    cp .env.example .env
fi

# Détection de la commande docker compose
if command -v docker > /dev/null 2>&1 && docker compose version > /dev/null 2>&1; then
    DOCKER_COMPOSE="docker compose"
elif command -v docker-compose > /dev/null 2>&1; then
    DOCKER_COMPOSE="docker-compose"
else
    DOCKER_COMPOSE="docker compose"
fi

if [ "$MODE" == "docker" ]; then
    echo "🐳 Déploiement et construction via $DOCKER_COMPOSE..."
    $DOCKER_COMPOSE up -d --build

    echo "⏳ Attente du démarrage et de la disponibilité de PostgreSQL..."
    sleep 6

    echo "🔄 Synchronisation du schéma de base de données PostgreSQL..."
    $DOCKER_COMPOSE exec -T web npx prisma@5.22.0 db push --skip-generate || \
    $DOCKER_COMPOSE exec -T web npx prisma db push --skip-generate

    echo "🌱 Initialisation et synchronisation des données réelles (Seed)..."
    $DOCKER_COMPOSE exec -T web node prisma/seed.js

    echo "✅ Déploiement Docker terminé avec succès !"
    echo "Statut des conteneurs :"
    $DOCKER_COMPOSE ps

elif [ "$MODE" == "pm2" ]; then
    echo "📦 Déploiement via PM2 & Node.js direct..."
    npm ci
    npx prisma generate
    npx prisma db push --skip-generate
    node prisma/seed.js
    npm run build

    mkdir -p logs
    if pm2 describe ama-website > /dev/null 2>&1; then
        echo "🔄 Rechargement de l'application PM2 sans interruption (zero-downtime)..."
        pm2 reload ecosystem.config.js --env production
    else
        echo "🚀 Démarrage initial PM2..."
        pm2 start ecosystem.config.js --env production
    fi
    pm2 save

    echo "✅ Déploiement PM2 terminé avec succès !"
    pm2 status
else
    echo "❌ Mode inconnu. Utilisez './deploy.sh docker' ou './deploy.sh pm2'."
    exit 1
fi

echo "======================================================="
echo " ✨ Site AMA déployé avec succès sur le VPS !"
echo " URL : https://ama.bittonik.com"
echo "======================================================="
