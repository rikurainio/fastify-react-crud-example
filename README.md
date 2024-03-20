This project is a pnpm monorepo containing two apps:
- Fastify-app (backend server)
- React-app (frontend)

# Development setup
If you don't have pnpm installed yet, use
```npm install -g pnpm@latest```

On project root, install packages.

You must have Docker installed on your machine, for the local
postgresql container to work. Open the link and select your operating system.
[https://docs.docker.com/get-docker/](Get Docker)

To start a locally hosted container that includes postgresql, run
```pnpm run dev:db``` Make sure you have Docker Engine running.

To start both applications, run:
```pnpm run dev```