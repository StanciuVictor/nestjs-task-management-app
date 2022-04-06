// TasksService will owns the business logic

import { Injectable } from '@nestjs/common';

// Making this @Injectable, makes it a SINGLETON
// that can be shared across the application
@Injectable()
export class TasksService {
  // Store the tasks until we implement databases. Making them PRIVATE is a good practice
  private tasks = [];

  /**
   * Creates a way to access the tasks array (which is private) from the outside of this class.
   */
  getAllTasks() {
    return this.tasks;
  }
}
