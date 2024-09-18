// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}'); // Or use 'currentUser' if you're storing user data
    if (currentUser) {
      // User is logged in, allow access to the dashboard
      return true;
    } else {
      // No user found, redirect to login page
      this.router.navigate(['login']);
      return false;
    }
  }
}
