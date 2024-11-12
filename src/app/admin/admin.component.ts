// src/app/admin/admin.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet for routing
import { FooterComponent } from './footer/footer.component'; // Import FooterComponent
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
  selector: 'admin-root',
  styleUrls: ['./admin.component.css'],
  templateUrl: `admin.component.html`,
  standalone: true,
  imports: [SidebarComponent, NavbarComponent,RouterOutlet, FooterComponent, RouterModule], // Include necessary modules and components
})
export class AdminComponent {}
