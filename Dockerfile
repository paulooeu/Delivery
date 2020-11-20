FROM node:12.19.1-slim

# Build
WORKDIR /app
RUN apt-get update && apt-get install -y python build-essential curl
ADD src /app/src
ADD package.json /app
ADD jest.config.js /app
ADD nodemon.json /app

RUN npm i
RUN npm install -g sucrase
RUN sucrase ./src -d ./build --transforms imports

# Imagem final
FROM node:12.19.1-slim
WORKDIR /app
ADD package.json /app

RUN npm i --only=production

COPY --from=0 /app/build /app
COPY --from=0 /usr/bin/curl /usr/bin/curl
ADD .env /app

HEALTHCHECK --start-period=10s --interval=5s --timeout=1s CMD curl --fail http://localhost:3000/health || exit 1

ENTRYPOINT ["node", "server.js"]
