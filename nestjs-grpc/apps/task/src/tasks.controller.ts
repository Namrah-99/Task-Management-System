import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {TaskServiceController, CreateTaskDto, UpdateTaskDto, TaskServiceControllerMethods, FindOneTaskDto, TaskPaginationDto} from '@app/common/types/task'
import { Observable } from 'rxjs';


@Controller()
@TaskServiceControllerMethods()
export class TasksController implements TaskServiceController {
  constructor(private readonly tasksService: TasksService) {}

  createTask(createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  findAllTask() {
    return this.tasksService.findAll();
  }

  findOneTask(findOneTaskDto: FindOneTaskDto) {
    return this.tasksService.findOne(findOneTaskDto.id);
  }

  updateTask(updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  removeTask(findOneTaskDto: FindOneTaskDto) {
    return this.tasksService.remove(findOneTaskDto.id);
  }

  queryTasks(paginationDtoStream: Observable<TaskPaginationDto>) {
    return this.tasksService.queryTasks(paginationDtoStream)
  }
}
