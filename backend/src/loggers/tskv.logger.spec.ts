import { describe, beforeEach, it } from '@jest/globals';
import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should call console.log when logging', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('App started');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('log=App started'),
    );
    consoleSpy.mockRestore();
  });
});
