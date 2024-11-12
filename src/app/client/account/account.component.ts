import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, HttpClientModule, FormsModule]  // Add FormsModule here
})
export class AccountComponent {
  // Updated accounts list with accountName instead of nickname
  accounts = [
    {
      id: 1,
      userID: '0987654321',
      userName: 'John Doe',
      accountNumber: '1234567890',
      accountName: 'Main Business Account',  // Changed nickname to accountName
      balance: 50000,
      transactionLimit: 10000,
      isSuspended: false,
      status: 'online',
      transactionHistory: [
        { date: '2024-10-01', description: 'Payment Received', amount: 1500 },
        { date: '2024-10-05', description: 'Utility Payment', amount: -200 },
      ],
    },
    {
      id: 2,
      userID: '0987654321',
      userName: 'Jane Smith',
      accountNumber: '0987654321',
      accountName: 'Payroll Account',  // Changed nickname to accountName
      balance: 20000,
      transactionLimit: 5000,
      isSuspended: false,
      status: 'offline',
      transactionHistory: [
        { date: '2024-10-03', description: 'Salary Payment', amount: -5000 },
        { date: '2024-10-10', description: 'Deposit', amount: 3000 },
      ],
    }
  ];

  // New account model (with userID, userName, accountName)
  newAccount = {
    userID: '',
    userName: '',
    accountNumber: '',
    accountName: '',
    transactionLimit: 0
  };

  // Flag to toggle visibility of Add Account Form
  isAddAccountFormVisible = false;

  // Method to toggle Add Account Form visibility
  toggleAddAccountForm(): void {
    this.isAddAccountFormVisible = !this.isAddAccountFormVisible;
  }

  // Method to add a new account
  addAccount(): void {
    // Simple ID generation by incrementing the highest ID in the current accounts
    const newAccountId = Math.max(...this.accounts.map(account => account.id)) + 1;

    // Include missing properties with default values
    const accountToAdd = { 
      ...this.newAccount, 
      id: newAccountId,
      balance: 0,             // Default balance
      isSuspended: false,     // Default suspension status
      status: 'offline',      // Default status
      transactionHistory: []  // Default empty transaction history
    };

    // Add the new account to the list
    this.accounts.push(accountToAdd);

    // Reset the form
    this.newAccount = { userID: '', userName: '', accountNumber: '', accountName: '', transactionLimit: 0 };
    this.isAddAccountFormVisible = false;  // Hide form after adding

    console.log(`Account added with ID ${newAccountId}`);
  }

  // Method to remove an account by its ID
  removeAccount(accountId: number): void {
    this.accounts = this.accounts.filter(account => account.id !== accountId);
    console.log(`Account with ID ${accountId} has been removed.`);
  }

  // Method to toggle the suspension of an account
  toggleAccountSuspension(accountId: number): void {
    const account = this.accounts.find(account => account.id === accountId);
    if (account) {
      account.isSuspended = !account.isSuspended;
      console.log(`Account with ID ${accountId} is now ${account.isSuspended ? 'suspended' : 'active'}.`);
    }
  }
}
