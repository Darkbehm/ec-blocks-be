import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';

import mongoose from 'mongoose';
import { Store } from 'src/modules/store/schemas/store.schema';

@Schema()
export class Page {
  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  })
  store: Store;

  @Prop([
    raw({
      name: { type: String, required: true },
      color: { type: String, required: true },
      cssClass: { type: String, default: '' },
      htmlCode: { type: String, required: false, default: '' },
      cssCode: { type: String, required: false, default: '' },
      jsCode: { type: String, required: false, default: '' },
      components: { type: Array, required: false },
    }),
  ])
  blocks: Record<any, any>[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
