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
  userEmail: string = ''
  error: boolean = false
  constructor(public service: VoteService, public auth: AuthService, private router: Router){

  }

  add(){
    this.service.add(this.actual)
  }

  addVote(p:Picture){
    console.log(this.getUserEmail())
    console.log(p)
    let prevVote = p.voters.filter(item => item == this.userEmail)
    console.log(prevVote)

    if(prevVote.length == 0){
      p.voters.push(this.userEmail)
    } else {
      this.error = true
    }
    console.log(p)
  }

  getUserEmail(){
    this.userEmail = JSON.stringify( localStorage.getItem('email'))
    return this.userEmail
  }
  
}
