import { Test, TestingModule } from '@nestjs/testing';
import { DevLogger } from './dev.logger';
import { ConsoleLogger } from '@nestjs/common';

describe('DevLogger', () => {
  let logger: DevLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLogger],
    }).compile();

    logger = module.get<DevLogger>(DevLogger);
    consoleSpy = jest.spyOn(ConsoleLogger.prototype, 'log');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should call super.log when logging', () => {
    logger.log('App started');

    expect(consoleSpy).toHaveBeenCalledWith('App started');
  });
});
