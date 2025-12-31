import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  if (process.env.PORT) {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT);
  }
}
bootstrap();
