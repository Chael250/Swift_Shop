import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AdminStrategy } from 'src/auth/strategies/admin.strategy';
import { AtStrategy } from 'src/auth/strategies';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, AdminStrategy, AtStrategy,JwtService],
  controllers: [UsersController]
})
export class UsersModule {}
