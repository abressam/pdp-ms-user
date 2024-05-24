import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { SessionController } from '@app/modules/session/controllers/session.controller';
import { SessionService } from '@app/modules/session/services/session.service';
import {
  mockGetCredentialsReq,
  mockPostCredentialsReq,
  mockGetCredentialsRes,
} from '../mocks/session-mock';
import { mockGetUserRes } from '../../user/mocks/user-mock';
import { User } from '@app/modules/user/models/user.model';

describe('SessionController', () => {
  let sessionController: SessionController;
  let sessionService: SessionService;

  let loggerInfo: jest.SpyInstance;
  let loggerError: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [SessionController],
      providers: [
        SessionService,
        {
          provide: getModelToken(User),
          useValue: {},
        },
      ],
    }).compile();

    sessionController = moduleRef.get(SessionController);
    sessionService = moduleRef.get(SessionService);

    loggerInfo = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    loggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  describe('postLogin', () => {
    it('should return success', async () => {
      jest
        .spyOn(sessionService, 'postLogin')
        .mockResolvedValue(mockGetCredentialsRes);

      expect(await sessionController.postLogin(mockGetCredentialsReq)).toBe(
        mockGetCredentialsRes,
      );
      expect(loggerInfo).toHaveBeenCalledWith('postLogin()');
    });

    it('should throw an error', async () => {
      jest.spyOn(sessionService, 'postLogin').mockImplementationOnce(() => {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      });

      await expect(
        sessionController.postLogin(mockGetCredentialsReq),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('postCredentials', () => {
    it('should return success', async () => {
      jest
        .spyOn(sessionService, 'postCredentials')
        .mockResolvedValue(mockGetUserRes);

      expect(
        await sessionController.postCredentials(mockPostCredentialsReq),
      ).toBe(mockGetUserRes);
      expect(loggerInfo).toHaveBeenCalledWith('postCredentials()');
    });

    it('should throw an error', async () => {
      jest
        .spyOn(sessionService, 'postCredentials')
        .mockImplementationOnce(() => {
          throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        });

      await expect(
        sessionController.postCredentials(mockPostCredentialsReq),
      ).rejects.toThrow(HttpException);
      expect(loggerError).toBeCalledTimes(1);
    });
  });
});
