import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@app/modules/user/models/user.model';
import { SessionService } from '@app/modules/session/services/session.service';
import { SessionController } from '@app/modules/session/controllers/session.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
