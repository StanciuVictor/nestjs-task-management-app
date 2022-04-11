// TasksService owns the business logic

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

// Making this @Injectable, makes it a SINGLETON
// that can be shared across the application
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // /**
  //  * Creates a way to access the tasks array (which is private) from the outside of this class.
  //  * The result of this method is an array of tasks => we use : Task[]
  //  *
  //  * @return {array}  {Task[]}
  //  * @memberof TasksService
  //  */
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // /**
  //  * If there are any filters applied, the tasks array is filtered and then returned.
  //  * If there are no filters, array of all tasks is returned.
  //  *
  //  * @param {GetTasksFilterDto} filterDto
  //  * @return {*}  {Task[]}
  //  * @memberof TasksService
  //  */
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   // define temporary array to hold the result
  //   let tasks = this.getAllTasks();

  //   // Filter out tasks with other status than the one searched for
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   // Keep only those tasks that include searched terms either in title or description
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   // Return final result
  //   return tasks;
  // }

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
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      // Throws an exception (object of the NotFoundException class) and then bubbles up into the internals of NestJS
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    // otherwise, return the found task
    return found;
  }

  /**
   * Creates a task following the model in the Entyty and saves it in the database
   *
   * @param {CreateTaskDto} createTaskDto
   * @return {*}  {Promise<Task>}
   * @memberof TasksService
   */
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
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

  // /**
  //  * Receives the new status from the request body and updates the specified task's status, then returns the task
  //  *
  //  * @param {string} id
  //  * @param {TaskStatus} status
  //  * @return {*}  {Task}
  //  * @memberof TasksService
  //  */
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   // Not really a good idea to mutate the task directly like this
  //   const task = this.getTaskById(id);
  //   task.status = status;

  //   return task;
  // }
}
