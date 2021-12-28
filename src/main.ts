import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  await app.listen(AppModule.port);
}
bootstrap();
