import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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
  totalUsers: number = 0;
  activeAccounts: number = 0;
  pendingTransactions: number = 0;
  transactions: number[] = []; // Transactions array

  totalTransactionAmount: number = 0;
  accounts: Account[] = [];
  filteredAccounts: Account[] = []; // For storing filtered accounts
  searchTerm: string = ''; // Search term for filtering
  isLoading: boolean = true;
  errorMessage: string = '';

  customerGrowthData: number[] = [];
  transactionVolumeData: number[] = [];
  customerChart!: Chart;
  transactionChart!: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAccounts();
    this.fetchTransactions();
  }

  fetchAccounts(): void {
    const apiUrl = 'http://34.28.208.64:8080/banking/family/accounts/all';
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    });

    this.http.get<Account[]>(apiUrl, { headers }).subscribe(
      (response) => {
        this.accounts = response;
        this.filteredAccounts = response;  // Initialize filtered array
        this.totalUsers = response.length;
        this.activeAccounts = response.filter(account => account.isActive).length;

        const registrationCountByDate = this.groupCustomersByDate(response);
        this.customerGrowthData = this.generateCustomerGrowthData(registrationCountByDate);
        this.createCustomerChart();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
        this.errorMessage = error.statusText || 'Unknown error occurred';
        this.isLoading = false;
      }
    );
  }

  filterAccounts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.accountHolderName.toLowerCase().includes(term) ||
      account.accountNumber.includes(term) ||
      account.accountType.toLowerCase().includes(term)
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

    this.http.get<{ transactions: any[] }>(apiUrl, { headers }).subscribe(
      (response) => {
        const transactions = response.transactions || [];

        // Calculate total transaction amount
        this.totalTransactionAmount = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

        // Calculate pending transactions
        this.pendingTransactions = transactions.filter(transaction => transaction.status !== 'SUCCESS').length;

        // Prepare data for transaction volume chart
        this.transactionVolumeData = this.generateTransactionData(transactions);
        this.createTransactionChart();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = error.statusText || 'Failed to fetch transactions';
        this.isLoading = false;
      }
    );
  }

  groupCustomersByDate(customers: Account[]): { [date: string]: number } {
    return customers.reduce((acc: { [date: string]: number }, customer) => {
      const registrationDate = customer.createdAt.split('T')[0];
      acc[registrationDate] = (acc[registrationDate] || 0) + 1;
      return acc;
    }, {});
  }

  generateCustomerGrowthData(registrationCountByDate: { [date: string]: number }): number[] {
    const growthData: number[] = [];
    let cumulativeCustomers = 0;
    const dates = Object.keys(registrationCountByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    dates.forEach(date => {
      cumulativeCustomers += registrationCountByDate[date];
      growthData.push(cumulativeCustomers);
    });

    return growthData;
  }

  createCustomerChart(): void {
    const ctx = document.getElementById('customerChart') as HTMLCanvasElement;
    if (ctx) {
      this.customerChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.generateDateLabels(this.customerGrowthData.length),
          datasets: [{
            label: 'Customer Growth',
            data: this.customerGrowthData,
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: '#3498db',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Customers' } },
            x: { title: { display: true, text: 'Dates' } },
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
          labels: this.generateDateLabels(this.transactionVolumeData.length),
          datasets: [{
            label: 'Transaction Volume',
            data: this.transactionVolumeData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Volume' } },
            x: { title: { display: true, text: 'Dates' } },
          },
        },
      });
    }
  }

  generateTransactionData(transactions: any[]): number[] {
    return transactions.slice(0, 6).map(transaction => transaction.amount || 0);
  }

  generateDateLabels(count: number): string[] {
    const labels = [];
    let currentDate = new Date();
    for (let i = 0; i < count; i++) {
      labels.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 2); // 2-day interval
    }
    return labels;
  }

  ngOnDestroy(): void {
    this.customerChart?.destroy();
    this.transactionChart?.destroy();
  }
}
