import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:3000/users'; // user microservice URL

    constructor(private http: HttpClient, private authService: AuthService) { }

    getUsers(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        console.log('headers : ', headers)
        return this.http.get(`${this.baseUrl}`, { headers });
    }

    getUserById(userId: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        return this.http.get(`${this.baseUrl}/${userId}`, { headers });
    }

    createUser(userData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}`, userData);
    }

    updateUser(userId: string, userData: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        return this.http.patch(`${this.baseUrl}/${userId}`, userData, { headers });
    }

    deleteUser(userId: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        return this.http.delete(`${this.baseUrl}/${userId}`, { headers });
    }
}
