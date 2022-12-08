import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppBootstrapManager } from './app-bootstrap.manager';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import { get } from 'http';

async function bootstrap() {
  const serverUrl  = "http://localhost:3000/";
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

  await app.listen(process.env.PORT || 3000);
  if (process.env.NODE_ENV === 'development') {

    // write swagger ui files
    get(
      `${serverUrl}/swagger/swagger-ui-bundle.js`, function 
      (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
        console.log(
    `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
  );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
    `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
  );
    });

    get(
  `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
  function (response) {
      response.pipe(
      createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
    );
      console.log(
      `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
    );
    });

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
    `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
  );
    });

  }

}
bootstrap();
