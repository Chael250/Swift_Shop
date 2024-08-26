import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './winston-logger.service';

@Module({
  providers: [WinstonLoggerService],
})
export class WinstonLoggerModule {}
