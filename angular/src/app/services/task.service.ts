import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks'; // task microservice URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() });
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${taskId}`, { headers: this.getHeaders() });
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, taskData, { headers: this.getHeaders() });
  }

  updateTask(taskId: string, taskData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${taskId}`, taskData, { headers: this.getHeaders() });
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${taskId}`, { headers: this.getHeaders() });
  }
}
