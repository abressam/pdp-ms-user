import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UserController } from '@app/modules/user/controllers/user.controller';
import { UserService } from '@app/modules/user/services/user.service';
import {
  mockUserReq,
  mockPutUserReq,
  mockDeleteUserRes,
  mockGetUserRes,
} from '../mocks/user-mock';
import { User } from '@app/modules/user/models/user.model';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  let loggerInfo: jest.SpyInstance;
  let loggerError: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {},
        },
      ],
    }).compile();

    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);

    loggerInfo = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    loggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  describe('getUser', () => {
    it('should return success', async () => {
      jest.spyOn(userService, 'getUser').mockResolvedValue(mockGetUserRes);

      expect(await userController.getUser(mockUserReq)).toBe(mockGetUserRes);
      expect(loggerInfo).toHaveBeenCalledWith('getUser()');
    });

    it('should throw an error', async () => {
      jest.spyOn(userService, 'getUser').mockImplementationOnce(() => {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      });

      await expect(userController.getUser(mockUserReq)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('putUser', () => {
    it('should return success', async () => {
      jest.spyOn(userService, 'putUser').mockResolvedValue(mockGetUserRes);

      expect(await userController.putUser(mockPutUserReq, mockUserReq)).toBe(
        mockGetUserRes,
      );
      expect(loggerInfo).toHaveBeenCalledWith('putUser()');
    });

    it('should throw an error', async () => {
      jest.spyOn(userService, 'putUser').mockImplementationOnce(() => {
        throw new HttpException('putUser', HttpStatus.BAD_REQUEST);
      });

      await expect(
        userController.putUser(mockPutUserReq, mockUserReq),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('deleteUser', () => {
    it('should return success', async () => {
      jest
        .spyOn(userService, 'deleteUser')
        .mockResolvedValue(mockDeleteUserRes);

      expect(await userController.deleteUser(mockUserReq)).toBe(
        mockDeleteUserRes,
      );
      expect(loggerInfo).toHaveBeenCalledWith('deleteUser()');
    });

    it('should throw an error', async () => {
      jest.spyOn(userService, 'deleteUser').mockImplementationOnce(() => {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      });

      await expect(userController.deleteUser(mockUserReq)).rejects.toThrow(
        HttpException,
      );
      expect(loggerError).toBeCalledTimes(1);
    });
  });
});
