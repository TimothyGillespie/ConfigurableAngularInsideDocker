#!/bin/sh
if [[ -z "${A_NUMBER}" ]]; then
  echo "A_NUMBER was not defined but is needed." 1>&2
  exit 1
fi
