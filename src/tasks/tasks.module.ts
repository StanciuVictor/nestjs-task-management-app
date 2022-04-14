import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  // Inject TasksRepository as a dependency wherever we need it in the module
  imports: [TypeOrmModule.forFeature([TasksRepository]), AuthModule],
  controllers: [TasksController],
  // This allows us to inject the Service intro the Controller,
  // since the Controller is defined in this Module and the
  // Service is defined as a provider in this Module.
  //* The Service is injectible only if it has the @Injectable decorator !!
  providers: [TasksService],
})
export class TasksModule {}
