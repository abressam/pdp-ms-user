import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@app/modules/user/models/user.model';
import { UserService } from '@app/modules/user/services/user.service';
import { UserController } from '@app/modules/user/controllers/user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
