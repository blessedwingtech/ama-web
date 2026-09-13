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

# 1. Vérification du fichier .env
if [ ! -f .env ]; then
    echo "⚠️ Le fichier .env est manquant. Création à partir de .env.example..."
    cp .env.example .env
fi

if [ "$MODE" == "docker" ]; then
    echo "🐳 Déploiement via Docker Compose..."
    docker-compose down
    docker-compose build --no-cache web
    docker-compose up -d
    
    echo "⏳ Attente du démarrage de PostgreSQL..."
    sleep 5
    docker-compose exec -T web npx prisma db push

    echo "✅ Déploiement Docker terminé avec succès !"
    echo "Statut des conteneurs :"
    docker-compose ps

elif [ "$MODE" == "pm2" ]; then
    echo "📦 Déploiement via PM2 & Node.js direct..."
    npm ci
    npx prisma generate
    npx prisma db push
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
echo " ✨ Site AMA déployé et actif sur le VPS !"
echo "======================================================="
