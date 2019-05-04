#!/bin/bash
API_BASE_PATH=$1
MASTER_KEY=$2
ROLE=$3
echo 'Creating admin user...'
curl -d '{"username":"admin","password":"admin","roles":["'$ROLE'"]}' -H "Content-Type: application/json" -H "Authorization: Bearer $MASTER_KEY" -X POST $API_BASE_PATH/api/user -f \
&& echo 'Creating admin user completed.'

