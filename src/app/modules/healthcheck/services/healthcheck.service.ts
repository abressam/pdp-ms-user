import { HealthcheckDto } from '@app/modules/healthcheck/dtos/healthcheck.dto';
import { HealthcheckServiceInterface } from '@app/modules/healthcheck/services/healthcheck.service.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService implements HealthcheckServiceInterface {
  constructor(private configService: ConfigService) {}

  getStatus(): HealthcheckDto {
    return {
      name: this.configService.get('app.name'),
      version: this.configService.get('app.version'),
    };
  }
}
