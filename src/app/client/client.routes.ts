import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LogoutComponent } from './logout/logout.component';
//import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth.guard';  // Correct import path

export const clientRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route to login
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: ClientComponent,
     // Protect the client area with AuthGuard
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
      { path: 'accounts', component: AccountComponent, canActivate: [AuthGuard], },
      { path: 'logout', component: LogoutComponent },
      //{ path: 'accounts/view-transactions/:accountId', component: ViewTransactionComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'products', component: ProductsComponent }
    ]
  },

  
];
