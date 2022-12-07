import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: ['23721583210bnjkd'],
  })
  readonly store: string;

  @ApiProperty({
    example: ['A name...'],
  })
  readonly name: string;

  @ApiProperty({
    example: ['This is a product...'],
  })
  readonly description: string;

  @ApiProperty({
    example: [''],
  })
  readonly price: number;
}
