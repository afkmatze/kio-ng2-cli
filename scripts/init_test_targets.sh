#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
CLI_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

TEST_TARGETS_ROOT="${CLI_ROOT}/test_target"

[[ -z $TT_DEFAULT_DIR ]] && [[ -n $DEV_LATEST ]] && TT_DEFAULT_DIR=$DEV_LATEST
[[ -z $TT_DEFAULT_DIR ]] && [[ -n $AFKM_LATEST ]] && TT_DEFAULT_DIR=$AFKM_LATEST


function gitInfo(){
  cd "${1}"
  git remote -v
}

function gitRemote(){
  local infos=($(gitInfo "${1}" | grep origin | head -1))
  printf '%s' ${infos[1]}
}

if [[ ! -d "${TEST_TARGETS_ROOT}" ]]; then
  TT_DEFAULT=$(gitRemote "${TT_DEFAULT_DIR}")
  printf 'init test target "%s"\n' "${TT_DEFAULT}"
  cd "${CLI_ROOT}"
  git clone "${TT_DEFAULT}" "test_target"
fi
