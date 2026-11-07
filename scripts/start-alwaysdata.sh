#!/bin/sh
# Entrypoint for the alwaysdata "Node.js" site. Shipped as <release>/start.sh by the deploy workflow.
# alwaysdata gives the app IP and PORT; Nitro reads NITRO_HOST / NITRO_PORT.
set -eu
cd "$(dirname "$0")"
export NITRO_HOST="${NITRO_HOST:-${IP:-0.0.0.0}}"
export NITRO_PORT="${NITRO_PORT:-${PORT:-3000}}"
export NODE_ENV="${NODE_ENV:-production}"
exec node .output/server/index.mjs
