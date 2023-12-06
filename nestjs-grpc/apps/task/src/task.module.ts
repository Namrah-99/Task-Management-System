import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModel, TaskSchema } from '@app/common/schemas/task.schema';
import { MongoModule } from '@app/common/modules/mongo.module';


@Module({
  imports: [MongoModule,
    MongooseModule.forFeature([{ name: TaskModel.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule { }
