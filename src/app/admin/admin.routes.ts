import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';  // Admin layout component
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { Component } from '@angular/core';
import { TransactionComponent } from './transaction/transaction.component';
import { LogoutComponent } from './logout/logout.component';

export const adminRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route

  { path: 'login', component: LoginComponent },  // Login route
  
  {
    path: '',  // Empty path to indicate admin base
    component: AdminComponent,  // Admin layout wrapper
    children: [
      { path: 'dashboard', component: DashboardComponent },  // Dashboard route inside admin layout
      { path: 'user-management', component: UserManagementComponent },  // User management rComponent},
      {path: 'logout', component: LogoutComponent}
    ]
  }
];
