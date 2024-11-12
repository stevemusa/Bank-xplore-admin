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
  completionTime: string; // Include completionTime
  details: string;        // Include details
  status: string;         // Include status
  category: string;       // Include category
}

@Component({
  selector: 'app-view-transactions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './view-transaction.component.html',  // Ensure correct path
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  clientName: string = "Roy"; // Replace with actual client data
  accountNumber: string = "ST-3746850508292"; // Replace with actual account number
  transactions: Transaction[] = []; // Array to hold transaction data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.http.get<Transaction[]>('/api/transactions').subscribe(
      (data) => {
        this.transactions = data;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
