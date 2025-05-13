import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokermonModule } from './pokermon/pokermon.module';

@Module({
  imports: [
    //Documentación para todo lo relacionado a servir contenido estático: https://docs.nestjs.com/recipes/serve-static#configuration
    ServeStaticModule.forRoot({ //siempre que veamos la palabra 'Module', lo tenemos que agregar en los imports
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/app'//Para que se sirva en localhost:3000/app
    }),
    PokermonModule
  ],
  controllers: [],
  providers:[],
})
export class AppModule { }
