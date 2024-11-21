import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // For common Angular directives
@Component({
  selector: 'app-logout',
  standalone: true,  // Marking this component as standalone
  imports: [CommonModule, RouterModule],  // Import required modules
  template: `
    <div class="logout-container">
      <div class="spinner"></div>
      <p>Logging out, please wait...</p>
    </div>
  `,
  styles: [`
    .logout-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }

    .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  p {
    margin-top: 20px;
    font-size: 16px;
    color: blue;
  }
  `]
})
export class LogoutComponent {
  constructor(
    private router: Router,
  ) {
    this.logout();
  }

  logout() {
    // Clear session-related data (e.g., token)
    localStorage.removeItem('token');
    sessionStorage.clear();
   
    // Delay before navigating to the home page
    setTimeout(() => {
      console.log('Logging out in a few..');
      this.router.navigate(['/home']); // Redirect to the dashboard
    }, 500);   // 2-second delay
  }
}