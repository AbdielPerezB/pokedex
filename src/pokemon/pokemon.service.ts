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
      this.handleExceptions(error);
    }
  }

  findAll() {
    return { message: 'This action adds a new pokermon' };
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    //búsqueda por no
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term }); // función de la db
    }

    //MongoID. isValidObjectId, ya viene con Mongoose
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase() })
    }


    if (!pokemon) throw new NotFoundException(`Pokemon with no, name or id "${term}" not found`);
    return pokemon;
  }

  async update(term: string, updatePokermonDto: UpdatePokermonDto) {

    //Ete pokemos es el objeto direco de Mongoose
    const pokemon = await this.findOne(term)

    //guardamos nombre en minuscula:
    if (updatePokermonDto.name) updatePokermonDto.name = updatePokermonDto.name.toLocaleLowerCase();

    //gardamos en db
    try {
      await pokemon.updateOne(updatePokermonDto, { new: true }); //el new no sé pa que es. investigar
    } catch (error) {
      this.handleExceptions(error);
    }
    return { ...pokemon.toJSON(), ...UpdatePokermonDto };
    //En realidad el pokemon si se actualizó, solo que no se reflejan al instante
    //los datos, por ello, retornamos el objeto pokemon.toJSON(), que tiene datos antiguos,
    //y le sobreescribimos UpdatePokemonDto, el cual tiene los valores nuevos y eso
    //le mandamos al usuario

  }

  remove(term: number) {
    return `This action removes a #${term} pokermon`;
  }


  private handleExceptions(error: any){
    //si el algun dato del pokemon ya existe porque deben ser únicos
    if (error.code === 11000) { //el error 11000 nos dice que un campo y aestá repetido
      throw new BadRequestException(`Pokemon with atributte ${JSON.stringify(error.keyValue)} already exists in db`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }

  
}
