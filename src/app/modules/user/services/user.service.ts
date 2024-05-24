import { UserServiceInterface } from '@app/modules/user/services/user.service.interface';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import { UserDto } from '@app/modules/user/dtos/user.dto';
import { User } from '@app/modules/user/models/user.model';
import { encodePassword } from '@app/modules/session/utils/session.util';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly configService: ConfigService,
  ) {}

  async getUser(userId: number): Promise<GetUserResDto> {
    const user = await this.userModel.findByPk(userId, {
      attributes: {
        exclude: ['id', 'password'],
      },
    });

    this.validateUser(user);

    return { user };
  }

  async putUser(userId: number, body: PutUserReqDto): Promise<GetUserResDto> {
    const salt = this.configService.get('auth.salt');
    const userOld = await this.userModel.findByPk(userId);

    this.validateUser(userOld);

    if (body.password) {
      body.password = encodePassword(salt, body.password);
    }

    const userNew = Object.assign({}, userOld.dataValues, body);

    await this.userModel.update(
      {
        name: userNew.name,
        password: userNew.password,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    return {
      user: {
        name: userNew.name,
        email: userNew.email,
        is_admin: userNew.is_admin,
      },
    };
  }

  async deleteUser(userId: number): Promise<DeleteUserResDto> {
    const user = await this.userModel.findByPk(userId);

    this.validateUser(user);

    await user.destroy();

    return {
      statusCode: 200,
      message: 'User successfully deleted',
    };
  }

  private validateUser(user: UserDto) {
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
  }
}
