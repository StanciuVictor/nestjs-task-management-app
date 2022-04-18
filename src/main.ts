import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

// import root module of the application
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

/**
 * Creates a new NestJS app and get the erver up and running
 */
async function bootstrap() {
  // Instantiate new logger
  const logger = new Logger();

  // Create new NestJS app using NestFactory
  const app = await NestFactory.create(AppModule);

  // This is only to work with the front-end app. CORS should not be enabled in production
  app.enableCors();

  // Whenever NestJS encounters any of the validation decorators, it will know to execute validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Run every Interceptor in the app. Will be used within every HTTP route handler
  app.useGlobalInterceptors(new TransformInterceptor());

  // Take port from config schema
  const port = process.env.PORT;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
