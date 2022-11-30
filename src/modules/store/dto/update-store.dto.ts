import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @ApiPropertyOptional({
    example: true,
  })
  readonly hasFavIconChange: boolean;

  @ApiPropertyOptional({
    example: true,
  })
  readonly hasLogoChange: boolean;

  @ApiPropertyOptional({
    example: true,
  })
  readonly hasBgImageChange: boolean;
}
