import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { WinstonLoggerModule } from 'src/winston-logger/winston-logger.module';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';
import { AdminStrategy } from './strategies/admin.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule,WinstonLoggerModule, JwtModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, AdminStrategy],
})
export class AuthModule {}
