.PHONY: build up down restart restart-no-cache logs clean

SERVICE_NAME = react-app
ENV_PATH = --env-file .env
COMPOSE_FILE = docker_compose/front/docker-compose.yml
COMPOSE_FILE_PROD = docker_compose/front/docker-compose-prod.yml

build:
	docker compose $(ENV_PATH) -f $(COMPOSE_FILE) build

up:
	docker compose -f $(COMPOSE_FILE) $(ENV_PATH) up -d

up-prod:
	docker compose -f $(COMPOSE_FILE_PROD) $(ENV_PATH) up -d --build

down-prod:
	docker compose -f $(COMPOSE_FILE_PROD) $(ENV_PATH) down

down:
	docker compose $(ENV_PATH) -f $(COMPOSE_FILE) down

restart: 
	docker compose $(ENV_PATH) -f $(COMPOSE_FILE) down
	docker compose $(ENV_PATH) -f $(COMPOSE_FILE) up -d
	@echo "Service $(SERVICE_NAME) restarted."

restart-no-cache: down
	docker compose $(ENV_PATH) -f $(COMPOSE_FILE) build --no-cache
	docker compose $(ENV_PATH) -f $(COMPOSE_FILE) up -d
	@echo "Service $(SERVICE_NAME) restarted without cache."

logs:
	docker compose -f $(COMPOSE_FILE) logs -f $(SERVICE_NAME)

logs-all:
	docker compose -f $(COMPOSE_FILE) logs -f

clean: down
	docker compose -f $(COMPOSE_FILE) down -vf
	@echo "Docker середовище очищено."

shell:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) sh

npm-install:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm install

npm-build:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm run build