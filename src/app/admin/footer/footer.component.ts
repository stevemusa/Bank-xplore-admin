import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <p>© 2024 Bank-Xplore. All Rights Reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #052A71; /* Dark blue background */
      color: white; /* White text */
      text-align: center;
      padding: 5px;
      margin-bottom:1px;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 18px;
    }
  `],
  standalone: true
})
export class FooterComponent {}
