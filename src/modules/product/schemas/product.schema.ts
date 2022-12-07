import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';

import mongoose from 'mongoose';
import { Store } from 'src/modules/store/schemas/store.schema';

@Schema()
export class Product {
  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  description: string;

  @Prop([
    raw({
      url: { type: String, required: true },
      key: { type: String, required: true },
    }),
  ])
  images: Record<string, any>[];

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  })
  store: Store;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
