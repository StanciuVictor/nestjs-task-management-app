// This module is the root of the app. It can contain other modules, like Tasks module

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule loads the configuration for a specific stage
    ConfigModule.forRoot({
      /* STAGE tells the app the environment it is in (dev or prod) so that the
      ConfigModule loads the correct environment file (.env.stage.dev or prod)
      STAGE is defined in package.json -> scripts */
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      // Configuration values
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      // Automatically load entities (defined in nestjs) that translate to tables and schemas (using typeorm)
      autoLoadEntities: true,
      // Always keep the DB schema in sync.
      synchronize: true,
    }),
  ],
})
export class AppModule {}
