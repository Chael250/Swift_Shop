import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { WinstonLoggerModule } from './winston-logger/winston-logger.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ProductsModule } from './products/products.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      isGlobal:true //The configService can now be used anywhere
    }),
    JwtModule.register({
      global: true
    }),
    DatabaseModule,
    WinstonLoggerModule,
    CategoriesModule,
    AuthModule,
    ProductsModule,
    ThrottlerModule.forRoot([{
      name:"Short",
      ttl: 1000,
      limit: 3
    },
  {
    name: "long",
    ttl: 60000,
    limit: 100
  }])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, // To be able to inject a service in the atGuard
    useClass: AtGuard
  }],
})
export class AppModule {}
