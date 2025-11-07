# Docker Files Reference - Quick Guide

## 📁 All Files Created/Modified

### Core Docker Files

| File | Purpose | Key Features |
|------|---------|-------------|
| `server/Dockerfile` | Backend container | Python 3.12, non-root user, health checks |
| `server/.dockerignore` | Backend build exclusions | Excludes __pycache__, .venv, .env |
| `client/Dockerfile` | Frontend container (multi-stage) | 3 stages: builder, dev, production |
| `client/.dockerignore` | Frontend build exclusions | Excludes node_modules, dist |
| `client/nginx.conf` | Production web server | Gzip, caching, API proxy, SPA routing |
| `.dockerignore` | Root build exclusions | Project-wide exclusions |

### Environment Configuration

| File | Environment | Database | Ports |
|------|------------|----------|-------|
| `docker-compose.dev.yml` | Development | klaws_dev (volume) | 5173, 8000, 5432 |
| `docker-compose.prod.yml` | Production | klaws_prod (volume) | 80, 8000, 5432 |
| `docker-compose.test.yml` | Test | klaws_test (tmpfs) | 5174, 8001, 5433 |

### Environment Variables

| Location | File | Description |
|----------|------|-------------|
| `env.examples/env.dev` | Development template | Safe for version control |
| `env.examples/env.prod` | Production template | **UPDATE PASSWORDS!** |
| `env.examples/env.test` | Test template | Safe for version control |
| `env.examples/README.md` | Setup instructions | Environment variables guide |

**To use:** Copy from `env.examples/` to root as `.env.dev`, `.env.prod`, `.env.test`

### Convenience Scripts

| Script | Command | Environment |
|--------|---------|-------------|
| `start-dev.sh` | `./start-dev.sh` | Development |
| `start-prod.sh` | `./start-prod.sh` | Production |
| `start-test.sh` | `./start-test.sh` | Test |
| `Makefile` | `make [command]` | All (see below) |

### Documentation

| File | Content | Audience |
|------|---------|----------|
| `QUICKSTART.md` | Getting started guide | Developers (quick start) |
| `DOCKER_README.md` | Comprehensive docs | All users (detailed) |
| `DOCKER_SETUP_SUMMARY.md` | Complete setup overview | DevOps/Admin |
| `DOCKER_FILES_REFERENCE.md` | This file | Quick reference |

### CI/CD

| File | Purpose |
|------|---------|
| `.github/workflows/docker-build.yml.example` | GitHub Actions template |

### Modified Files

| File | Changes |
|------|---------|
| `server/app/main.py` | Added Docker-compatible CORS origins |
| `server/requirements.txt` | Added `requests` for health checks |
| `.gitignore` | Added Docker and environment exclusions |

## 🎯 Command Cheat Sheet

### Make Commands (Recommended)

```bash
# First time setup
make setup          # Copy environment templates

# Development
make dev-up         # Start development
make dev-down       # Stop development
make dev-logs       # View logs
make dev-build      # Rebuild
make dev-shell-be   # Backend shell
make dev-shell-fe   # Frontend shell
make dev-shell-db   # Database shell

# Production
make prod-up        # Start production
make prod-down      # Stop production
make prod-build     # Rebuild
make prod-backup    # Backup database

# Testing
make test-up        # Start test env
make test-run       # Run all tests
make test-clean     # Clean test env

# Utilities
make status         # Show all environments status
make clean          # Remove all containers/volumes
make help           # Show all commands
```

### Shell Script Commands

```bash
# Development
./start-dev.sh

# Production
./start-prod.sh

# Test
./start-test.sh
```

### Direct Docker Compose Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml logs -f

# Production
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
docker-compose -f docker-compose.prod.yml down

# Test
docker-compose -f docker-compose.test.yml up -d
docker-compose -f docker-compose.test.yml down -v
```

## 🌐 Service URLs by Environment

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Database: localhost:5432

### Production
- Frontend: http://localhost:80
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Database: localhost:5432

### Test
- Frontend: http://localhost:5174
- Backend: http://localhost:8001
- API Docs: http://localhost:8001/docs
- Database: localhost:5433

## 🔑 Container Names

### Development
- `klaws-frontend-dev`
- `klaws-backend-dev`
- `klaws-db-dev`

### Production
- `klaws-frontend-prod`
- `klaws-backend-prod`
- `klaws-db-prod`

### Test
- `klaws-frontend-test`
- `klaws-backend-test`
- `klaws-db-test`

## 📊 Network Names

- Development: `klaws-network`
- Production: `klaws-network`
- Test: `klaws-test-network`

## 💾 Volume Names

- Development: `postgres_dev_data`
- Production: `postgres_prod_data`
- Test: (tmpfs - no volume)

## 🔧 Common Operations

### Database Access

```bash
# Development
docker-compose -f docker-compose.dev.yml exec db psql -U klaws_dev -d klaws_dev

