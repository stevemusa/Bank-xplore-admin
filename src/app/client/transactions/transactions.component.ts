import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TransactionsComponent {
  transactions = [
    {
      id: 1,
      completionTime: new Date('2024-10-01T10:00:00'),
      details: 'Transfer to Account #12345',
      status: 'Completed',
      paidInAmount: 1500,
      paidOutAmount: 0,
      balance: 50000,
    },
    {
      id: 2,
      completionTime: new Date('2024-10-05T15:30:00'),
      details: 'Utility Payment',
      status: 'Completed',
      paidInAmount: 0,
      paidOutAmount: 200,
      balance: 49800,
    },
    {
      id: 3,
      completionTime: new Date('2024-10-10T12:00:00'),
      details: 'Deposit to Account #67890',
      status: 'Pending',
      paidInAmount: 3000,
      paidOutAmount: 0,
      balance: 52800,
    }
  ];
}
