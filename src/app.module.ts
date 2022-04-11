// This module is the root of the app. It can contain other modules, like Tasks module

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
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
