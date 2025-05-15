import { Module } from '@nestjs/common';
import { PokermonService } from './pokemon.service';
import { PokermonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokermonController],
  providers: [PokermonService],
  imports: [
    ConfigModule, //Para las variables de entorno


    //Esto crea en automático la collección en la db de Mongo
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //Este name no es el atriuto de la clase Pokemon, sino que viene del extends Document
        schema: PokemonSchema,
      }
    ])
  ],
  exports: [MongooseModule]
})
export class PokermonModule {}
