import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    logger = module.get<JsonLogger>(JsonLogger);
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should log a message in JSON format', () => {
    const message = 'App started';

    logger.log(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: message,
      }),
    );
  });
});
