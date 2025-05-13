import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//Se recomienda que las entidades sean clases para poder agregar 
//reglas de negocio


//hereda de Document para que sea considerado un documento en la db de mongo
@Schema()//Para indicar que es un esquema de base de datos
export class Pokemon extends Document{
    //id: string //MOngo me lo da
    @Prop({ //decorador de propiedades para modificar el campo en la db
        unique: true,
        index: true //para que el index sepa exactamente dónde esta el elemento. Es para una búsqueda rápida
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no:number;
}

//Necesito esportar el esquema
//Le va a decir a la db cuando se este iniciando que estas son las
//definiciones, reglas, columnas que quiero que utilices
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

//AL final proporcionamos toda la clase y el esquema que hemos creado a pokemon.module.ts