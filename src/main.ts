import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cookieParser from "cookie-parser";

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // app.useStaticAssets(`${__dirname}/public`);
  // the next two lines did the trick
   app.use(cookieParser());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors({
    allowedHeaders:"*",
    origin: "*",
    	// origin: 'http://localhost:3000',
     //    credentials: true
    });
  await app.listen(3000);
}
bootstrap();
