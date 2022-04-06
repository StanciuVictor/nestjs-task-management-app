// TasksService will owns the business logic

import { Injectable } from '@nestjs/common';

// Making this @Injectable, makes it a SINGLETON
// that can be shared across the application
@Injectable()
export class TasksService {}
