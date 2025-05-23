"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('FireHotel API')
        .setDescription(`
      The FireHotel API is a RESTful API that provides access to the FireHotel application.
      It is built with NestJS and uses TypeScript for type safety and code quality.
      All endpoints require authorization with a Cookie named 'access_token'.
      Endpoint api/auth/login not require authorization`)
        .setVersion('1.0')
        .addCookieAuth('access_token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.use(express.static((0, path_1.join)(__dirname, '..', '..', 'web', 'dist')));
    expressApp.get('*', (req, res) => {
        if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/docs')) {
            return res.status(404).send('Not found');
        }
        res.sendFile((0, path_1.join)(__dirname, '..', '..', 'web', 'dist', 'index.html'));
    });
    await app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map