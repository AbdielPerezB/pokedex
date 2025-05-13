import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
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
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db. ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll() {
    return { message: 'This action adds a new pokermon' };
  }

  async findOne(term: string) {
    let pokemon: Pokemon|null = null;

    //búsqueda por no
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term }); // función de la db
    }

    //MongoID. isValidObjectId, ya viene con Mongoose
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLocaleLowerCase()})
    }


    if (!pokemon) throw new NotFoundException(`Pokemon with no, name or id "${term}" not found`);
    return pokemon;
  }

  update(term: number, updatePokermonDto: UpdatePokermonDto) {
    return `This action updates a #${term} pokermon`;
  }

  remove(term: number) {
    return `This action removes a #${term} pokermon`;
  }
}
