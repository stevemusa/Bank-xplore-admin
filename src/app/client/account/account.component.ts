import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewTransactionComponent } from '../view-transaction/view-transaction.component';

// Interface for account details
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
  serialNumber: string;
}

// Interface for transaction details
interface Transaction {
  transactionId: string;
  transactionDate: string;
  amount: number;
  transactionType: string;
  fromAccount: string;
  toAccount: string;
  status: string;
  // Add any additional fields based on your API response
}

// Interface for transaction response from the API
interface TransactionResponse {
  transactions: Transaction[];
  hasPrevious: boolean;
  totalPages: number;
  totalElements: number;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Removed RouterModule here
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  accountTypes: string[] = ['Savings', 'Investment', 'Salary', 'Student'];

  newAccount: Account = {
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
    serialNumber: ''
  };

  isAddAccountFormVisible: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';
  formSubmitted: boolean = false;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

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
          serialNumber: (index + 1).toString() // Add serial number
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

  viewTransactions(accountNumber: string): void {
    const apiUrl = `http://34.28.208.64:8080/banking/family/transactions/view/account/${accountNumber}?page=0&size=20`;

    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.get<TransactionResponse>(apiUrl, { headers }).subscribe(
      (response) => {
        this.transactions = response.transactions.map((transaction: Transaction, index: number) => ({
          ...transaction,
          serialNumber: (index + 1).toString() // Add serial number for display
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
        this.isLoading = false;
      }
    );
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
    if (!this.accountTypes.includes(this.newAccount.accountType)) {
      this.errorMessage = 'Invalid account type selected.';
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
        this.resetNewAccount();
      },
      (error) => {
        console.error('Error adding account:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
      }
    );
  }

  resetNewAccount(): void {
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
      serialNumber: ''
    };
  }

  isValidAccountNumber(accountNumber: string): boolean {
    const regex = /^[0-9]{13}$/;
    return regex.test(accountNumber);
  }

  isValidAccountHolderName(accountHolderName: string): boolean {
    const names = accountHolderName.trim().split(' ');
    return names.length >= 2;
  }

  toggleAccountSuspension(accountNumber: string): void {
    const account = this.accounts.find(a => a.accountNumber === accountNumber);

    if (account) {
      const apiUrl = `http://34.28.208.64:8080/banking/family/accounts/suspend/${accountNumber}`;
      const newStatus = account.isSuspended ? 'activate' : 'suspend';

      const authToken = localStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      });

      this.http.post(apiUrl, { status: newStatus }, { headers }).subscribe(
        () => {
          account.isSuspended = !account.isSuspended;
        },
        (error) => {
          console.error('Error updating account suspension:', error);
          this.errorMessage = error.statusText || 'Unknown error occurred';
        }
      );
    }
  }

  toggleSort(property: keyof Account): void {
    this.accounts.sort((a, b) => {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      else return 0;
    });
  }

  viewTransaction(account: Account): void {
    console.log("opening transaction", account.accountNumber);

    this.dialog.open(ViewTransactionComponent, {
      width: '500px',
      data: account
    });
  }
}
