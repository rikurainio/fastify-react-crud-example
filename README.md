This project is a pnpm monorepo containing two apps:
- Fastify-app (backend server)
- React-app (frontend)

# Development setup
Install pnpm:```npm install -g pnpm@latest```
Install packages:```pnpm install```

## Setting up the local database
**You must have** [Docker](https://docs.docker.com/get-docker/ "Get Docker") installed on your machine, for the local
PostgreSQL container to work. Open the link and select your operating system.

To start a locally hosted container with PostgreSQL, run'''pnpm dev:db```. Make sure you have Docker Engine running.

## Starting dev servers
To **start both applications**, run:```pnpm run dev```.
This will start the apps:
frontend at: [http://localhost:5173](http://localhost:5173 "http://localhost:5173")
backend at: [http://localhost:3000](http://localhost:3000 "http://localhost:3000")

You can specify different ports by using **.env** files for the apps

## Running tests
To run simple playwright tests, run```pnpm run test```on project root
