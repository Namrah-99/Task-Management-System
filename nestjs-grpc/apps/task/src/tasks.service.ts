import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import {Task,Tasks, TaskServiceController, CreateTaskDto, UpdateTaskDto, TaskServiceControllerMethods, FindOneTaskDto, TaskPaginationDto} from '@app/common/types/task'
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class TasksService implements OnModuleInit {
  private readonly tasks: Task[] = [];
  private readonly tasksCount : number = 0;

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      if(i/2===0){
        this.create({ description: "abcdefgh", estimatedTime: 4 });
      }else{
        this.create({ description: "ijklmnop", estimatedTime:  2});
      }
    }
  }
  
  create(createTaskDto: CreateTaskDto) {
    const task: Task = {
      ...createTaskDto,
      completed: false,
      category: {},
      id: randomUUID(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Tasks {
    return {tasks: this.tasks };
  }

  findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    // console.log("UPDATED Task DATA (Tasks): ",updateTaskDto);
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        ...updateTaskDto,
      };
      return this.tasks[taskIndex];
    }
    throw new NotFoundException(`Task not found by id ${id}.`);
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      return this.tasks.splice(taskIndex)[0];
    }
    throw new NotFoundException(`Task not found by id ${id}.`);
  }

  queryTasks(
    paginationDtoStream: Observable<TaskPaginationDto>,
  ): Observable<Tasks> {
    const subject = new Subject<Tasks>();

    const onNext = (paginationDto: TaskPaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        tasks: this.tasks.slice(start, start + paginationDto.skip),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
