import { Controller, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskModel } from '@app/common/schemas/task.schema';
import { CreateTaskDto, FindOneTaskDto, UpdateTaskDto, EmptyTask, Tasks } from '@app/common/types/task';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { AppErrors } from '@app/common/modules/error.constants';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService', 'createTask')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    try {
      return await this.taskService.createTask(createTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @GrpcMethod('TaskService', 'findAllTask')
  async findAllTask(@Body() emptyRequest: EmptyTask): Promise<Tasks> {
    try {
      return await this.taskService.findAllTask();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @GrpcMethod('TaskService', 'findOneTask')
  async findOneTask(@Body() findOneTaskDto: FindOneTaskDto): Promise<TaskModel | null> {
    try {
      return await this.taskService.findOneTask(findOneTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @GrpcMethod('TaskService', 'updateTask')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<TaskModel | null> {
    try {
      return await this.taskService.updateTask(updateTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @GrpcMethod('TaskService', 'removeTask')
  async removeTask(@Body() findOneTaskDto: FindOneTaskDto): Promise<TaskModel | null> {
    try {
      return await this.taskService.removeTask(findOneTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }
}
