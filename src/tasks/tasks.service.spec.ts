//* This is a test file. It tests TasksService

import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

// Simulate (mock) injecting the Repository
const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
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

    // Extract the Service and Repository so they can be used in the test.
    // This way, in every test we'll have a fresh instance of them.
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

  describe('getTasksById', () => {
    it('calls tasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      //* Simulate finding a task
      // Set the Repository.findOne to return the mockTask = Make mockTask the expected value
      tasksRepository.findOne.mockResolvedValue(mockTask);
      // Call the Service and save what it returns
      const result = await tasksService.getTaskById('someId', mockUser);
      // Compare the Service's return to mockTask, which we consider to be 'truth'
      expect(result).toEqual(mockTask);
    });

    it('calls tasksRepository.findOne and handles an error', async () => {
      //* Simulate not finding a task
      // Set the Repository.findOne to return null
      tasksRepository.findOne.mockResolvedValue(null);
      // Make sure an exception is thrown. getTaskById returns Promise => Promise is rejected
      expect(tasksService.getTaskById('someID', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
