import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { loggerOptions } from '@/logger/logger.options';
import { configOptions } from '@/config/config.options';
import { BookstoreModule } from '@/bookstore/bookstore.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LoggerModule.forRoot(loggerOptions),
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    BookstoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
