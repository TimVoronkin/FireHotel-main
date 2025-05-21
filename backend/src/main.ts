import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('FireBox API')
    .setDescription(
      `
      The FireBox API description.
      All endpoints require authorization with a Cookie named 'access_token'.
      Endpoint api/auth/login not require authorization`,
    )
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Получаем express-приложение
  const expressApp = app.getHttpAdapter().getInstance();
  // Serve static files from web/dist
  expressApp.use(express.static(join(__dirname, '..', '..', 'web', 'dist')));
  // SPA fallback: отдавать index.html для всех не-API путей
  expressApp.get('*', (req, res) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/docs')) {
      return res.status(404).send('Not found');
    }
    res.sendFile(join(__dirname, '..', '..', 'web', 'dist', 'index.html'));
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
