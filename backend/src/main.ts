import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.getOrThrow<string | string[]>('CORS_ORIGIN'),
  });
  const port = configService.get<number>('PORT') || 3000; // obtiene el puerto desde las variables de entorno, sino 3000
  app.setGlobalPrefix('api'); // todas las funciones de la api se les agrega el prefijo /api
  await app.listen(port);
  console.log(`api escuchando en puerto: ${port}/api`);
}
bootstrap();
