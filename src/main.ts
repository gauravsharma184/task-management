import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
/*

  Object relational mappinng is a technique that lets you query and manipulate 
  data from a database, using an object oriented paradigm, using an object-oriented paradigm
  rather than sending raw queries

  the library used will be TypeORM

*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, (): void => {
    console.log('server running at 3000');
  });
}
bootstrap();
