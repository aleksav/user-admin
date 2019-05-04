#!/bin/bash

docker login -u "_"  registry.heroku.com  -p $(heroku auth:token) &&\
docker pull registry.heroku.com/user-admin-dev/web:latest  &&\
docker tag registry.heroku.com/user-admin-dev/web:latest registry.heroku.com/user-admin-demo/web:latest  &&\
docker push registry.heroku.com/user-admin-demo/web:latest  &&\
heroku container:release web -a user-admin-demo &&\
. ./scripts/s3-deploy.sh s3://user-admin-demo.thestartupfactory.tech https://user-admin-demo.herokuapp.com/api &&\
echo 'Promotion to demo completed.';