// The Controller is the entry point, comunicates with the Service and returns the result
// The Controller's only job is to recieve a request, delegate it to where it's needed to achieve the goal, and then return the response

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
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
   * Whenever a GET request on '/tasks:id' comes in with a specified id, this hadler method takes care of it
   * The result of this method is a task => we use : Task
   *
   * @param {string} id - The id of the task
   * @return {object}  {Task}
   * @memberof TasksController
   */
  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  /**
   * Whenever a POST request comes in to '/tasks', this hadler method takes care of it
   * Te result of this method is a Task => we use : Task
   *
   * @return {object}  {Task}
   * @memberof TasksController
   */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
