import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  /**
   * Get the ConfigService instance and load the configuration
   */
  const config = app.get(ConfigService);

  /**
   * Start the application on the specified port (default: 3000)
   */
  const port = config.get<number>('nest.port');
  await app.listen(port);
}

bootstrap().catch(() => {
  console.error('Failed to start the server');
});
