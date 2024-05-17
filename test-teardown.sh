#!/bin/bash

set -e

echo "Stopping MongoDB"
docker-compose -f mongodb-compose.yml down