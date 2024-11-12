import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  imports: [FormsModule, CommonModule, RouterOutlet, HttpClientModule], // Add HttpClientModule here
})

export class TransactionComponent implements OnInit {
  transactions: any[] = []; // Replace with your transaction model
  searchTerm: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }

  filteredTransactions() {
    return this.transactions.filter(transaction => 
      transaction.user.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewDetails(transaction: any) {
    // Implement logic to view transaction details
  }

  deleteTransaction(id: number) {
    // Implement logic to delete a transaction
    this.loadTransactions(); // Refresh the list after deletion
  }
}
