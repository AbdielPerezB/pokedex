import { HttpService } from "@nestjs/axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { Injectable } from "@nestjs/common";

//SI nosotros queremos inyectar este servicio, en el constructor, tenemos que decorarlo con el decorador
//Como es un proveedor, o servicios que ya sabemos que un servicio es un proveedor, necesitamos
//Agregarlo a los providers en :
// @Module({
//     exports:[AxiosAdapter]
// })
//De igual forma para poder usarlo en otros mpodulos hay que exportarlo. (checar common.module.ts)
@Injectable()
export class AxiosAdapter implements HttpAdapter{
    constructor(
        private readonly axios: HttpService
    ){}


    async get<T>(url: string): Promise<T> {

        const {data} = await firstValueFrom(
            this.axios.get<T>(url)
            .pipe(
                catchError((error: AxiosError)=>{
                    throw new Error(`Data wasn't caught from ${url}`)
                }),
            ),
        );
        return data;


    }

}