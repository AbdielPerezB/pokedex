//Las siguientes son notas del bonus track de FH para desplegar un app de node y nest en docker.

Preparar imagen de Docker - Node App
## Build
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

NOta: el --build es para que construya todo el proyecto, si no hacemos ningún cambio o modificación al proyecto no es necesario agregar la etiqueta --build.

## Run
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up

## Nota
Por defecto, __docker-compose__ usa el archivo ```.env```, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con
```
docker-compose -f docker-compose.prod.yaml up --build
```
**docker-compose.prod.yaml**
```
version: '3'

services:
  pokedexapp:
    depends_on:
      - db
    build: 
      context: .
      dockerfile: Dockerfile
    image: pokedex-docker
    container_name: pokedexapp
    restart: always # reiniciar el contenedor si se detiene
    ports:
      - "${PORT}:${PORT}"
    # working_dir: /var/www/pokedex
    environment:
      MONGODB: ${MONGODB}
      PORT: ${PORT}
      DEFAULT_LIMIT: ${DEFAULT_LIMIT}
    # volumes:
    #   - ./:/var/www/pokedex

  db:
    image: mongo:5
    container_name: mongo-poke
    restart: always
    ports:
      - 27017:27017
    environment:
      MONGODB_DATABASE: nest-pokemon
    # volumes:
    #   - ./mongo:/data/db
```
**Dockerfile**
```
# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the app with cache dependencies
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build


# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD [ "node","dist/main" ]
```
**Dockerfile-simple**
```
FROM node:18-alpine3.15

# Set working directory
RUN mkdir -p /var/www/pokedex
WORKDIR /var/www/pokedex

# Copiar el directorio y su contenido
COPY . ./var/www/pokedex
COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex/
RUN yarn install --prod
RUN yarn build


# Dar permiso para ejecutar la applicación
RUN adduser --disabled-password pokeuser
RUN chown -R pokeuser:pokeuser /var/www/pokedex
USER pokeuser

# Limpiar el caché
RUN yarn cache clean --force

EXPOSE 3000

CMD [ "yarn","start" ]
```