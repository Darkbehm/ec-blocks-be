import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({
    example: '5f9f1c9c9c9c9c9c9c9c9c9c',
  })
  readonly owner: string;

  @ApiProperty({
    example: 'My Store',
  })
  readonly tittle: string;

  @ApiProperty({
    example: 'This is my store',
  })
  readonly description: string;

  @ApiProperty({
    minimum: 3,
    example: ['store', 'my store', 'my store'],
  })
  readonly keyWords: string[];

  @ApiProperty()
  readonly globalCss: string;

  @ApiProperty()
  readonly globalJs: string;
}
