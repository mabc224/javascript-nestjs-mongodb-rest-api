import 'dotenv/config';
import { VersioningType, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import GatewayModule from './gateway.module';
import ExceptionFilter from './filters/exception.filter';

const winstonColorizer = winston.format.colorize();
const options = {
  logger: WinstonModule.createLogger({
    level: process.env.LOG_LEVEL || 'verbose',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf((info) => {
            const {
              timestamp, level, message, data, context, stack,
            } = info;
            let logLine = `[${timestamp}] ${level} `;
            const logContext = context || (stack?.length ? stack[0] : '');
            if (logContext) {
              logLine += `${logContext} > ${message}`;
            } else {
              logLine += `${message}`;
            }
            if (typeof data === 'object' && Object.keys(data).length > 0) {
              logLine += `\n${JSON.stringify(data, null, 2)}`;
            }
            if (process.env.NO_COLOR !== 'true') {
              logLine = winstonColorizer.colorize(level, logLine);
            }
            return logLine;
          }),
        ),
      }),
    ],
  }),
};

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, options);
  app.enable('trust proxy');

  // setting headers
  app.enableCors({
    // allow CORS from '*' only for local and dev
    origin: process.env.NODE_ENV === 'production' ? /.*\.example\.com$/ : '*',
  });
  app.disable('x-powered-by');
  app.disable('etag');
  app.useGlobalFilters(new ExceptionFilter());

  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
    key: 'v',
  });

  if (process.env.NODE_ENV !== 'production') {
    const logger = app.get(Logger);
    logger.verbose(`
    ********************* WELCOME TO Restaurant-Assignment API GATEWAY *********************
    To see gateway in action, go to
    http://localhost:${process.env.REST_API_GATEWAY_PORT}
    **************************************************************
    `);
  }

  // go
  await app.listen(process.env.REST_API_GATEWAY_PORT);
}

bootstrap();
