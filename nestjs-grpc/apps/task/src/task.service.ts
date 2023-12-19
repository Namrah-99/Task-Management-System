import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskModel } from '@app/common/schemas/task.schema';
import { CreateTaskDto, FindOneTaskDto, Tasks, UpdateTaskDto, Task } from '@app/common/types/task';
import { RpcException } from '@nestjs/microservices';
import { AppErrors } from '@app/common/modules/error.constants';

@Injectable()
export class TaskService {
  constructor(@InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskModel> {
    try {
      const createdTask = new this.taskModel(createTaskDto);
      return await createdTask.save();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllTask(): Promise<Tasks> {
    try {
      const tasks: TaskModel[] = await this.taskModel.find().exec();
      const transformedTasks: Task[] = tasks.map((task) => {
        return {
          id: task._id, // Replace with your actual ID property
          description: task.description,
          estimatedTime: task.estimatedTime,
          completed: task.completed,
          category: task.category,
        };
      });

      return { tasks: transformedTasks };
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneTask(findOneTaskDto: FindOneTaskDto): Promise<TaskModel | null> {
    try {
      return await this.taskModel.findById(findOneTaskDto.id).exec();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<TaskModel | null> {
    try {
      const { id, ...updateData } = updateTaskDto;
      return await this.taskModel.findByIdAndUpdate(id, { ...updateData }, { new: true }).exec();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async removeTask(findOneTaskDto: FindOneTaskDto): Promise<TaskModel | null> {
    try {
      const deletedTask = await this.taskModel.findByIdAndDelete(findOneTaskDto.id).exec();
      return deletedTask ? new this.taskModel(deletedTask).toObject() as TaskModel : null;
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }
}
