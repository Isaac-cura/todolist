import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DasboardEnums } from '../../enums/dashboard.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$: Observable<User>;
  route: string;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
    this.route = this.getRouteName(this.router?.url);
    console.log(this.route)
  }

  ngOnInit(): void {
    this.user$ = this.authenticationService.autehnticationSubject;
  }

  private getRouteName(url: string){
    return DasboardEnums.RouteNames[url] || "";
  }

  

}
