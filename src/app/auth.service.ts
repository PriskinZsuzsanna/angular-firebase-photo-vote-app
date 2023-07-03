import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    
  }

  protectRoute(){
    if(this.isLoggedIn() == false){
      this.router.navigate(['login'])
    }
  }

  GoogleAuth(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

  logout(){
    localStorage.clear();
    this.afAuth.signOut();
    this.protectRoute()
  }

  isLoggedIn(): boolean{
    let email = localStorage.getItem('email');
    let displayname = localStorage.getItem('displayname');
    return email != null && displayname != null;
  }

  currentUser(){
    let displayname = localStorage.getItem('displayname');
    if (displayname != null){
      return displayname;
    }
    return 'anonymus';
  }
  currentUserEmail(){
    let email = localStorage.getItem('email');
    if (email != null){
      return email;
    }
    return 'anonymus';
  }

  navToLogIn(){
    this.router.navigate(['login'])
  }

  AuthLogin(provider: any){
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user != undefined){
          localStorage.setItem('email', <string>result.user.email);
          localStorage.setItem('displayname', <string>result.user.displayName);
          this.router.navigate(['dashboard'])
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
}
