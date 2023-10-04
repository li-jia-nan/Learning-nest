import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import type { ValidationPipeOptions } from "@nestjs/common";
import { AppModule } from "./app.module";

const option: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(option));
  await app.listen(3000);
};

bootstrap();
