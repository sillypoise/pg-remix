# * base: base node image with pnpm
FROM node:16-bullseye-slim as base_pnpm
# set for layer base and all layers that inherit from it
ENV NODE_ENV=production

ARG PNPM_VERSION=7.17.0

RUN npm install --no-update-notifier --no-fund --global install pnpm@${PNPM_VERSION}

# * deps: Install node_modules, including dev dependencies

FROM base_pnpm as deps

RUN mkdir /app
WORKDIR /app

ADD package.json ./
RUN pnpm install --production=false

# * setup production node_modules

FROM base_pnpm as production_deps

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json ./
RUN pnpm prune --prod

# * Build the app

FROM base_pnpm as build

# ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD . .
# RUN pnpm postinstall
RUN pnpm build

# * Build production image with minimal footprint

FROM base_pnpm

# EXPOSE 8000

RUN mkdir /app
WORKDIR /app

# copy production dependencies from production_deps layer
COPY --from=production_deps /app/node_modules /app/node_modules
# copy app build from build layer
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

CMD ["pnpm", "start"]