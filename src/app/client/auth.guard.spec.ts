import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';  // Ensure the path is correct based on your folder structure

@Injectable({
  providedIn: 'root'  // This ensures the guard is globally available in the app
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If the user is logged in, allow access to the route
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // If not logged in, redirect to the login page
    this.router.navigate(['/login']);
    return false;  // Prevent access to the route
  }
}
