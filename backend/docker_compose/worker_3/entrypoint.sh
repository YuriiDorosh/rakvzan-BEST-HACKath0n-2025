#!/bin/bash

celery -A src.celery_app.app worker -l info --concurrency=2 --hostname=worker3@%h