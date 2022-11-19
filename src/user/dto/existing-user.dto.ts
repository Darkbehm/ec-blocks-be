import { ApiProperty } from '@nestjs/swagger';
export class ExistingUserDto {
  @ApiProperty({
    example: 'jhondoe@email.com',
  })
  readonly email: string;

  @ApiProperty({
    example: '1Aa!123456',
  })
  readonly password: string;
}
