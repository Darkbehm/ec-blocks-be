import { ApiProperty } from '@nestjs/swagger';
import { Block } from 'src/types/page';

export class CreatePageDto {
  @ApiProperty({
    example: ['76780909j2138986'],
  })
  readonly store: string;

  @ApiProperty({
    example: ['A name...'],
  })
  readonly name: string;

  @ApiProperty({
    example: [
      {
        name: 'A name...',
        color: '#fff..',
        cssClass: 'block-class...',
        cssCode: ' * { margin: 0;}',
        htmlCode: '<h1>Hello World</h1>',
        jsCode: `console.log('Hello World');`,
        components: ['{type: `login`}'],
      },
    ],
  })
  readonly blocks: Block[];
}
