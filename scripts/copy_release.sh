#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

function print_error () {
  local message="${1:-Error}"
  printf '\x1b[31m%s\x1b[0m\n' ${message}
}

if [[ -z "${KIO_RELEASES}" ]]; then
  print_error "Missing kio releases provided by global \$KIO_RELEASES" 
  exit 1
fi


function npmPackageProp() {
  local package_prop="${1:-name}"
  cd "${_ROOT}"
  node -p "require('./package.json').${package_prop}"
}

RELEASES_DIR=${KIO_RELEASES}

MODULE_NAME=`npmPackageProp name`
MODULE_RELEASE_ROOT="${RELEASES_DIR}/${MODULE_NAME}"
MODULE_RELEASE_SRC="${_ROOT}/release"
MODULE_RELEASE_DIR="${MODULE_RELEASE_ROOT}/release"

if [[ ! -d "${MODULE_RELEASE_ROOT}" ]]; then
  print_error "MODULE_RELEASE_ROOT: '${MODULE_RELEASE_ROOT}' is not a directory."
  exit 2
fi

if [[ -d "${MODULE_RELEASE_DIR}" ]]; then
  cd "${MODULE_RELEASE_ROOT}"
  rm -rf ./release
fi

printf 'copy \x1b[1;34m%s\x1b[0m to release destination at \x1b[1m%s\x1b[0m...\n' "${MODULE_NAME}" "${MODULE_RELEASE_ROOT}"
scp -r "${MODULE_RELEASE_SRC}" "${MODULE_RELEASE_ROOT}"