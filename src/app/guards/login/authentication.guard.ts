import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, first } from "rxjs/operators";
import { AuthenticationService } from '../../services/authentication/authentication.service';

const NO_SESSION_ROUTES = [
    '/authorization',
    '/register'
]
const AUTHENTICATE_DEFAULT_ROUTE = "/dashboard";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authenticationService.autehnticationSubject.pipe(first(), map(session => {
          const url = state.url;
          console.log(session, url, this.canBeRoute(session, url))
          return this.canBeRoute(session, url);
      }));
    }

    private canBeRoute(session, url: string) {
        if(!session) {
            return this.handleNoSession(url);
        } 
        return this.handleSession(url);
    }
    
    private handleNoSession(url: string) {
        return (!this.itsSessionRoute(url) ? 
            true : 
            this.router.parseUrl(NO_SESSION_ROUTES[0])
        );
    }

    private handleSession(url: string) {
        return (this.itsSessionRoute(url) ? 
            true : 
            this.router.parseUrl(AUTHENTICATE_DEFAULT_ROUTE)
        );
    }

    private itsSessionRoute(url: string) {
        return !(1 + NO_SESSION_ROUTES.indexOf(url));
    }
}