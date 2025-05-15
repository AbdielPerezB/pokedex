import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokermonDto } from './dto/create-pokermon.dto';
import { UpdatePokermonDto } from './dto/update-pokermon.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokermonService {

  private readonly defaultLimit:number;
  private readonly pokemonsToLoad: number;

  //Injectamos nuestro modelo de la tala de Mongo de Pokemon
  constructor(
    //Por si solo el pokemonModel no es un provider, 
    //esto me limita si quiero manejarlo más adelante,para
    //que sea un proveedor le agrego el decorador @InjecModel
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService //recuarda agregar el ConfigModule en el pokemon.module.ts

  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 5;
  }

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

  findAll(paginationDto: PaginationDTO) {

    //Si no viene el limite le asignamos 10, si no viene offset le asignamos 0 (la posición inicial)
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 }) //le decimos que ordene la 'columna' no de mnera ascendente
      .select('-__v') //el - al principio indica que no se incluya la columna '__v'
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

  async remove(id: string) {

    //esto era cuando podíamos eliminar por id, nombre o no
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    //Ahora después de nuestro Pipe personalizado podemos utilizar los métodos 
    //de eliminación que ya trae Mongoose
    // const result = await this.pokemonModel.findByIdAndDelete(id); //Esto esta bien pero si no se encuentra el objeto, aún así devuelve un 200, esto hace que el usuario tenga un falso positivo

    // Para solucionar eso utilizamos el siguiente métododo
    // const result = await this.pokemonModel.deleteOne({ _id: id });
    //esto da como resultado:
    /*
    {
      "acknowledged": true,
      "deletedCount": 0
    }
    */
    //  Por lo tanto, usamos desestructuración y utilizamos deletedCount a nuestro favor:
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with ${id} not found`)
    return;
  }


  private handleExceptions(error: any) {
    //si el algun dato del pokemon ya existe porque deben ser únicos
    if (error.code === 11000) { //el error 11000 nos dice que un campo y aestá repetido
      throw new BadRequestException(`Pokemon with atributte ${JSON.stringify(error.keyValue)} already exists in db`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
