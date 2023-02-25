## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---

## Test

I wrote e2e and unit tests. You can run the commands down below

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## Dockerize

### Build

```bash
# searchs for a Dockerfile in the directory and builds it with tag
$ docker build -t <tag> <directory>
# usage
docker build -t yusuferen/paribuhub-case . npm test
```

### Run

```shell
# running image with the given ports
docker run -p <port-out:port-in> <tag or image-id>
# usage
docker run -p 3000:3000 yusuferen/paribuhub-case
```

Or use docker-compose;

```shell
docker-compose up
```
