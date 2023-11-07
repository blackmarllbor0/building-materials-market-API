FROM node:latest AS build

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ARG APP_DIR=/usr/src/app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY --chown=node:node . .

COPY *.json ${APP_DIR}
COPY tsconfig.json ${APP_DIR}
COPY .env ${APP_DIR}

RUN npm cache clean --force && \
    npm install --omit=dev && \
    npm install typescript && \
    npm run build 

FROM node:14-bullseye-slim

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app/
CMD [ "dumb-init", "node", "./dist/main.js" ]