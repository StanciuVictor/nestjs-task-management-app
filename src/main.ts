import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// import root module of the application
import { AppModule } from './app.module';

/**
 * Creates a new NestJS app and get the erver up and running
 */
async function bootstrap() {
  // Create new NestJS app using NestFactory
  const app = await NestFactory.create(AppModule);

  // Whenever NestJS encounters any of the validation decorators, it will know to execute validation pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
