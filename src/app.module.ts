import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokermonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { join } from 'path';
import { EnvCOnfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvCOnfiguration],// le decimos donde está el archivo de mi mapeo de variales de entorno
      validationSchema: JoiValidationSchema //Es el schema de validación, trabaja en conjunto con EnvCOnfiguration
    }),//Para poder acceder a las variables de entorno del archivo .env. Siempre debe estar al principio para que todo lo de abajo pueda acceder a las variables de entoro
      //a partir de ahora no leeremos dierecto del process.env, sino que utilizaremos el ConfigMOdule en nuestros Building blocks


    //Documentación para todo lo relacionado a servir contenido estático: https://docs.nestjs.com/recipes/serve-static#configuration
    ServeStaticModule.forRoot({ //siempre que veamos la palabra 'Module', lo tenemos que agregar en los imports
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/app'//Para que se sirva en localhost:3000/app
    }),

    //referencia a DB
    MongooseModule.forRoot(process.env.MONGODB!), //EL signo de interrogación indica que la variable siempre va a estar definida
    PokermonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers:[],
})
export class AppModule {
  // constructor(){
  //   // console.log(process.env)
  // }
 }
