import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { FooterComponent } from './admin/footer/footer.component';



@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
  <app-footer></app-footer>`,
  standalone: true,
  imports: [RouterOutlet, 
    RouterModule,
    FooterComponent,
   
  ],
})
export class AppComponent {
  title = 'My Application';
}

