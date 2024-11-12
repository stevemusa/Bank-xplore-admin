import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  standalone: true,
})
export class LogoutComponent {
  constructor(private router: Router) {
    this.logout();
  }

  logout(): void {
    // Clear user session or token data
    localStorage.removeItem('authToken'); // Example: remove token from local storage
    sessionStorage.clear(); // Clear session storage if used

    // Redirect to login page
    this.router.navigate(['/client/login']);
  }
}