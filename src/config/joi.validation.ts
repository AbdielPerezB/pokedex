import * as Joi from 'joi';

//Crearemos un validation schema
export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(5),
    LIMIT_POKEMONS_TO_LOAD: Joi.number().default(10)
})

/*NOTA IMPORTANTE
Cuando trabajamos con los .env, primero se trabaja el validation scehma (este archivo),
después se manda a EnvCOnfiguration en app.config.ts
el flijo es .env -> joi -> app.config .

NOTA IMPORTANTE 2
Cuando, por ejemplo, DEFAULT_LIMIT intenta leer el archivo .env y busca la variable de entorno DEFAULT_LIMIT,
si la encuentra la envia a app.config, de ahí se reparte a toda la aplicación.
Pero si no encuentra ningúna variable DEFAULT_LIMIT en el .env, por default la asigna a 5, sin embargo, lo asigna a
5 como string, ya no como number, por ello es necesario convertir la variable a number en app. config con un +
para evitar posibles inyecciones de código
*/