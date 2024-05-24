import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthcheckModule } from '@app/modules/healthcheck/healthcheck.module';
import { SessionMiddleware } from '@app/modules/session/middlewares/session.middleware';
import { SessionModule } from '@app/modules/session/session.module';
import { UserModule } from '@app/modules/user/user.module';
import { UserController } from '@app/modules/user/controllers/user.controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import appConfig from '@app/configs/app.config';
import dbConfig from '@app/configs/db.config';

@Module({
  imports: [
    HealthcheckModule,
    SessionModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    SequelizeModule.forRoot(dbConfig),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(UserController);
  }
}
