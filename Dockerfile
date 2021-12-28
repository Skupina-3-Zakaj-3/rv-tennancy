FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm i \
    && npm run build \
    && npm prune --production

COPY . .

RUN npm run build

FROM node:16

ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]