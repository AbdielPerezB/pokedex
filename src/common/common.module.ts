import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        })
    ],
    providers: [AxiosAdapter],//AxiosAdapter es un servicio, por lo tanto lo agregamos en los providers
    exports: [AxiosAdapter]//para que ese servicio pueda ser usado en otros m´dulos lo agregamos en exports.
    // (checar see.module.ts para ver como lo usamos ahí.)
})
export class CommonModule { }
