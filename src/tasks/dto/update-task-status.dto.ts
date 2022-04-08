// This DTO is used for validating the value of the status the client whats the task to update to

import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  // Verifies that status is one of those 3 values set in enum
  @IsEnum(TaskStatus, {
    message: `Task status invalid. Must be one of these values: [${Object.keys(
      TaskStatus,
    )}]`,
  })
  status: TaskStatus;
}
