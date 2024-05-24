import { HealthcheckDto } from '@app/modules/healthcheck/dtos/healthcheck.dto';

export interface HealthcheckServiceInterface {
  getStatus(): HealthcheckDto;
}
