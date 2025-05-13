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
        exposeUnsetFields: false //Si un key del DTO es undefined, no se incluye
      }
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
