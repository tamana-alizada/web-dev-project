import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthToken } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api';

    login(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.baseUrl}/login/`, {
      username,
      password
    })
  }

signup(data: { username: string; email?: string; password: string }): Observable<{ message: string }> {
  return this.http.post<{ message: string }>(`${this.baseUrl}/signup/`, data);
}
}