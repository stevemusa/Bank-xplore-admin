import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Transaction {
  id: number;
  transactionType: string;
  amount: number;
  currency: string;
  senderAccountNumber: string;
  recipientAccountName: string;
  recipientAccountNumber: string;
  recipientBankCode: string;
  transactionDate: string;
  status: string;
  reference: string;
  narration: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = []; // Array to hold transaction data
  isLoading: boolean = true; // To track the loading state
  errorMessage: string = ''; // To hold error messages
  page: number = 1; // Current page number for pagination
  size: number = 5; // Number of records per page
  totalPages: number = 1; // Total number of pages from API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const apiUrl = `http://34.28.208.64:8080/banking/family/transactions/view/all?page=${this.page}&size=${this.size}`;
    
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.errorMessage = 'Authentication token is missing. Please log in.';
      this.isLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.get<{ transactions: Transaction[], totalPages: number }>(apiUrl, { headers }).subscribe(
      (response) => {
        this.transactions = response.transactions;
        this.totalPages = response.totalPages || 1; // Ensure totalPages is set
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = error.statusText || 'Failed to fetch transactions';
        this.isLoading = false;
      }
    );
  }

  // Navigate to the next page of transactions
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchTransactions();
    }
  }

  // Navigate to the previous page of transactions
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchTransactions();
    }
  }
}
