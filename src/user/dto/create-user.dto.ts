import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    example: 'jhondoe@email.com',
  })
  readonly email: string;

  @ApiProperty({
    example: '1Aa!123456',
  })
  readonly password: string;

  @ApiProperty({
    enum: ['admin', 'seller', 'buyer'],
  })
  readonly type: string;
}
