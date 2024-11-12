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
            this.loginError = null; // Clear any previous error
            this.router.navigate(['/client/dashboard']); // Navigate to dashboard on successful login
          },
          error: (err) => {
            if (err.status === 401) {
              this.loginError = 'Unauthorized: Incorrect email or password';
            } else if (err.status === 400) {
              this.loginError = 'Bad Request: Please check your input';
            } else if (err.status === 500) {
              this.loginError = 'Server error: Please try again later';
            } else {
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
