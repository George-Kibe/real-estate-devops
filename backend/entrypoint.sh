#!/bin/sh
set -e

echo "Waiting for Postgres at $POSTGRES_DB_HOST:$POSTGRES_DB_PORT..."
while ! nc -z "$POSTGRES_DB_HOST" "$POSTGRES_DB_PORT"; do
  sleep 0.5
done

echo "Postgres is up — applying migrations..."

python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn project.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --threads 2 \
    --timeout 120