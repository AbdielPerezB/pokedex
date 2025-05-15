import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //app es mi aplicación global
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  //Validadores globales para los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Hace que solo reciba la data que yo defina en mi DTO
      forbidNonWhitelisted: true, //Bad Request si viene data no definida en DTO
      transformOptions: {
        exposeUnsetFields: false, //Si un key del DTO es undefined, no se incluye
        enableImplicitConversion:true//junto con tansform, convierte el tipo al dato definido en el DTO
      },
      transform:true //Me transforma los datos en el tipo de dato definido en el DTO
    })
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log( `App running on port ${process.env.PORT ?? 3000}`)
}
bootstrap();
