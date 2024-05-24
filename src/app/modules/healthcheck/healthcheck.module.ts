import { Module } from '@nestjs/common';
import { HealthcheckController } from '@app/modules/healthcheck/controllers/healthcheck.controller';
import { HealthcheckService } from '@app/modules/healthcheck/services/healthcheck.service';

@Module({
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
