import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SeedService {

  private readonly pokemonsToLoad: number;

  constructor(
    //Otra manera de importar cosas es importar directo el Model de Mongoose
    @InjectModel(Pokemon.name)//Para que entienda que pokemonModel es un proveedor
    private readonly pokemonModel: Model<Pokemon>,
    private readonly axiosAdapter: AxiosAdapter,//Aquí usamos el AxiosAdapter
    private readonly confiService: ConfigService
  ){
    this.pokemonsToLoad = confiService.get<number>('LIMIT_PKEMONS_TO_LOAD') || 10;
  }

  async executeSeedNoParams(){
    await this.pokemonModel.deleteMany({});
    const data = await this.axiosAdapter.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${this.pokemonsToLoad}`);

    const pokemonsToInsert: {name: string; no: number}[] = [];

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ]
      pokemonsToInsert.push({name, no})
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return data;
  }
  
   async executeSeed(num_pokemons: number){

    await this.pokemonModel.deleteMany({}); //delete * from pokemons
    const data = await this.axiosAdapter.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${num_pokemons}`);
   
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
