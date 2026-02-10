import { Page } from '@playwright/test';

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

/**
 * Structured logging utility for test automation
 * @author Pramod Dutta - The Testing Academy
 */
export class Logger {
    private static logLevel: LogLevel = LogLevel.INFO;

    static setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    private static shouldLog(level: LogLevel): boolean {
        const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    private static formatMessage(level: LogLevel, message: string, context?: string): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}]` : '';
        return `${timestamp} | ${level.padEnd(5)} | ${contextStr} ${message}`;
    }

    static debug(message: string, context?: string): void {
        if (this.shouldLog(LogLevel.DEBUG)) {
            console.log(this.formatMessage(LogLevel.DEBUG, message, context));
        }
    }

    static info(message: string, context?: string): void {
        if (this.shouldLog(LogLevel.INFO)) {
            console.log(this.formatMessage(LogLevel.INFO, message, context));
        }
    }

    static warn(message: string, context?: string): void {
        if (this.shouldLog(LogLevel.WARN)) {
            console.warn(this.formatMessage(LogLevel.WARN, message, context));
        }
    }

    static error(message: string, context?: string): void {
        if (this.shouldLog(LogLevel.ERROR)) {
            console.error(this.formatMessage(LogLevel.ERROR, message, context));
        }
    }

    static step(stepNumber: number, description: string, context?: string): void {
        this.info(`Step ${stepNumber}: ${description}`, context);
    }

    static pageAction(action: string, element: string, context?: string): void {
        this.debug(`${action} -> ${element}`, context);
    }
}
