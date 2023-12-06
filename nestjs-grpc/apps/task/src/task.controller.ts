import { Controller, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskModel } from '@app/common/schemas/task.schema';
import { CreateTaskDto, FindOneTaskDto, UpdateTaskDto, EmptyTask, Tasks } from '@app/common/types/task';
import { GrpcMethod } from '@nestjs/microservices';


@Controller('tasks')
export class TaskController  {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService', 'createTask')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    return await this.taskService.createTask(createTaskDto);
  }

  @GrpcMethod('TaskService', 'findAllTask')
  async findAllTask(@Body() emptyRequest: EmptyTask): Promise<Tasks> {
    return await this.taskService.findAllTask();
  }

  @GrpcMethod('TaskService', 'findOneTask')
  async findOneTask(@Body() findOneTaskDto: FindOneTaskDto): Promise<TaskModel | null> {
    return await this.taskService.findOneTask(findOneTaskDto);
  }

  @GrpcMethod('TaskService', 'updateTask')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<TaskModel | null> {
    return await this.taskService.updateTask(updateTaskDto);
  }

  @GrpcMethod('TaskService', 'removeTask')
  async removeTask(@Body() findOneTaskDto: FindOneTaskDto): Promise<TaskModel | null> {
    return await this.taskService.removeTask(findOneTaskDto);
  }
}