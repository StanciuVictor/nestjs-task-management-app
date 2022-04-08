// TasksService owns the business logic

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// Import v4 and name is uuid
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// Making this @Injectable, makes it a SINGLETON
// that can be shared across the application
@Injectable()
export class TasksService {
  // Store the tasks until we implement databases. Making them PRIVATE is a good practice
  // so other components (e.g. tasksController) don't have access to it
  // Task[] means that the type of tasks will be and array of Task (s)
  private tasks: Task[] = [];

  /**
   * Creates a way to access the tasks array (which is private) from the outside of this class.
   * The result of this method is an array of tasks => we use : Task[]
   *
   * @return {array}  {Task[]}
   * @memberof TasksService
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   * If there are any filters applied, the tasks array is filtered and then returned.
   * If there are no filters, array of all tasks is returned.
   *
   * @param {GetTasksFilterDto} filterDto
   * @return {*}  {Task[]}
   * @memberof TasksService
   */
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // define temporary array to hold the result
    let tasks = this.getAllTasks();

    // Filter out tasks with other status than the one searched for
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // Keep only those tasks that include searched terms either in title or description
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    // Return final result
    return tasks;
  }

  /**
   * Tries to find a task with specified ID. If there is none, throws a 404 Not Found error.
   * If a task with specified ID is found, it is then returned and made available outside of this class
   *
   * @param {string} id
   * @return {object}  {Task}
   * @memberof TasksService
   */
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      // Throws an exception (object of the NotFoundException class) and then bubbles up into the internals of NestJS
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    // otherwise, return the found task
    return found;
  }

  /**
   * Creates a task following the task.model.ts and stores it in the tasks array
   *
   * @param {class} createTaskDto
   * @return {object}  {Task} - The task created
   * @memberof TasksService
   */
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      // Automatically generate id using uuid
      id: uuid(),
      title,
      description,
      // Set by default OPEN
      status: TaskStatus.OPEN,
    };

    // Add task to tasks array
    this.tasks.push(task);

    // Return this newly created task so that our Controller could return in the HTTP response
    return task;
  }

  /**
   * Removes the task with specified id from the tasks array
   *
   * @param {string} id
   */
  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  /**
   * Receives the new status from the request body and updates the specified task's status, then returns the task
   *
   * @param {string} id
   * @param {TaskStatus} status
   * @return {*}  {Task}
   * @memberof TasksService
   */
  updateTaskStatus(id: string, status: TaskStatus): Task {
    // Not really a good idea to mutate the task directly like this
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
