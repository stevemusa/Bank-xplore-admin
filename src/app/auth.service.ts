// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // This tells Angular to provide AuthService globally
})
export class AuthService {

  constructor() { }

  // Example: Check if a user is logged in by checking the existence of a token
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;  // Return true if token exists
  }

  // Optional: logout method
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
