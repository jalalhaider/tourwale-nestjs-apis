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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup database through docker compose

$ docker compose up dev-db -d

## Setup Prisma

$ yarn add -D prisma
$ yarn add @prisma/client

Define schema in prisma/schema.prisma

$ npx prisma migrate dev

Above command will do two things

- it will create schema
- it will create class for tables in typescript you can access types in {User} from "@prisma/client"
