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
  
   async executeSeed(num_pokemons: number){

    //Borramos todos los datos existentes antes de insertar nuevos
    await this.pokemonModel.deleteMany({}); //delete * from pokemons

    const {data} = await firstValueFrom(
      this.httpservice.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${num_pokemons}`)
      .pipe(
        catchError((error) => {
          throw new HttpException(`Data not fetched from pokeapi. ${error}`,HttpStatus.INTERNAL_SERVER_ERROR)
        }),
      ),
    );
    /*VERSION CON MUCHAS INSERCIÓNES (No recomendada porque se hacen muchas 'consultas' a la db)---
    //Forma para agregar varias inserciones de golpe, de esta manera ya no tenemos que esperar al 
    //await a que cada inserción se haga una por una:
    const insertPromisesArray: Promise<any>[] = [];

    //Agregamos async en la función que está dentro del forEach para poder usar await en las
    //funciones asíncronas que estén dentro del forEach
    data.results.forEach(async({name, url}) => {
      
      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];
      // console.log({name, no})

      // await this.pokemonModel.create({name, no});

      insertPromisesArray.push( this.pokemonModel.create({name, no} ));
    });
    await Promise.all(insertPromisesArray);
    */

    /*VERSION CON UNA SOLA INSERCIÓN(recomendada) */
    const pokemonsToInsert: {name:string, no: number}[] = [];

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];
      pokemonsToInsert.push({name, no})
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);//insert into pokemons ... bla bla bla (si fuera db relational)

    return data;
  
  }
}
