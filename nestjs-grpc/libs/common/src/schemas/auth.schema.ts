import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuthModel extends Document {
  @Prop({ required: true })
  _id: string; // Explicitly defining _id

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
