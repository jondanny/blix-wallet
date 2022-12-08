import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppBootstrapManager } from './app-bootstrap.manager';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import { get } from 'http';

async function bootstrap() {
  const serverUrl  = "https://blix-wallet-irgtt4tz8-digikraft.vercel.app";
  const app = await NestFactory.create(AppModule);

  AppBootstrapManager.setAppDefaults(app);

  const config = new DocumentBuilder()
    .setTitle('Blix Wallet')
    .setDescription('Blix Wallet API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'Api-Key' })
    .addServer('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.enableShutdownHooks();

  await app.listen(process.env.PORT || 3000);  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
  }

}
bootstrap();
