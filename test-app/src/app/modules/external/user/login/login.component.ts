import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/auth/authenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Variable to keep track of password visibility
  loginForm: FormGroup;
  isPasswordVisible: boolean = false;
  apiError: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm?.value;
      let request: any = {
        username: username,
        password: password
      }
      this.authenticationService.login(request).subscribe({
        next: (response: any) => {
          // Save token to localStorage/sessionStorage
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Navigate to the dashboard after successful login
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Login failed', err);
          this.apiError = 'Invalid username or password. Please try again.';
        }
      });
    }
  }
}
