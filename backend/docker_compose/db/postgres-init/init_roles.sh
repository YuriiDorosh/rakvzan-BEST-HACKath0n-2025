#!/bin/bash
set -e

echo "Attempt to create replicator user and replication slot (idempotent)."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-'EOSQL'
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_roles WHERE rolname = 'replicator'
    ) THEN
        CREATE USER replicator
            WITH REPLICATION
                 LOGIN
                 ENCRYPTED PASSWORD 'replication_password';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_replication_slots WHERE slot_name = 'replication_slot_replica1'
    ) THEN
        PERFORM pg_create_physical_replication_slot('replication_slot_replica1');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_replication_slots WHERE slot_name = 'replication_slot_replica2'
    ) THEN
        PERFORM pg_create_physical_replication_slot('replication_slot_replica2');
    END IF;
END
$$;
EOSQL




# #!/bin/bash
# set -e

# echo "Attempt to create replicator user and replication slot (idempotent)."

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-'EOSQL'
# DO $$
# BEGIN
#     IF NOT EXISTS (
#         SELECT 1 FROM pg_roles WHERE rolname = 'replicator'
#     ) THEN
#         CREATE USER replicator
#             WITH REPLICATION
#                  LOGIN
#                  ENCRYPTED PASSWORD 'replication_password';
#     END IF;
# END
# $$;

# DO $$
# BEGIN
#     IF NOT EXISTS (
#         SELECT 1 FROM pg_replication_slots WHERE slot_name = 'replication_slot'
#     ) THEN
#         PERFORM pg_create_physical_replication_slot('replication_slot');
#     END IF;
# END
# $$;
# EOSQL




# #!/bin/bash
# set -e

# echo "Attempt to create replicator role (idempotent)."

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-'EOSQL'
# DO $$
# BEGIN
#     IF NOT EXISTS (
#         SELECT 1 FROM pg_roles WHERE rolname = 'replicator'
#     ) THEN
#         CREATE ROLE replicator WITH REPLICATION ENCRYPTED PASSWORD 'replication_password';
#     END IF;
# END
# $$;

# DO $$
# BEGIN
#     IF NOT EXISTS (
#         SELECT 1 FROM pg_replication_slots WHERE slot_name = 'replication_slot'
#     ) THEN
#         PERFORM pg_create_physical_replication_slot('replication_slot');
#     END IF;
# END
# $$;
# EOSQL


# #!/bin/bash
# set -e

# if [ -f "/var/lib/postgresql/data/PG_VERSION" ]; then
#     echo "Database already initialized, skipping 'init_roles'..."
#     exit 0
# fi

# echo "Database not initialized yet, running 'init_roles' script..."

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
#     CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD '${POSTGRES_REPLICATION_PASSWORD}';
#     SELECT pg_create_physical_replication_slot('replication_slot');
# EOSQL
