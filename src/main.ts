import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import {
  HttpException,
  INestApplication,
  ValidationError,
  ValidationPipe,
  Logger,
} from '@nestjs/common';

class App {
  app: INestApplication;
  swaggerConfig: Omit<OpenAPIObject, 'paths'>;

  private logger: Logger;
  private config: ConfigService;

  constructor() {
    this.startSetup();
  }

  async startSetup() {
    try {
      await this.bootstrap();
      await this.swaggerSetup();
      await this.serverSetup();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async bootstrap() {
    this.app = await NestFactory.create(AppModule, {
      logger: false,
    });

    this.config = this.app.get(ConfigService);
    this.app.enableCors(this.config.get('cors'));

    this.app.use(cookieParser());
    this.app.setGlobalPrefix(this.config.get('app.prefix'));
    this.app.getHttpAdapter().getInstance().disable('x-powered-by');

    this.app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new HttpException(
            Object.values(validationErrors[0].constraints).join(', '),
            400,
          );
        },
      }),
    );
  }

  async swaggerSetup() {
    this.swaggerConfig = new DocumentBuilder()
      .setTitle(this.config.get('app.name'))
      .setDescription(this.config.get('app.description'))
      .setVersion(this.config.get('app.version'))
      .addServer(this.config.get('app.prefix'))
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          in: 'header',
        },
        'auth',
      )
      .build();

    const document = SwaggerModule.createDocument(
      this.app,
      this.swaggerConfig,
      {
        ignoreGlobalPrefix: true,
      },
    );

    fs.writeFileSync('./swagger.json', JSON.stringify(document));
    SwaggerModule.setup(
      `${this.config.get('app.prefix')}/swagger`,
      this.app,
      document,
    );
  }

  async serverSetup() {
    this.logger = new Logger('NestApplication');

    await this.app.listen(this.config.get('app.port'), async () => {
      Logger.overrideLogger(this.logger);
      this.logger.log(`Listening at ${await this.app.getUrl()}`);
    });
  }
}

export default new App();
