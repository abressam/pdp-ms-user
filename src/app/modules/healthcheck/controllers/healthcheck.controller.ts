import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HealthcheckService } from '@app/modules/healthcheck/services/healthcheck.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthcheckControllerInterface } from '@app/modules/healthcheck/controllers/healthcheck.controller.interface';
import { HealthcheckDto } from '@app/modules/healthcheck/dtos/healthcheck.dto';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';

@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthcheckController implements HealthcheckControllerInterface {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get server status' })
  @ApiResponse({
    status: 200,
    description: 'ok',
    type: HealthcheckDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getStatus() {
    const logger = new Logger(HealthcheckController.name);

    try {
      logger.log('getStatus()');
      return this.healthcheckService.getStatus();
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
