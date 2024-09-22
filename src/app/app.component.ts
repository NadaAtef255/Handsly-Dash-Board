import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './Pages/layout/layout.component';
// import { SidebarComponent } from './Components/sidebar/sidebar.component';
// import { NavbarComponent } from './Components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'admin-dashboard';
}
