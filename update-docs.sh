#!/bin/bash

npx documentation build lib/one-to-few-ref-storage.js --external mongodb --markdown-toc false --format md --shallow --output README_ONE_TO_FEW_REF_STORAGE.md
npx documentation build lib/one-to-few-resource-storage.js --external mongodb --markdown-toc false --format md --shallow --output README_ONE_TO_FEW_RESOURCE_STORAGE.md
npx documentation build lib/one-to-many-resource-storage.js --external mongodb --markdown-toc false --format md --shallow --output README_ONE_TO_MANY_RESOURCE_STORAGE.md
npx documentation build lib/simple-resource-storage.js --external mongodb --markdown-toc false --format md --shallow --output README_SIMPLE_RESOURCE_STORAGE.md
npx documentation build lib/aggregations.js --external mongodb --markdown-toc false --format md --shallow --output README_AGGREGATIONS.md
npx documentation build lib/event-emitter-docs.js --external mongodb --markdown-toc false --format md --shallow --output README_EVENT_EMITTER.md
npx documentation build lib/history.js --external mongodb --markdown-toc false --format md --shallow --output README_STORAGE_HISTORY.md