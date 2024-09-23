import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatus = new BehaviorSubject(!!localStorage.getItem('token'));

  private apiUrl = 'http://localhost:8000/api/v1/admin-auth'; 

  constructor(private http: HttpClient, private router: Router) {}


  get isLogin(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  signOut() {
    localStorage.removeItem('token');
    this.loginStatus.next(false);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    this.loginStatus.next(true);
    return this.http.post(`${this.apiUrl}/signin`,credentials)
  }

  // logout(): void {
  //   this.http.delete(`${this.apiUrl}/logout`).subscribe(() => {
  //     this.clearSession();
  //     this.router.navigate(['/login']);
  //   });
  // }




  // Update the current user's password
  // updatePassword(passwordData: { currentPassword: string; password: string; passwordConfirm: string }): Observable<any> {
  //   return this.http.patch(`${this.apiUrl}/updatePassword`, passwordData)
  // }

  // Save JWT token to localStorage
  // private setSession(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  // // Clear JWT token from localStorage
  // private clearSession(): void {
  //   localStorage.removeItem('token');
  // }

  // Get JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }


}
