import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class SeedService {

  constructor(
    private readonly httpservice: HttpService,

    //Otra manera de importar cosas es importar directo el Model de Mongoose
    @InjectModel(Pokemon.name)//Para que entienda que pokemonModel es un proveedor
    private readonly pokemonModel: Model<Pokemon>
  ){}
  
   async executeSeed(){
    const {data} = await firstValueFrom(
      this.httpservice.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=2')
      .pipe(
        catchError((error) => {
          throw new HttpException(`Data not fetched from pokeapi. ${error}`,HttpStatus.INTERNAL_SERVER_ERROR)
        }),
      ),
    );

    //Agregamos async en la función que está dentro del forEach para poder usar await en las
    //funciones asíncronas que estén dentro del forEach
    data.results.forEach(async({name, url}) => {
      
      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];
      // console.log({name, no})

      await this.pokemonModel.create({name, no});
    });

    return data;
  
  }
}
