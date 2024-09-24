import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ISigninUser } from '../../Interfaces/ISignInUser';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  constructor(private _authServ: AuthService, private router: Router) {}
  errorMsg: string = '';
  signinData: ISigninUser = {} as ISigninUser;

  ngOnInit(): void {
    document.body.scrollTop = 0;
  }

  onLogin() {
    console.log('done');
    // console.log(this.signinData);
    this._authServ.login(this.signinData).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.token));
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
        this.errorMsg = error.error.message || 'Unauthorized access. Please check your credentials.';
      }
    );
  }
}
