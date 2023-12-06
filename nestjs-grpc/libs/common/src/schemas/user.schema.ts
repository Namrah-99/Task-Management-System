import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class UserModel extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  role: string;

  @Prop({ default: false })
  subscribed: boolean;

  @Prop({ type: SchemaTypes.Mixed })
  socialMedia?: {
    twitterUri?: string;
    fbUri?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
