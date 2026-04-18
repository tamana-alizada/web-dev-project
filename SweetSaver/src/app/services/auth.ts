import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthToken {
  access: string;
  refresh: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface BackendProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  profile_image?: string;
  full_name?: string;
  city?: string;
  bio?: string;
}

export interface UpdateProfileData {
  phone?: string;
  address?: string;
  profile_image?: string;
  full_name?: string;
  city?: string;
  bio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000';

  signup(data: SignupData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/register/`, data);
  }

  login(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.baseUrl}/api/token/`, {
      username,
      password
    });
  }

  getProfile(): Observable<BackendProfile> {
    return this.http.get<BackendProfile>(`${this.baseUrl}/api/auth/profile/`);
  }

  updateProfile(data: UpdateProfileData): Observable<BackendProfile> {
    return this.http.patch<BackendProfile>(`${this.baseUrl}/api/auth/profile/`, data);
  }

  saveTokens(tokens: AuthToken): void {
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access');
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user_role');
  }
  updateProfileWithImage(formData: FormData) {
    return this.http.patch<BackendProfile>(`${this.baseUrl}/api/auth/profile/`, formData);
  }
  saveUserRole(role: string): void {
    localStorage.setItem('user_role', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }
  }