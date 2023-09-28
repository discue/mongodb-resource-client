#!/bin/bash

export NODE_ENV='ci'
export DSQ_MONGOD_ENABLE_TRANSACTIONS=true
npm run test

export DSQ_MONGODB_USE_SHARED_DB_CLIENT=false
npm run test

