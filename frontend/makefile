.PHONY: build up down restart restart-no-cache logs clean

SERVICE_NAME = react-app
ENV_PATH = --env-file .env
COMPOSE_FILE = docker_compose/front/docker-compose.yml
COMPOSE_FILE_PROD = docker_compose/front/docker-compose-prod.yml
NETWORK_NAME = backend
NETWORK_NAME_PROD = backend-prod

MAKE = make

.PHONY: check-network \
        up-all up-all-no-cache \
        up-monitoring up-monitoring-no-cache \
        down-all down-all-volumes \
        down-monitoring down-monitoring-volumes \
        up-django logs-monitoring \
        up-db up-db-no-cache down-db down-db-volumes logs-db \
        up-django no-cache-django down-django down-django-volumes logs-django \
        up-pgadmin down-pgadmin logs-pgadmin \
        up-adminer down-adminer logs-adminer \
        up-redis down-redis logs-redis \
        up-nginx down-nginx logs-nginx \
        up-elastic up-kibana up-apm \
        down-elastic down-kibana down-apm \
        logs-elastic logs-kibana logs-apm \
		test-apm load-backup

check-network:
	@echo "Checking for network $(NETWORK_NAME)..."
	@if ! docker network ls | grep -q $(NETWORK_NAME); then \
		echo "Network $(NETWORK_NAME) does not exist. Creating..."; \
		docker network create $(NETWORK_NAME); \
	else \
		echo "Network $(NETWORK_NAME) already exists."; \
	fi

check-network-prod:
	@echo "Checking for network $(NETWORK_NAME_PROD)..."
	@if ! docker network ls | grep -q $(NETWORK_NAME_PROD); then \
		echo "Network $(NETWORK_NAME_PROD) does not exist. Creating..."; \
		docker network create $(NETWORK_NAME_PROD); \
	else \
		echo "Network $(NETWORK_NAME_PROD) already exists."; \
	fi

build:
	docker compose $(ENV_PATH) -f $(COMPOSE_FILE) build

up:
	docker compose -f $(COMPOSE_FILE) $(ENV_PATH) up -d

up-prod: check-network-prod
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