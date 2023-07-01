import { Component } from '@angular/core';
import { VoteService } from './vote.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-vote-app';

  constructor(public service: VoteService, public auth: AuthService){

  }
}
