#!/bin/sh

# Wait for PostgreSQL to be ready
sleep 10

# Initialize the database
superset db upgrade

# Create an admin user (modify credentials as needed)
superset fab create-admin \
    --username admin \
    --firstname Admin \
    --lastname User \
    --email admin@superset.com \
    --password admin

# Load examples if enabled
if [ "$SUPERSET_LOAD_EXAMPLES" = "yes" ]; then
    superset load_examples
fi

# Initialize Superset
superset init

# Start the Superset server
superset run -p 8088 --host 0.0.0.0 --with-threads