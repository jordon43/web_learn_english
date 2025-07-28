import morgan from 'morgan';
import expressWinston from 'express-winston';
import {logger} from "../utils/logger.js";

export const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms');

export const httpLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  expressFormat: false,
  colorize: false,
});