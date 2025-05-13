import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokermonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    //Documentación para todo lo relacionado a servir contenido estático: https://docs.nestjs.com/recipes/serve-static#configuration
    ServeStaticModule.forRoot({ //siempre que veamos la palabra 'Module', lo tenemos que agregar en los imports
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/app'//Para que se sirva en localhost:3000/app
    }),

    //referencia a DB
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokermonModule
  ],
  controllers: [],
  providers:[],
})
export class AppModule { }
