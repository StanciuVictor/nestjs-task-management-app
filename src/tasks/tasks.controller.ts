// The Controller is the entry point, comunicates with the Service and returns the result
// The Controller's only job is to recieve a request, delegate it to where it's needed to achieve the goal, and then return the response

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

// For the route /tasks, let this Controller handle it
@Controller('tasks')
export class TasksController {
  // Make tasksService a private property of TasksController class, and with the type of TasksService
  constructor(private tasksService: TasksService) {}

  /**
   * Whenever a GET request on '/tasks' comes in, this hadler method takes care of it
   * The result of this method is an array of tasks => we use : Task[]
   *
   * @return {array} {Task[]} Array of all tasks
   * @memberof TasksController
   */
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  /**
   * Whenever a POST request comes in to '/tasks', this hadler method takes care of it
   * Te result of this method is a Task => we use : Task
   *
   * @return {object}  {Task}
   * @memberof TasksController
   */
  @Post()
  createTask(
    //  Retrieve the request params (title, description) using cherrypick? technique
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
