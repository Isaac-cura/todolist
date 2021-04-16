import { Injectable } from '@angular/core';
import { Observable, of, pipe, ReplaySubject, Subject, Subscription, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthenticationModels } from '../../models/authentication.models';
import { LocalStorage } from '../../enums/localstorage.enums';
import { UtilEnums } from '../../enums/util.enums';
import { timer } from 'rxjs';
import { IntermediaryService } from '../intermediary/intermediary.service';
import { filter, first, takeUntil } from 'rxjs/operators';
import { SubscriptionManagerService } from '../subscription-manager/subscription-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  autehnticationSubject: Subject<AuthenticationModels.Session> = new ReplaySubject();
  private expirationSubscription: Subscription;
  
  constructor(
    private intermediaryService: IntermediaryService,
    /** Subscription manager service*/
    private smService: SubscriptionManagerService
  ) { 
    this.launchFirstStateSession();
  }

  /**
   * Ask for session the first time, when the application its being loading
   * and dispatch the mechanism to refresh it
   */
  private launchFirstStateSession() {
    const session = this.getActiveSession();
    if(session) {
      this.setSession(session, true);
    }
  }

  private getActiveSession() {
    const unparsedSession = localStorage.getItem(LocalStorage.SESSION);
    return (unparsedSession ? JSON.parse(unparsedSession) : null) || null;
  }

  registerUser(user: User): Observable<User> {
    const users = this.getUsers();
    const validationError = this.validateUserToRegister(users, user);
    if(validationError) {
      return validationError;
    }
    return of(this.saveUserInPersistence(users, user));
  }

  login(email: string, password: string): Observable<User> {
    const user = this.getUserByEmailAndPassword(email, password);
    if(!user) {
      return throwError('Error al autenticar al usuario');
    }
    this.setSession(user);
    return of(user);
  }

  private getUserByEmailAndPassword(email: string, password: string): User {
    const users = this.getUsers();
    return users.find(users => users.email == email && users.password == password);
  }

  /**
   * @param preserveTime - preserve old start time for session
   */
  private setSession(obj: User | AuthenticationModels.Session, preserveTime: boolean = false) {
    const session: AuthenticationModels.Session = {
      ...obj,
      start: (preserveTime ? (obj as any).start : new Date().getTime())
    }
    localStorage.setItem(LocalStorage.SESSION, JSON.stringify(session));
    this.startExpirationLimit(session);
  }

  private startExpirationLimit(session: AuthenticationModels.Session) {
    this.smService.addSubscription("expire-session", this.getExpirationTimer(session)
    .subscribe((time) => {
      this.askToExtendSession(session);
    }, this.signOut.bind(this)))
  }

  private getExpirationTimer(session: AuthenticationModels.Session): Observable<number> {
    const timeToExpire = this.getTimeToExpire(session);
    if(!timeToExpire) {
      return throwError("Sessión caduca");
    }
    return timer(timeToExpire).pipe(
      takeUntil(
        this.onSessionEnd()
      )
    )
  }

  private getTimeToExpire(session: AuthenticationModels.Session): number {
    const timeToExpire = UtilEnums.MillisecondTime.minute / 4;
    const expirationTimestamp = session.start + timeToExpire;
    const currentTimestamp = new Date().getTime();
    return expirationTimestamp > currentTimestamp ? 
            expirationTimestamp - currentTimestamp :
            0;
  } 

  private onSessionEnd() {
    return this.autehnticationSubject.pipe(first(), filter(value => !value));
  }

  private askToExtendSession(session) {
    this.intermediaryService.showConfirmation(
      "Su sesión está por finalizar ¿Desea extenderla?"
    ).pipe(
      this.intermediaryService.pipedToast(
      "Session extendida con éxito", 
      "Su sessión expirará en 1 minuto"
    )).subscribe(confirm => {
      this.setSession(session)
    },  this.launchSignOutTimer.bind(this))
  }

  private launchSignOutTimer() {
    timer(UtilEnums.MillisecondTime.minute / 4).pipe(
      takeUntil(this.onSessionEnd())
    ).subscribe( _=>this.signOut());
  }

  private signOut() {
    this.clearSession();
    this.autehnticationSubject.next(null);
  }

  private clearSession() {
    localStorage.removeItem(LocalStorage.SESSION);
  }

  

  private saveUserInPersistence(users: User[], user: User): User {
    users.push(user);
    localStorage.setItem(LocalStorage.USERS, JSON.stringify(users));
    return user;
  }

  private validateUserToRegister(users: User[], user: User): Observable<any> {
    if(this.userExists(users, user)) {
      return throwError("El usuario ya existe")
    }
  }

  private userExists(users: User[], user: User) {
    return users.find(_user => _user.email == user.email);
  }

  private getUsers(): User[] {
    const unparsedUsers = localStorage.getItem("users");
    return (unparsedUsers ? JSON.parse(unparsedUsers) : []) || [];
  }
}
