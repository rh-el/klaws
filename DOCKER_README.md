# Docker Setup for KLAWS Application

This document describes the Docker setup for the KLAWS application with three distinct environments: development, production, and test.

## Architecture

The application consists of three containers:

-   **Frontend**: React + Vite application (Node.js)
-   **Backend**: FastAPI application (Python)
-   **Database**: PostgreSQL database

## Prerequisites

-   Docker Engine 20.10+
-   Docker Compose 2.0+
-   Docker images pulled from Docker Hub:
    -   `python:3.12-slim`
    -   `node:22-alpine`
    -   `postgres:16-alpine`

## Project Structure

```
.
├── client/                    # Frontend application
│   ├── Dockerfile            # Multi-stage Dockerfile for frontend
│   ├── nginx.conf            # Nginx config for production
│   └── .dockerignore         # Frontend ignore patterns
├── server/                    # Backend application
│   ├── Dockerfile            # Backend Dockerfile
│   └── .dockerignore         # Backend ignore patterns
├── docker-compose.dev.yml    # Development environment
├── docker-compose.prod.yml   # Production environment
├── docker-compose.test.yml   # Test environment
├── .env.dev                  # Development environment variables
├── .env.prod.example         # Production environment template
└── .env.test                 # Test environment variables
```

## Environment Setup

### Development Environment

For local development with hot-reload:

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

**Services:**

-   Frontend: http://localhost:5173
-   Backend: http://localhost:8000
-   Database: localhost:5432

**Features:**

-   Hot-reload enabled for both frontend and backend
-   Source code mounted as volumes
-   Development dependencies included

### Production Environment

For production deployment:

```bash
# First, create .env.prod from template
cp .env.prod.example .env.prod
# Edit .env.prod with secure credentials

# Build and start services
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

**Services:**

-   Frontend: http://localhost:80 (Nginx)
-   Backend: http://localhost:8000
-   Database: localhost:5432

**Features:**

-   Optimized production builds
-   Nginx serving static files with caching
-   Resource limits configured
-   No source code volumes
-   Health checks enabled

### Test Environment

For running tests in isolation:

```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run tests (example commands)
docker-compose -f docker-compose.test.yml exec backend pytest
docker-compose -f docker-compose.test.yml exec frontend npm test

# Clean up
docker-compose -f docker-compose.test.yml down -v
```

**Services:**

-   Frontend: http://localhost:5174
-   Backend: http://localhost:8001
-   Database: localhost:5433

**Features:**

-   Isolated test database using tmpfs (faster)
-   Different ports to avoid conflicts
-   No restart policies
-   Can run alongside dev environment

## Common Commands

### Building Images

```bash
# Build specific service
docker-compose -f docker-compose.dev.yml build backend
docker-compose -f docker-compose.dev.yml build frontend

# Build all services
docker-compose -f docker-compose.dev.yml build

# Build without cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Managing Containers

```bash
# Start services
docker-compose -f docker-compose.dev.yml up -d

# Stop services
docker-compose -f docker-compose.dev.yml stop

# Restart specific service
docker-compose -f docker-compose.dev.yml restart backend

# Remove containers and volumes
docker-compose -f docker-compose.dev.yml down -v
```

### Viewing Logs

```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f backend

# Last 100 lines
docker-compose -f docker-compose.dev.yml logs --tail=100
```

### Executing Commands

```bash
# Backend shell
docker-compose -f docker-compose.dev.yml exec backend bash

# Run database migrations
docker-compose -f docker-compose.dev.yml exec backend python -m alembic upgrade head

# Frontend shell
docker-compose -f docker-compose.dev.yml exec frontend sh

# Database psql
docker-compose -f docker-compose.dev.yml exec db psql -U klaws_dev -d klaws_dev
```

### Database Management

```bash
# Backup database
docker-compose -f docker-compose.prod.yml exec db pg_dump -U klaws_prod klaws_prod > backup.sql

# Restore database
docker-compose -f docker-compose.prod.yml exec -T db psql -U klaws_prod klaws_prod < backup.sql

# Reset development database
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

## Multi-Stage Frontend Build

The frontend Dockerfile uses multi-stage builds:

1. **Builder Stage**: Compiles the React application
2. **Development Stage**: Runs Vite dev server with hot-reload
3. **Production Stage**: Serves optimized build with Nginx

## Networking

Each environment has its own Docker network:

-   Development: `klaws-network`
-   Production: `klaws-network`
-   Test: `klaws-test-network`

Services communicate using service names (e.g., `http://backend:8000`, `postgresql://db:5432`)

## Volumes

### Development

-   Source code mounted for hot-reload
-   Named volume for PostgreSQL: `postgres_dev_data`

### Production

-   No source code mounts
-   Named volume for PostgreSQL: `postgres_prod_data`

### Test

-   Source code mounted (frontend only)
-   tmpfs for PostgreSQL (ephemeral, faster)

## Security Considerations

### Development

-   Uses simple passwords (not for production!)
-   All ports exposed for debugging

### Production

-   **IMPORTANT**: Update `.env.prod` with secure passwords
-   Consider using Docker secrets for sensitive data
-   Resource limits configured
-   Non-root user in backend container
-   Security headers in Nginx

### Environment Variables

-   Never commit `.env.prod` to version control
-   Use strong passwords for production databases
-   Rotate credentials regularly

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose -f docker-compose.dev.yml logs [service-name]

# Check container status
docker-compose -f docker-compose.dev.yml ps

# Rebuild container
docker-compose -f docker-compose.dev.yml up -d --build [service-name]
```

### Database connection errors

```bash
# Check if database is ready
docker-compose -f docker-compose.dev.yml exec db pg_isready

# Check database logs
docker-compose -f docker-compose.dev.yml logs db

# Verify DATABASE_URL in backend
docker-compose -f docker-compose.dev.yml exec backend env | grep DATABASE_URL
```

### Port conflicts

```bash
# Check what's using the port
lsof -i :5173  # or :8000, :5432

# Stop conflicting services or change ports in docker-compose
```

### Clear everything and start fresh

```bash
# Stop all containers
docker-compose -f docker-compose.dev.yml down

# Remove unused images
docker image prune -a

# Rebuild and restart
docker-compose -f docker-compose.dev.yml up -d --build
```

## Performance Optimization

### Development

-   Use `.dockerignore` to exclude unnecessary files
-   Mount only necessary directories
-   Use named volumes for `node_modules`

### Production

-   Multi-stage builds minimize image size
-   Nginx caching for static assets
-   Gzip compression enabled
-   Resource limits prevent resource exhaustion

## Next Steps

1. Set up CI/CD pipeline for automated builds
2. Add health check endpoints to backend
3. Configure SSL/TLS for production (nginx-proxy, Let's Encrypt)
4. Set up monitoring and logging (Prometheus, Grafana)
5. Implement database migrations (Alembic)
6. Add comprehensive testing suite

## Additional Resources

-   [Docker Documentation](https://docs.docker.com/)
-   [Docker Compose Documentation](https://docs.docker.com/compose/)
-   [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
-   [Vite Production Build](https://vitejs.dev/guide/build.html)
