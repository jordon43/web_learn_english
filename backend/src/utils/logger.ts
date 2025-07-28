import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, json } = format;

const consoleFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp, ...meta }) =>
    `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`
  )
);

const fileFormat = combine(timestamp(), json());

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.Console({ format: consoleFormat }),
    new transports.File({ filename: 'logs/error.log', level: 'error', format: fileFormat }),
    new transports.File({ filename: 'logs/combined.log', format: fileFormat }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log', format: fileFormat })
  ],
  exitOnError: false,
});