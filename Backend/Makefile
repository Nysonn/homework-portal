# Makefile for Docker Compose Development

# Variables
COMPOSE_FILE = docker-compose.yml
PROJECT_NAME = homework-portal

# Default target
.DEFAULT_GOAL := help

# Colors for output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
NC = \033[0m # No Color

## Development Commands

.PHONY: dev
dev: ## Start backend service in development mode
	@echo "$(GREEN)Starting backend service...$(NC)"
	docker-compose -f $(COMPOSE_FILE) up --build

.PHONY: dev-detached
dev-detached: ## Start backend service in development mode (detached)
	@echo "$(GREEN)Starting backend service in detached mode...$(NC)"
	docker-compose -f $(COMPOSE_FILE) up --build -d

.PHONY: stop
stop: ## Stop all running services
	@echo "$(YELLOW)Stopping all services...$(NC)"
	docker-compose -f $(COMPOSE_FILE) stop

.PHONY: down
down: ## Stop and remove all containers, networks
	@echo "$(RED)Stopping and removing containers...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down

.PHONY: down-volumes
down-volumes: ## Stop and remove all containers, networks, and volumes
	@echo "$(RED)Stopping and removing containers, networks, and volumes...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down -v

.PHONY: restart
restart: down dev ## Restart all services

## Build Commands

.PHONY: build
build: ## Build all services
	@echo "$(GREEN)Building all services...$(NC)"
	docker-compose -f $(COMPOSE_FILE) build

.PHONY: build-no-cache
build-no-cache: ## Build all services without cache
	@echo "$(GREEN)Building all services without cache...$(NC)"
	docker-compose -f $(COMPOSE_FILE) build --no-cache

.PHONY: pull
pull: ## Pull latest images
	@echo "$(GREEN)Pulling latest images...$(NC)"
	docker-compose -f $(COMPOSE_FILE) pull

## Service Management

.PHONY: logs
logs: ## Show logs for all services
	docker-compose -f $(COMPOSE_FILE) logs -f

.PHONY: logs-backend
logs-backend: ## Show backend service logs
	docker-compose -f $(COMPOSE_FILE) logs -f backend

.PHONY: backend-shell
backend-shell: ## Connect to backend container shell
	docker-compose -f $(COMPOSE_FILE) exec backend /bin/bash

.PHONY: ps
ps: ## Show running containers
	docker-compose -f $(COMPOSE_FILE) ps

## Cleanup Commands

.PHONY: clean
clean: ## Remove stopped containers and unused images
	@echo "$(YELLOW)Cleaning up containers and images...$(NC)"
	docker container prune -f
	docker image prune -f

.PHONY: clean-all
clean-all: ## Remove all containers, images, volumes, and networks
	@echo "$(RED)WARNING: This will remove ALL Docker resources!$(NC)"
	@read -p "Are you sure? [y/N]: " confirm && [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]
	docker system prune -a -f --volumes

## Environment

.PHONY: env-example
env-example: ## Create example environment file
	@echo "$(GREEN)Creating .env.example file...$(NC)"
	@echo "DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require" > .env.example
	@echo "SESSION_SECRET=your-super-secret-session-key-here" >> .env.example
	@echo "JWT_SECRET=your-super-secret-jwt-key-here" >> .env.example
	@echo "PORT=3001" >> .env.example
	@echo "CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name" >> .env.example
	@echo "CLOUDINARY_API_KEY=your-cloudinary-api-key" >> .env.example
	@echo "CLOUDINARY_API_SECRET=your-cloudinary-api-secret" >> .env.example
	@echo "Created .env.example - copy to .env and update values"

.PHONY: check-env
check-env: ## Check if required environment variables are set
	@echo "$(GREEN)Checking environment variables...$(NC)"
	@if [ ! -f .env ]; then echo "$(RED)Error: .env file not found!$(NC)"; exit 1; fi
	@grep -q "DATABASE_URL" .env || (echo "$(RED)Error: DATABASE_URL not set in .env$(NC)" && exit 1)
	@grep -q "SESSION_SECRET" .env || (echo "$(RED)Error: SESSION_SECRET not set in .env$(NC)" && exit 1)
	@echo "$(GREEN)Environment variables check passed!$(NC)"

## Help

.PHONY: help
help: ## Show this help message
	@echo "$(GREEN)Available commands:$(NC)"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  $(YELLOW)%-18s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(GREEN)Quick start:$(NC)"
	@echo "  1. Ensure .env file exists with DATABASE_URL and SESSION_SECRET"
	@echo "  2. Start development: $(YELLOW)make dev$(NC)"
	@echo "  3. View logs: $(YELLOW)make logs$(NC)"
