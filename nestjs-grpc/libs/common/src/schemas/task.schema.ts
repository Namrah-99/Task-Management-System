import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Category {
  name?: string;
  subCategory?: string;
}

@Schema()
export class TaskModel extends Document {
  @Prop()
  description: string;

  @Prop()
  estimatedTime: number;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Object })
  category: Category;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
