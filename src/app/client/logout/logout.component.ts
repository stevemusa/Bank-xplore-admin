import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for any common directives like ngIf or ngFor
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear session storage or authentication tokens
    sessionStorage.clear(); // or localStorage.clear() if using localStorage
    alert('You have been logged out successfully.');
    this.router.navigate(['/login']); // Navigate to login page after logout
  }
}
