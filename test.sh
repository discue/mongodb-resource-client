#!/bin/bash

export NODE_ENV='ci'
export DSQ_MONGOD_ENABLE_TRANSACTIONS=true

npm run test