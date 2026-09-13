#!/bin/bash
# Script de sauvegarde automatique de la base PostgreSQL AMA
# À planifier dans le crontab du VPS (ex: tous les jours à 2h du matin : 0 2 * * * /path/to/backup-db.sh)

BACKUP_DIR="/var/backups/ama_db"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/ama_backup_$TIMESTAMP.sql.gz"

echo "📦 Début de la sauvegarde PostgreSQL AMA..."

# Si utilisation de Docker Compose
if docker ps | grep -q ama_postgres; then
    docker exec -t ama_postgres pg_dumpall -c -U ama_user | gzip > "$BACKUP_FILE"
else
    # Si PostgreSQL natif sur le VPS
    pg_dump -U postgres -d ama_db | gzip > "$BACKUP_FILE"
fi

echo "✅ Sauvegarde créée : $BACKUP_FILE"

# Suppression des sauvegardes de plus de 30 jours pour économiser l'espace disque du VPS
find "$BACKUP_DIR" -type f -name "ama_backup_*.sql.gz" -mtime +30 -delete
echo "🧹 Nettoyage des anciennes sauvegardes effectué."
