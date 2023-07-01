import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn : boolean = false

  constructor(public auth: AuthService, private router: Router){
    this.isLoggedIn = this.auth.isLoggedIn()
    this.redirect()
  }

  login(){
    this.auth.GoogleAuth()
  }

  redirect(){
    if(this.isLoggedIn){
      this.router.navigate(['dashboard'])
    }
  }
}
