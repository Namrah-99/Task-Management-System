import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private taskDataSubject = new BehaviorSubject<Task | null>(null);
  taskData$ = this.taskDataSubject.asObservable();

  setTaskData(task: Task | null) {
    this.taskDataSubject.next(task);
  }
}