// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:3000/auth';

//   constructor(private http: HttpClient) {}

//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, userData);
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, credentials);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppErrors } from '../common/error.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) { }

  // register(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/register`, data).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       let errorMessage = 'Unknown Error';
  //       if (error.error instanceof ErrorEvent) {
  //         // Client-side error
  //         errorMessage = `Error: ${error.error.message}`;
  //       } else {
  //         // Server-side error
  //         errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
  //       }
  //       console.error(errorMessage);
  //       return throwError(errorMessage);
  //     })
  //   );
  // }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.extractErrorMessage(error);
        throw new Error(errorMessage);
      })
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.extractErrorMessage(error);
        throw new Error(errorMessage);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // private extractErrorMessage(error: HttpErrorResponse): string {
  //   let message = 'Unknown Error';

  //   try {
  //     if (error.error && error.error.details && error.error.details.length > 0) {
  //       // Assuming the error message is available in the 'details' array
  //       message = error.error.details[0];
  //     } else if (error.error && error.error.message) {
  //       // If the error message is directly available in the 'message' field
  //       message = error.error.message;
  //     }
  //   } catch (e) {
  //     console.error('Error extracting error message:', e);
  //   }
  //   const lastIndex = message.lastIndexOf(':');
  //   if (lastIndex !== -1) {
  //     const errorCode = message.substring(0, lastIndex);
  //     const msg = message.substring(lastIndex + 2); // +2 to skip space after colon
  //     console.log("Error Code:", errorCode);
  //     console.log("Message:", msg);
  //     return msg;
  //   } else {
  //     return message;
  //   }
  // }

  private extractErrorMessage(error: HttpErrorResponse): string {
    let message = AppErrors.INTERNAL_SERVER_ERROR; // Default error message

    if (error.error instanceof ErrorEvent) {
      message = AppErrors.INTERNAL_SERVER_ERROR;
    } else if (error.error && error.error.message) {
      message = error.error.message;
    }
    const lastIndex = message.lastIndexOf(':');
      if (lastIndex !== -1) {
        const errorCode = message.substring(0, lastIndex);
        const msg = message.substring(lastIndex + 2); // +2 to skip space after colon
        console.log("Error Code:", errorCode);
        console.log("Message:", msg);
        return msg;
      } else {
        return message;
      }
  }
}
