import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const port = process.env.PORT || 8000

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('ARAM')
        .setDescription('Hello, We\'re ARAM!')
        .setVersion('0.0.1(Beta)')
        .addTag('Aram')
        .build()
    const swagger = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, swagger)

    app.enableCors({
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    })
    
    await app.listen(port);
}
bootstrap();
