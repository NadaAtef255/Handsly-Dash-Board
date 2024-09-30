import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-alert',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-alert.component.html',
  styleUrl: './login-alert.component.css',
})
export class LoginAlertComponent {}
