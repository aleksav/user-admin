API_URL=/api COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml docker-compose build

docker tag useradmin_web:latest aleksavtsf/useradmin_web:latest
docker push aleksavtsf/useradmin_web:latest
docker tag useradmin_server:latest aleksavtsf/useradmin_server:latest
docker push aleksavtsf/useradmin_server:latest