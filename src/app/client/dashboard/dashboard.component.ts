import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register necessary chart components

interface Account {
  accountId: number;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalUsers: number = 0; // Total linked accounts
  activeAccounts: number = 0; // Active accounts
  pendingTransactions: number = 0; 
  transactionVolume: number = 15000;

  searchTerm: string = '';
  accounts: Account[] = [];
  filteredAccounts: Account[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  customerGrowthData = [5, 10, 15, 20, 30, 40]; // Example data for customer growth
  transactionVolumeData = [1500, 2000, 2500, 3000, 3500, 4000]; // Example data for transaction volume
  customerChart!: Chart;
  transactionChart!: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.createCustomerChart();
    this.createTransactionChart();
    this.fetchAccounts();
    this.fetchTransactions();
  }

  fetchAccounts(): void {
    const apiUrl = 'http://34.28.208.64:8080/banking/family/accounts/all';

    const authToken = localStorage.getItem('authToken'); // Get auth token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    });

    this.http.get<Account[]>(apiUrl, { headers }).subscribe(
      (response) => {
        this.accounts = response; // Store all accounts
        this.filteredAccounts = response; // Initially show all accounts
        this.totalUsers = response.length; // Calculate total linked accounts

        // Calculate active accounts
        this.activeAccounts = response.filter(account => account.isActive).length;

        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
        this.isLoading = false;
      }
    );
  }

  fetchTransactions(): void {
    const apiUrl = `http://34.28.208.64:8080/banking/family/transactions/view/all`;
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.errorMessage = 'Authentication token is missing. Please log in.';
      this.isLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(apiUrl, { headers }).subscribe(
      (response) => {
        const transactions = response?.data || [];
        const pendingTransactions = transactions.filter(
          (transaction: any) => transaction.status !== 'success'
        );
        this.pendingTransactions = pendingTransactions.length;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
        this.isLoading = false;
      }
    );
  }

  filterAccounts(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.accountHolderName.toLowerCase().includes(searchTermLower) ||
      account.accountNumber.includes(this.searchTerm)
    );
  }

  createCustomerChart(): void {
    const ctx = document.getElementById('customerChart') as HTMLCanvasElement;
    if (ctx) {
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
  }

  createTransactionChart(): void {
    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
    if (ctx) {
      this.transactionChart = new Chart(ctx, {
        type: 'line',
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

  ngOnDestroy(): void {
    this.customerChart?.destroy();
    this.transactionChart?.destroy();
  }
}
