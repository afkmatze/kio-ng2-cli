#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
CLI_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

NODEMON_BIN="$(which nodemon)"
NPM_COMMAND="${1:-build}"

function main() {
  cd "${CLI_ROOT}"
  printf 'NPM_COMMAND: "%s"\n' "${NPM_COMMAND}" 
  "$NODEMON_BIN" -w ./src -e ts --exec "npm run ${NPM_COMMAND}"
}

main