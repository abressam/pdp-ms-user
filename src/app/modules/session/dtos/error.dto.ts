import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ErrorDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