# Production
docker-compose -f docker-compose.prod.yml exec db psql -U klaws_prod -d klaws_prod

# Or use Make
make dev-shell-db
make prod-shell-db
```

### View Logs

```bash
# All services
make dev-logs

# Specific service
docker-compose -f docker-compose.dev.yml logs -f backend

# Last 100 lines
docker-compose -f docker-compose.dev.yml logs --tail=100
```

### Execute Commands in Containers

```bash
# Backend (development)
docker-compose -f docker-compose.dev.yml exec backend python manage.py migrate

# Frontend (development)
docker-compose -f docker-compose.dev.yml exec frontend npm install new-package

# Or use Make
make dev-shell-be    # Then run commands
make dev-shell-fe    # Then run commands
```

### Database Operations

```bash
# Backup (using Make)
make prod-backup

# Backup (manual - creates backup.sql in current directory)
docker-compose -f docker-compose.prod.yml exec db pg_dump -U klaws_prod klaws_prod > backup.sql

# Restore
docker-compose -f docker-compose.prod.yml exec -T db psql -U klaws_prod klaws_prod < backup.sql

# Reset development database
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

## 🚀 Deployment Workflow

### Development

1. Copy environment: `make setup`
2. Start services: `make dev-up`
3. Develop (hot-reload active)
4. View logs: `make dev-logs`
5. Stop services: `make dev-down`

### Production

1. Setup: `make setup`
2. Edit `.env.prod` with secure credentials
3. Build & deploy: `make prod-up`
4. Monitor: `make prod-logs`
5. Backup regularly: `make prod-backup`

### Testing

1. Start: `make test-up`
2. Run tests: `make test-run`
3. Clean up: `make test-clean`

## 🔒 Security Checklist

Before production:
- [ ] Update all passwords in `.env.prod`
- [ ] Use strong, random passwords (20+ characters)
- [ ] Never commit `.env.prod` to git
- [ ] Review CORS origins in `server/app/main.py`
- [ ] Enable SSL/TLS (add nginx-proxy or Traefik)
- [ ] Set up firewall rules
- [ ] Configure automated backups
- [ ] Set up monitoring and alerting
- [ ] Review resource limits

## 📝 File Locations Quick Reference

```
/Users/w.petitpierre/.cursor/worktrees/klaws/tT4MP/
├── client/
│   ├── Dockerfile              ← Frontend container definition
│   ├── nginx.conf              ← Production web server config
│   └── .dockerignore           ← Frontend build exclusions
├── server/
│   ├── Dockerfile              ← Backend container definition
│   └── .dockerignore           ← Backend build exclusions
├── env.examples/               ← Environment templates (COPY THESE)
│   ├── env.dev
│   ├── env.prod
│   └── env.test
├── docker-compose.dev.yml      ← Development environment
├── docker-compose.prod.yml     ← Production environment
├── docker-compose.test.yml     ← Test environment
├── Makefile                    ← Convenient commands
├── start-dev.sh                ← Dev startup script
├── start-prod.sh               ← Prod startup script
├── start-test.sh               ← Test startup script
├── QUICKSTART.md               ← Getting started guide
├── DOCKER_README.md            ← Comprehensive documentation
└── DOCKER_SETUP_SUMMARY.md     ← Complete overview
```

## 🎓 Learning Path

1. **Beginner**: Start with `QUICKSTART.md`
2. **Daily Use**: Reference this file for commands
3. **Troubleshooting**: Check `DOCKER_README.md`
4. **Deep Dive**: Read `DOCKER_SETUP_SUMMARY.md`

## 💡 Tips

- Use `make help` to see all available commands
- Use `make status` to check all environments at once
- Development has hot-reload - no need to rebuild
- Production requires rebuild after code changes
- Test environment can run alongside dev (different ports)
- Always backup before production deployments
- Use `.dockerignore` to speed up builds
- Check logs if services don't start: `make dev-logs`

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | Use test env (different ports) or kill process |
| Container won't start | Check logs: `make dev-logs [service]` |
| Database connection error | Wait for health check, check logs |
| Changes not reflecting (dev) | Should auto-reload, restart if needed |
| Changes not reflecting (prod) | Rebuild required: `make prod-build` |
| Out of disk space | `make clean` then `make prune` |
| Permission denied | Check Docker daemon is running |

---

**Quick Start**: `make setup && make dev-up`

**Documentation**: Start with `QUICKSTART.md`

**Help**: `make help`

