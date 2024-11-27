import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Transaction {
  transactionId: string;
  userId: string;
  amount: number;
  type: string;
  date: string;
  completionTime: string;
  details: string;
  status: string;
  category: string;
}

interface TransactionResponse {
  hasPrevious: boolean;
  totalPages: number;
  accountNumber: string;
  hasNext: boolean;
  transactions: Transaction[];
  size: number;
  totalElements: number;
  bankCode: string;
  currentPage: number;
}

@Component({
  selector: 'app-view-transactions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  clientName: string = "Roy"; // Replace with actual client data
  accountNumber: string = "2770986890245"; // Hardcoded or set dynamically
  transactions: Transaction[] = [];
  bankCode: string = '';
  totalPages: number = 0;
  currentPage: number = 0;
  totalElements: number = 0;
  hasPrevious: boolean = false;
  hasNext: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    const url = `http://34.28.208.64:8080/banking/family/transactions/view/account/${this.accountNumber}`;
    
    this.http.get<TransactionResponse>(url).subscribe(
      (data) => {
        // Handle empty transactions array gracefully
        this.transactions = data.transactions.length > 0 ? data.transactions : [];
        
        // Assign other properties
        this.bankCode = data.bankCode || 'N/A'; // Default to 'N/A' if undefined
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || 0;
        this.totalElements = data.totalElements || 0;
        this.hasPrevious = data.hasPrevious || false;
        this.hasNext = data.hasNext || false;
        
        console.log('Transactions fetched:', this.transactions);
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
