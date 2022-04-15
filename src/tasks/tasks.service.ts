// TasksService owns the business logic

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

// Making this @Injectable, makes it a SINGLETON
// that can be shared across the application
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  /**
   * Receives the user's info and filters from the Controller and sends them to the Reposotory for database interaction
   *
   * @param {GetTasksFilterDto} filterDto
   * @param {User} user
   * @return {*}  {Promise<Task[]>}
   * @memberof TasksService
   */
  getTasks(
    filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  /**
   * Tries to fetch a task with specified ID from the database. If there is none, throws a 404 Not Found error.
   * If a task with specified ID is found, it is then returned.
   * Async because we interact with a db.
   * Because it is async, it returns a promise of type task => we use Promise<Task>
   *
   * @param {string} id
   * @return {*}  {Promise<Task>}
   * @memberof TasksService
   */
  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      // Throws an exception (object of the NotFoundException class) and then bubbles up into the internals of NestJS
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    // otherwise, return the found task
    return found;
  }

  /**
   * Receives the task and user info and sends it to the Repository for database actions
   *
   * @param {CreateTaskDto} createTaskDto
   * @param {User} user
   * @return {*}  {Promise<Task>}
   * @memberof TasksService
   */
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  /**
   * Removes the task with specified id from the database
   *
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof TasksService
   */
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  /**
   * Receives the new status from the request body and updates the specified task's status in the database, then returns the task
   *
   * @param {string} id
   * @param {TaskStatus} status
   * @return {*}  {Promise<Task>}
   * @memberof TasksService
   */
  // async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  //   const task = await this.getTaskById(id);
  //   task.status = status;
  //   await this.tasksRepository.save(task);
  //   return task;
  // }
}
