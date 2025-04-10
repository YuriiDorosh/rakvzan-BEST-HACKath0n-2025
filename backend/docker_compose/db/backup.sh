#!/bin/bash

DATE=$(date +"%Y-%m-%d")
pg_dump -h postgres -U ${POSTGRES_USER} ${POSTGRES_DB} > /backups/backup_$DATE.sql
