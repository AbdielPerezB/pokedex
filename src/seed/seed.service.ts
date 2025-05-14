import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  constructor(
    private readonly httpservice: HttpService
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

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');

      const no: number = +segments[ segments.length - 2 ];

      console.log({name, no})
    });

    return data;
  
  }
}
