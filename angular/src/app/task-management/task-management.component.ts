import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../forms/task-form/task-form.component';
import { Subscription } from 'rxjs';
import { TaskDataService } from '../services/shared/task-data.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage = '';

  private taskDataSubscription: Subscription;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private taskDataService: TaskDataService
  ) {
    // Subscribe to changes in task data
    this.taskDataSubscription = this.taskDataService.taskData$.subscribe(
      (taskData: Task | null) => {
        if (taskData) {
          // Update local array with the new or updated task
          const index = this.tasks.findIndex(t => t.id === taskData.id);
          if (index !== -1) {
            this.tasks[index] = { ...taskData };
          } else {
            this.tasks.push(taskData);
          }
        }
      }
    );
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.taskDataSubscription.unsubscribe();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: any) => {
        if (data && data.tasks) {
          this.tasks = data.tasks;
        } else {
          console.error('Unexpected response structure:', data);
          this.errorMessage = 'Failed to fetch tasks.';
        }
      },
      (error) => {
        this.errorMessage = 'Failed to fetch tasks.';
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      (error) => {
        this.errorMessage = 'Failed to delete task.';
        console.error('Error deleting task:', error);
      }
    );
  }

  openTaskFormDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: { task: task || null }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed
    });
  }
}
