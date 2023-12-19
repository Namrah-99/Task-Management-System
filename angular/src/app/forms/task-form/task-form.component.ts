import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { TaskDataService } from 'src/app/services/shared/task-data.service';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    title: '',
    description: '',
    priority: '',
    estimatedTime: 0,
    completed: false,
    category: {
      name: '',
      subCategory: ''
    }
  };

  taskForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private taskDataService: TaskDataService
  ) {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: ['', [Validators.required]],
      estimatedTime: [0, [Validators.min(0)]],
      completed: [false],
      categoryName: [''],
      subCategoryName: [''],
    });

    if (this.data.task) {
      this.task = { ...this.data.task };
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        estimatedTime: this.task.estimatedTime,
        completed: this.task.completed,
        categoryName: this.task.category?.name,
        subCategoryName: this.task.category?.subCategory,
      });
    }
  }

  onSaveClick() {
    if (this.data.task) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  updateCategory(key: string, value: any) {
    if (!this.task.category) {
      this.task.category = {};
    }

    (this.task.category as { [key: string]: string })[key] = value;
  }

  updateTask() {
    this.taskService.updateTask(this.task.id || '', this.task).subscribe(
      (updatedTask: Task) => {
        console.log('Task data updated:', updatedTask);
        this.taskDataService.setTaskData(updatedTask);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  createTask() {
    this.taskService.createTask(this.task).subscribe(
      (createdTask: Task) => {
        console.log('Task created:', createdTask);
        this.taskDataService.setTaskData(createdTask);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}