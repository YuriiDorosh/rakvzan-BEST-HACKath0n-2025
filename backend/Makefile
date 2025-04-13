ENV = --env-file .env
LOGS = docker logs
EXEC = docker exec -it
DC = docker compose
MANAGE_PY = python src/manage.py


APP_CONTAINER = django
WORKER_1_CONTAINER = celery_worker_1
WORKER_2_CONTAINER = celery_worker_2
WORKER_3_CONTAINER = celery_worker_3
WORKER_4_CONTAINER = celery_worker_4
WORKER_BEAT_CONTAINER = celery_beat
REDIS_CONTAINER = redis
NGINX_CONTAINER = nginx
DB_CONTAINER = postgres
ELASTIC_CONTAINER = elasticsearch
KIBANA_CONTAINER = kibana
APM_CONTAINER = apm-server
FASTAPI_CONTAINER = fastapi

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

up-all: check-network
	$(MAKE) up-db
	$(MAKE) up-django
	$(MAKE) up-pgadmin
	$(MAKE) up-adminer
	$(MAKE) up-monitoring
	$(MAKE) fastapi

up-all-no-cache: check-network
	$(MAKE) up-db-no-cache
	$(MAKE) up-django-no-cache
	$(MAKE) up-pgadmin
	$(MAKE) up-adminer
	$(MAKE) up-monitoring
	$(MAKE) up-fastapi

down-all:
	$(MAKE) down-db
	$(MAKE) down-django
	$(MAKE) down-pgadmin
	$(MAKE) down-adminer
	$(MAKE) down-monitoring
	$(MAKE) down-fastapi

up-all-without-monitoring: check-network
	$(MAKE) up-db
	$(MAKE) up-django
	$(MAKE) up-pgadmin
	$(MAKE) up-adminer
	$(MAKE) up-fastapi

up-all-no-cache-without-monitoring: check-network
	$(MAKE) up-db-no-cache
	$(MAKE) up-django-no-cache
	$(MAKE) up-pgadmin
	$(MAKE) up-adminer
	$(MAKE) up-fastapi

up-all-no-cache-without-monitoring-prod: check-network-prod
	$(MAKE) up-db-no-cache-prod
	$(MAKE) up-django-no-cache-prod
	$(MAKE) up-fastapi-prod

down-all-without-monitoring:
	$(MAKE) down-db
	$(MAKE) down-django
	$(MAKE) down-fastapi

down-all-without-monitoring-prod:
	$(MAKE) down-db-prod
	$(MAKE) down-django-prod
	$(MAKE) down-pgadmin-prod
	$(MAKE) down-adminer-prod
	$(MAKE) down-fastapi-prod

down-all-volumes:
	$(MAKE) down-db-volumes
	$(MAKE) down-django-volumes
	$(MAKE) down-pgadmin-volumes
	$(MAKE) down-adminer-volumes
	$(MAKE) down-monitoring-volumes
	$(MAKE) down-fastapi-volumes

up-monitoring:
	$(DC) -f docker_compose/elastic/docker-compose.yml \
	      -f docker_compose/kibana/docker-compose.yml \
	      -f docker_compose/apm/docker-compose.yml $(ENV) up -d

up-monitoring-no-cache:
	$(DC) -f docker_compose/elastic/docker-compose.yml \
	      -f docker_compose/kibana/docker-compose.yml \
	      -f docker_compose/apm/docker-compose.yml $(ENV) build --no-cache
	$(DC) -f docker_compose/elastic/docker-compose.yml \
	      -f docker_compose/kibana/docker-compose.yml \
	      -f docker_compose/apm/docker-compose.yml $(ENV) up -d

down-monitoring:
	$(DC) -f docker_compose/elastic/docker-compose.yml \
	      -f docker_compose/kibana/docker-compose.yml \
	      -f docker_compose/apm/docker-compose.yml down

down-monitoring-volumes:
	$(DC) -f docker_compose/elastic/docker-compose.yml \
	      -f docker_compose/kibana/docker-compose.yml \
	      -f docker_compose/apm/docker-compose.yml down -v

logs-monitoring:
	$(LOGS) $(ELASTIC_CONTAINER)
	$(LOGS) $(KIBANA_CONTAINER)
	$(LOGS) $(APM_CONTAINER)

# DB
up-db:
	$(DC) -f docker_compose/db/docker-compose.yml $(ENV) up -d

up-db-no-cache:
	$(DC) -f docker_compose/db/docker-compose.yml $(ENV) build --no-cache
	$(DC) -f docker_compose/db/docker-compose.yml $(ENV) up -d

up-db-no-cache-prod:
	$(DC) -f docker_compose/db/docker-compose-prod.yml $(ENV) build --no-cache
	$(DC) -f docker_compose/db/docker-compose-prod.yml $(ENV) up -d

down-db:
	$(DC) -f docker_compose/db/docker-compose.yml down

down-db-prod:
	$(DC) -f docker_compose/db/docker-compose-prod.yml down

down-db-volumes:
	$(DC) -f docker_compose/db/docker-compose.yml down -v

logs-db:
	$(LOGS) $(DB_CONTAINER)

# make load-backup FILE=your_backup_file.dump
load-backup:
	@echo "Restoring backup $(FILE) into database..."
	docker exec -i $(DB_CONTAINER) \
	    pg_restore -U $(POSTGRES_USER) -d $(POSTGRES_DB) "/backups/$(FILE)"

