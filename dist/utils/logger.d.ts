/**
 * Log levels for the application.
 */
export declare enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
/**
 * Logger utility for consistent logging throughout the application.
 */
export declare class Logger {
    /**
     * Logs a debug message.
     * @param message The message to log
     * @param args Additional arguments to log
     */
    static debug(message: string, ...args: any[]): void;
    /**
     * Logs an info message.
     * @param message The message to log
     * @param args Additional arguments to log
     */
    static info(message: string, ...args: any[]): void;
    /**
     * Logs a warning message.
     * @param message The message to log
     * @param args Additional arguments to log
     */
    static warn(message: string, ...args: any[]): void;
    /**
     * Logs an error message.
     * @param message The message to log
     * @param args Additional arguments to log
     */
    static error(message: string, ...args: any[]): void;
    /**
     * Logs a message with the specified log level.
     * @param level The log level
     * @param message The message to log
     * @param args Additional arguments to log
     */
    private static log;
}
