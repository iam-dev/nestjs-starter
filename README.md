# Nestjs Starter

## Description

Nestjs starter including Continous Deployment on Google Cloud, Kubernetes, Docker, Jenkins

## Dependency:

* Node >= 10.16.0

## Installation

```bash
$ npm install
```

## Run on local/development env:

1. Copy and rename `.env.development.example` to `.env` (adjust mongo connection if not using default config)
2. Install dependencies `npm install`
3. Run `npm start`
4. Access interactive API doc from browser `http://localhost:3000`


## Test on local/development env:
* Test and coverage report `npm run test:cov`
* Test e2e `npm run test:e2e`

## Test using Docker-compose
Run using `docker-compose`

1. Run test (build and run both node and mongo containers) 
```bash
# run jest test using docker
$ docker-compose run app npm test
```
# run e2e test using docker
$ docker-compose run app npm run test:e2e
```
# run cov test using docker
$ docker-compose run app npm run test:cov
```

2. Remove running container 
```bash
# stop nestjs-starter container
$ docker-compose down --remove-orphans
```
2. Remove running images 
```bash
$ docker rmi -f nestjs-starter_app
```

## Run using Docker
Run using `docker`

* Build app only
```bash
# Build account-service
$ docker build -t nestjs-starter .
```
* Run server
```bash
# run account-service using docker
$ docker run --name nestjs-starter -p 3000:3000 -i nestjs-starter npm start
```

2. Remove running container 
```bash
# stop nestjs-starter container
$ docker rm -f nestjs-starter
```
2. Remove running images 
```bash
$ docker rmi -f nestjs-starter
```

## Remove Docker container, images, services using script
```bash
# ability to run script
$ chmod a+x /scripts/remove-docker-services.sh
# run script
$ ./scripts/remove-docker-services.sh
```

> Depends on installation, you may need to use `sudo`


