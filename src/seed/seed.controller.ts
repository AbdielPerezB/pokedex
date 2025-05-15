import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {


  constructor(private readonly seedService: SeedService) { }


  @Get(':num_pokemons')
  execute( @Param('num_pokemons', ParseIntPipe) num_pokemons: number ) {

    return this.seedService.executeSeed(num_pokemons);

  }

  @Get()
  executeSeed(){
    return this.seedService.executeSeedNoParams();
  }
}
