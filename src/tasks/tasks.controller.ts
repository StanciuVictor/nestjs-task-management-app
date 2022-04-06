// The Controller is the entry point, comunicates with the Service and returns the result
// The Controller's only job is to recieve a request, delegate it to where it's needed to achieve the goal, and then return the response

import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

// For the route /tasks, let this Controller handle it
@Controller('tasks')
export class TasksController {
  // Make tasksService a private property of TasksController class, and with the type of TasksService
  constructor(private tasksService: TasksService) {}

  // Whenever a GET request on '/tasks' comes in, this hadler method takes care of it
  @Get()
  getAllTasks() {
    // Returns the tasks array from TasksService
    return this.tasksService.getAllTasks();
  }
}
