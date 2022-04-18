// This is a test file. It tests TasksService

import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'Victor',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  // Every time, before tests, create a dummy module that contains the Service and Repository
  // This will be called every time before every test
  beforeEach(async () => {
    // Initialize a NestJS Module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  //* Insert tests below
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      // Whenever tasksRepository.getTasks is called, this is the returned value
      // getTasks returns a promise => mockRESOLVE (and not mockRETURN)
      tasksRepository.getTasks.mockResolvedValue('someValue');
      // Call tasksService.getTasks, which should then call the repository's getTasks
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
});
