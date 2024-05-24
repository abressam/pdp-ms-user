import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { SessionMiddleware } from '@app/modules/session/middlewares/session.middleware';
import {
  mockValidRequest,
  mockEmptyRequest,
  mockSecret,
} from '../mocks/session-mock';

describe('SessionMiddleware', () => {
  let sessionMiddleware: SessionMiddleware;
  let configService: ConfigService;

  let loggerError: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();

    configService = moduleRef.get(ConfigService);
    sessionMiddleware = new SessionMiddleware(configService);

    loggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  describe('use', () => {
    it('should return success', async () => {
      const next = jest.fn();

      jest.spyOn(configService, 'get').mockReturnValueOnce(mockSecret);

      await sessionMiddleware.use(mockValidRequest, undefined, next);

      expect(configService.get).toHaveBeenCalledWith('auth.secret');
      expect(next).toBeCalled();
    });

    it('should throw an error', async () => {
      const next = jest.fn();

      jest.spyOn(configService, 'get').mockReturnValueOnce(mockSecret);

      await sessionMiddleware
        .use(mockEmptyRequest, undefined, next)
        .catch((error) => {
          expect(error.message).toBe('Invalid session');
        });
      expect(loggerError).toBeCalledTimes(1);
      expect(next).not.toBeCalled();
    });
  });
});
