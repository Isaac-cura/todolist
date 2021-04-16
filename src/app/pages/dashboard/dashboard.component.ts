import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  routerSubscription: Subscription;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.user$ = this.authenticationService.autehnticationSubject;
    this.assignRoute();
    this.initRouterListener();
  }

  private initRouterListener() {
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(_=> {
      this.assignRoute()
    })
  }

  private assignRoute() {
    this.route = this.getRouteName(this.router?.url);
  }

  private getRouteName(url: string){
    return DasboardEnums.RouteNames[url] || "";
  }

  ngOnDestroy() {
    this.routerSubscription && this.routerSubscription.unsubscribe()
  }

  

}
