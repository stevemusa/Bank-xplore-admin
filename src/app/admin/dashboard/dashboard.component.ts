import { Component, OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  numberOfUsers: number = 0;
  numberOfNotifications: number = 0;
  totalTransactions: number = 0;
  usersWaitingApproval: number = 0;  // New property for users waiting approval

  constructor() {}

  ngOnInit() {
    // Replace these with actual data from a service or API
    this.numberOfUsers = 150; // Example data
    this.numberOfNotifications = 10; // Example data
    this.totalTransactions = 500; // Example data
    this.usersWaitingApproval = 5; // Example data for users waiting approval
  }
}
