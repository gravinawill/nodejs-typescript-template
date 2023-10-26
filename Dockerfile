# syntax=docker/dockerfile:1

#---------------------------- base ----------------------------#
FROM node:20.9.0-buster-slim as base

WORKDIR /usr/src/app


#-------------------------- builder ---------------------------#
FROM base AS builder

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma:generate
RUN yarn build

#-------------------------- release ---------------------------#

FROM node:20.9.0-buster-slim
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y build-essential
RUN apt-get install -y libpq-dev
RUN apt-get install -y openssl

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
COPY ./prisma ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 8080

CMD [ "yarn", "start:prod" ]
