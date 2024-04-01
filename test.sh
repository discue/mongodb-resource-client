#!/bin/bash

set -e

export NODE_ENV='ci'
export DSQ_MONGOD_ENABLE_TRANSACTIONS=true
npm run test

export DSQ_MONGODB_USE_SHARED_DB_CLIENT=false
npm run test

# check whether we are connected to the internet 
# before downloading dependencies
resetDependencies() {
    # reset tracing dependencies only if we are not running on GH
    if [[ -z "${GITHUB_ACTIONS}" ]]; then
        npm un @discue/open-telemetry-tracing
        npm -D i @discue/open-telemetry-tracing
    fi
}

curl --head www.google.com &>"/dev/null"
if [[ "${?}" == 0 ]]; then
    trap resetDependencies ERR EXIT

    # test with noop tracing library now
    npm i -D @discue/open-telemetry-tracing@npm:@discue/open-telemetry-tracing-noop
    npm run test
fi