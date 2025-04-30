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

/**
 * Logger utility for consistent logging throughout the application.
 */
export class Logger {
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
   * Logs a message with the specified log level.
   * @param level The log level
   * @param message The message to log
   * @param args Additional arguments to log
   */
  private static log(level: LogLevel, message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;
    
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
