# Nestjs Starter

## Description

Nestjs starter including Continous Deployment on Google Cloud, Docker, Jenkins

## Dependency:

* Node >= 10.16.0
* MongoDB >= 4.0

## Installation

```bash
$ npm install
```

## Run on local/development env:

1. Copy and rename `.env.development.example` to `.env` (adjust mongo connection if not using default config)
2. Copy and rename `apidoc.json.example` to `apidoc.json`
3. Install dependencies `npm install`
4. Run `npm start`
5. Access interactive API doc from browser `http://localhost:3000`


## Test on local/development env:
* Test and coverage report `npm run test:cov`
* Test e2e `npm run test:e2e`
* Generate browsable API doc `npm doc`

## Test using Docker
Run using `docker-compose`

1. Run test (build and run both node and mongo containers) 
```bash
# run jest test using docker
$ docker-compose run app node_modules/.bin/jest test
```
2. Remove running container 
```bash
# stop mongo container
$ docker stop mongo
# stop account-service container
$ docker stop account-service
```

## Run using docker
Run using `docker`

* Build app only (without mongo)
```bash
# Build account-service
$ docker build -t account-service .
```
* Run server (with mongo outside docker)
```bash
# run account-service using docker
$ docker run -p 3000:3000 -i account-service npm start
```

> Depends on installation, you may need to use `sudo`


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```