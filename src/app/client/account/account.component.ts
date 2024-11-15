import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpHeaders } from '@angular/common/http';

interface Account {
  accountId: number;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  initialDeposit: number;
  bankId: string;
  createdAt: string;
  updatedAt: string;
  isSuspended: boolean;
}

@Component({
  selector: 'app-account',
  standalone: true,  // Standalone component (no need to declare in module)
  imports: [CommonModule, HttpClientModule, FormsModule],  // Include FormsModule here
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];  // Array to hold the account data
  newAccount: Account = {
    accountId: 0,
    accountHolderName: '',
    accountNumber: '',
    accountType: '',
    balance: 0,
    currency: 'KES',  // Default currency set to KES (Kenyan Shilling)
    initialDeposit: 0,
    bankId: '1',  // Default bankId set to "1"
    createdAt: '',
    updatedAt: '',
    isSuspended: false
  };  // Object to hold the new account details
  isAddAccountFormVisible: boolean = false;  // Flag to toggle the Add Account form visibility
  isLoading: boolean = true;  // To track the loading state
  errorMessage: string = '';  // To hold any error message

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  // Fetch the account details from the backend API
  fetchAccounts(): void {
    const apiUrl = 'http://34.28.208.64:8080/banking/family/accounts/all'; // Replace with your actual API URL

    // Assuming you already have an authentication token in localStorage
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.get<Account[]>(apiUrl, { headers }).subscribe(
      (response) => {
        this.accounts = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
        this.isLoading = false;
      }
    );
  }

  // Toggle the visibility of the "Add Account" form
  toggleAddAccountForm(): void {
    this.isAddAccountFormVisible = !this.isAddAccountFormVisible;
  }

  // Add a new account via API
  addAccount(): void {
    const apiUrl = 'http://34.28.208.64:8080/banking/family/accounts/create'; // Replace with your actual API URL

    // Assuming you already have an authentication token in localStorage
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.post<Account>(apiUrl, this.newAccount, { headers }).subscribe(
      (response) => {
        // Add the new account to the accounts list
        this.accounts.push(response);
        this.isAddAccountFormVisible = false;  // Hide the form after adding the account
        this.newAccount = {
          accountId: 0,
          accountHolderName: '',
          accountNumber: '',
          accountType: '',
          balance: 0,
          currency: 'KES',
          initialDeposit: 0,
          bankId: '1',  // Reset to default bankId
          createdAt: '',
          updatedAt: '',
          isSuspended: false
        }; // Reset the new account form
      },
      (error) => {
        console.error('Error adding account:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
      }
    );
  }

  // Toggle the suspension status of an account
  toggleAccountSuspension(accountId: number): void {
    const apiUrl = `http://your-backend-api-url/accounts/suspend/${accountId}`; // Replace with your actual API URL
    const account = this.accounts.find(a => a.accountId === accountId);
    const newStatus = account?.isSuspended ? 'activate' : 'suspend';

    // Assuming you already have an authentication token in localStorage
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.patch(apiUrl, { status: newStatus }, { headers }).subscribe(
      () => {
        // Update the account suspension status locally
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
}
