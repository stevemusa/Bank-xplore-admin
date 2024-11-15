import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    if (this.email && this.password) {
      const loginUrl = 'http://34.28.208.64:8080/kyc/auth/login';
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      this.http.post(loginUrl, { email: this.email, password: this.password }, { headers })
        .subscribe({
          next: (response: any) => {
            this.loginError = '';  // Clear any previous error messages
            const token = response.payload.token;
  
            if (token) {
              localStorage.setItem('authToken', token);  // Store the token in localStorage
              this.email = '';
              this.password = '';
              this.router.navigate(['client/dashboard']);  // Navigate to the dashboard
            }
          },
          error: (err) => {
            // Display appropriate error messages based on the HTTP status code
            switch (err.status) {
              case 401:
                this.loginError = 'Unauthorized: Incorrect email or password';
                break;
              case 400:
                this.loginError = 'Bad Request: Please check your input';
                break;
              case 500:
                this.loginError = 'Server error: Please try again later';
                break;
              default:
                this.loginError = 'An unexpected error occurred. Please try again.';
            }
            console.error('Login error:', err);
          }
        });
    } else {
      this.loginError = 'Please fill in both email and password';
    }
  }
  
}
