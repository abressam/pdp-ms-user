import { HealthcheckDto } from '@app/modules/healthcheck/dtos/healthcheck.dto';

export interface HealthcheckControllerInterface {
  getStatus(): Promise<HealthcheckDto>;
}
