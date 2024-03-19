This project is a pnpm monorepo containing two apps:
- Fastify-app (backend server)
- React-app (frontend)

# Development setup
If you don't have pnpm installed yet, use
```npm install -g pnpm@latest```

On project root, install packages.
To start a locally hosted container that includes postgresql, run
```pnpm run dev:db```

To start both applicatons, run:
```pnpm run dev```