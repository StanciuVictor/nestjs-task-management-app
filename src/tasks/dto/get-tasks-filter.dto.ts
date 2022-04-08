// This DTO holds the values of the query parameters ( filters for the search )

import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  // The ? marks the parameter as OPTIONAL, since we might not want to provide any filter at all
  status?: TaskStatus;
  search?: string;
}
