#!/bin/bash

celery -A src.celery_app.app beat -l info