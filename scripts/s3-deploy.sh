#!/bin/bash
targetS3Bucket=$1
apiUrl=$2

echo 'Building web with API configured to point at heroku test instance'
API_URL=$2 docker-compose -f docker-compose.yml build web

echo "Copy tests html assets from web image to locally mounted directory"
docker-compose -f docker-compose.yml run -v `pwd`/web-dist:/output web cp -R /usr/share/nginx/html/. /output

echo "Sync with s3 bucket $targetS3Bucket"
aws s3 sync web-dist $targetS3Bucket
