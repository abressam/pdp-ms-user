import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { UserDto } from '@app/modules/user/dtos/user.dto';

export class GetUserResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  user: UserDto;
}
