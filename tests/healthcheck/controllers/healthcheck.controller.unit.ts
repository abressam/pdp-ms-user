import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HealthcheckController } from '@app/modules/healthcheck/controllers/healthcheck.controller';
import { HealthcheckService } from '@app/modules/healthcheck/services/healthcheck.service';
import { mockHealthcheckRes } from '../mocks/healthcheck-mock';

describe('HealthcheckController', () => {
  let healthcheckController: HealthcheckController;
  let healthcheckService: HealthcheckService;

  let loggerInfo: jest.SpyInstance;
  let loggerError: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile();

    healthcheckController = moduleRef.get(HealthcheckController);
    healthcheckService = moduleRef.get(HealthcheckService);

    loggerInfo = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    loggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  describe('getStatus', () => {
    it('should return success', async () => {
      jest
        .spyOn(healthcheckService, 'getStatus')
        .mockReturnValue(mockHealthcheckRes);

      expect(await healthcheckController.getStatus()).toBe(mockHealthcheckRes);
      expect(loggerInfo).toHaveBeenCalledWith('getStatus()');
    });

    it('should throw an error', async () => {
      jest.spyOn(healthcheckService, 'getStatus').mockImplementationOnce(() => {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      });

      await expect(healthcheckController.getStatus()).rejects.toThrow(
        HttpException,
      );
      expect(loggerError).toBeCalledTimes(1);
    });
  });
});
