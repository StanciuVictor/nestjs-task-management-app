// The Controller is the entry point, comunicates with the Service and returns the result

import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

// For the route /tasks, let this Controller handle it
@Controller('tasks')
export class TasksController {
  // private, public, etc
  // Make tasksService a private property of TasksController class, and with the type of TasksService
  constructor(private tasksService: TasksService) {}
}
