import { Component } from '@angular/core';
import { Picture } from '../picture';
import { VoteService } from '../vote.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  actual: Picture = new Picture()

  constructor(public service: VoteService, public auth: AuthService, private router: Router){
    this.auth.protectRoute()
    this.loadUserData()
  }

  add(){
    this.service.add(this.actual)
    this.actual = new Picture();
    this.loadUserData();
  }

  loadUserData() {
    this.actual.displayName = this.auth.currentUser();
    this.actual.email = this.auth.currentUserEmail();
  }


 
  
}
