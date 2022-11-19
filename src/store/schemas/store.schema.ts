import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Store {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: User;

  @Prop({ required: true, trim: true })
  tittle: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true })
  keyWords: string[];

  // the images will be stored in the cloud and the url and the id will be stored here
  @Prop(
    raw({
      url: { type: String, required: true },
      key: { type: String, required: true },
    }),
  )
  favIcon: Record<string, any>;

  // the images will be stored in the cloud and the url and the id will be stored here
  @Prop(
    raw({
      url: { type: String, required: true },
      key: { type: String, required: true },
    }),
  )
  logo: Record<string, any>;

  @Prop({ required: false })
  globalCss: string;

  @Prop({ required: false })
  globalJs: string;

  // the images will be stored in the cloud and the url and the id will be stored here
  @Prop([
    raw({
      url: { type: String, required: true },
      key: { type: String, required: true },
    }),
  ])
  images: Record<string, any>[];

  // the videos will be stored in the cloud and the url and the id will be stored here
  @Prop([
    raw({
      url: { type: String, required: true },
      key: { type: String, required: true },
    }),
  ])
  videos: Record<string, any>[];

  // the files will be stored in the cloud and the url and the id will be stored here
  @Prop([
    raw({
      url: { type: String, required: true },
      key: { type: String, required: true },
    }),
  ])
  files: Record<string, any>[];

  // meta data
  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt: Date;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
