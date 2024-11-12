import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
    constructor() {}
  
    // Dummy transaction data
    private dummyTransactions = [
      { id: 1, user: 'User 1', amount: 100, date: '2024-10-15', status: 'Completed' },
      { id: 2, user: 'User 2', amount: 200, date: '2024-10-16', status: 'Pending' },
      { id: 3, user: 'User 3', amount: 150, date: '2024-10-14', status: 'Failed' },
    ];
  
    getTransactions(): Observable<any[]> {
      // Return dummy data as an observable
      return of(this.dummyTransactions);
    }
  }