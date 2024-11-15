import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register necessary chart components

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalLinkedAccounts = 120;
  activeAccounts = 80;
  pendingTransactions = 5;
  transactionVolume = 15000;

  // Example data for the charts
  customerGrowthData = [5, 10, 15, 20, 30, 40];
  transactionVolumeData = [1500, 2000, 2500, 3000, 3500, 4000]; // Transaction volume data
  customerChart!: Chart; // Define the customer growth chart variable
  transactionChart!: Chart; // Define the transaction volume chart variable

  // Search properties
  searchTerm: string = '';
  accounts = ['Account 1', 'Account 2', 'Account 3'];
  filteredAccounts: string[] = [...this.accounts];

  ngOnInit(): void {
    this.createCustomerChart(); // Initialize the customer growth chart
    this.createTransactionChart(); // Initialize the transaction volume chart
  }

  ngOnDestroy(): void {
    // Cleanup charts on component destroy
    this.customerChart?.destroy();
    this.transactionChart?.destroy();
  }

  // Method to filter accounts based on the search term
  filterAccounts(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.toLowerCase().includes(searchTermLower)
    );
  }

  // Method to create the customer growth chart
  createCustomerChart(): void {
    const ctx = document.getElementById('customerChart') as HTMLCanvasElement;
    this.customerChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Number of Customers',
            data: this.customerGrowthData,
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: '#3498db',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Customers',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });

  }

  // Method to create the transaction volume chart
  createTransactionChart(): void {
    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
    this.transactionChart = new Chart(ctx, {
      type: 'line', // Change to 'bar' if you want a bar chart
      data: {
        labels: ['April', 'May', 'June', 'July', 'August', 'September'],
        datasets: [
          {
            label: 'Transaction Volume',
            data: this.transactionVolumeData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Volume',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
