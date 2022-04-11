// This DTO holds the values of the query parameters ( filters for the search )

import { IsAlpha, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  // The ? marks the parameter as OPTIONAL, since we might not want to provide any filter at all
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsAlpha()
  search?: string;
}
