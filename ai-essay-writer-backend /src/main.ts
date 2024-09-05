import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    
    app.enableCors({
      origin: configService.get<string>('FRONTEND_URL') || 'http://localhost:3001',
      credentials: true,
    });

    const port = configService.get<number>('PORT') || 3000;

    const config = new DocumentBuilder()
      .setTitle('AI Essay Writer API')
      .setDescription('API documentation for the AI Essay Writer application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    Logger.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    Logger.error(`Error starting server: ${error.message}`, error.stack);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  Logger.error(`Unhandled error during bootstrap: ${error.message}`, error.stack);
  process.exit(1);
});