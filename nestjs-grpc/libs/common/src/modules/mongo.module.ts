import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../schemas/user.schema';
import { TaskModel, TaskSchema } from '../schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://namrahsaeed2:benten@cluster0.lxygcxb.mongodb.net/tmsdb"),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TaskModel.name, schema: TaskSchema },
    ]),
  ],
})
export class MongoModule {}

