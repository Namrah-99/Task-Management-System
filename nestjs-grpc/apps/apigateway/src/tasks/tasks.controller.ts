import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, FindOneTaskDto, UpdateTaskDto } from '@app/common/types/task';
import { JwtAuthGuard } from '@app/common/guards/jwt.auth.guard';
import { RpcException } from '@nestjs/microservices';
import { AppErrors } from '@app/common/modules/error.constants';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.createTask(createTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async findAll() {
    try {
      return await this.tasksService.findAllTask();
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async findOne(@Param('id') id: string) {
    try {
      const findOneTaskDto: FindOneTaskDto = { id };
      return await this.tasksService.findOneTask(findOneTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      if (!updateTaskDto.id) {
        updateTaskDto.id = id;
      }
      return await this.tasksService.updateTask(updateTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard here to protect this route
  async remove(@Param('id') id: string) {
    try {
      const findOneTaskDto: FindOneTaskDto = { id };
      return await this.tasksService.removeTask(findOneTaskDto);
    } catch (error) {
      throw new RpcException(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }
}
