import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  // Auto validation to all our endpoints with dto by binding ValidateInputPipe at the application level
  // used useStaticAssets instead of ServeStaticModule.forRoot to serve static files because of issues with the path
  app.useGlobalPipes(new ValidateInputPipe());
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
