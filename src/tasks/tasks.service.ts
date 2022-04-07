// TasksService owns the business logic

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// Import v4 and name is uuid
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

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
   * Creates a way to access a specific task from the outside of this class.
   * The result of this method is a task => we use : Task
   *
   * @param {string} id
   * @return {object}  {Task}
   * @memberof TasksService
   */
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * Creates a task following the task.model.ts and stores it in the tasks array
   *
   * @param {object} createTaskDto
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
}
