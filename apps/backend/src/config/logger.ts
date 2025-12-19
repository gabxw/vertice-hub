import winston from 'winston';
import { env } from './env';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

// Check if running in serverless environment (Vercel)
const isServerless = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Configure transports based on environment
const transports: winston.transport[] = [];

// Always add console transport for serverless and development
if (isServerless || env.isDevelopment) {
  transports.push(
    new winston.transports.Console({
      format: env.isDevelopment ? consoleFormat : logFormat,
    })
  );
}

// Only add file transports in non-serverless environments
if (!isServerless) {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5,
    })
  );
}

// Ensure at least console transport exists
if (transports.length === 0) {
  transports.push(
    new winston.transports.Console({
      format: logFormat,
    })
  );
}

export const logger = winston.createLogger({
  level: env.isDevelopment ? 'debug' : 'info',
  format: logFormat,
  transports,
});

export default logger;
