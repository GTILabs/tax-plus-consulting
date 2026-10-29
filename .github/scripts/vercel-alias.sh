#!/usr/bin/env bash
# Point a domain at a deployment through the Vercel REST API.
# `vercel alias set --scope` fails with a team token ("User not found"), so the API is called directly.
# Usage: vercel-alias.sh <deployment-url> <domain>   (needs VERCEL_TOKEN and VERCEL_ORG_ID)
set -euo pipefail

host="${1#https://}"
api="https://api.vercel.com"
auth=(-H "Authorization: Bearer $VERCEL_TOKEN")

id=$(curl -fsS "${auth[@]}" "$api/v13/deployments/$host?teamId=$VERCEL_ORG_ID" | jq -r .id)
curl -fsS "${auth[@]}" -H "Content-Type: application/json" \
  -d "{\"alias\":\"$2\"}" "$api/v2/deployments/$id/aliases?teamId=$VERCEL_ORG_ID" | jq -r '"aliased \(.alias) -> \(.deploymentId)"'
