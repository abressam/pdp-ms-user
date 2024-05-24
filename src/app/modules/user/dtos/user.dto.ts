import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_admin: boolean;
}
