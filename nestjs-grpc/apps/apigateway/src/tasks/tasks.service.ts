import { CreateTaskDto, UpdateTaskDto, FindOneTaskDto, Tasks, Task } from '@app/common/types/task';
import { Injectable } from '@nestjs/common';
import { TaskGrpcClient } from './task-grpc-client';
import { RpcException } from '@nestjs/microservices';
import { AppErrors } from '@app/common/modules/error.constants';

@Injectable()
export class TasksService {
  constructor(private readonly taskGrpcClient: TaskGrpcClient) {}

  async findAllTask(): Promise<Tasks> {
    try {
      return await this.taskGrpcClient.getUserServiceClient().findAllTask({}).toPromise();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneTask(findOneTaskDto: FindOneTaskDto): Promise<Task | null> {
    try {
      return await this.taskGrpcClient.getUserServiceClient().findOneTask(findOneTaskDto).toPromise();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskGrpcClient.getUserServiceClient().createTask(taskData).toPromise();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTask(updatedData: UpdateTaskDto): Promise<Task | null> {
    try {
      return await this.taskGrpcClient.getUserServiceClient().updateTask(updatedData).toPromise();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async removeTask(findOneTaskDto: FindOneTaskDto): Promise<Task | null> {
    try {
      return await this.taskGrpcClient.getUserServiceClient().removeTask(findOneTaskDto).toPromise();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }
}
