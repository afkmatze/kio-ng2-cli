#!/usr/bin/env bash

_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

cd "${_ROOT}"

./node_modules/.bin/ts-mocha ./src/**/*.spec.ts