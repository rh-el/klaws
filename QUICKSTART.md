# KLAWS - Quick Start Guide

This guide will help you get the KLAWS application running in Docker containers.

## Prerequisites

Ensure you have the following installed:
- Docker Engine 20.10 or higher
- Docker Compose 2.0 or higher

Verify installation:
```bash
docker --version
docker-compose --version
```

## Quick Start - Development Environment

### Option 1: Using the start script (Recommended)

```bash
# Make sure you're in the project root
./start-dev.sh
```

### Option 2: Manual start

```bash
# Copy environment variables
cp env.examples/env.dev .env.dev

# Start services
docker-compose -f docker-compose.dev.yml up -d
```

### Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: localhost:5432

### Verify Everything is Running

```bash
# Check container status
docker-compose -f docker-compose.dev.yml ps

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

You should see 3 containers running:
- `klaws-frontend-dev`
- `klaws-backend-dev`
- `klaws-db-dev`

### Stop Development Environment

```bash
docker-compose -f docker-compose.dev.yml down
```

## Production Environment

### Setup

```bash
# Copy and edit environment variables
cp env.examples/env.prod .env.prod

# IMPORTANT: Edit .env.prod with secure passwords
nano .env.prod  # or use your preferred editor
```

Update these values in `.env.prod`:
- `POSTGRES_PASSWORD`: Use a strong, random password
- `POSTGRES_USER`: Change if desired
- Add any additional secrets (JWT_SECRET, etc.)

### Start Production Environment

```bash
# Using the start script
./start-prod.sh

# Or manually
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

### Access Production Application

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Stop Production Environment

```bash
docker-compose -f docker-compose.prod.yml down
```

## Test Environment

### Setup and Run

```bash
# Copy environment variables
cp env.examples/env.test .env.test

# Start test environment
./start-test.sh

# Or manually
docker-compose -f docker-compose.test.yml up -d
```

### Run Tests

```bash
# Backend tests
docker-compose -f docker-compose.test.yml exec backend pytest

# Frontend tests
docker-compose -f docker-compose.test.yml exec frontend npm test
```

### Access Test Services

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:8001
- **Database**: localhost:5433

### Cleanup Test Environment

```bash
docker-compose -f docker-compose.test.yml down -v
```

## Common Tasks

### View Logs

```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f backend
```

### Restart a Service

```bash
docker-compose -f docker-compose.dev.yml restart backend
```

### Rebuild After Code Changes

```bash
# Development (hot-reload is enabled, no rebuild needed)
# Just save your files and they'll update automatically

# Production (rebuild required)
docker-compose -f docker-compose.prod.yml up -d --build
```

### Access Container Shell

```bash
# Backend
docker-compose -f docker-compose.dev.yml exec backend bash

# Frontend
docker-compose -f docker-compose.dev.yml exec frontend sh

# Database
docker-compose -f docker-compose.dev.yml exec db psql -U klaws_dev -d klaws_dev
```

### Database Operations

```bash
# Backup database
docker-compose -f docker-compose.prod.yml exec db pg_dump -U klaws_prod klaws_prod > backup.sql

# Restore database
docker-compose -f docker-compose.prod.yml exec -T db psql -U klaws_prod klaws_prod < backup.sql

# Reset development database
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

### Clean Up Everything

```bash
# Stop all containers and remove volumes
docker-compose -f docker-compose.dev.yml down -v

# Remove all unused Docker resources
docker system prune -a --volumes
```

## Troubleshooting

### Port Already in Use

If you get a port conflict error:

```bash
# Check what's using the port
lsof -i :5173  # or :8000, :5432

# Stop the conflicting process or change ports in docker-compose
```

### Container Won't Start

```bash
# Check logs for errors
docker-compose -f docker-compose.dev.yml logs [service-name]

# Rebuild from scratch
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d --build
```

### Database Connection Error

```bash
# Check if database is ready
docker-compose -f docker-compose.dev.yml exec db pg_isready

# Verify DATABASE_URL
docker-compose -f docker-compose.dev.yml exec backend env | grep DATABASE_URL
```

### Changes Not Reflecting

**Development:**
- Frontend and backend have hot-reload enabled
- Just save your files - no rebuild needed
- If issues persist, restart the service

**Production:**
- Changes require rebuild: `docker-compose -f docker-compose.prod.yml up -d --build`

## Next Steps

- Read [DOCKER_README.md](./DOCKER_README.md) for detailed documentation
- Configure CI/CD pipeline
- Set up SSL/TLS for production
- Add monitoring and logging
- Implement database migrations

## Project Structure

```
klaws/
├── client/                    # Frontend (React + Vite)
│   ├── src/                  # Source code
│   ├── Dockerfile            # Frontend container
│   └── nginx.conf            # Production web server config
├── server/                    # Backend (FastAPI)
│   ├── app/                  # Application code
│   ├── Dockerfile            # Backend container
│   └── requirements.txt      # Python dependencies
├── env.examples/             # Environment variable templates
├── docker-compose.dev.yml    # Development configuration
├── docker-compose.prod.yml   # Production configuration
├── docker-compose.test.yml   # Test configuration
├── start-dev.sh              # Development startup script
├── start-prod.sh             # Production startup script
└── start-test.sh             # Test startup script
```

## Support

For detailed documentation, see:
- [DOCKER_README.md](./DOCKER_README.md) - Comprehensive Docker documentation
- [env.examples/README.md](./env.examples/README.md) - Environment variables guide

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Docker Network                       │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │   Frontend   │───▶│   Backend    │───▶│ Database │  │
│  │  (Node.js)   │    │   (Python)   │    │(Postgres)│  │
│  │ Port: 5173/80│    │  Port: 8000  │    │Port: 5432│  │
│  └──────────────┘    └──────────────┘    └──────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

Happy coding! 🚀

