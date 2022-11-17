import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type USER_TYPES = 'admin' | 'seller' | 'buyer';

@Schema()
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'buyer' })
  type: USER_TYPES;

  @Prop()
  plan: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt: Date;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
