import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PostLoginResDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jwt: string;
}
