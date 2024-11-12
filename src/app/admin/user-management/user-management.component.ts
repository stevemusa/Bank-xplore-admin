import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'; // Import necessary directives for structural templates
import { FormsModule } from '@angular/forms';  // Import forms module if you plan to use NgModel or other form-related functionalities
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [NgFor, NgIf, FormsModule,RouterOutlet] // Declare necessary imports here
})
export class UserManagementComponent {
  allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Logged In' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending Approval' },
    // Add more user data
  ];

  get loggedInUsers() {
    return this.allUsers.filter(user => user.status === 'Logged In');
  }

  get pendingApprovalUsers() {
    return this.allUsers.filter(user => user.status === 'Pending Approval');
  }

  approveUser(user: any) {
    // Update the user's status to 'Logged In'
    user.status = 'Logged In';
    console.log(`${user.name} has been approved.`);
    // Optionally, you can add logic to remove the user from pending approval if needed
  }

  declineUser(user: any) {
    // Remove the user from the pending approval list or change status
    const index = this.allUsers.indexOf(user);
    if (index > -1) {
      // Here you can choose to remove the user or change the status
      this.allUsers.splice(index, 1); // This removes the user
      console.log(`${user.name} has been declined.`);
    }
  }
}