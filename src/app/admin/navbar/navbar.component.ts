import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public title: string = 'Bank-Xplore'; // Example variable
  public navbarStyle: any = {}; // This will hold the dynamic styles for your navbar

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY; // Use scrollY instead of pageYOffset
      this.updateNavbarStyle(scrollY);
    }
  }

  updateNavbarStyle(scrollY: number) {
    // Add your logic to change the navbar style based on scroll position
    if (scrollY > 50) {
      this.navbarStyle = { position: 'fixed', top: '0', left: '0', width: '100%', transition: '0.3s' };
    } else {
      this.navbarStyle = { position: 'relative', transition: '0.3s' };
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}