import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Logger, LogLevel } from '../../src/utils/logger.js';
import { config } from '../../src/config/index.js';

describe('Logger', () => {
  // Spy on console methods
  beforeEach(() => {
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock config for testing
    vi.mock('../../src/config/index.js', () => ({
      config: {
        logging: {
          debug: true,
          colorize: true,
          timestamps: true,
          minLevel: 'INFO'
        }
      }
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log debug messages when debug is enabled and min level is DEBUG', () => {
    // Set minimum level to DEBUG to allow debug messages
    Logger.setMinLevel(LogLevel.DEBUG);
    Logger.debug('Test debug message');
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log info messages', () => {
    Logger.info('Test info message');
    expect(console.info).toHaveBeenCalled();
  });

  it('should log warning messages', () => {
    Logger.warn('Test warning message');
    expect(console.warn).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    Logger.error('Test error message');
    expect(console.error).toHaveBeenCalled();
  });

  it('should format errors correctly', () => {
    const error = new Error('Test error');
    const formatted = Logger.formatError(error);

    expect(formatted).toHaveProperty('message', 'Test error');
    expect(formatted).toHaveProperty('name', 'Error');
    expect(formatted).toHaveProperty('stack');
  });

  it('should format non-Error objects correctly', () => {
    const nonError = { custom: 'error' };
    const formatted = Logger.formatError(nonError);

    expect(formatted).toHaveProperty('error', '[object Object]');
  });

  it('should respect minimum log level', () => {
    // Set minimum level to WARN
    Logger.setMinLevel(LogLevel.WARN);

    // These should not be logged
    Logger.debug('Debug message');
    Logger.info('Info message');

    // These should be logged
    Logger.warn('Warning message');
    Logger.error('Error message');

    expect(console.debug).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });
});
