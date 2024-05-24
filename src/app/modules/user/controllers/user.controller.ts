import { UserService } from '@app/modules/user/services/user.service';
import { UserControllerInterface } from '@app/modules/user/controllers/user.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Put,
  Delete,
  Request,
  Body,
  HttpCode,
  HttpException,
  Logger,
} from '@nestjs/common';

@ApiTags('user')
@Controller('user')
export class UserController implements UserControllerInterface {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the user data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the user data',
    type: GetUserResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getUser(@Request() req: Request) {
    const logger = new Logger(UserController.name);

    try {
      const userId = req['userId'];
      logger.log('getUser()');
      return await this.userService.getUser(userId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Put('alter')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Put the user data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the user data',
    type: GetUserResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async putUser(@Body() body: PutUserReqDto, @Request() req: Request) {
    const logger = new Logger(UserController.name);

    try {
      const userId = req['userId'];
      logger.log('putUser()');
      return await this.userService.putUser(userId, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Delete('remove')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Delete the user data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the user status',
    type: DeleteUserResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async deleteUser(@Request() req: Request) {
    const logger = new Logger(UserController.name);

    try {
      const userId = req['userId'];
      logger.log('deleteUser()');
      return await this.userService.deleteUser(userId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
