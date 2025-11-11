#!/bin/bash
# Start production environment

echo "🚀 Starting KLAWS production environment..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env.prod exists
if [ ! -f .env.prod ]; then
    echo "❌ Error: .env.prod file not found!"
    echo "   Please create .env.prod from .env.prod.example and update with secure credentials."
    echo "   Run: cp .env.prod.example .env.prod"
    exit 1
fi

# Build and start services
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

echo ""
echo "✅ Services started successfully!"
echo ""
echo "📍 Service URLs:"
echo "   Frontend:  http://localhost:80"
echo "   Backend:   http://localhost:8000"
echo "   Database:  localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "   View logs:        docker-compose -f docker-compose.prod.yml logs -f"
echo "   Stop services:    docker-compose -f docker-compose.prod.yml down"
echo "   Database backup:  docker-compose -f docker-compose.prod.yml exec db pg_dump -U klaws_prod klaws_prod > backup.sql"
echo ""

