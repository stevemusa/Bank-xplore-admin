import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NotificationsComponent } from './notifications/notifications.component';  // Ensure this path is correct
import { LogoutComponent } from './logout/logout.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { ProductsComponent } from './products/products.component';

export const clientRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route
  { path: 'login', component: LoginComponent },  // Login route
  {
    path: '',  // Empty path to indicate client base
    component: ClientComponent,  // Client layout wrapper
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountComponent },
      { path: 'accounts/view-transactions', component: ViewTransactionComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'notifications', component: NotificationsComponent },  // Notifications route
      { path: 'logout', component: LogoutComponent },
      { path: 'products', component: ProductsComponent } // Corrected path and component reference
    ]
  }
];
