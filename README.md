<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Este es un proyecto con fines educativos

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la DB
```
docker compose up -d
```
5. Clonar archivo __.env.template__ y renombrar la copia a __.env__

6. Llenar las variables de entorno definidas en el __.env__

7. Ejecutar la aplicación en dev:
```
yarn start:dev
```

7. Reconstruir la db con semilla. En lugar de 10, colocar el numero de ejemplos a cargar en la db
```
127.0.0.1:3000/api/v2/seed/10
```

## Stack usado
* Mongo DB
* Nest

## Docs de tecnologías:
* [Servir contenido estático: serve-static](https://docs.nestjs.com/recipes/serve-static#configuration)
* [MongoDB con NestJS](https://docs.nestjs.com/techniques/mongodb)
* Class Validator y Class transformer `yarn add class-validator class-transformer`
* [Axios install](https://www.npmjs.com/package/@nestjs/axios), [Axios nest docs](https://docs.nestjs.com/techniques/http-module)
* Para variables de entorno .env -> `yarn add @nestjs/config` o `npm i @nestjs/config`
* [joi](https://www.npmjs.com/package/joi) -> `yarn add joi`
