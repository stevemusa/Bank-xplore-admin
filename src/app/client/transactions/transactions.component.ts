import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
interface Account {
  accountId: number;
  accountNumber: string;
  accountHolderName: string;
  currency: string;
  // Other account-related fields if necessary
}

interface Transaction {
  id: number;
  account: Account;  // Account details nested in each transaction
  transactionType: string;
  amount: number;
  status: string;
  // Other transaction-related fields
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];  // Array to hold the transaction data
  isLoading: boolean = true;  // To track the loading state
  errorMessage: string = '';  // To hold any error message
  page: number = 1; // Current page number (for pagination)
  size: number = 5; // Number of records per page
  totalPages: number = 1; // To store the total number of pages (optional, if available in API response)

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiUrl = 'http://34.28.208.64:8080/banking/family/transactions/view/all?page=1&size=5';

    // Assuming you already have an authentication token in localStorage
    const authToken = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.get<{ transactions: Transaction[], totalPages: number }>(apiUrl, { headers }).subscribe(
      (response) => {
        this.transactions = response.transactions;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
        this.isLoading = false;
      }
    );
  }
}