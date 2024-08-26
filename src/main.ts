import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerService } from './winston-logger/winston-logger.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WinstonLoggerService))
  app.setGlobalPrefix("resources")
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle("Swift_Shop -- DOCUMENTATION")
    .setDescription("Documentation for the apis of swift-shop")
    .setVersion("1.0")
    .addTag("Swift_Shop")
    .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("swift-docs", app, document)
  await app.listen(3000);
}
bootstrap();
