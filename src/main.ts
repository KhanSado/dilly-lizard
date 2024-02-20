import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors ={
    origin: ['http://localhost:3000', 'http://localhost:4200', 'https://readilly.vercel.app', 'https://lizard-x7ky.onrender.com'],
    methods: 'GET, HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  }

  app.enableCors(cors)
  await app.listen(3000);
}
bootstrap();