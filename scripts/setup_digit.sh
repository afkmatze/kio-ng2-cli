#!/usr/bin/env bash

CLI_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

printf 'TARGET_ROOT: %s\n' "${TARGET_ROOT}"
TARGET_ROOT="${1}"
TARGET_NAME="$(basename "${TARGET_ROOT}")"

if [[ ! -d "${TARGET_ROOT}" ]]; then
  cd "$(dirname "${TARGET_ROOT}")"
  ng new ${TARGET_NAME}
fi

cd "${TARGET_ROOT}"
npm i \
  git@github.com:afkmatze/kio-ng2-env.git \
  git@github.com:afkmatze/kio-ng2.git \
  git@github.com:afkmatze/kio-ng2-component-routing.git \
  git@github.com:afkmatze/kio-ng2-structure.git \
  git@github.com:afkmatze/kio-ng2-cli.git --save
