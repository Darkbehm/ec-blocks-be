import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PublicFile {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  key: string;
}

export const FileSchema = SchemaFactory.createForClass(PublicFile);
