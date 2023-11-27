import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {TASK_SERVICE_NAME, TaskServiceClient, TaskServiceController, CreateTaskDto, UpdateTaskDto, TaskServiceControllerMethods, FindOneTaskDto, TaskPaginationDto} from '@app/common/types/task';
import { TASK_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';
import { UpdateUserDto } from '@app/common';

@Injectable()
export class TasksService implements OnModuleInit {
  private tasksService: TaskServiceClient;

  constructor(@Inject(TASK_SERVICE) private client: ClientGrpc) { }

  onModuleInit() {
    this.tasksService =
      this.client.getService<TaskServiceClient>(TASK_SERVICE_NAME);
  }

  create(createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  findAll() {
    return this.tasksService.findAllTask({});
  }

  findOne(id: string) {
    return this.tasksService.findOneTask({ id });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask({ id, ...updateTaskDto });
  }

  remove(id: string) {
    return this.tasksService.removeTask({ id });
  }
}
