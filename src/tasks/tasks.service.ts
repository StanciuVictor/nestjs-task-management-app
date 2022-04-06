// TasksService will owns the business logic

import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

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
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }
}
