import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthcheckService } from '@app/modules/healthcheck/services/healthcheck.service';
import { mockHealthcheckRes } from '../mocks/healthcheck-mock';

describe('HealthcheckService', () => {
  let healthcheckService: HealthcheckService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [HealthcheckService],
    }).compile();

    healthcheckService = moduleRef.get(HealthcheckService);
    configService = moduleRef.get(ConfigService);
  });

  describe('status', () => {
    it('should return success', async () => {
      jest.spyOn(configService, 'get').mockImplementation((value: string) => {
        if (value === 'app.name') {
          return mockHealthcheckRes.name;
        }
        if (value === 'app.version') {
          return mockHealthcheckRes.version;
        }
        return undefined;
      });
      expect(healthcheckService.getStatus()).toEqual(mockHealthcheckRes);
    });
  });
});
