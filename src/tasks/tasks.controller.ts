// The Controller is the entry point, comunicates with the Service and returns the result
// The Controller's only job is to recieve a request, delegate it to where it's needed to achieve the goal, and then return the response

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

// For the route /tasks, let this Controller handle it
@Controller('tasks')
export class TasksController {
  // Make tasksService a private property of TasksController class, and with the type of TasksService
  constructor(private tasksService: TasksService) {}

  /**
   * Whenever a GET request on '/tasks' comes in, this hadler method checks if there are any search parameters
   * and then filters the results, or returns all tasks
   * The result of this method is an array of tasks => we use : Task[]
   *
   * @param {GetTasksFilterDto} filterDto
   * @return {*}  {Task[]}
   * @memberof TasksController
   */
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // If we have any filters defined, call tasksService.getTasksWithFilters
    // otherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
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
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  /**
   * Whenever a POST request comes in to '/tasks', this hadler method takes care of it
   * Te result of this method is a Task => we use : Task
   *
   * @return {*}  {Task}
   * @memberof TasksController
   */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Deletes a task with specified id
   *
   * @param {string} id
   * @return {*}  {void}
   * @memberof TasksController
   */
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  /**
   * Calls the Service's updateTaskStatus method and passes the new status and the task's id
   * to change the status of a specified task
   * It is a best practice to also define the field or property to be patched ( status )
 
   * @param {string} id
   * @param {UpdateTaskStatusDto} updateTaskStatusDto
   * @return {*}  {Task}
   * @memberof TasksController
   */
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
