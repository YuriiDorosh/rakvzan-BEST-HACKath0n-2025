.PHONY: build up down restart restart-no-cache logs clean

SERVICE_NAME = react-app
ENV_PATH = docker_compose/front/env/.env
COMPOSE_FILE = docker_compose/front/docker-compose.yml

build:
	docker compose --env-file $(ENV_PATH) -f $(COMPOSE_FILE) build

up:
	docker compose --env-file $(ENV_PATH) -f $(COMPOSE_FILE) up -d

down:
	docker compose --env-file $(ENV_PATH) -f $(COMPOSE_FILE) down

restart: 
	docker compose --env-file $(ENV_PATH) -f $(COMPOSE_FILE) down
	docker compose --env-file $(ENV_PATH) -f $(COMPOSE_FILE) up -d
	@echo "Service $(SERVICE_NAME) restarted."

restart-no-cache: down
	docker compose --env-file $(ENV_PATH) -f $(COMPOSE_FILE) build --no-cache
	docker compose --env-file $(ENV_PATH) -f $(COMPOSE_FILE) up -d
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