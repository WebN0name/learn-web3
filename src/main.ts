import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const fs = require('fs')
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('learn web3')
    .setDescription('web3')
    .setVersion('1.0')
    .addTag('eth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup("/api", app, document)
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
