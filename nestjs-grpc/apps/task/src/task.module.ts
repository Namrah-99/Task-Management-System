import { Module } from '@nestjs/common';
import { TasksModule } from './tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class TaskModule {}
