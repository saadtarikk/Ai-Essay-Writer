import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  const config = new DocumentBuilder()
    .setTitle('AI Essay Writer API')
    .setDescription('API documentation for the AI Essay Writer application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const logger = new Logger('Bootstrap');
  await app.listen(3000);
  logger.log('Application is running on: ' + await app.getUrl());
}
bootstrap();