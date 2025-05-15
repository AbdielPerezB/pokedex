
//MAPEAMOS
export const EnvCOnfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongoDB:  process.env.MONGODB,
    port: process.env.PORT || 3001,
    default_limit: +process.env.DEFAULT_LIMIT!,
    pokemonsToLoad: +process.env.LIMIT_POKEMONS_TO_LOAD!,
})


/*
La sintaxis que acabamos de escribir arriba es basicamente lo mismo que:
export const EnvConfiguration = () => {
return (esto);
}
*/

/*
Después de crear este archivo, tenemos que agregar en nuestra app.module.ts lo siguiente:
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvCOnfiguration]// le decimos donde está el archivo de mi mapeo de variales de entorno
    })
    ]
})
*/