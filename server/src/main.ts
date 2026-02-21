import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  if (process.env.PORT) {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Danh sách API')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);

    await app.listen(process.env.PORT);
  }
}
bootstrap();
