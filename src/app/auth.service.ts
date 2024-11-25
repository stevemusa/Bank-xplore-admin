import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // This tells Angular to provide AuthService globally
})
export class AuthService {

  constructor() { }

  // Check if a user is logged in by checking the existence of a token
  isLoggedIn(): boolean {
    // Ensure localStorage is only accessed in the browser
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      return !!token;  // Return true if token exists
    }
    return false; // Return false if localStorage is not available (e.g., SSR)
  }

  // Optional: logout method to remove token from localStorage
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }
}
