import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { TaskDataService } from 'src/app/services/shared/task-data.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    description: '',
    estimatedTime: 0,
    completed: false,
    category: {}
  };

  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService,
    private taskDataService: TaskDataService
  ) {
    // If task data is provided, initialize the form with it
    if (data && data.task) {
      this.task = { ...data.task };
    }
  }

  onSaveClick() {
    if (this.data.task) {
      this.updateTask(); // Update existing task
    } else {
      this.createTask(); // Create new task
    }
  }

  updateCategory(key: string, value: any) {
    // Ensure task and Category are initialized before updating properties
    if (!this.task.category) {
      this.task.category = {
        name: '',
        subCategory: ''
      };
    }

    // Use type assertion to tell TypeScript that key is a valid property
    (this.task.category as { [key: string]: string })[key] = value;
  }
  
  updateTask() {
    this.taskService.updateTask(this.task.id || '', this.task).subscribe(
      (updatedTask: Task) => {
        console.log('Task data updated:', updatedTask);
        // Notify TaskManagementComponent about the update
        this.taskDataService.setTaskData(updatedTask);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating task:', error);
        // Handle error if needed
      }
    );
  }

  createTask() {
    this.taskService.createTask(this.task).subscribe(
      (createdTask: Task) => {
        console.log('Task created:', createdTask);
        // Notify TaskManagementComponent about the creation
        this.taskDataService.setTaskData(createdTask);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error creating task:', error);
        // Handle error if needed
      }
    );
  }

  onNoClick() {
    // Close the dialog without saving
    this.dialogRef.close();
  }
}
