#!/bin/bash

set -e

if [ "$(docker ps | grep -c 27021)" == '0' ]; then
    echo "Starting MongoDB"
    docker-compose -f mongodb-compose.yml up -d
fi
