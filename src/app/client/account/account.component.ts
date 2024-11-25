import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

interface Account {
  accountId: number;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  initialDeposit: number;  // Added deposit amount
  bankId: string;  // Added bank ID
  createdAt: string;
  updatedAt: string;
  isSuspended: boolean;
  serialNumber: string;  // Serial number will be auto-generated for fetched accounts
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];
  newAccount: Account = {
    accountId: 0,
    accountHolderName: '',
    accountNumber: '',
    accountType: '',
    balance: 0,
    currency: 'KES',  // Default currency
    initialDeposit: 0,  // Initial deposit
    bankId: '1',  // Default bank ID
    createdAt: '',
    updatedAt: '',
    isSuspended: false,
    serialNumber: ''  // Removed from Add Account form
  };
  isAddAccountFormVisible: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    const apiUrl = 'http://34.28.208.64:8080/banking/family/accounts/all';

    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.get<Account[]>(apiUrl, { headers }).subscribe(
      (response) => {
        this.accounts = response.map((account, index) => ({
          ...account,
          serialNumber: (index + 1).toString() // Serial number counting from 1
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
        this.isLoading = false;
      }
    );
  }

  viewAccountDetails(accountId: number): void {
    // Logic to view account details, for example, navigate to a different page
    console.log('Viewing details for account:', accountId);
    // You can use Angular Router to navigate to a detailed view page, like:
    // this.router.navigate(['/account-details', accountId]);
  }

  toggleAddAccountForm(): void {
    this.isAddAccountFormVisible = !this.isAddAccountFormVisible;
  }

  addAccount(): void {
    if (!this.isValidAccountNumber(this.newAccount.accountNumber)) {
      this.errorMessage = 'Account number must be 13 digits long.';
      return;
    }
    if (!this.isValidAccountHolderName(this.newAccount.accountHolderName)) {
      this.errorMessage = 'Account holder name must contain at least two names.';
      return;
    }

    const apiUrl = 'http://34.28.208.64:8080/banking/family/accounts/create';

    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Account>(apiUrl, this.newAccount, { headers }).subscribe(
      (response) => {
        this.accounts.push(response);
        this.isAddAccountFormVisible = false;
        this.newAccount = {
          accountId: 0,
          accountHolderName: '',
          accountNumber: '',
          accountType: '',
          balance: 0,
          currency: 'KES',
          initialDeposit: 0,
          bankId: '1',
          createdAt: '',
          updatedAt: '',
          isSuspended: false,
          serialNumber: ''  // Removed serial number
        };
      },
      (error) => {
        console.error('Error adding account:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
      }
    );
  }

  isValidAccountNumber(accountNumber: string): boolean {
    const regex = /^[0-9]{13}$/;
    return regex.test(accountNumber);
  }

  isValidAccountHolderName(accountHolderName: string): boolean {
    const names = accountHolderName.trim().split(' ');
    return names.length >= 2;
  }

  toggleAccountSuspension(accountId: number): void {
    const apiUrl = `http://your-backend-api-url/accounts/suspend/${accountId}`;
    const account = this.accounts.find(a => a.accountId === accountId);
    const newStatus = account?.isSuspended ? 'activate' : 'suspend';

    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.patch(apiUrl, { status: newStatus }, { headers }).subscribe(
      () => {
        if (account) {
          account.isSuspended = !account.isSuspended;
        }
      },
      (error) => {
        console.error('Error updating account suspension:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
      }
    );
  }

  toggleSort(property: keyof Account): void {
    this.accounts.sort((a, b) => {
      if (a[property] > b[property]) {
        return 1;
      } else if (a[property] < b[property]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
