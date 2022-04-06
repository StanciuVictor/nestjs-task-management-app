// TasksService owns the business logic

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// Import v4 and name is uuid
import { v4 as uuid } from 'uuid';

// Making this @Injectable, makes it a SINGLETON
// that can be shared across the application
@Injectable()
export class TasksService {
  // Store the tasks until we implement databases. Making them PRIVATE is a good practice
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
   * Creates a task following the task.model.ts
   *
   * @param {string} title
   * @param {string} description
   * @return {object}  {Task} - The task created
   * @memberof TasksService
   */
  createTask(title: string, description: string): Task {
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
