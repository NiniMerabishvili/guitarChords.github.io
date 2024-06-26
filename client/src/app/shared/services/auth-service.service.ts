import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): void {
    this.http.post(`${this.url}/user/login`, { username, password }).subscribe(
      (response) => {
        // Handle successful sign-in (e.g., store token in localStorage)
        console.log('Sign-in successful:', response);
      },
      (error) => {
        // Handle sign-in error
        console.error('Sign-in error:', error);
      }
    );
  }

  register(firstName: string, lastName: string, userName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/user/add`, { firstName, lastName, userName, email, password });
  }
}
