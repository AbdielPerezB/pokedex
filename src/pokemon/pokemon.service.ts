import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokermonDto } from './dto/create-pokermon.dto';
import { UpdatePokermonDto } from './dto/update-pokermon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokermonService {

  //Injectamos nuestro modelo de la tala de Mongo de Pokemon
  constructor(
    //Por si solo el pokemonModel no es un provider, 
    //es me limita si quiero manejarlo más adelante,para
    //que sea un proveedor le agrego el decorador @InjecModel
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  //Se coloca async porque la conexión a la db son asíncronas
  async create(createPokermonDto: CreatePokermonDto) {
    createPokermonDto.name = createPokermonDto.name.toLocaleLowerCase()
    try {
      const pokemon = await this.pokemonModel.create(createPokermonDto) //agregamos en la db
      return pokemon;
    } catch (error){
      if (error.code === 11000){
        throw new BadRequestException(`Pokemon exists in db. ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll() {
    return { message: 'This action adds a new pokermon' };
  }

  findOne(id: string) {
    return `This action returns a #${id} pokermon`;
  }

  update(id: number, updatePokermonDto: UpdatePokermonDto) {
    return `This action updates a #${id} pokermon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokermon`;
  }
}
