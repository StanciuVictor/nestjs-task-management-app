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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

// For the route /tasks, let this Controller handle it
@Controller('tasks')
// Protect the entire route with this guard
@UseGuards(AuthGuard())
export class TasksController {
  // Make tasksService a private property of TasksController class, and with the type of TasksService
  constructor(private tasksService: TasksService) {}

  /**
   * Whenever a GET request on '/tasks' comes in, this hadler method sends the request
   * parameters and the user info and sends them to the Service
   *
   * @param {GetTasksFilterDto} filterDto
   * @param {User} user
   * @return {*}  {Promise<Task[]>}
   * @memberof TasksController
   */
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  /**
   * Whenever a GET request on '/tasks:id' comes in, this handler
   * retrieves the id and user info and sends them to the Service
   *
   * @param {string} id
   * @param {User} user
   * @return {*}  {Promise<Task>}
   * @memberof TasksController
   */
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  /**
   * Whenever a POST request comes in to '/tasks', this hadler method takes care of it
   * Retrieves the data (task and user info) from the request and sends it to the Service
   *
   * @param {CreateTaskDto} createTaskDto
   * @param {User} user
   * @return {*}  {Promise<Task>}
   * @memberof TasksController
   */
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  /**
   * Deletes the task with the specified id from the database
   *
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof TasksController
   */
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  /**
   * Retrieves the task id, task new status and user info and sends them to the Service
   * It is a best practice to also define the field or property to be patched ( status )
   *
   * @param {string} id
   * @param {UpdateTaskStatusDto} updateTaskStatusDto
   * @param {User} user
   * @return {*}  {Promise<Task>}
   * @memberof TasksController
   */
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
