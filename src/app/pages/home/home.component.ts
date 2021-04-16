import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.startUserListener();
  }

  startUserListener() {
    this.authenticationService.autehnticationSubject.subscribe(user => {
      this.user = user;
    });
  }

}
