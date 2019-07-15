#!/usr/bin/env bash

eval `docker-machine env $server`

echo $(env | grep DOCKER)

docker container ls -a --filter status=exited --filter status=created

docker container stop $(docker container ls -aq)

docker rm -f $(docker container ls -aq)

docker-compose -f docker-compose.yml down --remove-orphans

docker rm -f nestjs-starter

docker rmi -f nestjs-starter 
docker rmi -f node

docker image prune

docker container prune

docker volume prune

docker system prune