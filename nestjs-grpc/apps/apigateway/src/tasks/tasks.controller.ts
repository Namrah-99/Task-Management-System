import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, FindOneTaskDto, UpdateTaskDto } from '@app/common/types/task';
import { JwtAuthGuard } from '@app/common/guards/jwt.auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  @Post()
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  findAll() {
    return this.tasksService.findAllTask();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  findOne(@Param('id') id: string) {
    const findOneTaskDto: FindOneTaskDto={id}
    return this.tasksService.findOneTask(findOneTaskDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        if (!updateTaskDto.id) {
          updateTaskDto.id = id;
        }
    return this.tasksService.updateTask(updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  remove(@Param('id') id: string) {
    const findOneTaskDto: FindOneTaskDto={id}
    return this.tasksService.removeTask(findOneTaskDto);
  }
}