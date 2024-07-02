import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserType } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signIn(email: string, password: string): void {
    this.httpClient.post(`${this.url}/user/login`, { email, password }).subscribe(
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
    return this.httpClient.post(`${this.url}/user/add`, { firstName, lastName, userName, email, password });
  }
}
