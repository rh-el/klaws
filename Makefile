.PHONY: help dev-up dev-down dev-logs dev-build dev-restart prod-up prod-down prod-logs prod-build test-up test-down test-logs clean setup

# Default target
help:
	@echo "KLAWS Docker Management Commands"
	@echo ""
	@echo "Development:"
	@echo "  make setup          - Initial setup (copy env files)"
	@echo "  make dev-up         - Start development environment"
	@echo "  make dev-down       - Stop development environment"
	@echo "  make dev-logs       - View development logs"
	@echo "  make dev-build      - Rebuild development containers"
	@echo "  make dev-restart    - Restart development services"
	@echo "  make dev-shell-be   - Open backend shell"
	@echo "  make dev-shell-fe   - Open frontend shell"
	@echo "  make dev-shell-db   - Open database shell"
	@echo ""
	@echo "Production:"
	@echo "  make prod-up        - Start production environment"
	@echo "  make prod-down      - Stop production environment"
	@echo "  make prod-logs      - View production logs"
	@echo "  make prod-build     - Rebuild production containers"
	@echo "  make prod-backup    - Backup production database"
	@echo ""
	@echo "Testing:"
	@echo "  make test-up        - Start test environment"
	@echo "  make test-down      - Stop test environment"
	@echo "  make test-run       - Run tests"
	@echo "  make test-clean     - Clean test environment"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean          - Remove all containers and volumes"
	@echo "  make prune          - Remove unused Docker resources"
	@echo "  make status         - Show status of all environments"

# Setup
setup:
	@echo "Setting up environment files..."
	@if [ ! -f .env.dev ]; then cp env.examples/env.dev .env.dev && echo "Created .env.dev"; fi
	@if [ ! -f .env.test ]; then cp env.examples/env.test .env.test && echo "Created .env.test"; fi
	@if [ ! -f .env.prod ]; then \
		cp env.examples/env.prod .env.prod && \
		echo "Created .env.prod - IMPORTANT: Update passwords before using!"; \
	fi
	@echo "Setup complete!"

# Development commands
dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-build:
	docker-compose -f docker-compose.dev.yml up -d --build

dev-restart:
	docker-compose -f docker-compose.dev.yml restart

dev-shell-be:
	docker-compose -f docker-compose.dev.yml exec backend bash

dev-shell-fe:
	docker-compose -f docker-compose.dev.yml exec frontend sh

dev-shell-db:
	docker-compose -f docker-compose.dev.yml exec db psql -U klaws_dev -d klaws_dev

# Production commands
prod-up:
	@if [ ! -f .env.prod ]; then \
		echo "Error: .env.prod not found. Run 'make setup' first."; \
		exit 1; \
	fi
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

prod-down:
	docker-compose -f docker-compose.prod.yml down

prod-logs:
	docker-compose -f docker-compose.prod.yml logs -f

prod-build:
	@if [ ! -f .env.prod ]; then \
		echo "Error: .env.prod not found. Run 'make setup' first."; \
		exit 1; \
	fi
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

prod-backup:
	@mkdir -p backups
	@TIMESTAMP=$$(date +%Y%m%d_%H%M%S) && \
	docker-compose -f docker-compose.prod.yml exec -T db pg_dump -U klaws_prod klaws_prod > backups/backup_$$TIMESTAMP.sql && \
	echo "Database backed up to backups/backup_$$TIMESTAMP.sql"

prod-shell-be:
	docker-compose -f docker-compose.prod.yml exec backend bash

prod-shell-db:
	docker-compose -f docker-compose.prod.yml exec db psql -U klaws_prod -d klaws_prod

# Test commands
test-up:
	docker-compose -f docker-compose.test.yml up -d

test-down:
	docker-compose -f docker-compose.test.yml down

test-logs:
	docker-compose -f docker-compose.test.yml logs -f

test-run:
	@echo "Running backend tests..."
	docker-compose -f docker-compose.test.yml exec backend pytest || true
	@echo ""
	@echo "Running frontend tests..."
	docker-compose -f docker-compose.test.yml exec frontend npm test || true

test-clean:
	docker-compose -f docker-compose.test.yml down -v

# Utility commands
clean:
	@echo "Stopping all environments..."
	@docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
	@docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true
	@docker-compose -f docker-compose.test.yml down -v 2>/dev/null || true
	@echo "All containers and volumes removed"

prune:
	docker system prune -a --volumes

status:
	@echo "=== Development Environment ==="
	@docker-compose -f docker-compose.dev.yml ps 2>/dev/null || echo "Not running"
	@echo ""
	@echo "=== Production Environment ==="
	@docker-compose -f docker-compose.prod.yml ps 2>/dev/null || echo "Not running"
	@echo ""
	@echo "=== Test Environment ==="
	@docker-compose -f docker-compose.test.yml ps 2>/dev/null || echo "Not running"

