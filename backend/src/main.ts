import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './loggers/dev.logger';
import { JsonLogger } from './loggers/json.logger';
import { TskvLogger } from './loggers/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER_TYPE;
  let logger;

  switch (loggerType) {
    case 'dev':
      logger = new DevLogger();
      break;

    case 'json':
      logger = new JsonLogger();
      break;

    case 'tskv':
      logger = new TskvLogger();
      break;

    default:
      logger = new TskvLogger();
  }

  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