# Django
up-django:
	$(DC) -f docker_compose/django/docker-compose.yml $(ENV) up -d

up-django-no-cache:
	$(DC) -f docker_compose/django/docker-compose.yml $(ENV) build --no-cache
	$(DC) -f docker_compose/django/docker-compose.yml $(ENV) up -d

up-django-no-cache-prod:
	$(DC) -f docker_compose/django/docker-compose-prod.yml $(ENV) build --no-cache
	$(DC) -f docker_compose/django/docker-compose-prod.yml $(ENV) up -d

down-django:
	$(DC) -f docker_compose/django/docker-compose.yml down

down-django-prod:
	$(DC) -f docker_compose/django/docker-compose-prod.yml down

down-django-volumes:
	$(DC) -f docker_compose/django/docker-compose.yml down -v

logs-django:
	$(LOGS) $(APP_CONTAINER)

migrations:
	$(EXEC) $(APP_CONTAINER) sh -c ' PYTHONPATH=/app/src:$$PYTHONPATH ${MANAGE_PY} makemigrations'

migrate:
	$(EXEC) $(APP_CONTAINER) sh -c ' PYTHONPATH=/app/src:$$PYTHONPATH ${MANAGE_PY} migrate'

superuser:
	$(EXEC) $(APP_CONTAINER) sh -c ' PYTHONPATH=/app/src:$$PYTHONPATH ${MANAGE_PY} createsuperuser'

test:
	$(EXEC) $(APP_CONTAINER) ${MANAGE_PY} test

collectstatic:
	$(EXEC) $(APP_CONTAINER) sh -c ' PYTHONPATH=/app/src:$$PYTHONPATH ${MANAGE_PY} collectstatic --noinput'

check-apm:
	$(EXEC) $(APP_CONTAINER) sh -c ' PYTHONPATH=/app/src:$$PYTHONPATH ${MANAGE_PY} elasticapm check'

test-apm:
	$(EXEC) $(APP_CONTAINER) sh -c ' PYTHONPATH=/app/src:$$PYTHONPATH ${MANAGE_PY} elasticapm test'

# PgAdmin
up-pgadmin:
	$(DC) -f docker_compose/pgadmin/docker-compose.yml $(ENV) up -d

up-pgadmin-prod:
	$(DC) -f docker_compose/pgadmin/docker-compose-prod.yml $(ENV) up -d

down-pgadmin:
	$(DC) -f docker_compose/pgadmin/docker-compose.yml down

down-pgadmin-prod:
	$(DC) -f docker_compose/pgadmin/docker-compose-prod.yml down

logs-pgadmin:
	$(LOGS) pgadmin

# Adminer
up-adminer:
	$(DC) -f docker_compose/adminer/docker-compose.yml $(ENV) up -d

up-adminer-prod:
	$(DC) -f docker_compose/adminer/docker-compose-prod.yml $(ENV) up -d

down-adminer:
	$(DC) -f docker_compose/adminer/docker-compose.yml down

down-adminer-prod:
	$(DC) -f docker_compose/adminer/docker-compose-prod.yml down

logs-adminer:
	$(LOGS) adminer-postgres

# Redis
up-redis:
	$(DC) -f docker_compose/redis/docker-compose.yml $(ENV) up -d

down-redis:
	$(DC) -f docker_compose/redis/docker-compose.yml down

logs-redis:
	$(LOGS) $(REDIS_CONTAINER)

# Nginx
up-nginx:
	$(DC) -f docker_compose/nginx/docker-compose.yml $(ENV) up -d

down-nginx:
	$(DC) -f docker_compose/nginx/docker-compose.yml down

logs-nginx:
	$(LOGS) $(NGINX_CONTAINER)

# Elastic
up-elastic:
	$(DC) -f docker_compose/elastic/docker-compose.yml $(ENV) up -d

down-elastic:
	$(DC) -f docker_compose/elastic/docker-compose.yml down

logs-elastic:
	$(LOGS) $(ELASTIC_CONTAINER)

# Kibana
up-kibana:
	$(DC) -f docker_compose/kibana/docker-compose.yml $(ENV) up -d

down-kibana:
	$(DC) -f docker_compose/kibana/docker-compose.yml down

logs-kibana:
	$(LOGS) $(KIBANA_CONTAINER)

# APM
up-apm:
	$(DC) -f docker_compose/apm/docker-compose.yml $(ENV) up -d

down-apm:
	$(DC) -f docker_compose/apm/docker-compose.yml down

logs-apm:
	$(LOGS) $(APM_CONTAINER)

stop-all:
	docker stop $(docker ps -q -a)

rm-all:
	docker rm $(docker ps -q -a)

# FastAPI
up-fastapi:
	$(DC) -f docker_compose/fastapi/docker-compose.yml $(ENV) up -d

up-fastapi-prod:
	$(DC) -f docker_compose/fastapi/docker-compose-prod.yml $(ENV) up -d

up-fastapi-no-cache:
	$(DC) -f docker_compose/fastapi/docker-compose.yml $(ENV) build --no-cache
	$(DC) -f docker_compose/fastapi/docker-compose.yml $(ENV) up -d

down-fastapi:
	$(DC) -f docker_compose/fastapi/docker-compose.yml down

down-fastapi-prod:
	$(DC) -f docker_compose/fastapi/docker-compose-prod.yml down

down-fastapi-volumes:
	$(DC) -f docker_compose/fastapi/docker-compose.yml down -v

logs-fastapi:
	$(LOGS) $(APP_CONTAINER)
