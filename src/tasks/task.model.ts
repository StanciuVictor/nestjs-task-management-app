// If we want to create a task, we must be able to define the shape of that task =>
// Define a new model as a CLASS or as an INTERFACE

// Interface - TS concept that simply enforces the shape of an object upon compilation -> After compilation, interfaces are not preserved anymore
// Classes - are preserved. Useful when we create multiple instances of the same shape

// Declare and export Task interface
export interface Task {
  // Define properties of a Task
  id: string;
  title: string;
  description: string;
  // Enforce only those three statuses
  status: TaskStatus;
}

// Declare and export enumeration to be used in properties definition
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
