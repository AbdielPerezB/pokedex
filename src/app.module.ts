import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ //siempre que veamos la palabra 'Module', lo tenemos que agregar en los imports
      rootPath: join(__dirname, '..', 'public'),
  })
  ],
})
export class AppModule {}
