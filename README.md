# Storefront Backend Project

A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### Installing

First make sure that npm is installed on your device, you have to go to cmd or terminal and type in the command `npm -v`.
If you have an npm version then you are ready to install the project. Otherwise, do the following:

```bash
npm install -g npm
```

In the event that you want to use the yarn to run the project, you must first run the following if you have not installed the yarn before.

```bash
npm install --global yarn
```

Simply, run the following command to install the project dependencies:

```bash
yarn install
or
npm install
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
PORT="3000"
ENV="dev"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_DB="store_dev"
POSTGRES_DB_TEST="store_test"
POSTGRES_USER==####
POSTGRES_PASSWORD==####
BCRYPT_PASSWORD=####
SLAT_ROUNDS=####
TOKEN_SECRET=####
```

Now, check if Postgres has the database `store`, if not create it:

```bash
# Connect to Postgres container
docker exec -it <postgres_container_id> bash

# Login to Postgres
psql -U postgres

# Postgres shell
# This will list out all the databases
\l

# If "store" database is not present
CREATE DATABASE store_dev; 
```

Next, you need to run the database migrations:

If you want to install db-migrate global

```bash
npm install -g db-migrate
```

```bash
yarn migrations up
or
npm run migrations up
```

But if you have installed it at the project level only, you will use the following.

```bash
node_modules/.bin/db-migrate up
```

## Running the application

Use the following command to run the application in nodemon:

```bash
yarn dev
or
npm run dev
```

Use the following command to run the application in using node:

```bash
yarn start
or
npm start
```

## Test the app

- add a `database.json` file in the root directory and set the missing `###` parameters

```
{
  "dev": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  },
  "test": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB_TEST" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  },
  "create": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  }
}
```

- run all tests `yarn test` or `npm test`
- If it works for you, you can use the other shortcut `yarn test:unix` or `npm test:unix`
# Build-a-Storefront-Backend
