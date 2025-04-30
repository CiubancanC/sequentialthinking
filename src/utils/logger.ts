import { config } from '../config/index.js';

/**
 * Log levels for the application.
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

// Map of log level priorities
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3
};

/**
 * Logger utility for consistent logging throughout the application.
 */
export class Logger {
  // Current minimum log level
  private static minLevel: LogLevel = (config.logging.minLevel as LogLevel) || LogLevel.INFO;

  /**
   * Sets the minimum log level.
   * @param level The minimum log level to display
   */
  static setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /**
   * Logs a debug message.
   * @param message The message to log
   * @param args Additional arguments to log
   */
  static debug(message: string, ...args: any[]): void {
    if (config.logging.debug) {
      this.log(LogLevel.DEBUG, message, ...args);
    }
  }

  /**
   * Logs an info message.
   * @param message The message to log
   * @param args Additional arguments to log
   */
  static info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  /**
   * Logs a warning message.
   * @param message The message to log
   * @param args Additional arguments to log
   */
  static warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  /**
   * Logs an error message.
   * @param message The message to log
   * @param args Additional arguments to log
   */
  static error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  /**
   * Formats an error object for logging.
   * @param error The error to format
   * @returns A simplified error object with essential properties
   */
  static formatError(error: unknown): Record<string, unknown> {
    if (error instanceof Error) {
      return {
        message: error.message,
        name: error.name,
        stack: error.stack
      };
    }
    return { error: String(error) };
  }

  /**
   * Logs a message with the specified log level.
   * @param level The log level
   * @param message The message to log
   * @param args Additional arguments to log
   */
  private static log(level: LogLevel, message: string, ...args: any[]): void {
    // Skip logging if below minimum level
    if (LOG_LEVEL_PRIORITY[level] < LOG_LEVEL_PRIORITY[this.minLevel]) {
      return;
    }

    let prefix = `[${level}]`;

    // Add timestamp if configured
    if (config.logging.timestamps) {
      const timestamp = new Date().toISOString();
      prefix = `[${timestamp}] ${prefix}`;
    }

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`${prefix} ${message}`, ...args);
        break;
      case LogLevel.INFO:
        console.info(`${prefix} ${message}`, ...args);
        break;
      case LogLevel.WARN:
        console.warn(`${prefix} ${message}`, ...args);
        break;
      case LogLevel.ERROR:
        console.error(`${prefix} ${message}`, ...args);
        break;
    }
  }
}
