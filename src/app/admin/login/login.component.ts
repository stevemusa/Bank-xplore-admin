import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;  // New state for loading

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // Simulate dummy credentials
    const dummyUsername = 'admin';
    const dummyPassword = 'admin123';

    // Check if the username and password entered by the user match the dummy values
    if (this.username === dummyUsername && this.password === dummyPassword) {
      // Start loading animation only when the login is successful
      this.isLoading = true;

      // Simulate a delay for the login process (after successful login)
      setTimeout(() => {
        console.log('Login successful');
        this.router.navigate(['/admin/dashboard']); // Redirect to the dashboard
      }, 500); // 1-second delay to simulate loading
    } else {
      // Simulate login failure
      this.errorMessage = 'Invalid username or password';
    }
  }
}

  


 /*login() {
    if (this.username && this.password) {
      const loginUrl = 'http://localhost:5000/api/login'; // Set your API endpoint here

      this.http.post(loginUrl, { username: this.username, password: this.password })
        .subscribe({
          next: (response: any) => {
            this.router.navigate(['/dashboard']); // Redirect to dashboard on success
          },
          error: (err) => {
            this.errorMessage = 'Invalid username or password';
            console.error(err);
          }
        });
    } else {
      this.errorMessage = 'Please fill in both fields';
    }
  }
}*/
