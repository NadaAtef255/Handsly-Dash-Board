import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { Test2Component } from '../../test2/test2.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, Test2Component],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
