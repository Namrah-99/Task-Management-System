import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, FindOneTaskDto, UpdateTaskDto } from '@app/common/types/task';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAllTask();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const findOneTaskDto: FindOneTaskDto={id}
    return this.tasksService.findOneTask(findOneTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        if (!updateTaskDto.id) {
          updateTaskDto.id = id;
        }
    return this.tasksService.updateTask(updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const findOneTaskDto: FindOneTaskDto={id}
    return this.tasksService.removeTask(findOneTaskDto);
  }
}