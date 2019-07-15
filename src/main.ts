import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
