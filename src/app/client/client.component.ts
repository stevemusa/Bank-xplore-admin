// src/app/client/client.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'client-root',
  templateUrl: `client.component.html`,
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
})
export class ClientComponent {}
