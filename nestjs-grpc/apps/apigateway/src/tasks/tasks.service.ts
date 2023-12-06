import { CreateTaskDto, UpdateTaskDto,FindOneTaskDto, Tasks, Task } from '@app/common/types/task';
import { Injectable } from '@nestjs/common';
import { TaskGrpcClient } from './task-grpc-client';
@Injectable()
export class TasksService {
  constructor(private readonly taskGrpcClient: TaskGrpcClient) {}

  async findAllTask(): Promise<Tasks> {
    return this.taskGrpcClient.getUserServiceClient().findAllTask({}).toPromise();
  }

  async findOneTask(findOneTaskDto: FindOneTaskDto): Promise<Task | null> {
    return this.taskGrpcClient.getUserServiceClient().findOneTask(findOneTaskDto).toPromise();
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    return this.taskGrpcClient.getUserServiceClient().createTask(taskData).toPromise();
  }

  async updateTask(updatedData: UpdateTaskDto): Promise<Task | null> {
    return this.taskGrpcClient.getUserServiceClient().updateTask(updatedData).toPromise();
  }

  async removeTask(findOneTaskDto: FindOneTaskDto): Promise<Task | null> {
    return this.taskGrpcClient.getUserServiceClient().removeTask(findOneTaskDto).toPromise();
  }

}

