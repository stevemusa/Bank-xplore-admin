import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Import FormsModule here
})
export class NotificationComponent {
  // Message model for notifications
  messages = [
    { id: 1, sender: 'Client A', content: 'Request for account statement', readStatus: false },
    { id: 2, sender: 'Client B', content: 'Inquiry about transaction limit', readStatus: false },
    { id: 3, sender: 'Client C', content: 'Complaint about suspended account', readStatus: false }
  ];

  selectedMessage: any = null; // To track which message is selected
  replyContent: string = ''; // For the reply message content

  // Method to select and read a message
  selectMessage(message: any): void {
    message.readStatus = true; // Mark message as read
    this.selectedMessage = message; // Set the selected message
    this.replyContent = ''; // Clear the reply field
  }

  // Method to send a reply
  sendReply(): void {
    if (this.replyContent.trim()) {
      // Here you can implement logic to send the reply, e.g., send to a backend or add to the message history
      console.log(`Replied to message ${this.selectedMessage.id} with: ${this.replyContent}`);
      
      // Optionally reset the reply content after sending the message
      this.replyContent = '';
    }
  }
}
