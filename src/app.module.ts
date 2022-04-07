// This module is the root of the app. It can contain other modules, like Tasks module

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
})
export class AppModule {}
