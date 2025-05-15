import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokermonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ConfigModule,
    PokermonModule,
    CommonModule //Como queremos utilizar AxiosAdapter en seed.service.ts, tenemos que importar el módulo
                  //CommonMOdule completo, que es donde se exportó el AxiosAdapters. Todo esto es a nivel de módulo
                  //Para ver la continuación ve cómo se injecta en el constructor de seed.service
  ],
})
export class SeedModule {}
