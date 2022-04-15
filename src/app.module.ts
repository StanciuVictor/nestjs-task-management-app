// This module is the root of the app. It can contain other modules, like Tasks module

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    // ConfigModule loads the configuration for a specific stage
    ConfigModule.forRoot({
      /* STAGE tells the app the environment it is in (dev or prod) so that the
      ConfigModule loads the correct environment file (.env.stage.dev or prod)
      STAGE is defined in package.json -> scripts */
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      // Impose validation on config files
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    AuthModule,
    // Is async because we wait for the ConfigModule initialization to finish (see above), to then be available for Dependency Injection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // This is called by NestJS whenever we want to initialize this module async
      // Whatever this func returns is going to be the config for this module
      useFactory: async (/*This is Dep Inj*/ configService: ConfigService) => {
        return {
          // Below are all config values
          type: 'postgres',
          // Automatically load entities (defined in nestjs) that translate to tables and schemas (using typeorm)
          autoLoadEntities: true,
          // Always keep the DB schema in sync.
          synchronize: true,
          // Get everything we need from the config file
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
  ],
})
export class AppModule {}
