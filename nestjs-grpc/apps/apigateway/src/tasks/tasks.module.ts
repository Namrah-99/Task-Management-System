import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TASK_SERVICE } from '../constants';
import { TASK_PACKAGE_NAME } from '@app/common/types/task';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TaskGrpcClient } from './task-grpc-client';

@Module({
  imports: [
    ClientsModule.register([{
      name: TASK_SERVICE,
      transport: Transport.GRPC,
      options: {
        package: TASK_PACKAGE_NAME,
        protoPath: join(__dirname, '../task.proto'),
        url: '127.0.0.1:3002',
      },
    }])
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskGrpcClient]
})
export class TasksModule { }
